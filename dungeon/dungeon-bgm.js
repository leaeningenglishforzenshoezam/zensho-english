/* Reuse Quest exploration and battle themes; keep the requested cue through transitions. */
(()=>{'use strict';
  const KEY='goimon_dungeon_bgm_v1';
  const files={
    map:'audio/quest/goimon_storybackground1.mp3',
    normal:'audio/quest/goimon_battle_normal.mp3',
    elite:'audio/quest/goimon_vs_blackfog.mp3',
    boss:'audio/quest/goimon_vs_boss1.mp3'
  };
  let setting;
  try{setting=JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){}
  let enabled=setting?.enabled!==false;
  let volume=Number.isFinite(setting?.volume)?Math.min(1,Math.max(0,setting.volume)):.25;
  let mode='silent',active='',waiting=false,fade=1,transition=0;
  const player=new Audio();player.loop=true;player.preload='none';
  function save(){try{localStorage.setItem(KEY,JSON.stringify({enabled,volume}));}catch(e){}}
  function labels(){
    const button=document.getElementById('bgmToggle'),slider=document.getElementById('bgmVolume'),value=document.getElementById('bgmVolumeValue');
    if(button){button.textContent=enabled?'♪ BGM ON':'♪ BGM OFF';button.setAttribute('aria-pressed',String(enabled));}
    if(slider)slider.value=String(Math.round(volume*100));
    if(value)value.textContent=`${Math.round(volume*100)}%`;
  }
  function ducked(){return ['questionModal','reviewModal','storyOverlay'].some(id=>{const node=document.getElementById(id);return node&&!node.hidden;});}
  function updateVolume(){player.volume=volume*fade*(ducked()?.24:1);}
  function play(){if(!enabled||!active||document.hidden)return;updateVolume();player.play().then(()=>{waiting=false;}).catch(err=>{waiting=err?.name==='NotAllowedError';});}
  function swapSource(src){
    player.pause();active=src;
    if(src){player.src=src;player.load();}else player.removeAttribute('src');
    if(src&&enabled)play();
  }
  function fadeTo(target,duration,done){
    const current=++transition,begin=fade;
    if(typeof requestAnimationFrame!=='function'){fade=target;updateVolume();done?.();return;}
    const start=performance.now();
    const frame=now=>{
      if(current!==transition)return;
      const progress=Math.min(1,Math.max(0,(now-start)/duration));
      fade=begin+(target-begin)*progress;updateVolume();
      if(progress<1)requestAnimationFrame(frame);else done?.();
    };
    requestAnimationFrame(frame);
  }
  function sync(){
    const src=files[mode]||'';
    ++transition; // Cancel any in-progress fade when the destination changes.
    if(src!==active){
      if(active&&enabled&&!player.paused&&!document.hidden){
        fadeTo(0,180,()=>{
          swapSource(src);
          if(src&&enabled){fade=0;updateVolume();fadeTo(1,320);}else{fade=1;updateVolume();}
        });
      }else{fade=1;swapSource(src);}
    }else{
      fade=1;
      if(src&&enabled)play();else player.pause();
    }
    updateVolume();labels();
  }
  window.GoimonDungeonBgm={
    setMode(next){mode=Object.hasOwn(files,next)?next:'silent';sync();},
    toggle(){enabled=!enabled;save();sync();},
    setVolume(next){volume=Math.min(1,Math.max(0,Number(next)||0));save();updateVolume();labels();},
    isEnabled(){return enabled;}
  };
  // A first interaction unlocks audio on iOS; every later interaction may resume it
  // after interruptions without asking the player to toggle BGM OFF/ON.
  function resumeOnGesture(){if(enabled&&active&&(waiting||player.paused))play();}
  document.addEventListener('pointerdown',resumeOnGesture,{passive:true});
  document.addEventListener('touchstart',resumeOnGesture,{passive:true});
  document.addEventListener('click',resumeOnGesture,{passive:true});
  document.addEventListener('keydown',resumeOnGesture,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){++transition;fade=1;player.pause();}else sync();});
  window.addEventListener('pagehide',()=>player.pause());
  document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('bgmToggle')?.addEventListener('click',()=>window.GoimonDungeonBgm.toggle());
    document.getElementById('bgmVolume')?.addEventListener('input',e=>window.GoimonDungeonBgm.setVolume(e.target.value/100));
    for(const id of ['questionModal','reviewModal','storyOverlay']){
      const node=document.getElementById(id);
      if(node)new MutationObserver(updateVolume).observe(node,{attributes:true,attributeFilter:['hidden']});
    }
    labels();
  });
})();
