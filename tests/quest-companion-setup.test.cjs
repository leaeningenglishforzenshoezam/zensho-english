const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');
class Node{
 constructor(tag){this.tagName=tag;this.children=[];this.className='';this.textContent='';this.attributes={};this.src='';this.alt='';this.value='';}
 setAttribute(name,value){this.attributes[name]=value;}
 addEventListener(){}
 append(...nodes){this.children.push(...nodes);}
}
function fixture(){
 const ctx={document:{createElement:t=>new Node(t)}};ctx.window=ctx;
 vm.runInNewContext(fs.readFileSync(path.join(root,'battle-prototype/quest-partner-preview.js'),'utf8'),ctx);
 const parent=new Node('section'),select=new Node('select'),pets=[{id:'1',type:'nagomi',stage:'child',nickname:'まる'},{id:'2',type:'hirameki',stage:'growth'}];
 const dex={getEntry:(type,stage)=>({image:'images/goimon/'+type+'_'+stage+'.png',name:type==='nagomi'?'ナゴミ':'ヒラメキ'})};
 const names={partnerName:(pet,d)=>pet.nickname||d.getEntry(pet.type,pet.stage).name};
 select.value='1';
 const ui=ctx.GoimonQuestPartnerPreview.mount(parent,select,pets,dex,names);
 return {ui,select,parent,pets};
}
test('portrait updates with selected nickname, evolution stage and official species image',()=>{
 const f=fixture(),preview=f.ui.panel,img=preview.children[0],meta=preview.children[1];
 assert.equal(img.src,'images/goimon/nagomi_child.png');
 assert.equal(img.alt,'まるの姿');
 assert.equal(meta.children[0].textContent,'まる');
 assert.equal(meta.children[1].textContent,'幼体');
 f.select.value='2';f.ui.refresh();
 assert.equal(img.src,'images/goimon/hirameki_growth.png');
 assert.equal(meta.children[0].textContent,'ヒラメキ');
 assert.equal(meta.children[1].textContent,'成長体');
});
test('both chapter pages load the portrait component and CSS before quest scripts',()=>{
 for(const n of [1,2]){
  const html=fs.readFileSync(path.join(root,'quest_chapter'+n+'.html'),'utf8');
  assert(html.includes('battle-prototype/quest-partner-preview.js'));
  assert(html.includes('battle-prototype/quest-partner-preview.css'));
  assert(html.indexOf('quest-partner-preview.js')<html.indexOf('battle-prototype/chapter'+n+'.js'));
 }
});
test('chapter 2 renders four independent SKILL slots and an equipment slot; selection is launch-only',()=>{
 const js=fs.readFileSync(path.join(root,'battle-prototype/chapter2.js'),'utf8');
 assert(js.includes('for(let i=0;i<4;i++)'));
 assert(js.includes("field.id='chapter2Skill'+i"));
 assert(js.includes("gearSelect.id='chapter2Gear'"));
 assert(js.includes("skillSelectors.map(field=>field.value)"));
 assert(js.includes("gear=gearSelect.value"));
 assert(js.includes("new Set(ids).size!==ids.length"));
 assert(js.includes("GoimonQuestPartnerPreview.mount(overview,select,list,GoimonDex,N)"));
 assert(!js.includes('GoimonItemStore.create('));
});
test('chapter 1 reflects selection changes in companion preview',()=>{
 const js=fs.readFileSync(path.join(root,'battle-prototype/chapter1.js'),'utf8');
 assert(js.includes('GoimonQuestPartnerPreview.mount(overview,select,list,GoimonDex,N)'));
 assert(js.includes('select.onchange=()=>{registered();companion.refresh();}'));
});

test('both setup screens use responsive 2x2 skill grid, visible first aid and collapsible help',()=>{
 const css=fs.readFileSync(path.join(root,'battle-prototype/quest-partner-preview.css'),'utf8');
 assert(css.includes('.quest-setup-overview'));
 assert(css.includes('.quest-skill-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))'));
 assert(css.includes('@media(max-width:640px)'));
 for(const chapter of [1,2]){
  const js=fs.readFileSync(path.join(root,'battle-prototype/chapter'+chapter+'.js'),'utf8');
  assert(js.includes('quest-setup-overview'));
  assert(js.includes('quest-setup-loadout'));
  assert(js.includes('quest-skill-grid'));
  assert(js.includes('quest-setup-perk'));
  assert(js.includes('quest-setup-help'));
  assert(js.includes('参加条件・戦闘ルールを見る'));
  assert(js.includes('quest-setup-submit'));
 }
});
