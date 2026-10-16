import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';

test('dashboard renders six mission links and refreshes server save counts without local storage',async()=>{
 const node=()=>({children:[],style:{},attrs:{},append(...xs){this.children.push(...xs);},replaceChildren(...xs){this.children=xs;},before(){},setAttribute(k,v){this.attrs[k]=v;}});
 const ids=Object.fromEntries(['cards','accountStatus','level','meta','refresh','dailyProgress','dailyProgressFill'].map(id=>[id,node()]));
 ids.cards.parentElement=node();const body=node(),events={};let fail=false;
 const missions=['words','idioms','exam','listening','reading','reorder'].map(slot=>({slot,title:slot,goal:'goal',completed:slot==='words',submitted:1,learningSaved:1,growthSaved:0}));
 const context={document:{getElementById:id=>ids[id],querySelector:()=>node(),createElement:node,body},window:{addEventListener:(event,fn)=>events[event]=fn},fetch:async path=>{assert.equal(path,'/api/v1/missions/status');return {ok:!fail,json:async()=>({date:'2026-10-14',missions})};}};
 vm.runInNewContext(await readFile(new URL('../dev/mission-dashboard.js',import.meta.url),'utf8'),context);
 await events.pageshow();assert.equal(ids.cards.children.length,6);assert.equal(ids.dailyProgress.attrs['aria-valuenow'],'1');
 assert.equal(ids.cards.children[0].children[2].textContent,'達成済み / 採点 1件 / 学習保存 1件 / 育成反映 0件');
 const links=ids.cards.children.flatMap(card=>card.children.filter(n=>n.href).map(n=>n.href));
 assert.equal(links.length,10);assert.ok(links.includes('/quiz_jaen.html'));assert.ok(links.includes('/?mission=reading'));
 missions[0].growthSaved=1;await ids.refresh.onclick();assert.ok(ids.cards.children[0].children[2].textContent.endsWith('育成反映 1件'));
 fail=true;await ids.refresh.onclick();assert.match(ids.meta.textContent,/再取得/);assert.equal(ids.refresh.disabled,false);
});
