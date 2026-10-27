'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function globals(relative){
 const box={};box.globalThis=box;
 vm.runInNewContext(fs.readFileSync(path.join(root,relative),'utf8'),box,{filename:relative});
 return box;
}
const script=globals('battle-prototype/chapter2_assets.js').GoimonChapter2Assets;
const portraits=globals('battle-prototype/chapter2_portraits.js').GoimonChapter2Portraits;
const data=require('../battle-prototype/chapter2_data.js');
test('Chapter 2 contains 23 scenes and 9 battles',()=>{
 assert.equal(data.scenes.length,23);
 assert.equal(data.battles.length,9);
});
test('38 unique chapter-specific asset paths, road aliases hills',()=>{
 const files=Object.values(script.map).flatMap(group=>Object.values(group));
 assert.equal(files.length,39); // hills + road alias refer to the same PNG
 assert.equal(new Set(files).size,38);
 assert.equal(script.path('backgrounds','road'),script.path('backgrounds','hills'));
 for(const p of files)assert.match(p,/\.(png|webp)$/);
});
test('every scene background and battle sprite resolves',()=>{
 for(const scene of data.scenes){
  assert.ok(script.path('backgrounds',scene.background),scene.id+' background');
  if(scene.battleId)assert.ok(script.path('enemies',scene.battleId),scene.id+' enemy');
 }
});
test('portrait cue IDs match scenario speaker and existing art names',()=>{
 const lines=new Map(data.scenes.flatMap(s=>s.lines.map(line=>[line.id,line])));
 for(const [id,portrait] of Object.entries(portraits.cues)){
  assert.ok(lines.has(id),'Unknown dialogue cue '+id);
  const line=lines.get(id);
  const expected=line.speaker==='サーヤ'?'saya_':line.speaker==='トヨヨ'?'toyoyo_':null;
  assert.ok(expected&&portrait.startsWith(expected),'Incorrect portrait for '+id);
  assert.ok(script.path('characters',portrait),'Unknown image for '+id);
 }
});
test('Chapter 2 boss rescue is staged across scenes 19 and 20',()=>{
 assert.equal(data.scenes[18].id,'ch2.19');
 assert.equal(data.scenes[19].id,'ch2.20');
 assert.equal(data.scenes[18].battleId,9);
 assert.ok(script.path('events','captives'));
});
