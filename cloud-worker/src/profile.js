const json=(x,status=200)=>new Response(JSON.stringify(x),{status,headers:{'content-type':'application/json','cache-control':'no-store'}});
export function validateProfile(p){
 if(!p || typeof p!=='object' || Array.isArray(p) || Object.keys(p).some(k=>!['username','role','grade','examLevel'].includes(k)))throw Error('invalid_profile');
 if(typeof p.username!=='string')throw Error('invalid_username');
 const username=p.username.trim().normalize('NFC');
 if([...username].length<1 || [...username].length>24 || /[\p{Cc}\p{Cf}<>]/u.test(username))throw Error('invalid_username');
 if(!['student','teacher'].includes(p.role))throw Error('invalid_role');
 if(p.role==='student' && (!['1','2','3','other'].includes(p.grade)||!['1','2','3','undecided'].includes(p.examLevel)))throw Error('invalid_student_fields');
 return {username,role:p.role,grade:p.role==='student'?p.grade:null,examLevel:p.role==='student'?p.examLevel:null};
}
export async function readProfile(db,userId){
 const row=await db.prepare('SELECT revision,username,role,grade,exam_level FROM user_profiles WHERE user_id=?').bind(userId).first();
 return row?{revision:row.revision,profile:{username:row.username,role:row.role,grade:row.grade,examLevel:row.exam_level}}:{revision:0,profile:null};
}
export async function handleProfile(request,db,userId){
 if(request.method==='GET')return json({userId,...await readProfile(db,userId)});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return json({error:'json_required'},415);
 const reader=request.body?.getReader();if(!reader)return json({error:'invalid_json'},400);
 const parts=[];let size=0;
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>4096){await reader.cancel();return json({error:'request_too_large'},413);}parts.push(value);}
 const bytes=new Uint8Array(size);let offset=0;for(const p of parts){bytes.set(p,offset);offset+=p.length;}
 let body,p;try{body=JSON.parse(new TextDecoder().decode(bytes));p=validateProfile(body.profile);}catch{return json({error:'invalid_profile'},400);}
 if(!Number.isSafeInteger(body.expectedRevision)||body.expectedRevision<0)return json({error:'invalid_revision'},400);
 const args=[p.username,p.role,p.grade,p.examLevel];
 const result=body.expectedRevision===0
  ?await db.prepare('INSERT INTO user_profiles(user_id,revision,username,role,grade,exam_level) VALUES (?,1,?,?,?,?) ON CONFLICT(user_id) DO NOTHING').bind(userId,...args).run()
  :await db.prepare("UPDATE user_profiles SET username=?,role=?,grade=?,exam_level=?,revision=revision+1,updated_at=datetime('now') WHERE user_id=? AND revision=?").bind(...args,userId,body.expectedRevision).run();
 if(!result.meta.changes)return json({error:'profile_conflict'},409);
 return json({userId,revision:body.expectedRevision+1,profile:p});
}
