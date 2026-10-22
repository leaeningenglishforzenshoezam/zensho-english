const json=(x,status=200)=>new Response(JSON.stringify(x),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
const fail=(code,status=400)=>{throw Object.assign(Error(code),{status});};
export function dates(from,to){const valid=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s+'T00:00:00Z'))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;if(!valid(from)||!valid(to)||from>to||(Date.parse(to)-Date.parse(from))/86400000>365)fail('invalid_dates');return {from,to};}
function code(){const bytes=crypto.getRandomValues(new Uint8Array(10)),alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';return [...bytes].map(n=>alphabet[n%32]).join('');}
async function body(request){if(!request.headers.get('content-type')?.startsWith('application/json'))fail('json_required');let size=0,parts=[];const reader=request.body?.getReader();if(!reader)fail('invalid_request');while(true){const x=await reader.read();if(x.done)break;size+=x.value.length;if(size>4096){await reader.cancel();fail('request_too_large',413);}parts.push(x.value);}const all=new Uint8Array(size);let offset=0;for(const p of parts){all.set(p,offset);offset+=p.length;}try{const value=JSON.parse(new TextDecoder().decode(all));if(!value||typeof value!=='object'||Array.isArray(value))fail('invalid_request');return value;}catch{fail('invalid_request');}}
const rows=async q=>(await q.all()).results||[];
// Query only the requested daily aggregates from the existing authoritative saves.
// No answer-level event stream, extra sync endpoint, or duplicate reward writes.
export const reportSQL=`SELECT m.user_id,m.number,p.username,s.updated_at,
 d.key AS day,cat.key AS category,
 json_extract(CASE WHEN cat.type='object' THEN cat.value ELSE '{}' END,'$.attempt') AS attempt,json_extract(CASE WHEN cat.type='object' THEN cat.value ELSE '{}' END,'$.correct') AS correct,
 json_extract(CASE WHEN cat.type='object' THEN cat.value ELSE '{}' END,'$.wrong') AS wrong,json_extract(CASE WHEN cat.type='object' THEN cat.value ELSE '{}' END,'$.seconds') AS seconds
 FROM learning_members m LEFT JOIN user_profiles p ON p.user_id=m.user_id
 LEFT JOIN saves s ON s.user_id=m.user_id
 LEFT JOIN json_each(CASE WHEN json_valid(json_extract(s.save_json,?)) THEN json_extract(s.save_json,?) ELSE '{}' END) d ON d.key BETWEEN ? AND ? AND d.key>=m.share_from
 LEFT JOIN json_each(CASE WHEN d.type='object' THEN d.value ELSE '{}' END) cat ON 1=1
 WHERE m.class_id=? AND m.status='approved' ORDER BY CAST(m.number AS INTEGER),m.user_id,d.key`;
export async function handleLearningClasses(request,env,userId){
 if(env.LEARNING_CLASSES_ENABLED!=='true')return json({error:'classes_not_enabled'},503);
 const db=env.DB,url=new URL(request.url),route=url.pathname.slice('/api/v1/learning/'.length),method=request.method;
 try{
 const teacher=!!await db.prepare('SELECT user_id FROM approved_teachers WHERE user_id=?').bind(userId).first();
 if(route==='classes'&&method==='GET')return json({teacher,owned:teacher?await rows(db.prepare('SELECT id,name,code,accepting FROM learning_classes WHERE teacher_id=? ORDER BY created_at DESC').bind(userId)):[],joined:await rows(db.prepare('SELECT c.id,c.name,m.number,m.status,m.share_from FROM learning_members m JOIN learning_classes c ON c.id=m.class_id WHERE m.user_id=?').bind(userId))});
 const b=method==='POST'?await body(request):{};
 if(route==='classes'&&method==='POST'){
  if(!teacher)fail('teacher_approval_required',403);if(typeof b.name!=='string'||!b.name.trim()||b.name.length>60)fail('invalid_class_name');
  const id=crypto.randomUUID(),joinCode=code();const result=await db.prepare('INSERT INTO learning_classes(id,teacher_id,name,code) SELECT ?,?,?,? WHERE (SELECT COUNT(*) FROM learning_classes WHERE teacher_id=?)<20').bind(id,userId,b.name.trim(),joinCode,userId).run();if(!result.meta.changes)fail('class_limit',409);return json({id,code:joinCode});
 }
 if(route==='join'&&method==='POST'){
  if(b.consent!==true||typeof b.number!=='string'||!/^\d{1,3}$/.test(b.number)||typeof b.code!=='string'||!/^[A-HJ-NP-Z2-9]{10}$/.test(b.code))fail('invalid_join');
  const today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Tokyo'}).format(new Date());dates(b.shareFrom,today);
  const cl=await db.prepare('SELECT id FROM learning_classes WHERE code=? AND accepting=1').bind(b.code).first();if(!cl)fail('code_unavailable',404);
  if(await db.prepare('SELECT user_id FROM learning_members WHERE class_id=? AND user_id=?').bind(cl.id,userId).first())return json({ok:true});
  const result=await db.prepare("INSERT INTO learning_members(class_id,user_id,number,share_from) SELECT ?,?,?,? WHERE (SELECT COUNT(*) FROM learning_members WHERE class_id=?)<100 AND (SELECT COUNT(*) FROM learning_members WHERE user_id=?)<10 ON CONFLICT(class_id,user_id) DO NOTHING").bind(cl.id,userId,b.number,b.shareFrom,cl.id,userId).run();if(!result.meta.changes)fail('membership_limit',409);return json({ok:true});
 }
 const match=/^classes\/([a-zA-Z0-9-]+)\/(members|report|code|member|leave)$/.exec(route);if(!match)fail('not_found',404);const [,classId,action]=match;
 if(action==='leave'&&method==='POST'){await db.prepare('DELETE FROM learning_members WHERE class_id=? AND user_id=?').bind(classId,userId).run();return json({ok:true});}
 if(!teacher||!await db.prepare('SELECT id FROM learning_classes WHERE id=? AND teacher_id=?').bind(classId,userId).first())fail('forbidden',403);
 if(action==='members'&&method==='GET')return json({members:await rows(db.prepare('SELECT m.user_id,m.number,m.status,m.share_from,p.username FROM learning_members m LEFT JOIN user_profiles p ON p.user_id=m.user_id WHERE m.class_id=? ORDER BY CAST(m.number AS INTEGER)').bind(classId))});
 if(action==='member'&&method==='POST'){
  if(typeof b.userId!=='string'||!['approve','remove'].includes(b.action))fail('invalid_request');
  await db.prepare(b.action==='approve'?"UPDATE learning_members SET status='approved' WHERE class_id=? AND user_id=?":'DELETE FROM learning_members WHERE class_id=? AND user_id=?').bind(classId,b.userId).run();return json({ok:true});
 }
 if(action==='code'&&method==='POST'){
  if(!['rotate','stop','open'].includes(b.action))fail('invalid_request');
  if(b.action==='rotate')await db.prepare('UPDATE learning_classes SET code=?,accepting=1 WHERE id=?').bind(code(),classId).run();else await db.prepare('UPDATE learning_classes SET accepting=? WHERE id=?').bind(b.action==='open'?1:0,classId).run();return json({ok:true});
 }
 if(action==='report'&&method==='GET'){
  const {from,to}=dates(url.searchParams.get('from'),url.searchParams.get('to')),level=url.searchParams.get('level');if(!['1','2'].includes(level))fail('invalid_level');
  const data=await rows(db.prepare(reportSQL).bind('$.data.zensho_learning_log_v1_lv'+level,'$.data.zensho_learning_log_v1_lv'+level,from,to,classId));const students=new Map();
  for(const r of data){let student=students.get(r.user_id);if(!student){student={id:r.user_id,number:r.number,name:r.username||'名前未登録',syncedAt:r.updated_at,log:{}};students.set(r.user_id,student);}if(/^\d{4}-\d{2}-\d{2}$/.test(r.day)&&/^[a-zA-Z0-9_]+$/.test(r.category)&&!['__proto__','constructor','prototype'].includes(r.category)){const day=student.log[r.day]||={};const n=x=>Number.isFinite(x)?Math.max(0,x):0;day[r.category]={attempt:n(r.attempt),correct:n(r.correct),wrong:n(r.wrong),...(r.seconds===null?{}:{seconds:n(r.seconds)})};}}
  return json({students:[...students.values()],from,to,level});
 }
 fail('not_found',404);
 }catch(e){if(e.status)return json({error:e.message},e.status);throw e;}
}
