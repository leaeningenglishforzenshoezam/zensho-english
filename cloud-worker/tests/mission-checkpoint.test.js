import test from 'node:test';
import assert from 'node:assert/strict';
import {createOfflineDb} from './offline-db.js';
import {createSession} from '../src/session.js';
import release from '../src/mission_release.js';
import {MissionFlow} from '../../daily-missions/mission_flow.mjs';
import {createMissionCheckpoint} from '../../daily-missions/mission_checkpoint.mjs';
const store=()=>{const map=new Map();return {map,getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)};};

for(const level of ['1','2'])test('grade '+level+' reload after lost submit/learning/growth/reward replies never duplicates records',async()=>{
 for(const lost of ['missions/words/submit','missions/learning/apply','missions/growth/apply','missions/words/claim']){
  const h=await createOfflineDb();try{
   const user='local-test',session=await createSession(h.db,user),origin='https://test.local',limit={limit:async()=>({success:true})};
   const pet={id:'pet-'+level,type:'nagomi',stage:'egg',stats:{chie:0,kotoba:0,onkan:0,bunmyaku:0},totalPoints:0,level:1};
   await h.db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind(user,JSON.stringify({schemaVersion:1,data:{['zensho_goimon_current_v4_lv'+level]:JSON.stringify(pet)}})).run();
   let drop=lost;const sent=[];
   const request=async(path,body)=>{
    sent.push({path,body:structuredClone(body)});
    const r=await release.fetch(new Request(origin+'/api/v1/'+path,{method:body?'POST':'GET',headers:{Origin:origin,Authorization:'Bearer '+session.token,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})}),{DB:h.db,ALLOWED_ORIGIN:origin,MISSION_RELEASE_ENABLED:'true',RATE_LIMITER:limit,AUTH_RATE_LIMITER:limit});
    const value=await r.json();if(!r.ok)throw Object.assign(Error(value.error),{status:r.status});if(path===drop){drop=null;throw Error('lost_reply');}return value;
   };
   const storage=store(),client={request,prepare:async()=>{},finish:async()=>{}};
   const checkpoint=()=>createMissionCheckpoint({storage,account:user,apiBase:origin,activeAccount:()=>user,isWriter:()=>true});
   const first=new MissionFlow(client,checkpoint()),a=await first.start('words',{level,mode:'enja'});
   const row=await h.db.prepare('SELECT private_json FROM mission_attempts WHERE attempt_id=?').bind(a.attemptId).first();
   const answers=JSON.parse(row.private_json).questions.map(q=>q.answer);first.saveAnswers(answers);
   assert.deepEqual(new MissionFlow(client,checkpoint()).answers,answers);
   await assert.rejects(first.finish(answers),/lost_reply/);
   const resumed=new MissionFlow(client,checkpoint());assert(resumed.pending);await assert.rejects(resumed.start('words',{level,mode:'enja'}),/finish_retry_required/);
   const result=await resumed.finish(Array(20).fill(99));assert.equal(result.balance,3);
   const save=await request('missions/learning'),log=JSON.parse(save.snapshot.data['zensho_learning_log_v1_lv'+level]);
   assert.equal(Object.values(log)[0].quiz_enja.attempt,20);assert.equal(JSON.parse(save.snapshot.data['zensho_goimon_current_v4_lv'+level]).totalPoints,20);
   const before=sent.length,finished=new MissionFlow(client,checkpoint());assert.deepEqual(await finished.finish([]),result);assert.equal(sent.length,before);
   const retries=sent.filter(x=>x.path===lost);assert.equal(retries.length,2);assert.deepEqual(retries[0],retries[1]);
  }finally{h.close();}
 }
});

test('checkpoint quota, changed account, stale tab and corruption block requests without deleting saved evidence',async()=>{
 const storage=store();let account='a',writer=true,calls=0;
 const options={storage,account:'a',apiBase:'https://test.local',activeAccount:()=>account,isWriter:()=>writer};
 const client={request:async()=>{calls++;},prepare:async()=>{calls++;}};
 const a=new MissionFlow(client,createMissionCheckpoint(options)),b=new MissionFlow(client,createMissionCheckpoint(options));a.save();
 await assert.rejects(b.start('words',{level:'1'}),/checkpoint_conflict/);assert.equal(calls,0);
 account='b';await assert.rejects(a.start('words',{level:'1'}),/account_changed/);assert.equal(calls,0);account='a';
 const initial=[...storage.map.entries()];storage.setItem=()=>{};
 a.answers=[1];assert.throws(()=>a.save(),/checkpoint_failed/);assert.deepEqual([...storage.map.entries()],initial);
 storage.map.set(initial[0][0],'broken');assert.throws(()=>new MissionFlow(client,createMissionCheckpoint(options)),/checkpoint_invalid/);assert.equal(storage.getItem(initial[0][0]),'broken');
 writer=false;assert.throws(()=>createMissionCheckpoint(options).read(),/account_changed/);
});
