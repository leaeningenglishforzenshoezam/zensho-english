import test from 'node:test';
import assert from 'node:assert/strict';
import {validateSnapshot,isAllowedKey} from '../src/validation.js';
test('GOIMON と学習データは保存対象',()=>{
  for (const key of ['zensho_goimon_current_v4_lv1','zensho_learning_log_v1_lv2','q7SetHistory_v1','q10QuestionHistory_v1'])
    assert.equal(isAllowedKey(key),true);
});
test('一時データと未知のキーは拒否',()=>{
  for(const key of ['q7Sessions_v1','zensho_level_v1','bad_token','goimon_auth_secret'])
    assert.equal(isAllowedKey(key),false);
});
test('文字列valueに限定',()=>{
  assert.throws(()=>validateSnapshot({schemaVersion:1,data:{q7SetHistory_v1:{a:1}}}),/invalid_save_key_or_value/);
  assert.doesNotThrow(()=>validateSnapshot({schemaVersion:1,data:{q7SetHistory_v1:'{}'}}));
});
test('巨大データを拒否',()=>{
  assert.throws(()=>validateSnapshot({schemaVersion:1,data:{q7SetHistory_v1:'x'.repeat(190000)}}));
});
