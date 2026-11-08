import test from 'node:test';import assert from 'node:assert/strict';
import {startHarness} from '../dev/server.js';
test('Isolated D1 over local HTTP: learning backups, exactly-once replay, CAS conflict and rollback',async()=>{
 const h=await startHarness();try{const db=h.db,user='local-test';
 const preserved={schemaVersion:1,data:{zensho_goimon_current_v4_lv1:'{"id":"keep","stats":{"chie":17}}',zensho_quiz_manual_weak_enja_v1_lv1:'{"absence":true}'}};
 await db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind(user,JSON.stringify(preserved)).run();
 const call=(path,body)=>fetch(h.origin+'/api/v1/'+path,{method:body?'POST':'GET',headers:{Origin:h.origin,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
 const request=async(path,body)=>{const r=await call(path,body),data=await r.json();assert.equal(r.status,200,JSON.stringify(data));return data;};
 async function scored(mode){const a=await request('missions/words/start',{level:'1',mode});assert.equal((await call('missions/review',{attemptId:a.attemptId})).status,400);const p=JSON.parse((await db.prepare('SELECT private_json FROM mission_attempts WHERE attempt_id=?').bind(a.attemptId).first()).private_json);await request('missions/words/submit',{attemptId:a.attemptId,answers:p.questions.map(q=>q.answer)});return a;}
 const a=await scored('enja');const body={attemptId:a.attemptId,expectedRevision:1};
 const repeated=await Promise.all([request('missions/learning/apply',body),request('missions/learning/apply',body)]);assert.equal(repeated.filter(r=>!r.replayed).length,1);
 assert.deepEqual(JSON.parse((await db.prepare('SELECT save_json FROM save_revisions WHERE user_id=? AND revision=1').bind(user).first()).save_json),preserved);
 const b=await scored('jaen'),c=await scored('audio');const results=await Promise.all([call('missions/learning/apply',{attemptId:b.attemptId,expectedRevision:2}),call('missions/learning/apply',{attemptId:c.attemptId,expectedRevision:2})]);assert.deepEqual(results.map(r=>r.status).sort(),[200,409]);
 const pending=results[0].status===409?b:c,before=await request('missions/learning');
 await db.prepare("CREATE TRIGGER test_learning_failure BEFORE UPDATE ON saves BEGIN SELECT RAISE(ABORT,'test_failure'); END").run();
 assert.equal((await call('missions/learning/apply',{attemptId:pending.attemptId,expectedRevision:3})).status,500);assert.deepEqual(await request('missions/learning'),before);
 assert.equal(await db.prepare('SELECT * FROM mission_learning_receipts WHERE attempt_id=?').bind(pending.attemptId).first(),null);
 await db.prepare('DROP TRIGGER test_learning_failure').run();await request('missions/learning/apply',{attemptId:pending.attemptId,expectedRevision:3});
 const saved=await request('missions/learning');assert.equal(saved.revision,4);for(const [key,value]of Object.entries(preserved.data))assert.equal(saved.snapshot.data[key],value);
 const categories=Object.values(JSON.parse(saved.snapshot.data.zensho_learning_log_v1_lv1))[0];for(const category of ['quiz_enja','quiz_jaen','audio_quiz'])assert.deepEqual(categories[category],{attempt:20,correct:20,wrong:0});
 assert.equal((await request('missions/review',{attemptId:a.attemptId})).questions.length,20);assert.equal((await request('economy')).state.shards,0);
 }finally{await h.close();}
});
