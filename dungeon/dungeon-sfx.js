/* GOIMON DUNGEON — original, locally generated game sounds.
 * Unlike the BGM, these are short one-shots triggered only by user/game events.
 */
(()=>{'use strict';
  const KEY='goimon_dungeon_sfx_v1';
  const names=['tap','select','confirm','correct','wrong','attack','hurt','guard','heal','victory','defeat','artifact','journal'];
  const levels={tap:.28,select:.50,confirm:.58,correct:.54,wrong:.38,attack:.72,hurt:.58,guard:.58,heal:.52,victory:.68,defeat:.55,artifact:.59,journal:.48};
  const priorities={tap:0,select:1,confirm:2,correct:3,wrong:3,attack:4,hurt:4,guard:4,heal:4,artifact:5,journal:5,victory:7,defeat:7};
  let pref;
  try{pref=JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){}
  let enabled=pref?.enabled!==false;
  let volume=Number.isFinite(pref?.volume)?Math.max(0,Math.min(1,pref.volume)):.55;
  const sounds={};
  for(const name of names){const audio=new Audio(`audio/sfx/${name}.wav`);audio.preload='auto';sounds[name]=audio;}
  let lastAt=-Infinity,lastPriority=-1,lastName='';
  function save(){try{localStorage.setItem(KEY,JSON.stringify({enabled,volume}));}catch(e){}}
  function labels(){
    const toggle=document.getElementById('sfxToggle');
    const slider=document.getElementById('sfxVolume');
    const value=document.getElementById('sfxVolumeValue');
    if(toggle){toggle.textContent=enabled?'♬ SE ON':'♬ SE OFF';toggle.setAttribute('aria-pressed',String(enabled));}
    if(slider)slider.value=String(Math.round(volume*100));
    if(value)value.textContent=`${Math.round(volume*100)}%`;
  }
  function play(name){
    if(!enabled||!sounds[name]||document.hidden)return;
    const now=performance.now(),priority=priorities[name]||0;
    if(now-lastAt<95&&(priority<=lastPriority||name===lastName))return;
    if(now-lastAt<160&&name==='tap')return;
    lastAt=now;lastPriority=priority;lastName=name;
    const audio=sounds[name];
    audio.pause();
    try{audio.currentTime=0;}catch(e){}
    audio.volume=volume*(levels[name]||.5);
    const result=audio.play();if(result?.catch)result.catch(()=>{});
  }
  window.GoimonDungeonSfx={play,
    toggle(){enabled=!enabled;save();labels();},
    setVolume(next){volume=Math.min(1,Math.max(0,Number(next)||0));save();labels();},
    isEnabled(){return enabled;}
  };
  // A very soft interaction sound for buttons that have no stronger contextual cue.
  // Gameplay sounds play in button handlers; this event runs afterwards and yields.
  document.addEventListener('click',e=>{
    const button=e.target?.closest?.('button');
    if(button&&!button.disabled&&button.id!=='bgmToggle')play('tap');
  },{passive:true});
  document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('sfxToggle')?.addEventListener('click',()=>window.GoimonDungeonSfx.toggle());
    document.getElementById('sfxVolume')?.addEventListener('input',e=>window.GoimonDungeonSfx.setVolume(e.target.value/100));
    labels();
  });
})();
