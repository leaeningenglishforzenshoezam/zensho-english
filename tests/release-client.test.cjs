const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('Player pages have local assets and no preview or developer menu links',()=>{
 for(const page of ['index.html','cloud.html','quest_home.html','quest_chapter1.html','quest_chapter2.html','quest_records.html','quest_loadout.html','gacha.html','missions.html','learning-records.html','assignments.html']){
 const html=read(page);assert(!html.includes('player-preview-note'),page);
 for(const m of html.matchAll(/(?:src|href)=["']([^"'#?]+)["']/g)){const file=m[1];if(/^(https?:|mailto:|data:)/.test(file)||file.includes('${'))continue;assert(fs.existsSync(path.join(root,file)),page+' -> '+file);}}
 assert(!read('quest_home.html').includes('quest_developer.html'));
});
test('All supplied Chapter 1 and gacha assets and five BGM tracks are packaged',()=>{
 const images=['altar','ancient_memory','black_mist','black_mist_going_anywhere','chapter1_map','forest_battle','forest_entrance','forest_exit','morii_normal','morii_serious','morii_smile','morii_surprised','rockfall_after','rockfall_before','rockfall_falling','stele_awakened','stele_sealed','stone_gate','unknown_presence',...Array.from({length:5},(_,i)=>'enemy_0'+(i+1))];
 for(const name of images)assert(fs.statSync(path.join(root,'images/quest/chapter1/'+name+'.png')).size>1000,name);
 for(const name of ['skill-machine','gear-machine','star'])assert(fs.statSync(path.join(root,'images/gacha/'+name+'.png')).size>1000);
 for(const name of ['menu_theme','storybackground1','battle_normal','vs_blackfog','vs_boss1'])assert(fs.statSync(path.join(root,'audio/quest/goimon_'+name+'.mp3')).size>1000);
});
test('Q7 counts only new grading, not redraws',()=>{
 const s=read('q7_page.js');assert.equal((s.match(/addCounts\("q7"/g)||[]).length,1);assert(s.indexOf('addCounts("q7"')>s.indexOf('function grade()'));assert.match(s,/if \(!current \|\| state.graded\) return/);
});
test('HTTP preview initializes journal IDs without randomUUID',()=>{
 const map=new Map(),c={crypto:{getRandomValues:require('node:crypto').webcrypto.getRandomValues.bind(require('node:crypto').webcrypto)},localStorage:{getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)},addEventListener(){},dispatchEvent(){},Event};c.window=c;vm.runInNewContext(read('cloud_storage.js'),c);assert(c.GOIMONStorage);assert.equal(c.GOIMONProfiles.currentAccount(),null);
});
