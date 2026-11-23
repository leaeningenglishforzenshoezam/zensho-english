/* GOIMON Roguelike - independent three-ACT prototype. Saves only to this browser. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const playSfx = name => window.GoimonDungeonSfx?.play(name);
  const START_HP = 90;
  const MAX_HAND = 9;
  let selectedHandIndex = -1;
  let upgradeSelectionIndex = null;
  let rewardSelection = null;
  const SAVE_KEY='goimon_rogue_dungeon01_act_checkpoint_v1';
  const RUN_SAVE_KEY='goimon_rogue_dungeon01_run_v2';
  const BADGE_SAVE_KEY='goimon_rogue_badges_v1';
  const RUN_STATS_KEY='goimon_dungeon_records_v1';
  const BESTIARY_KEY='goimon_dungeon_bestiary_v1';
  const SETUP_KEY='goimon_dungeon_departure_v1';
  const INTRO_STORY_KEY='goimon_dungeon01_prologue_seen_v1';
  const RETURN_STORY_KEY='goimon_dungeon01_return_after_clear_seen_v1';
  const JOURNAL_SEEN_KEY='goimon_dungeon_journal_seen_v1';
  const DEPARTMENT_ART='images/dungeons/night-department-';
  // `art` is the destination thumbnail; `departureArt` is the departure scene.
  const DUNGEONS={
    1:{title:'真夜中の百貨店',lead:'英語 → 日本語',art:DEPARTMENT_ART+'exterior.jpg',departureArt:DEPARTMENT_ART+'entrance.jpg',battleArt:[DEPARTMENT_ART+'act1.jpg',DEPARTMENT_ART+'act2.jpg',DEPARTMENT_ART+'act3.jpg'],clearVaultArt:DEPARTMENT_ART+'vault-open.jpg',dawnArt:DEPARTMENT_ART+'dawn.jpg'},
    2:{title:'こだまの迷宮',lead:'日本語 → 英語・音声',art:''}
  };
  const DUNGEON_PAGE_SIZE=4;
  let dungeonMapPage=0;
  function readJson(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'null')||fallback;}catch(e){return fallback;}}
  function storeJson(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(e){}}
  const runStats=readJson(RUN_STATS_KEY,{});
  const journalSeen=new Set(readJson(JOURNAL_SEEN_KEY,[]));
  const LEGACY_ENEMY_NAMES={'IF分岐狐':'イフキツネ','VLOOKUP天狗':'ルックアップテング','SUMカッパ':'サムガッパ','RANDBETWEENクイーン':'ランビトクイーン'};
  const savedBestiary=readJson(BESTIARY_KEY,[]);
  const seenEnemyKinds=new Set((Array.isArray(savedBestiary)?savedBestiary:[]).map(name=>LEGACY_ENEMY_NAMES[name]||name));
  const savedSetup=readJson(SETUP_KEY,{});
  function statsFor(dungeon){return runStats[dungeon]||{attempts:0,clears:0,bestDepth:0};}
  function renderRunStats(){const s=statsFor(state.dungeon);$('dungeonAttempts').textContent=s.attempts||0;$('dungeonClears').textContent=s.clears||0;const p=s.bestDepth||0;$('dungeonBest').textContent=p?`ACT ${Math.ceil(p/9)} · ${((p-1)%9)+1}/9`:'―';renderJournalSummary();}
  function recordRun(event){const d=state.dungeon,s={...statsFor(d)};if(event==='start')s.attempts=(s.attempts||0)+1;if(event==='boss2')s.act2Bosses=(s.act2Bosses||0)+1;if(event==='clear'){s.clears=(s.clears||0)+1;s.clearedCompanions=[...new Set([...(s.clearedCompanions||[]),state.companionId])];}if(event==='depth')s.bestDepth=Math.max(s.bestDepth||0,(state.act-1)*9+state.stage+1);runStats[d]=s;storeJson(RUN_STATS_KEY,runStats);renderRunStats();}
  const BADGES=[
    {id:'firstWin',group:'common',icon:'⚔',name:'はじめの一勝',description:'初めて敵に勝つ'},
    {id:'perfectFight',group:'common',icon:'✦',name:'ノーミス勝利',description:'1戦闘を全問正解で勝つ'},
    {id:'correct20',group:'common',icon:'📖',name:'ことばの探究者',description:'累計20問正解する',target:20},
    {id:'correct100',group:'common',icon:'⭐',name:'百問の達人',description:'累計100問正解する',target:100},
    {id:'correct500',group:'common',icon:'✧',name:'五百問の賢者',description:'累計500問正解する',target:500},
    {id:'correct1000',group:'common',icon:'✺',name:'千問の伝説',description:'累計1000問正解する',target:1000},
    {id:'actBoss',group:'common',icon:'♛',name:'番人を突破',description:'ACTのボスを倒す'},
    {id:'collector',group:'tactics',icon:'◇',name:'秘宝収集家',description:'1回の冒険でARTIFACTを10個獲得する'},
    {id:'stage1Boss',group:'stage1',icon:'🛡',name:'夜の番人',description:'真夜中の百貨店でACTのボスに勝つ'},
    {id:'stage1Perfect',group:'stage1',icon:'☀',name:'深夜の優等生',description:'真夜中の百貨店でノーミス勝利'},
    {id:'firstClear',group:'stage1',icon:'🏆',name:'夜明けの踏破者',description:'真夜中の百貨店を完全クリアする'},
    {id:'stage2Win',group:'stage2',icon:'🎧',name:'音の一歩',description:'第2ステージで初勝利'},
    {id:'stage2Perfect',group:'stage2',icon:'♫',name:'響きの達人',description:'第2ステージでノーミス勝利'},
    {id:'stage2Boss',group:'stage2',icon:'♜',name:'こだまの番人',description:'第2ステージでACTのボスに勝つ'},
    {id:'secondClear',group:'stage2',icon:'🔔',name:'こだまの踏破者',description:'第2ステージを完全クリアする'},
    {id:'burst30',group:'tactics',icon:'ϟ',name:'一撃の連携',description:'1ターンに合計50ダメージを与える'},
    {id:'guard15',group:'tactics',icon:'⬡',name:'鉄壁の守り',description:'1ターンに防御を30以上獲得する'},
    {id:'clutchWin',group:'tactics',icon:'♡',name:'逆境からの勝利',description:'HP10以下の状態で戦闘に勝つ'}
  ];
  function readBadges(){try{const raw=JSON.parse(localStorage.getItem(BADGE_SAVE_KEY)||'null');return {earned:Array.isArray(raw?.earned)?raw.earned:[],shards:Number.isFinite(raw?.shards)?raw.shards:0,totalCorrect:Number.isFinite(raw?.totalCorrect)?raw.totalCorrect:0};}catch(e){return {earned:[],shards:0,totalCorrect:0};}}
  const badgeProgress=readBadges();
  function writeBadges(){try{localStorage.setItem(BADGE_SAVE_KEY,JSON.stringify(badgeProgress));}catch(e){}renderBadgeSummary();}
  function awardBadge(id){if(!BADGES.some(b=>b.id===id)||badgeProgress.earned.includes(id))return;badgeProgress.earned.push(id);badgeProgress.shards+=5;writeBadges();}
  function recordCorrectAnswer(){badgeProgress.totalCorrect++;for(const b of BADGES)if(b.target&&badgeProgress.totalCorrect>=b.target)awardBadge(b.id);writeBadges();}
  const stage2Unlocked=()=>badgeProgress.earned.includes('firstClear');
  function renderBadgeSummary(){if(!$('badgeSummary'))return;$('badgeSummary').textContent=`${badgeProgress.earned.length} / ${BADGES.length}`;if($('badgeStarSummary'))$('badgeStarSummary').textContent=`✦ ${badgeProgress.shards}`;
    if($('helpBadges'))$('helpBadges').textContent=`獲得 ${badgeProgress.earned.length}/${BADGES.length}個 ・ 星のかけら ${badgeProgress.shards}個`;
    renderDungeonPicker();}
  const BADGE_GROUPS={common:'共通',stage1:'STAGE 01',stage2:'STAGE 02',tactics:'戦術'};
  let badgeFilter='all';
  function renderBadges(){
    $('badgeTotal').textContent=`${badgeProgress.earned.length} / ${BADGES.length} 達成 · 星のかけら ${badgeProgress.shards}`;
    $('badgeLifetime').textContent=`累計 ${badgeProgress.totalCorrect}問正解`;
    $('badgeFilters').querySelectorAll('[data-badge-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.badgeFilter===badgeFilter)));
    const groups=Object.entries(BADGE_GROUPS).filter(([group])=>badgeFilter==='all'||badgeFilter===group);
    $('badgeGrid').innerHTML=groups.map(([group,label])=>{
      const entries=BADGES.filter(b=>b.group===group),count=entries.filter(b=>badgeProgress.earned.includes(b.id)).length;
      const cards=entries.map(b=>{const got=badgeProgress.earned.includes(b.id);const progress=b.target?`<span class="badge-progress">${Math.min(badgeProgress.totalCorrect,b.target)} / ${b.target}</span>`:'';
        return `<div class="badge-item ${got?'earned':'locked'}"><span class="badge-icon">${b.icon}</span><div class="badge-copy"><strong>${escapeHtml(b.name)}</strong><small>${escapeHtml(b.description)}</small>${progress}</div><span class="badge-value">${got?'✓':'✦ 5'}</span></div>`;}).join('');
      return `<section class="badge-group"><div class="badge-group-head"><strong>${label}</strong><span>${count} / ${entries.length}</span></div><div class="badge-group-grid">${cards}</div></section>`;
    }).join('');
  }
  function showBadges(){renderBadges();$('badgeOverlay').hidden=false;}
  const banks=new Map();
  function questionBank(){
    const grade=state.examGrade;
    if(banks.has(grade))return banks.get(grade);
    const suffix=grade+'KYU';
    const words=(window['WORDS_'+suffix]||[]).filter(x=>x.en&&x.ja);
    const accentChoices=(window['ACCENT_'+suffix]||[]).filter(x=>{
      const count=x.sylRaw?.replace(/[ˈˌ]/g,'').split('-').filter(Boolean).length;
      return x.en&&count>=2&&x.stress>=1&&x.stress<=count;
    });
    const q9s=(window['SENTENCE_FIXED_'+suffix]||[]).filter(x=>x.en&&x.answer&&x.choices?.length===4&&new Set(x.choices).size===4);
    const paraphrases=grade===1?(window.PARAPHRASE_DATA_1KYU||[]).map(x=>({
      stem:x.a+'\n'+x.b,answer:x.answer,distractors:x.choices.filter(v=>v!==x.answer),
      ja:x.ja,explanation:x.pointNote, notes:Object.fromEntries(x.choices.map((v,i)=>[v,x.choiceJa[i]]))
    })):window.GOIMON_G2_Q11_SET1||[];
    const q11s=paraphrases.filter(x=>x.stem&&x.answer&&x.distractors?.length>=2);
    const q12s=(window['REORDER_'+suffix]||[]).filter(x=>typeof x.stemBefore==='string'&&typeof x.stemAfter==='string'&&x.chunks?.length===4&&x.answer?.length===4&&x.answer.every(id=>x.chunks.some(c=>c.id===id)));
    const wordNumber=new Map(words.map((w,i)=>[w.en.toLowerCase(),i+1]));
    const wordMeaning=new Map(words.map(w=>[w.en.toLowerCase(),w.ja]));
    const bank={words,accentChoices,q9s,q11s,q12s,wordNumber,wordMeaning};
    banks.set(grade,bank);
    return bank;
  }
  const inEncounter=(number)=>Number.isInteger(number)&&number>state.encounterWordRange[0]&&number<=state.encounterWordRange[1];
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const shuffled = (input) => {
    const a = [...input];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const skills = {
    Attack: { label:'通常攻撃',ap:1,format:'word',dmg:10,icon:'⚔',type:'attack',rank:'BASIC' },
    Guard: { label:'通常防御',ap:1,format:'word',block:5,icon:'⬡',type:'guard',rank:'BASIC' },
    FirstAid:{label:'First Aid',ap:1,format:'audio',heal:3,icon:'✚',type:'heal',rank:'N',plus:{heal:5}},
    Burst:{label:'Burst',ap:1,format:'word',dmg:15,icon:'✦',type:'attack',rank:'N',plus:{dmg:20}},
    Scream:{label:'Scream',ap:2,format:'accent',dmg:14,range:3,icon:'◈',type:'attack',rank:'R',plus:{dmg:19}},
    Encourage:{label:'Encourage',ap:2,format:'word',heal:13,block:5,icon:'☘',type:'heal',rank:'N',plus:{heal:19,block:7}},
    Remind:{label:'Remind',ap:1,format:'word',retrieve:1,icon:'↶',type:'tactic',rank:'N',plus:{block:5}},
    Aid:{label:'Aid',ap:1,format:'word',heal:7,icon:'✚',type:'heal',rank:'N',plus:{heal:10}},
    Pronounce:{label:'Pronounce',ap:1,format:'accent',dmg:10,block:3,icon:'✧',type:'attack',rank:'N',plus:{dmg:14,block:4}},
    Rhythm:{label:'Rhythm',ap:1,format:'accent',buff:2,icon:'♫',type:'tactic',rank:'N',plus:{draw:1}},
    Comfort:{label:'Comfort',ap:1,format:'word',heal:5,block:4,icon:'♡',type:'heal',rank:'N',plus:{heal:8,block:6}},
    Whisper:{label:'Whisper',ap:1,format:'word',dmg:8,draw:1,icon:'❖',type:'attack',rank:'N',plus:{dmg:12}},
    Flash:{label:'Flash',ap:1,format:'accent',dmg:18,icon:'✺',type:'attack',rank:'N',plus:{dmg:24}},
    Angle:{label:'Angle',ap:1,format:'accent',dmg:12,weaken:3,icon:'⌁',type:'attack',rank:'R',plus:{dmg:16,weaken:5}},
    Shade:{label:'Shade',ap:1,format:'accent',block:8,icon:'⬡',type:'guard',rank:'N',plus:{block:13}},
    Press:{label:'Press',ap:1,format:'word',dmg:8,nextPlus:5,icon:'✹',type:'attack',rank:'N',plus:{dmg:12,nextPlus:7}},
    Slice:{label:'Slice',ap:1,format:'accent',dmg:12,pierce:true,icon:'⚔',type:'attack',rank:'N',plus:{dmg:17}},
    Lock:{label:'Lock',ap:1,format:'accent',block:5,weaken:5,icon:'⌑',type:'guard',rank:'N',plus:{block:8,weaken:8}},
    Repair:{label:'Repair',ap:2,format:'word',heal:15,block:12,icon:'✚',type:'heal',rank:'R',plus:{heal:20,block:16}},
    Shock:{label:'Shock',ap:2,format:'q9',dmg:26,icon:'ϟ',type:'attack',rank:'R',plus:{dmg:36}},
    Cure:{label:'Cure',ap:2,format:'q11',heal:21,block:5,icon:'✚',type:'heal',rank:'R',plus:{heal:30,block:7}},
    Command:{label:'Command',ap:0,format:'q9',buff:2,icon:'✷',type:'tactic',rank:'R',plus:{block:5}},
    Surround:{label:'Surround',ap:2,format:'q9',dmg:14,range:2,icon:'☄',type:'attack',rank:'R',plus:{dmg:20}},
    Disturb:{label:'Disturb',ap:2,format:'q9',cancel:true,icon:'⊘',type:'tactic',rank:'R',plus:{draw:1}},
    Pretend:{label:'Pretend',ap:1,format:'q11',draw:2,discard:1,icon:'↝',type:'tactic',rank:'N',plus:{draw:3}},
    Protect:{label:'Protect',ap:2,format:'q11',block:22,icon:'⬡',type:'guard',rank:'R',plus:{block:30}},
    Extend:{label:'Extend',ap:1,format:'q11',retrieve:2,icon:'↶',type:'tactic',rank:'R',plus:{block:5}},
    Disappear:{label:'Disappear',ap:2,format:'q11',dmg:18,cancel:true,icon:'☾',type:'tactic',rank:'SR',plus:{dmg:27}},
    Broadcast:{label:'Broadcast',ap:3,format:'q9',dmg:25,range:3,icon:'☄',type:'attack',rank:'R',plus:{dmg:33}},
    Absolute:{label:'Absolute',ap:2,format:'q11',block:18,carry:5,icon:'◈',type:'guard',rank:'SR',plus:{block:26,carry:8}},
    Echo:{label:'Echo',ap:1,format:'audio',dmg:15,icon:'♫',type:'attack',rank:'N',plus:{dmg:20}},
    Melody:{label:'Melody',ap:1,format:'audio',block:8,icon:'♪',type:'guard',rank:'N',plus:{block:13}},
    Pulse:{label:'Pulse',ap:1,format:'audio',dmg:8,draw:1,icon:'◉',type:'attack',rank:'N',plus:{dmg:12}},
    Resonance:{label:'Resonance',ap:1,format:'audio',buff:2,icon:'♬',type:'tactic',rank:'R',plus:{draw:1}},
    Harmony:{label:'Harmony',ap:2,format:'audio',heal:12,block:5,icon:'♡',type:'heal',rank:'N',plus:{heal:19,block:7}},
    Crescendo:{label:'Crescendo',ap:3,format:'audio',dmg:25,range:3,icon:'✺',type:'attack',rank:'R',plus:{dmg:33}},
    Assemble:{label:'Assemble',ap:1,format:'q12',dmg:18,icon:'⚔',type:'attack',rank:'N',plus:{dmg:24}},
    Pattern:{label:'Pattern',ap:1,format:'q12',block:12,icon:'⬡',type:'guard',rank:'N',plus:{block:17}},
    Link:{label:'Link',ap:1,format:'q12',dmg:10,draw:1,icon:'❖',type:'attack',rank:'N',plus:{dmg:15}},
    Sequence:{label:'Sequence',ap:2,format:'q12',dmg:30,icon:'✦',type:'attack',rank:'R',plus:{dmg:39}},
    Rebuild:{label:'Rebuild',ap:2,format:'q12',heal:13,block:8,icon:'✚',type:'heal',rank:'N',plus:{heal:19,block:11}},
    Symphony:{label:'Symphony',ap:2,format:'q12',dmg:22,range:3,icon:'☄',type:'attack',rank:'R',plus:{dmg:29}},
    SavingsPlan:{label:'Savings Plan',ap:1,format:'accent',block:6,seedAtBlock:8,icon:'✿',type:'guard',rank:'N',plus:{block:9}},
    ReturnSlip:{label:'Return Slip',ap:1,format:'jaen',block:6,recoveryBlock:6,icon:'↶',type:'guard',rank:'N',plus:{block:9}},
    Spark:{label:'Spark',ap:1,format:'accent',dmg:15,icon:'ϟ',type:'attack',rank:'N',plus:{dmg:20}},
    Shelter:{label:'Shelter',ap:1,format:'accent',block:8,icon:'⬡',type:'guard',rank:'N',plus:{block:13}},
    Tempo:{label:'Tempo',ap:1,format:'accent',draw:2,discard:1,icon:'↝',type:'tactic',rank:'N',plus:{draw:3}},
    Chorus:{label:'Chorus',ap:2,format:'accent',dmg:18,range:3,icon:'♫',type:'attack',rank:'R',plus:{dmg:25}},
    Insight:{label:'Insight',ap:1,format:'q11',dmg:15,icon:'✧',type:'attack',rank:'N',plus:{dmg:21}},
    Resolve:{label:'Resolve',ap:1,format:'q11',heal:7,icon:'✚',type:'heal',rank:'N',plus:{heal:11}},
    Reform:{label:'Reform',ap:2,format:'q11',dmg:27,icon:'⚔',type:'attack',rank:'R',plus:{dmg:36}},
    Fortress:{label:'Fortress',ap:2,format:'q11',block:25,icon:'◈',type:'guard',rank:'R',plus:{block:34}},
    Counter:{label:'Counter',ap:1,format:'word',blockStrike:1.2,pierce:true,icon:'⚔',type:'attack',rank:'N',plus:{blockStrike:1.5}},
    GuardShift:{label:'Guard Shift',ap:2,format:'accent',block:18,carry:10,icon:'◈',type:'guard',rank:'SR',plus:{block:24,carry:13}},
    Replay:{label:'Replay',ap:1,format:'q9',replay:1,icon:'↻',type:'tactic',rank:'R',plus:{block:5}},
    Grow:{label:'Grow',ap:1,format:'word',dmg:6,grow:3,icon:'✿',type:'attack',rank:'N',plus:{dmg:8,grow:4}},
    Harvest:{label:'Harvest',ap:2,format:'q11',dmg:12,scaleGrow:5,icon:'✺',type:'attack',rank:'R',plus:{dmg:17,scaleGrow:6}},
    Select:{label:'Select',ap:1,format:'jaen',discardChoose:1,draw:2,icon:'↝',type:'tactic',rank:'N',plus:{draw:3}},
    Trigger:{label:'Trigger',ap:1,format:'audio',dmg:12,scaleDiscard:10,icon:'✹',type:'attack',rank:'SR',plus:{dmg:17,scaleDiscard:12}},
    Sacrifice:{label:'Sacrifice',ap:1,format:'jaen',sealChoose:1,block:12,icon:'✧',type:'guard',rank:'N',plus:{block:16}},
    Focus:{label:'Focus',ap:1,format:'q11',sealChoose:1,draw:2,icon:'◉',type:'tactic',rank:'SR',plus:{draw:3}},
    Finale:{label:'Finale',ap:2,format:'q12',dmg:12,formatCount:3,bonusDmg:18,icon:'☄',type:'attack',rank:'SR',plus:{dmg:18,bonusDmg:22}},
    ResonantField:{label:'Resonant Field',ap:1,format:'accent',block:8,formatCount:2,bonusBlock:6,icon:'♫',type:'guard',rank:'N',plus:{block:11,bonusBlock:8}},
    Purify:{label:'Purify',ap:1,format:'q12',sealChoose:1,heal:7,icon:'✚',type:'heal',rank:'R',plus:{heal:11}},
    Archive:{label:'Archive',ap:2,format:'q11',retrieve:2,draw:1,icon:'↻',type:'tactic',rank:'SR',plus:{block:6,draw:2}},
    Overgrowth:{label:'Overgrowth',ap:2,format:'q12',dmg:20,scaleGrow:8,icon:'✿',type:'attack',rank:'SR',plus:{dmg:27,scaleGrow:10}},
    Recast:{label:'Recast',ap:1,format:'q9',dmg:12,scaleRetrieve:8,icon:'↻',type:'attack',rank:'R',plus:{dmg:16,scaleRetrieve:10}},
    Afterimage:{label:'Afterimage',ap:1,format:'jaen',dmg:12,scaleDiscard:8,icon:'✹',type:'attack',rank:'R',plus:{dmg:16,scaleDiscard:10}}
    ,Chain:{label:'Chain',ap:1,format:'accent',dmg:12,killAp:1,chainAp:1,icon:'⚔',type:'attack',rank:'N',plus:{dmg:17}}
    ,Seed:{label:'Seed',ap:1,format:'word',block:6,growGain:2,icon:'✿',type:'guard',rank:'R',plus:{block:10}}
    ,Sweep:{label:'Sweep',ap:2,format:'q9',dmg:14,killSplash:8,icon:'☄',type:'attack',rank:'R',plus:{dmg:19,killSplash:11}}
    ,Momentum:{label:'Momentum',ap:1,format:'q12',killDraw:1,icon:'✦',type:'tactic',rank:'SR',plus:{block:6}}
    ,Reserve:{label:'Reserve',ap:0,format:'q11',reserveAp:2,icon:'◷',type:'tactic',rank:'R',plus:{reserveAp:3}}
    ,Ignition:{label:'Ignition',ap:1,format:'q9',dmg:8,nextPlus:12,icon:'ϟ',type:'attack',rank:'R',plus:{dmg:12,nextPlus:16}}
    ,Finisher:{label:'Finisher',ap:2,format:'q12',dmg:24,executeHalf:16,icon:'⚔',type:'attack',rank:'SR',plus:{dmg:30,executeHalf:20}}
    // New tactical choices: trade safety for damage, reward diverse plays, or reward patient defense.
    ,Clearance:{label:'Clearance',ap:2,format:'word',dmg:13,consumeBlock:12,icon:'⇄',type:'attack',rank:'R',plus:{dmg:19,consumeBlock:16}}
    ,LedgerCut:{label:'Ledger Cut',ap:1,format:'q11',dmg:7,scaleUsed:2,icon:'▤',type:'attack',rank:'N',plus:{dmg:10,scaleUsed:3}}
    ,TwinGuard:{label:'Twin Guard',ap:1,format:'word',block:5,bonusBlockPerEnemy:4,icon:'⬡',type:'guard',rank:'N',plus:{block:7,bonusBlockPerEnemy:5}}
    ,NightShift:{label:'Night Shift',ap:1,format:'accent',block:7,drawIfGuard:12,icon:'◷',type:'guard',rank:'R',plus:{block:10,drawIfGuard:12}}
    ,Overtime:{label:'Overtime',ap:2,format:'q12',dmg:18,lowHpBonus:13,icon:'ϟ',type:'attack',rank:'R',plus:{dmg:24,lowHpBonus:17}}
    ,Teamwork:{label:'Teamwork',ap:1,format:'q9',dmg:6,scaleUnique:4,icon:'✣',type:'attack',rank:'N',plus:{dmg:8,scaleUnique:5}}
    ,Index:{label:'Index',ap:1,format:'jaen',dmg:7,scaleUnique:3,icon:'⌗',type:'attack',rank:'N',plus:{dmg:10,scaleUnique:4}}
    ,AfterHours:{label:'After Hours',ap:2,format:'audio',dmg:17,lowHpBonus:15,icon:'☾',type:'attack',rank:'R',plus:{dmg:22,lowHpBonus:19}}
    ,SafeExit:{label:'Safe Exit',ap:1,format:'audio',block:8,healIfGuard:12,icon:'✚',type:'guard',rank:'N',plus:{block:11,healIfGuard:12}}
    ,OpenBook:{label:'Open Book',ap:1,format:'q11',block:4,draw:2,icon:'▣',type:'tactic',rank:'R',plus:{block:7,draw:2}}
    ,Closeout:{label:'Closeout',ap:2,format:'q12',dmg:15,scaleUsed:2,icon:'✦',type:'attack',rank:'R',plus:{dmg:21,scaleUsed:3}}
    ,LastCall:{label:'Last Call',ap:2,format:'q12',dmg:18,scaleUnique:5,icon:'♛',type:'attack',rank:'SR',plus:{dmg:23,scaleUnique:6}}
    // 12 extra Q12-only cards. The new pool rewards card cycling, defense and finishers.
    ,NightMarket:{label:'Night Market',ap:1,format:'q12',dmg:12,scaleUsed:1,icon:'☾',type:'attack',rank:'N',plus:{dmg:16,scaleUsed:2}}
    ,StockReserve:{label:'Stock Reserve',ap:1,format:'q12',block:10,carry:6,icon:'▦',type:'guard',rank:'N',plus:{block:14,carry:9}}
    ,Cashback:{label:'Cashback',ap:1,format:'q12',heal:8,draw:1,icon:'↶',type:'heal',rank:'R',plus:{heal:12,draw:1}}
    ,MarginCall:{label:'Margin Call',ap:2,format:'q12',dmg:17,consumeBlock:14,icon:'⇄',type:'attack',rank:'R',plus:{dmg:23,consumeBlock:18}}
    ,QuickAudit:{label:'Quick Audit',ap:1,format:'q12',block:7,retrieve:1,icon:'▤',type:'tactic',rank:'R',plus:{block:11,retrieve:1}}
    ,LastMinute:{label:'Last Minute',ap:2,format:'q12',dmg:24,lowHpBonus:12,icon:'ϟ',type:'attack',rank:'SR',plus:{dmg:32,lowHpBonus:18}}
    ,BalanceSheet:{label:'Balance Sheet',ap:2,format:'q12',block:20,healIfGuard:20,icon:'▣',type:'guard',rank:'N',plus:{block:27,healIfGuard:20}}
    ,Reorder:{label:'Reorder',ap:1,format:'q12',draw:2,discard:1,icon:'↝',type:'tactic',rank:'N',plus:{draw:3}}
    ,BulkSale:{label:'Bulk Sale',ap:2,format:'q12',dmg:15,range:2,bonusDmg:8,formatCount:2,icon:'☄',type:'attack',rank:'R',plus:{dmg:20,bonusDmg:11}}
    ,PriceMatch:{label:'Price Match',ap:1,format:'q12',dmg:12,scaleDiscard:7,icon:'◇',type:'attack',rank:'R',plus:{dmg:16,scaleDiscard:9}}
    ,ChainReaction:{label:'Chain Reaction',ap:2,format:'q12',dmg:16,scaleRetrieve:9,icon:'✣',type:'attack',rank:'R',plus:{dmg:22,scaleRetrieve:12}}
    ,FinalInvoice:{label:'Final Invoice',ap:3,format:'q12',dmg:34,executeHalf:16,icon:'♛',type:'attack',rank:'SR',plus:{dmg:43,executeHalf:21}}
    ,BadStock:{label:'不良在庫',ap:1,format:'word',exhaustOnCorrect:true,icon:'▣',type:'tactic',rank:'BASIC'}
  };
  const COMMON_SKILLS=['Attack','Guard','FirstAid','Burst','Aid','Comfort','Flash','Shock','Cure','Protect','Echo','Shade'];
  const BUILD_FAMILIES={
    REFLECT:['Counter','GuardShift','Pattern','Protect','Fortress','Absolute','Lock','Shelter','Shade'],
    RECYCLE:['ReturnSlip','Replay','Remind','Extend','Whisper','Pulse','Link','Archive','Recast'],
    EVOLUTION:['SavingsPlan','Grow','Harvest','Press','Rhythm','Command','Spark','Overgrowth','Seed'],
    CHAIN:['Chain','Sweep','Momentum','Burst','Command','Reserve','Ignition','Finisher'],
    RESONANCE:['Resonance','ResonantField','Finale','Harmony','Crescendo','Chorus'],
    DISCARD:['Select','Trigger','Pretend','Tempo','Melody','Afterimage'],
    SACRIFICE:['Sacrifice','Focus','Purify','Rebuild'],
    COMMERCE:['NightMarket','StockReserve','Cashback','MarginCall','QuickAudit','LastMinute','BalanceSheet','Reorder','BulkSale','PriceMatch','ChainReaction','FinalInvoice']
  };
  const buildFamily=name=>Object.entries(BUILD_FAMILIES).find(([,list])=>list.includes(baseName(name)))?.[0]||'';
  const rewardWeight=name=>{
    const family=buildFamily(name);
    if(!family)return 1;
    const matching=state.owned.filter(owned=>buildFamily(owned)===family);
    if(!matching.length)return 1;
    const attacking=matching.filter(owned=>skills[baseName(owned)]?.type==='attack').length;
    const supporting=matching.length-attacking;
    // Favor the missing half of a build; avoid flooding the deck with support cards.
    if(skills[name].type==='attack'&&supporting>attacking)return 5;
    if(skills[name].type!=='attack'&&attacking>supporting+1)return 4;
    if(skills[name].type!=='attack'&&supporting>=2)return 1;
    return 3;
  };
  const weightedReward=pool=>{
    const total=pool.reduce((sum,name)=>sum+rewardWeight(name),0);
    let roll=Math.random()*total;
    for(const name of pool){roll-=rewardWeight(name);if(roll<0)return name;}
    return pool[pool.length-1];
  };
  const STAGE_SKILLS={
    1:['Scream','Encourage','Remind','Pronounce','Rhythm','Whisper','Angle','Press','Slice','Lock','Repair','Command','Surround','Disturb','Extend','Absolute','Pattern','SavingsPlan','ReturnSlip','Counter','GuardShift','Replay','Grow','Harvest','Archive','Overgrowth','Recast','Chain','Seed','Sweep','Momentum','Reserve','Ignition','Finisher','Clearance','LedgerCut','TwinGuard','NightShift','Overtime','Teamwork','NightMarket','StockReserve','Cashback','MarginCall','QuickAudit','LastMinute'],
    2:['Pretend','Disappear','Broadcast','Melody','Pulse','Resonance','Harmony','Crescendo','Assemble','Link','Sequence','Rebuild','Symphony','Tempo','Chorus','Insight','Resolve','Reform','Fortress','Select','Trigger','Sacrifice','Focus','Finale','ResonantField','Purify','Afterimage','Index','AfterHours','SafeExit','OpenBook','Closeout','LastCall','BalanceSheet','Reorder','BulkSale','PriceMatch','ChainReaction','FinalInvoice']
  };
  const availableSkills=()=>[...COMMON_SKILLS,...STAGE_SKILLS[state.dungeon]||[]];
  const availableRewardSkills=()=>availableSkills().filter(x=>!['Attack','Guard','FirstAid'].includes(x));
  const maxCopies=name=>skills[name]?.rank==='SR'?2:skills[name]?.rank==='R'?3:4;
  const ownedCount=name=>state.owned.filter(x=>baseName(x)===name).length;
  const canAddSkill=name=>!!skills[name]&&ownedCount(name)<maxCopies(name);
  const FMT = {word:'単語 英→日',jaen:'単語 日→英',audio:'音声→意味',accent:'アクセント',q9:'大問9',q11:'大問11',q12:'大問12 · 語句整序'};
  const LOADOUTS = [
    {label:'はじめて編成',desc:'通常攻撃と防御だけ。報酬で強くなる。',cards:[]},
    {label:'攻撃・連携編成',desc:'Command / Shock / Rhythm',cards:['Command','Shock','Rhythm']},
    {label:'守り・回復編成',desc:'FirstAid / Shade / Lock',cards:['FirstAid','Shade','Lock']}
  ];
  const RANKS = ['N','R','SR'];
  const artifacts = {
    IronShield:{name:'Safety Helmet',rank:'N',icon:'⛑',effect:'戦闘開始時、防御＋5'},
    PowerFang:{name:'Golden Abacus',rank:'N',icon:'🧮',effect:'各戦闘の最初の攻撃ダメージ＋4'},
    LifeSeed:{name:'Health Insurance',rank:'N',icon:'♥',effect:'戦闘勝利時、HP＋3'},
    LuckyHand:{name:'Lucky Calculator',rank:'N',icon:'🖩',effect:'戦闘開始時、手札＋1枚'},
    EchoBell:{name:'Accent Tuner',rank:'N',icon:'♫',effect:'アクセント正解のたびに防御＋3'},
    WordLens:{name:'Word Scanner',rank:'N',icon:'⌕',effect:'英→日の単語正解のたびに次の攻撃＋3'},
    SoundShell:{name:'Audio Recorder',rank:'N',icon:'🎙',effect:'音声問題正解でHP＋3（各戦闘1回）'},
    GrammarStar:{name:'Grammar Notebook',rank:'N',icon:'📓',effect:'大問9正解で1枚ドロー（毎ターン1回）'},
    StoneCharm:{name:'Insurance Policy',rank:'N',icon:'📜',effect:'各戦闘で最初に受けるHPダメージを10軽減'},
    PowerLeaf:{name:'Receipt Bundle',rank:'N',icon:'🧾',effect:'各SHOPの最初の購入が80％オフ'},
    VitalDrop:{name:'First Aid Kit',rank:'N',icon:'✚',effect:'戦闘開始時、HP＋3'},
    CoinCharm:{name:'Petty Cash Book',rank:'N',icon:'🪙',effect:'勝利時、COIN＋5'},
    CompoundInterest:{name:'Compound Interest',rank:'R',icon:'📈',effect:'攻撃正解ごとにそのターン中の以降の攻撃＋2（最大＋8）'},
    FIFOBox:{name:'FIFO Box',rank:'R',icon:'📦',effect:'USEDから回収・再使用した強化可能なSKILLを、この戦闘中＋に強化（回数制限なし）'},
    ReserveVault:{name:'Reserve Vault',rank:'R',icon:'🔒',effect:'ターン終了時の余りAP1につき次ターン防御＋2（最大＋4）'},
    ForecastAI:{name:'Forecast AI',rank:'R',icon:'◉',effect:'戦闘の最初のターンに2枚追加ドロー'},
    BadDebtReserve:{name:'Bad Debt Reserve',rank:'R',icon:'⬡',effect:'HPが半分以下になったとき防御＋15（各戦闘1回）'},
    MarketReport:{name:'Market Report',rank:'R',icon:'📊',effect:'戦闘中、敵の次ターンの行動予告も確認できる'},
    InventoryManager:{name:'Inventory Manager',rank:'R',icon:'▤',effect:'1ターンに4枚使用すると1枚引く（毎ターン1回）'},
    SalesBooster:{name:'Sales Booster',rank:'R',icon:'↗',effect:'異なる2形式で正解すると次の攻撃＋6（毎ターン1回）'},
    CashFlow:{name:'Cash Flow',rank:'R',icon:'💵',effect:'1ターンに追加で2枚引くと防御＋3（毎ターン1回）'},
    TaxDeduction:{name:'Tax Deduction',rank:'R',icon:'📑',effect:'邪魔カードを正解して消滅させるたびにHP＋3'},
    ShareholderTicket:{name:'Shareholder Ticket',rank:'R',icon:'🎟',effect:'SHOPのすべての買い物が20%OFF'},
    QualityControl:{name:'Quality Control',rank:'R',icon:'✓',effect:'2問連続正解で防御＋5（毎ターン1回）'},
    GoldenLedger:{name:'Golden Ledger',rank:'SR',icon:'📔',effect:'異なる3種類のカードで正解するとAP＋1（毎ターン1回）'},
    MonopolyCrown:{name:'Monopoly Crown',rank:'SR',icon:'♛',effect:'各戦闘の最初の攻撃ダメージが2倍'},
    InfiniteWarehouse:{name:'Infinite Warehouse',rank:'SR',icon:'🏭',effect:'カード消滅時に1枚ドロー・防御＋5（毎ターン1回）'},
    MasterAbacus:{name:'Master Abacus',rank:'SR',icon:'🏅',effect:'1ターンに5枚使用するとAP＋3（毎ターン1回）'},
    InnovationPlan:{name:'Innovation Plan',rank:'SR',icon:'💡',effect:'ACT開始時にSKILL1種類をそのACT中だけ＋に強化'},
    FinalBalanceSheet:{name:'Final Balance Sheet',rank:'SR',icon:'📒',effect:'防御10以上で戦闘勝利すると最大HP＋6'}
  };
  function artifactPicture(id){
    const item=artifacts[id];if(!item)return '';
    const file=id==='FIFOBox'?'GOIMON_FIFO_Box_v2_256.png':`GOIMON_${item.name.replace(/\s+/g,'_')}_256.png`;
    return `<img class="artifact-symbol artifact-image" src="images/artifacts/${file}" width="64" height="64" alt="" decoding="async">`;
  }
  const artifactRanks={treasure:[65,30,5],elite:[50,45,5],boss:[0,80,20],shop:[50,40,10],event:[50,40,10]};
  const artifactPrice=id=>({N:40,R:75,SR:120})[artifacts[id]?.rank]||60;
  function artifactRoll(source,exclude=[]){
    const available=Object.keys(artifacts).filter(id=>!hasArtifact(id)&&!exclude.includes(id));
    if(!available.length)return null;
    const weights=artifactRanks[source]||artifactRanks.treasure;const roll=Math.random()*100;
    const rank=roll<weights[0]?'N':roll<weights[0]+weights[1]?'R':'SR';
    const candidates=available.filter(id=>artifacts[id].rank===rank);
    const allowed=available.filter(id=>weights[['N','R','SR'].indexOf(artifacts[id].rank)]>0);
    return random(candidates.length?candidates:allowed);
  }
  const enemySets = [
    [{kind:'attacker',name:'石ころファング',hp:45,attack:7,icon:'🐺'}],
    [{kind:'tank',name:'岩甲のまもり手',hp:59,attack:8,icon:'🪨'}],
    [{kind:'attacker',name:'森のツメ',hp:38,attack:6,icon:'🐾'},{kind:'support',name:'いやしの芽',hp:29,attack:4,icon:'🌱'}],
    [{kind:'charger',name:'雷角のけもの',hp:68,attack:10,icon:'⚡'}],
    [{kind:'attacker',name:'石ころファング',hp:42,attack:7,icon:'🐺'},{kind:'tank',name:'岩甲のまもり手',hp:50,attack:7,icon:'🪨'}]
  ];
  // Each ACT has one named boss.
  // Encounter scaling adds 16 HP and 1 attack at the boss floor, plus 9 HP / 1 attack per ACT after the first.
  const bossMonsters={
    1:{kind:'boss',bossId:'hodaka',name:'ラーメン魔人HODAKA',hp:147,attack:12,icon:'🍜'},
    2:{kind:'boss',bossId:'riki',name:'熱血簿記RIKI',hp:180,attack:14,icon:'📒'},
    3:{kind:'boss',bossId:'mika',name:'女社長MIKA',hp:220,attack:17,icon:'👑'}
  };
  const ENEMY_ROLES={attacker:'突撃',tank:'鉄壁',support:'回復',charger:'蓄力',sentinel:'守護',conductor:'指揮',counter:'反応',inflator:'増幅',breaker:'取締',disruptor:'妨害',trickster:'変則',variable:'変化',swarm:'連打',leech:'吸収',inventory:'在庫',sapper:'防御値下げ',exchange:'等価交換',taxer:'徴収',boss:'ボス'};
  const encounterPool = [
    {type:'突撃',icon:'⚔',desc:'攻撃が中心。短期決戦向き',enemies:[{kind:'attacker',name:'石ころファング',hp:45,attack:7,icon:'🐺'}]},
    {type:'鉄壁',icon:'⬡',desc:'防御を固める敵。貫通や連続攻撃が有効',enemies:[{kind:'tank',name:'岩甲のまもり手',hp:55,attack:8,icon:'🪨'}]},
    {type:'連携',icon:'✚',desc:'回復役と攻撃役の2体。狙う順番が重要',enemies:[{kind:'attacker',name:'森のツメ',hp:36,attack:6,icon:'🐾'},{kind:'support',name:'いやしの芽',hp:28,attack:4,icon:'🌱'}]},
    {type:'溜め',icon:'ϟ',desc:'大技を予告。防御のタイミングが鍵',enemies:[{kind:'charger',name:'雷角のけもの',hp:60,attack:9,icon:'⚡'}]},
    {type:'群れ',icon:'☄',desc:'2体が攻撃。全体攻撃が有効',enemies:[{kind:'attacker',name:'森のツメ',hp:37,attack:6,icon:'🐾'},{kind:'attacker',name:'石ころファング',hp:37,attack:6,icon:'🐺'}]},
    {type:'守護連携',icon:'🛡',desc:'守護役が仲間に防御を付与。先に守護役を倒すか考えよう',enemies:[{kind:'sentinel',name:'苔のガーディアン',hp:44,attack:6,icon:'🛡️'},{kind:'attacker',name:'森のツメ',hp:39,attack:7,icon:'🐾'}]},
    {type:'指揮連携',icon:'✷',desc:'指揮役がいる間、味方の攻撃が強くなる',enemies:[{kind:'conductor',name:'森の指揮者',hp:34,attack:4,icon:'🎼'},{kind:'charger',name:'雷角のけもの',hp:47,attack:8,icon:'⚡'}]},
    {type:'反応',icon:'◉',desc:'こちらの防御が厚いと攻撃方法を変える',enemies:[{kind:'counter',name:'見透かすフクロウ',hp:49,attack:7,icon:'🦉'}]},
    {type:'防御突破',icon:'⚔',desc:'守護役と反応役。守るだけでは危険',enemies:[{kind:'sentinel',name:'苔のガーディアン',hp:39,attack:5,icon:'🛡️'},{kind:'counter',name:'見透かすフクロウ',hp:41,attack:7,icon:'🦉'}]}
  ];
  // The 11 normal monsters and six elites are the actual generated encounter roster.
  // These role tags are intentionally reusable: mixed formations use the same AI.
  const normalMonsters=[
    {kind:'attacker',name:'そろばん小僧',hp:42,attack:8,icon:'🧮'},
    {kind:'conductor',name:'仕訳じじい',hp:37,attack:5,icon:'📒'},
    {kind:'tank',name:'減価償却ゾンビ',hp:56,attack:7,icon:'🧟'},
    {kind:'variable',name:'イフキツネ',hp:38,attack:6,icon:'🦊'},
    {kind:'charger',name:'ルックアップテング',hp:54,attack:8,icon:'👺'},
    {kind:'sentinel',name:'SWOT四面鬼',hp:46,attack:6,icon:'👹'},
    {kind:'support',name:'クーリングオフ雪女',hp:34,attack:5,icon:'❄'},
    {kind:'counter',name:'デフレガリガリ',hp:43,attack:7,icon:'💀'},
    {kind:'swarm',name:'サムガッパ',hp:39,attack:5,icon:'🥒'},
    {kind:'leech',name:'貸し倒れ幽霊',hp:44,attack:7,icon:'👻'},
    {kind:'inventory',name:'棚卸ぬらりひょん',hp:42,attack:5,icon:'▣'}
  ];
  const eliteMonsters=[
    {kind:'inflator',name:'インフレ入道',hp:118,attack:10,icon:'👹'},
    {kind:'breaker',name:'独禁法の番犬',hp:105,attack:11,icon:'🐕'},
    {kind:'trickster',name:'ランビトクイーン',hp:110,attack:9,icon:'♛'},
    {kind:'sapper',name:'値下げオーガ',hp:124,attack:12,icon:'👹'},
    {kind:'exchange',name:'等価交換ジョーカー',hp:114,attack:10,icon:'🃏'},
    {kind:'taxer',name:'悪徳税理士',hp:110,attack:9,icon:'📜'}
  ];
  const state = {phase:'intro',examGrade:savedSetup.examGrade===1?1:2,loadout:0,companionId:savedSetup.companionId||null,selectedCarrySkills:Array.isArray(savedSetup.skills)?savedSetup.skills:null,hp:START_HP,maxHp:START_HP,ap:3,apTotal:3,block:0,guardPriceCut:0,carry:0,carryOver:0,buff:1,nextPlus:0,turn:1,
    fight:0,hand:[],deck:[],used:[],owned:[],enemies:[],selected:0,questions:0,correct:0,commandUsed:false,
    notice:'',pending:null,question:null,choiceMode:null,campNext:false,postChoice:null,route:[],routeEdges:[],routePath:[],stage:0,currentEncounter:null,
    coins:0,artifacts:[],artifactTurnUses:new Set(),artifactBattleUses:new Set(),shopStock:[],basicAttack:5,basicGuard:3,upgradeFromEvent:false,removeOrigin:'shop',
    act:1,actFight:0,type:'nagomi',typeBoost:false,typeTurnUses:new Set(),typeBattleUses:new Set(),typeCorrectNames:new Set(),shieldPierce:0,
    dungeon:savedSetup.dungeon===2&&stage2Unlocked()?2:1,specialBoosts:[],wordQueue:[],encounterWordRange:[0,30],seenWords:[],wrongWords:[],choiceOffer:null,eliteArtifactOffer:null,choiceEvent:null,choiceSpecialOptions:null,
    battleWrongQuestions:[],runWrongQuestions:[],battleReviewUsed:false,battleReviewRevived:false,reviewIndex:0,turnDamage:0,turnGuardGained:0,lastBattleArtifact:null,
    sealed:[],growUses:0,discardedTurn:0,recoveredTurn:0,correctFormats:[],turnUsedNames:[],replayUsed:false,freeReplayCard:null,cardSelection:null,chainApGained:0,momentumActive:false,momentumDrawn:0,reserveAp:0,reserveUsed:false,
    artifactAttacks:0,artifactCardUses:0,artifactDraws:0,artifactCorrectStreak:0,artifactUniqueCards:[],artifactNextGuard:0,artifactCompound:0,artifactDiscountUsed:false,artifactFreeShopUsed:false,artifactActUpgrades:[]};
  const TYPE_LABELS={nagomi:'なごみ',hirameki:'ひらめき',tsumugi:'つむぎ',yomitoki:'よみとき',shirabe:'しらべ',hibiki:'ひびき',kotonoha:'ことのは'};
  const TYPE_EFFECTS={nagomi:'防御カード正解でHP＋2（1ターン1回）',hirameki:'毎戦闘最初の攻撃SKILLのAP−1',tsumugi:'1ターンに異なる2種類を正解すると防御＋5',yomitoki:'大問9正解で次の攻撃が防御5無視',shirabe:'単語正解で次の攻撃＋3',hibiki:'アクセント正解で次の攻撃＋4',kotonoha:'大問11正解で防御＋6'};
  const TYPE_BOOST_EFFECTS={nagomi:'防御カード正解でHP＋4（1ターン1回）',hirameki:'毎戦闘最初の攻撃SKILLのAP−2',tsumugi:'1ターンに異なる2種類を正解すると防御＋8',yomitoki:'大問9正解で次の攻撃が防御8無視',shirabe:'単語正解で次の攻撃＋5',hibiki:'アクセント正解で次の攻撃＋6',kotonoha:'大問11正解で防御＋9'};
  const SPECIAL_BOOSTS={maxHp:{name:'MAX HP UP',icon:'♡',effect:'最大HP＋15・HP＋15'},purify:{name:'DECK PURIFY',icon:'↶',effect:'通常攻撃と通常防御を1枚ずつ削除'}};
  const maxHp=()=>state.maxHp;
  function actWordRange(act){
    const count=questionBank().words.length;
    // Preserve the original 180 / 180 / 190 distribution for the 550-word bank.
    const bounds=[0,Math.round(count*180/550),Math.round(count*360/550),count];
    return bounds.slice(act-1,act+1);
  }
  const actWordLabel=()=>{const [from,to]=actWordRange(state.act);return `No.${from+1}〜${to}`;};
  const wordRangeForFight=(act,completed,isBoss)=>{
    const [from,to]=actWordRange(act);
    const size=Math.round((to-from)/(act===3?190:180)*30);
    if(isBoss)return [from+5*size,to];
    if(completed>=5)return [from,from+5*size];
    return [from+completed*size,from+(completed+1)*size];
  };
  function saveCheckpoint(){
    if(state.phase==='intro'||state.choiceMode==='complete')return;
    const keys=['battleStartHp','missionOwner','missionRecorded','phase','examGrade','dungeon','act','actFight','stage','route','routeEdges','routePath','currentEncounter','encounterWordRange','wordQueue','loadout','companionId','selectedCarrySkills','type','hp','maxHp','owned','coins','artifacts','basicAttack','basicGuard','typeBoost','specialBoosts','questions','correct','fight','seenWords','wrongWords','ap','apTotal','block','guardPriceCut','carry','carryOver','buff','nextPlus','turn','hand','deck','used','enemies','selected','commandUsed','shieldPierce','shopStock','shopRemoveIndex','removeOrigin','choiceMode','choiceOffer','eliteArtifactOffer','eventHistory','choiceEvent','choiceSpecialOptions','specialSkillOffer','upgradeFromEvent','battleWrongQuestions','runWrongQuestions','battleReviewUsed','battleReviewRevived','turnDamage','turnGuardGained','lastBattleArtifact','sealed','growUses','discardedTurn','recoveredTurn','correctFormats','turnUsedNames','replayUsed','freeReplayCard','chainApGained','momentumActive','momentumDrawn','reserveAp','reserveUsed','artifactAttacks','artifactCardUses','artifactDraws','artifactCorrectStreak','artifactUniqueCards','artifactNextGuard','artifactCompound','artifactDiscountUsed','artifactFreeShopUsed','artifactActUpgrades'];
    const data=Object.fromEntries(keys.map(k=>[k,state[k]]));
    for(const key of ['artifactTurnUses','artifactBattleUses','typeTurnUses','typeBattleUses','typeCorrectNames'])data[key]=[...state[key]];
    data.version=2;
    try{localStorage.setItem(RUN_SAVE_KEY,JSON.stringify(data));}catch(e){return false;}
    $('resumeBtn').hidden=false;
    return true;
  }
  function readCheckpoint(){try{const run=JSON.parse(localStorage.getItem(RUN_SAVE_KEY)||'null');if(run?.version===2&&Array.isArray(run.owned)&&[1,2,3].includes(run.act)&&['route','battle','choice'].includes(run.phase)&&!(run.dungeon===2&&!stage2Unlocked()))return run;
    const old=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');return old&&[2,3].includes(old.act)&&Array.isArray(old.owned)?old:null;}catch(e){return null;}}
  function clearCheckpoint(){try{localStorage.removeItem(RUN_SAVE_KEY);localStorage.removeItem(SAVE_KEY);}catch(e){}$('resumeBtn').hidden=true;}
  function resumeCheckpoint(){const data=readCheckpoint();if(!data)return;
    state.battleStartHp=data.battleStartHp??0;
    state.missionOwner=data.missionOwner??GoimonDungeonMission.owner();state.missionRecorded=!!data.missionRecorded;
    refreshCompanions();
    const pet=companions.find(c=>c.id===data.companionId)||selectedCompanion();
    if(!pet){renderSelectedCompanion();return;}
    if(data.type!==pet.type){
      data.choiceSpecialOptions=null;
      if(!TYPE_EFFECTS[pet.type])data.typeBoost=false;
    }
    data.companionId=pet.id;data.type=pet.type;
    state.companionId=pet.id;
    data.examGrade=data.examGrade===1?1:2;state.examGrade=data.examGrade;
    if(data.version!==2){const keys=['act','loadout','type','hp','maxHp','owned','coins','artifacts','basicAttack','basicGuard','typeBoost','specialBoosts','questions','correct','fight','seenWords','wrongWords'];
      for(const key of keys)if(data[key]!==undefined)state[key]=data[key];startAct();return;}
    for(const [key,value] of Object.entries(data)){if(key==='version'||key==='phase')continue;state[key]=value;}
    for(const group of [state.enemies,state.currentEncounter?.enemies]){
      if(Array.isArray(group))group.forEach(enemy=>{if(LEGACY_ENEMY_NAMES[enemy.name])enemy.name=LEGACY_ENEMY_NAMES[enemy.name];});
    }
    for(const key of ['artifactTurnUses','artifactBattleUses','typeTurnUses','typeBattleUses','typeCorrectNames'])state[key]=new Set(data[key]||[]);
    state.sealed=state.sealed||[];state.correctFormats=state.correctFormats||[];state.turnUsedNames=state.turnUsedNames||[];state.growUses=state.growUses||0;state.discardedTurn=state.discardedTurn||0;state.recoveredTurn=state.recoveredTurn||0;state.replayUsed=!!state.replayUsed;state.chainApGained=state.chainApGained||0;state.momentumActive=!!state.momentumActive;state.momentumDrawn=state.momentumDrawn||0;state.reserveAp=state.reserveAp||0;state.reserveUsed=!!state.reserveUsed;state.cardSelection=null;
    state.runWrongQuestions=Array.isArray(data.runWrongQuestions)?data.runWrongQuestions:[...(data.battleWrongQuestions||[])];
    for(const q of [...(state.battleWrongQuestions||[]),...state.runWrongQuestions]){
      if(q.format!=='q9'||q.options?.length===4)continue;
      const {q9s,wordMeaning}=questionBank();
      const row=q9s.find(x=>x.en===q.stem&&x.answer===q.answer);
      if(row)Object.assign(q,sentenceQuestion(row,wordMeaning));
    }
    state.eventHistory=Array.isArray(data.eventHistory)?data.eventHistory:(data.choiceEvent?[data.choiceEvent]:[]);
    state.removeOrigin=data.removeOrigin||(data.currentEncounter?.nodeType==='rest'?'camp':'shop');
    state.guardPriceCut=state.guardPriceCut||0;
    state.apTotal=Math.max(3,state.ap,Number(state.apTotal)||0);
    for(const key of ['artifactAttacks','artifactCardUses','artifactDraws','artifactCorrectStreak','artifactNextGuard','artifactCompound'])state[key]=state[key]||0;
    state.artifactUniqueCards=state.artifactUniqueCards||[];state.artifactActUpgrades=state.artifactActUpgrades||[];state.artifactDiscountUsed=!!state.artifactDiscountUsed;state.artifactFreeShopUsed=!!state.artifactFreeShopUsed;
    state.dungeon=state.dungeon===2?2:1;renderDungeonPicker();renderSelectedCompanion();renderLoadouts();state.pending=null;state.question=null;state.notice='';$('questionModal').hidden=true;$('reviewModal').hidden=true;
    if(data.phase==='battle'){setScreen('battle');renderBattle();}
    else if(data.phase==='choice')showChoice(data.choiceMode);
    else showRoute();}
  const hasArtifact=id=>state.artifacts.includes(id);
  function renderResources(){
    $('coinCount').textContent=state.coins;$('artifactCount').textContent=state.artifacts.length;
    const inventory=state.artifacts.length?state.artifacts.filter(id=>artifacts[id]).map(id=>`<div class="artifact-entry">${artifactPicture(id)}<div><strong>${artifacts[id].name} · ${artifacts[id].rank}</strong><small>${artifacts[id].effect}</small></div></div>`).join(''):'<div class="artifact-empty">ARTIFACTはまだありません。</div>';
    $('artifactInventory').innerHTML=inventory+(state.typeBoost?`<div class="artifact-entry"><span class="artifact-symbol">◈</span><div><strong>TYPE BOOST：${TYPE_LABELS[state.type]}</strong><small>${TYPE_BOOST_EFFECTS[state.type]}</small></div></div>`:'');
  }
  function acquireArtifact(id){if(!artifacts[id]||hasArtifact(id))return;state.artifacts.push(id);if(state.artifacts.length>=10)awardBadge('collector');renderResources();}
  const baseName = name => name.endsWith('+') ? name.slice(0,-1) : name;
  const getSkill = name => {const raw = skills[baseName(name)];return name.endsWith('+') ? {...raw,...raw.plus,label:raw.label+'+'} : raw;};
  const cardCost=(name,s)=>Math.max(0,state.type==='hirameki'&&s.type==='attack'&&!['Attack','Guard'].includes(baseName(name))&&!state.typeBattleUses.has('hirameki')?s.ap-(state.typeBoost?2:1):s.ap);
  function onCardExhausted(){if(hasArtifact('InfiniteWarehouse')&&!state.artifactTurnUses.has('InfiniteWarehouse')){state.artifactTurnUses.add('InfiniteWarehouse');state.block+=5;draw(1);}}
  const effects = s => {const out=[];
    if(s.dmg)out.push(`${s.range>=3?'全体':s.range===2?'2体':''}${s.dmg}ダメージ${s.pierce?'（防御無視）':''}`);
    if(s.block)out.push(`防御 ${s.block}`);if(s.heal)out.push(`回復 ${s.heal}`);if(s.healPct)out.push(`最大HPの${s.healPct}%回復`);
    if(s.seedAtBlock)out.push(`使用前の防御${s.seedAtBlock}以上で芽＋1`);
    if(s.recoveryBlock)out.push(`このターンにUSED回収済みなら防御＋${s.recoveryBlock}`);
    if(s.cancel)out.push('敵の次の攻撃を0');if(s.weaken)out.push(`敵攻撃 −${s.weaken}`);
    if(s.buff)out.push('次の攻撃 ×2');if(s.nextPlus)out.push(`次の攻撃 +${s.nextPlus}`);
    if(s.draw)out.push(`${s.draw}枚ドロー`);if(s.discard)out.push(`${s.discard}枚捨てる`);
    if(s.retrieve)out.push(`USEDから${s.retrieve}枚回収`);if(s.carry)out.push(`防御${s.carry}持ち越し`);
    if(s.replay)out.push('USEDから1枚AP0で再使用');if(s.blockStrike)out.push(`現在の防御×${s.blockStrike}ダメージ${s.pierce?'（防御無視）':''}`);
    if(s.grow)out.push(`芽カウント×${s.grow}ダメージ追加・使用後に芽＋1`);if(s.scaleGrow)out.push(`芽カウント×${s.scaleGrow}ダメージ追加`);
    if(s.growGain)out.push(`芽カウント＋${s.growGain}（この戦闘中）`);if(s.killAp)out.push('撃破時AP＋1（ターン1回）');if(s.chainAp)out.push('このターン2回目以降の攻撃でもAP＋1（撃破時と共通でターン1回）');if(s.killSplash)out.push(`撃破時、残りの敵全員に${s.killSplash}ダメージ`);if(s.killDraw)out.push('このターン、撃破時に1枚ドロー（最大2枚）');
    if(s.reserveAp)out.push(`ターン終了時の残APを最大${s.reserveAp}、次ターンに持ち越す（ターン1回）`);
    if(s.executeHalf)out.push(`HP半分以下の敵への攻撃＋${s.executeHalf}ダメージ`);
    if(s.exhaustOnCorrect)out.push('正解で消滅（不正解ならUSEDへ）');
    if(s.discardChoose)out.push('手札を1枚選んで捨てる');if(s.scaleDiscard)out.push(`このターン捨てた枚数×${s.scaleDiscard}ダメージ追加`);if(s.scaleRetrieve)out.push(`このターン回収した枚数×${s.scaleRetrieve}ダメージ追加`);
    if(s.sealChoose)out.push('手札を1枚戦闘中だけ除外');if(s.bonusDmg)out.push(`異なる${s.formatCount}形式正解で＋${s.bonusDmg}ダメージ`);
    if(s.bonusBlock)out.push(`異なる${s.formatCount}形式正解で防御＋${s.bonusBlock}`);
    if(s.scaleUnique)out.push(`このターン使った異なるSKILL数（最大5）×${s.scaleUnique}ダメージ追加`);
    if(s.scaleUsed)out.push(`USEDの枚数（最大10）×${s.scaleUsed}ダメージ追加`);
    if(s.consumeBlock)out.push(`自分の防御を最大${s.consumeBlock}消費し、その2倍をダメージに追加`);
    if(s.lowHpBonus)out.push(`自分のHPが半分以下なら＋${s.lowHpBonus}ダメージ`);
    if(s.bonusBlockPerEnemy)out.push(`生存する敵1体につき防御＋${s.bonusBlockPerEnemy}`);
    if(s.drawIfGuard)out.push(`使用後に防御${s.drawIfGuard}以上なら1枚ドロー`);
    if(s.healIfGuard)out.push(`使用後に防御${s.healIfGuard}以上ならHP＋5`);
    return out.join(' ＋ ');
  };
  // Hand cards intentionally use short labels. The question panel shows the full effect.
  const briefEffect = s => {
    const parts=[];
    if(s.dmg)parts.push(`${s.range>=3?'全体':s.range===2?'2体':''}${s.dmg}ダメ${s.pierce?'・貫通':''}`);
    if(s.heal)parts.push(`回復${s.heal}`);
    if(s.healPct)parts.push(`HP${s.healPct}%回復`);
    if(s.block)parts.push(`防御${s.block}`);
    if(s.seedAtBlock)parts.push(`使用前の防御${s.seedAtBlock}以上で芽＋1`);
    if(s.recoveryBlock)parts.push(`このターンにUSED回収済みなら防御＋${s.recoveryBlock}`);
    if(s.cancel)parts.push('攻撃を封じる');
    if(s.weaken)parts.push(`敵攻撃−${s.weaken}`);
    if(s.buff)parts.push('次の攻撃×2');
    if(s.nextPlus)parts.push(`次攻撃+${s.nextPlus}`);
    if(s.draw)parts.push(`${s.draw}枚引く`);
    if(s.retrieve)parts.push(`USED${s.retrieve}枚回収`);
    if(s.discard)parts.push(`${s.discard}枚捨てる`);
    if(s.carry)parts.push(`防御${s.carry}持越`);
    if(s.replay)parts.push('USED1枚をAP0で再使用');if(s.blockStrike)parts.push(`防御×${s.blockStrike}攻撃${s.pierce?'・貫通':''}`);
    if(s.grow)parts.push(`芽×${s.grow}追加・使用後芽+1`);if(s.scaleGrow)parts.push(`芽×${s.scaleGrow}追加`);
    if(s.growGain)parts.push(`芽+${s.growGain}`);if(s.killAp)parts.push('撃破でAP+1');if(s.chainAp)parts.push('連続攻撃でもAP+1');if(s.killSplash)parts.push(`撃破で全体${s.killSplash}追加`);if(s.killDraw)parts.push('撃破でドロー');
    if(s.reserveAp)parts.push(`残AP最大${s.reserveAp}持ち越し`);
    if(s.executeHalf)parts.push(`HP半分以下に＋${s.executeHalf}`);
    if(s.exhaustOnCorrect)parts.push('正解で消滅');
    if(s.discardChoose)parts.push('手札1枚破棄');if(s.scaleDiscard)parts.push(`破棄枚数×${s.scaleDiscard}追加`);if(s.scaleRetrieve)parts.push(`回収枚数×${s.scaleRetrieve}追加`);
    if(s.sealChoose)parts.push('手札1枚SEAL');if(s.bonusDmg)parts.push(`${s.formatCount}形式で+${s.bonusDmg}ダメ`);if(s.bonusBlock)parts.push(`${s.formatCount}形式で防御+${s.bonusBlock}`);
    if(s.scaleUnique)parts.push(`異なるSKILL×${s.scaleUnique}追加`);
    if(s.scaleUsed)parts.push(`USED×${s.scaleUsed}追加`);
    if(s.consumeBlock)parts.push(`防御を攻撃に変換（最大${s.consumeBlock}）`);
    if(s.lowHpBonus)parts.push(`HP半分以下で+${s.lowHpBonus}`);
    if(s.bonusBlockPerEnemy)parts.push(`敵1体につき防御+${s.bonusBlockPerEnemy}`);
    if(s.drawIfGuard)parts.push(`防御${s.drawIfGuard}以上で1枚引く`);
    if(s.healIfGuard)parts.push(`防御${s.healIfGuard}以上で回復5`);
    return parts.join('・');
  };
  let deckFilter='all';
  const DECK_TYPES={attack:'攻撃',guard:'防御',heal:'回復',tactic:'補助'};
  function deckInventory(){
    const preparing=state.phase==='intro';
    const cards=[...Array(preparing?5:state.basicAttack).fill('Attack'),...Array(preparing?3:state.basicGuard).fill('Guard'),...(preparing?LOADOUTS[state.loadout].cards:state.owned)];
    const counts=new Map();for(const name of cards)counts.set(name,(counts.get(name)||0)+1);
    return {preparing,cards,entries:[...counts].map(([name,count])=>({name,count,skill:getSkill(name)}))};
  }
  function renderDeck(){
    const {preparing,cards,entries}=deckInventory();
    const counts=Object.fromEntries(Object.keys(DECK_TYPES).map(type=>[type,cards.filter(name=>getSkill(name).type===type).length]));
    const avg=cards.length?(cards.reduce((sum,name)=>sum+getSkill(name).ap,0)/cards.length).toFixed(1):'0';
    $('deckSummary').innerHTML=`<div><strong>${cards.length}</strong><small>総枚数</small></div><div><strong>${avg}</strong><small>平均AP</small></div><div><strong>${entries.length}</strong><small>種類</small></div>`;
    $('deckTypes').innerHTML=Object.entries(DECK_TYPES).map(([type,label])=>`<span class="deck-type-count ${type}"><b>${counts[type]}</b> ${label}</span>`).join('');
    $('deckFilters').querySelectorAll('[data-deck-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.deckFilter===deckFilter)));
    const visible=entries.filter(({skill})=>deckFilter==='all'||skill.type===deckFilter).sort((a,b)=>{
      const rank={SR:0,R:1,N:2,BASIC:3},type={attack:0,guard:1,heal:2,tactic:3};
      return (type[a.skill.type]-type[b.skill.type])||(rank[a.skill.rank]-rank[b.skill.rank])||a.name.localeCompare(b.name);
    });
    $('deckCards').innerHTML=visible.map(({name,count,skill:s})=>`<details class="deck-entry ${s.type}"><summary><span class="deck-ap">${s.ap}</span><span class="deck-entry-name"><strong>${escapeHtml(s.label)}</strong><small>${DECK_TYPES[s.type]} · ${s.rank}${buildFamily(name)?' · '+buildFamily(name):''}</small></span><span class="deck-entry-count">×${count}</span><span class="deck-entry-chevron">⌄</span></summary><div class="deck-entry-detail">${escapeHtml(effects(s))}<span>${escapeHtml(FMT[s.format])}</span></div></details>`).join('')||'<div class="deck-empty">該当するカードはありません。</div>';
    $('deckHint').textContent=preparing?'出撃後に獲得したSKILLもここで確認できます。':'カードをタップすると効果と問題形式を確認できます。';
  }
  function showDeck(){deckFilter='all';renderDeck();$('deckOverlay').hidden=false;}
  const cardHtml = (name,idx,choice=false) => {const s=getSkill(name),cost=choice?s.ap:state.freeReplayCard===name?0:cardCost(name,s);const canPlay=choice || (cost<=state.ap && !(baseName(name)==='Command'&&state.commandUsed) && !(s.replay&&state.replayUsed) && !(s.reserveAp&&state.reserveUsed));
    return `<button type="button" class="skill-card ${s.type} ${s.rank==='R'||s.rank==='SR'?'rare':''} ${!canPlay?'unplayable':''} ${!choice&&idx===selectedHandIndex?'hand-selected':''}" data-${choice?'reward':'card'}="${choice?escapeHtml(name):idx}" ${choice&&!canPlay?'disabled':''} data-playable="${canPlay}" aria-pressed="${!choice&&idx===selectedHandIndex}" aria-label="${escapeHtml(s.label)}、${cost}AP、${escapeHtml(effects(s))}">
      <span class="cost">${cost}</span><span class="rank">${s.rank}</span><span class="glyph">${s.icon}</span><strong>${escapeHtml(s.label)}</strong>
      <span class="effect" title="${escapeHtml(effects(s))}">${escapeHtml(briefEffect(s))}</span><span class="format">✦ ${choice&&buildFamily(name)?buildFamily(name)+' · ':''}${state.dungeon===2&&s.format==='word'?'日→英 / 音声':FMT[s.format]}</span></button>`;};
  function renderDungeonPicker(){
    $('examGrade').value=String(state.examGrade);
    const checkpoint=readCheckpoint();
    $('resumeBtn').hidden=!checkpoint;
    if(checkpoint){
      const title=(DUNGEONS[checkpoint.dungeon]||DUNGEONS[1]).title;
      const area=Number.isInteger(checkpoint.stage)?' · エリア '+(checkpoint.stage+1):'';
      $('resumeBtn').textContent=title+'を再開（'+(checkpoint.examGrade===1?1:2)+'級 · ACT '+checkpoint.act+area+'）';
    }
    const pageCount=Math.ceil(Math.max(4,...Object.keys(DUNGEONS).map(Number))/DUNGEON_PAGE_SIZE);
    dungeonMapPage=Math.min(dungeonMapPage,pageCount-1);
    const entries=Array.from({length:DUNGEON_PAGE_SIZE},(_,i)=>dungeonMapPage*DUNGEON_PAGE_SIZE+i+1);
    $('dungeonMapPager').hidden=pageCount<=1;$('dungeonMapPage').textContent=`${dungeonMapPage+1} / ${pageCount}`;
    $('dungeonMapPrev').disabled=dungeonMapPage===0;$('dungeonMapNext').disabled=dungeonMapPage>=pageCount-1;
    $('dungeonPicker').innerHTML=entries.map(stage=>{
      const d=DUNGEONS[stage],ready=!!d&&(stage===1||stage2Unlocked());
      const active=stage===state.dungeon&&ready,number=String(stage).padStart(2,'0');
      const status=!d?'COMING SOON':!ready?'LOCKED':(statsFor(stage).clears||0)>0?'CLEARED':'OPEN';
      const statusLabel=status==='LOCKED'?'STAGE 01クリアで解放':status==='COMING SOON'?'COMING SOON':status;
      const artStyle=d?.art?` style="--dungeon-image:url('${escapeHtml(d.art)}')"`:'';
      return `<button type="button" class="dungeon-map-card stage-${stage} ${active?'selected':''} ${!ready?'locked':''}" data-dungeon="${stage}" aria-pressed="${active}" aria-label="${d?escapeHtml(d.title):'未公開のダンジョン'} ${statusLabel}" ${!ready?'disabled':''}>
        <span class="map-card-art ${d?.art?'has-art':''}"${artStyle}><span class="map-card-gate" aria-hidden="true"></span><span class="map-card-art-note" aria-hidden="true">ARTWORK ${number}</span><span class="map-card-index">${number}</span></span>
        <span class="map-card-copy"><span class="map-card-headline"><strong>${d?escapeHtml(d.title):'？？？'}</strong><span class="map-card-status">${statusLabel}</span></span><small>${d?escapeHtml(d.lead):'未公開'}</small></span>
      </button>`;
    }).join('');
    const d=DUNGEONS[state.dungeon];$('dungeonEyebrow').textContent=`DUNGEON ${String(state.dungeon).padStart(2,'0')}`;$('dungeonTitle').textContent=d.title;$('dungeonLead').textContent=d.lead;
    const scene=$('intro').querySelector?.('.dungeon-scene');if(scene)scene.dataset.dungeon=String(state.dungeon);
    const sceneArt=$('dungeonSceneArt'),departureArt=d.departureArt||d.art;
    sceneArt.style?.setProperty?.('--dungeon-image',departureArt?`url("${departureArt}")`:'none');sceneArt.classList?.toggle?.('has-art',!!departureArt);
    renderRunStats();
  }
  let companions=[];
  function refreshCompanions(){
    companions=window.readDungeonCompanions?.()||[];
  }
  refreshCompanions();
  let ownedSkillIds=new Set();
  let skillInventoryReady=false;
  function refreshCarryInventory(){
    ownedSkillIds.clear();
    skillInventoryReady=false;
    const profiles=window.GOIMONProfiles;
    if(!profiles||profiles.currentAccount()!==profiles.account)return;
    try{
      const storage=window.GOIMONStorage;
      const level=storage.getItem('zensho_level_v1')==='2'?'2':'1';
      const inventory=window.GoimonItemStore.readState(storage,level);
      const ownedNames=new Set(window.GoimonBattleCatalog.skills
        .filter(item=>inventory.owned.skills[item.id]>0)
        .map(item=>item.name.split('／')[0]));
      ownedSkillIds=new Set(Object.keys(skills).filter(id=>ownedNames.has(skills[id].label)));
      skillInventoryReady=true;
    }catch{ /* An unreadable inventory offers no carry-in cards. */ }
  }
  refreshCarryInventory();
  const carryChoices=()=>[...availableSkills(),...(state.dungeon===1?['Spark','Shelter']:[])].filter(id=>ownedSkillIds.has(id));
  const selectedCompanion=()=>companions.find(c=>c.id===state.companionId)||companions[0];
  const selectedCarry=()=>state.selectedCarrySkills??LOADOUTS[state.loadout].cards;
  const carryNames=()=>[...new Set(selectedCarry())].filter(id=>carryChoices().includes(id)).slice(0,3);
  function saveSetup(){storeJson(SETUP_KEY,{examGrade:state.examGrade,companionId:state.companionId,skills:state.selectedCarrySkills,dungeon:state.dungeon});}
  function companionArt(c,small=false){return c.image?`<img src="${escapeHtml(c.image)}" alt="" loading="lazy">`:`<span class="goimon-sigil ${small?'small':''}" aria-hidden="true">${escapeHtml(c.sigil||'✧')}</span>`;}
  function renderSelectedCompanion(){
    const c=selectedCompanion();
    state.companionId=c?.id||null;
    $('startBtn').disabled=!c;
    $('resumeBtn').disabled=!c;
    $('companionPickOpen').disabled=!c;
    $('signatureDetailOpen').disabled=!TYPE_EFFECTS[c?.type];
    if(!c){
      $('companionSmallArt').innerHTML='';
      $('companionName').textContent='出撃できるゴイモンがいません';
      $('companionForm').textContent='ホームで育成を始めてください。';
      $('signatureName').textContent='';
      $('introCompanionImage').hidden=true;
      $('battleCompanionImage').hidden=true;
      return;
    }
    $('companionSmallArt').innerHTML=companionArt(c,true);
    $('companionName').textContent=c.name;$('companionForm').textContent=`${TYPE_LABELS[c.type]||c.species} · ${c.form||'成長体'}`;
    $('signatureName').textContent=TYPE_EFFECTS[c.type]?`${TYPE_LABELS[c.type]}の固有特性`:'ダンジョン固有特性なし';
    const introImg=$('introCompanionImage'),battleImg=$('battleCompanionImage');
    for(const img of [introImg,battleImg]){if(c.image){img.src=c.image;img.hidden=false;}else{img.hidden=true;}}
    const stage=$('heroUnit');stage?.setAttribute?.('data-companion-type',c.type);stage?.setAttribute?.('data-sigil',c.image?'':c.sigil||'✧');stage?.classList?.toggle?.('without-art',!c.image);
    const pet=$('intro').querySelector?.('.intro-pet');if(pet){pet.setAttribute('data-sigil',c.image?'':c.sigil||'✧');pet.classList.toggle('without-art',!c.image);}
  }
  function openCompanions(){
    refreshCompanions();renderSelectedCompanion();
    $('companionRoster').innerHTML=companions.map(c=>`<button type="button" class="companion-choice ${c.id===state.companionId?'chosen':''}" data-companion="${escapeHtml(c.id)}" aria-pressed="${c.id===state.companionId}"><span class="roster-art">${companionArt(c,true)}</span><span><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.form)} · ${escapeHtml(TYPE_LABELS[c.type]||c.species)}</small></span><span class="choice-tick">${c.id===state.companionId?'✓':'›'}</span></button>`).join('');
    $('companionSourceNote').textContent='育成中・保存箱のゴイモン（1級・2級）';
    $('companionRoster').querySelectorAll('[data-companion]').forEach(b=>b.onclick=()=>{state.companionId=b.dataset.companion;renderSelectedCompanion();saveSetup();$('companionOverlay').hidden=true;});
    $('companionOverlay').hidden=false;
  }
  function showSignature(){const c=selectedCompanion();$('signatureTitle').textContent=c.signatureSkill?.name||`${TYPE_LABELS[c.type]}の固有SKILL`;
    $('signatureEffect').textContent=c.signatureSkill?.effect||TYPE_EFFECTS[c.type];
    $('signatureUnlockNote').textContent=c.signatureSkill?.unlockNote||`固有特性は初戦から発動します。ACTボスの報酬「TYPE BOOST」でさらに強化：${TYPE_BOOST_EFFECTS[c.type]}`;
    $('signatureOverlay').hidden=false;
  }
  function renderLoadouts(){
    const selected=carryNames();
    $('loadouts').innerHTML=[0,1,2].map(i=>{const id=selected[i],s=id&&getSkill(id);return `<button type="button" class="carry-slot ${s?'filled':'empty'}" data-carry-slot="${i}">${s?`<span class="carry-glyph">${s.icon}</span><span><strong>${escapeHtml(s.label)}</strong><small>${s.ap}AP · ${escapeHtml(FMT[s.format])}</small></span>`:`<span class="carry-plus">＋</span><span>SKILL ${String(i+1).padStart(2,'0')}</span>`}</button>`;}).join('');
    $('skillPickCount').textContent=`${selected.length}/3`;
    $('loadouts').querySelectorAll('[data-carry-slot]').forEach(b=>b.onclick=openSkills);
  }
  function renderSkillPool(){
    const selected=carryNames();$('skillSelectedCount').textContent=`${selected.length} / 3`;
    $('carryPool').innerHTML=carryChoices().map(id=>{const s=getSkill(id),active=selected.includes(id);return `<button type="button" data-carry="${escapeHtml(id)}" class="carry-option ${active?'chosen':''}" aria-pressed="${active}"><span class="carry-icon">${s.icon}</span><span><strong>${escapeHtml(s.label)} <em class="carry-ap">${s.ap} AP</em></strong><small>${escapeHtml(effects(s))}</small><span class="carry-format">${escapeHtml(FMT[s.format])} · ${s.rank}</span></span><span class="choice-tick">${active?'✓':'＋'}</span></button>`;}).join('')||'<p>持ち込めるSKILLはまだありません。</p>';
    $('carryPool').querySelectorAll('[data-carry]').forEach(b=>b.onclick=()=>{const id=b.dataset.carry,now=carryNames();if(now.includes(id))state.selectedCarrySkills=now.filter(x=>x!==id);else if(now.length<3)state.selectedCarrySkills=[...now,id];renderSkillPool();renderLoadouts();saveSetup();});
  }
  function openSkills(){refreshCarryInventory();renderLoadouts();renderSkillPool();$('skillSourceNote').textContent=skillInventoryReady?'所持しているSKILLのうち、このダンジョンに対応するものを3種類まで選べます。':'所持品を読み込めませんでした。本体の「技・装備」で所持品を確認してから開き直してください。';$('skillOverlay').hidden=false;}
  const ENEMY_GUIDE={
    attacker:['通常攻撃が中心','攻撃予告を確認して、防御か速攻を選ぼう。'],
    conductor:['仲間の攻撃を強化','複数戦なら指揮役を先に倒すと被害を抑えやすい。'],
    tank:['防御と通常攻撃を交互に使用','防御を積む前に攻めるか、防御無視のSKILLが有効。'],
    variable:['防御と強い攻撃を交互に使用','次の行動を見てターンごとに戦術を変えよう。'],
    charger:['力をためた次のターンに大技','ためるターンに攻め、次ターンに防御を用意。'],
    sentinel:['仲間へ防御を配る','守護役を先に倒して敵の連携を崩そう。'],
    support:['仲間への回復・防御支援','先に回復役を倒すと長期戦を避けられる。'],
    counter:['こちらの防御が10以上になると防御崩し','守りを積みすぎると攻撃が変化。予告を確認。'],
    swarm:['連続攻撃を織り交ぜる','連打のターンに備え、防御を残そう。'],
    leech:['定期的なHP吸収攻撃','吸収のターンは防御でダメージを止めたい。'],
    inventory:['不良在庫カードを山札に混ぜる','追加されるのは一度に最大2枚。正解して除外しよう。'],
    inflator:['ターン経過で攻撃が強くなる','戦闘が長引くほど危険。短期決戦を意識。'],
    breaker:['同じカードを2回使うと追撃','予告が出ているターンは異なるカードを使おう。'],
    trickster:['3ターンに一度、強い攻撃','強攻撃の予告に合わせて防御を組み立てよう。'],
    sapper:['3ターンごとに次ターンの防御を弱める','値下げ中は防御カードの獲得値が1枚につき−4。攻撃・回復へ切り替えるのも有効。'],
    exchange:['強い攻撃の代わりに自身にも同じダメージ','防御で耐えれば、自滅のダメージを利用できる。'],
    taxer:['定期的に強力な徴収攻撃','予告に合わせて防御するか、大技までに倒そう。']
  };
  // In-world profiles are distinct from combat advice: the monster book is
  // also a collection of characters, not just a list of enemy mechanics.
  const ENEMY_PROFILES={
    'ラーメン魔人HODAKA':'全国津々浦々のラーメンを食べ歩く、博学なラーメン魔人。旅先では郷土資料館にも足を運び、その土地の歴史を調べるのが楽しみ。おすすめの一杯を尋ねると、なぜその町にその味が根づいたのかまで教えてくれる。',
    '熱血簿記RIKI':'野球と簿記の二刀流を貫く熱血教師。グラウンドではバットを振り、教室では赤ペンを握る。ノックの最後の一球にも、放課後に生徒が持ってきた仕訳の一問にも、いつだって全力で付き合う。',
    '女社長MIKA':'世界を股にかける、やり手の国際経営者。海外の取引先との商談をまとめると、間髪入れずに各売り場へ指示を飛ばす。百貨店の最上階に決裁待ちの書類がたまらないのは、彼女の判断がとにかく速いからだ。',
    'そろばん小僧':'使い込まれたそろばんに魂が宿った、ちょっと生意気な計算妖怪。珠をはじく音が聞こえたら、今日も誰かの帳簿を勝手に検算している。',
    '仕訳じじい':'何百年も帳簿をつけ続ける、経理の世界の古参妖怪。借方と貸方がぴたりと合う瞬間だけ、こわばった顔が満足そうにゆるむ。',
    '減価償却ゾンビ':'長く働きすぎて、すっかりくたびれた元経理担当。服も体もボロボロなのに、電卓だけは決して手放さない。',
    'イフキツネ':'「もしも」を考えるのが大好きな、ずる賢いキツネ。正解と不正解の札を使い分け、相手の選択をこっそり試してくる。',
    'ルックアップテング':'巨大な一覧表を持ち歩く、調べもの好きの天狗。長い鼻で表をなぞれば、どんな数字もたちまち見つけ出すという。',
    'SWOT四面鬼':'強み・弱み・機会・脅威をそれぞれ別の顔で語る四面の鬼。四つの意見がまとまる日はめったにないが、そのぶん観察眼は鋭い。',
    'クーリングオフ雪女':'冷たい風と一緒に現れる、契約書を抱えた雪女。熱くなって交わした約束も、彼女の息がかかれば一気に冷静になる。',
    'デフレガリガリ':'値札が下がるたびに少しずつやせてしまった、景気の妖怪。小さな値札を大切に持ち、安くなったものを寂しそうに見つめる。',
    'サムガッパ':'数字を集めるのが趣味の、几帳面なカッパ。川辺で拾った珠を袋にため込み、合計が増えるたびに得意げに数え直す。',
    '貸し倒れ幽霊':'返ってこないお金への未練から生まれた、帳簿を抱える幽霊。古い台帳のページをめくっては、消えた売掛金の行方を探している。',
    '棚卸ぬらりひょん':'閉店後の倉庫にいつの間にか現れる、在庫調査の妖怪。棚の奥の売れ残りまで見逃さず、静かにチェックをつけて回る。',
    'インフレ入道':'物の値段が上がるほど体まで膨らむ、巨大な赤い入道。大きな腹はすでに限界に見えるが、本人はまだまだ成長するつもりらしい。',
    '独禁法の番犬':'市場の門を守る三つ首の番犬。三つの頭がそれぞれ別の方向を見張り、ひとりじめをたくらむ者を決して見逃さない。',
    'ランビトクイーン':'大きなサイコロで運命を決める、気まぐれな女王。次に何が起こるかは女王自身にもわからず、その偶然さえ楽しんでいる。',
    '値下げオーガ':'巨大な値札のこん棒を振り回す、乱暴な赤鬼。「もっと安く！」が口ぐせで、手にした値札は叩くたびにぼろぼろになる。',
    '等価交換ジョーカー':'赤いハートと青い盾を天秤のように扱う道化師。何かを得るには何かを差し出すという独自のルールで、危険な取引を持ちかける。',
    '悪徳税理士':'口のうまさと計算の速さを自慢する、うさんくさい税理士の妖怪。立派な電卓と重そうな金貨袋を見せびらかし、怪しい話を持ちかける。'
  };
  const bestiaryRoster=[...normalMonsters,...eliteMonsters,...Object.values(bossMonsters)];
  let inspectedEnemy=null;
  function renderBestiarySummary(){if($('bestiarySummary'))$('bestiarySummary').textContent=`${seenEnemyKinds.size}/${bestiaryRoster.length}`;if($('bestiaryTotal'))$('bestiaryTotal').textContent=`${seenEnemyKinds.size} / ${bestiaryRoster.length}`;}
  function showBestiary(openDetail=false){
    const roster=bestiaryRoster,revealed=roster.filter(e=>seenEnemyKinds.has(e.name));
    if(!inspectedEnemy||!seenEnemyKinds.has(inspectedEnemy))inspectedEnemy=revealed[0]?.name||null;
    const list=$('bestiaryList'),previousScroll=list.scrollTop;
    list.innerHTML=roster.map((e,i)=>{const met=seenEnemyKinds.has(e.name),elite=i>=normalMonsters.length;
      const heading=i===0?'<div class="bestiary-group-heading"><span>通常モンスター</span><small>11種</small></div>':i===normalMonsters.length?'<div class="bestiary-group-heading"><span>強敵モンスター</span><small>6種</small></div>':i===normalMonsters.length+eliteMonsters.length?'<div class="bestiary-group-heading"><span>ボス</span><small>3種</small></div>':'';
      const art=met?(window.enemyArt?window.enemyArt(e.kind,e.name):escapeHtml(e.icon)):'<span class="bestiary-question-mark">?</span>';
      return `${heading}<button type="button" class="bestiary-entry ${met?'met':'unknown'} ${elite?'elite':''} ${inspectedEnemy===e.name?'active':''}" aria-pressed="${met&&inspectedEnemy===e.name}" ${met?`data-bestiary="${escapeHtml(e.name)}"`:'disabled'}><span class="bestiary-thumb">${art}</span><span class="bestiary-entry-copy"><small>No.${String(i+1).padStart(2,'0')} · ${met?escapeHtml(ENEMY_ROLES[e.kind]):'未発見'}</small><strong>${met?escapeHtml(e.name):'？？？'}</strong></span><span class="bestiary-entry-chevron" aria-hidden="true">${met?'›':'·'}</span></button>`;
    }).join('');
    list.scrollTop=previousScroll;
    list.querySelectorAll('[data-bestiary]').forEach(b=>b.onclick=()=>{inspectedEnemy=b.dataset.bestiary;showBestiary(true);});
    const e=roster.find(m=>m.name===inspectedEnemy);
    if(!e){$('bestiaryDetail').innerHTML='<div class="bestiary-locked"><span>◇</span><strong>まだ出会っていない</strong><p>探索でモンスターに出会うと図鑑に記録されます。</p></div>';}
    else{const [pattern,tip]=ENEMY_GUIDE[e.kind]||['行動パターンを確認','敵のNEXTを見てカードを選ぼう。'];
      const number=roster.indexOf(e)+1,elite=number>normalMonsters.length;
      $('bestiaryDetail').innerHTML=`<button type="button" class="bestiary-back">〈 モンスター一覧に戻る</button><div class="bestiary-identity"><span class="bestiary-category">No.${String(number).padStart(2,'0')} · ${e.kind==='boss'?'BOSS':elite?'ELITE':'MONSTER'} · ${escapeHtml(ENEMY_ROLES[e.kind])}</span><h3>${escapeHtml(e.name)}</h3></div><div class="bestiary-profile"><div class="bestiary-portrait" role="img" aria-label="${escapeHtml(e.name)}の姿">${window.enemyArt?window.enemyArt(e.kind,e.name):escapeHtml(e.icon)}</div><section class="bestiary-lore"><h4>どんなモンスター？</h4><p>${escapeHtml(ENEMY_PROFILES[e.name]||'商業の世界からやってきた、不思議なモンスター。')}</p></section></div><div class="bestiary-guides"><section class="bestiary-guide-card"><span>行動パターン</span><p>${escapeHtml(pattern)}</p></section><section class="bestiary-guide-card tip"><span>攻略のコツ</span><p>${escapeHtml(tip)}</p></section></div>`;
      $('bestiaryDetail').querySelector('.bestiary-back').onclick=()=>{$('bestiaryOverlay').querySelector('.bestiary-dialog').classList.remove('show-detail');};
    }
    $('bestiaryOverlay').querySelector('.bestiary-dialog').classList.toggle('show-detail',openDetail);
    $('bestiaryDetail').scrollTop=0;
    renderBestiarySummary();$('bestiaryOverlay').hidden=false;
  }
  function showUsed(){
    const counts=new Map();for(const id of state.used)counts.set(id,(counts.get(id)||0)+1);
    $('usedTotal').textContent=`${state.used.length}枚`;
    $('usedList').innerHTML=[...counts].map(([name,count])=>{const s=getSkill(name);if(!s)return '';return `<details class="used-card ${s.type}"><summary><span class="used-ap">${s.ap}</span><span><strong>${escapeHtml(s.label)}</strong><small>${escapeHtml(FMT[s.format])}</small></span><b>×${count}</b><span>⌄</span></summary><p>${escapeHtml(effects(s))}</p></details>`;}).join('')||'<div class="used-empty">USEDはまだありません</div>';
    $('usedOverlay').hidden=false;
  }
  function setScreen(name){state.phase=name;$('intro').hidden=name!=='intro';$('battle').hidden=name!=='battle';$('choiceScreen').hidden=name!=='choice';$('routeScreen').hidden=name!=='route';$('runResources').hidden=name==='intro';renderResources();
    const kind=state.currentEncounter?.nodeType;
    // Map/rewards/rest use exploration music. A mixed fight with any elite uses the elite cue.
    const battleCue=kind==='boss'||state.enemies?.some(e=>e.hp>0&&e.kind==='boss')?'boss'
      :kind==='elite'||state.enemies?.some(e=>e.hp>0&&eliteMonsters.some(elite=>elite.name===e.name))?'elite':'normal';
    window.GoimonDungeonBgm?.setMode(name==='intro'?'silent':name==='battle'?battleCue:'map');
    window.scrollTo({top:0,behavior:'smooth'});}
  // Cinematics are presentation-only: gameplay and checkpoint state are committed first.
  // Players can always dismiss the current sequence, including on reduced-motion devices.
  let activeStory=null;
  function endStory(){const run=activeStory;if(!run)return;activeStory=null;if(run.timer)clearTimeout(run.timer);$('storyOverlay').hidden=true;run.onDone?.();}
  function playStory(frames,onDone){if(activeStory)endStory();
    // Lightweight test harnesses and older embeds may not include the presentation layer.
    if(!$('storyOverlay')?.dataset){onDone?.();return;}
    const run={frames,index:0,timer:null,onDone};activeStory=run;
    const paint=()=>{
      if(activeStory!==run)return;
      const frame=frames[run.index],art=$('storyArt');
      $('storyOverlay').hidden=false;$('storyOverlay').dataset.moment=frame.moment;
      art.style.setProperty('--story-image',`url("${frame.image}")`);
      $('storyEyebrow').textContent=frame.eyebrow||'GOIMON DUNGEON';
      $('storyTitle').textContent=frame.title;
      $('storyText').innerHTML=frame.lines.map(line=>`<p>${escapeHtml(line)}</p>`).join('');
      $('storyContinue').textContent=frame.button||'スキップ';
      const pet=$('storyCompanion'),companion=selectedCompanion();
      pet.hidden=!frame.companion||!companion?.image;
      if(!pet.hidden){pet.src=companion.image;pet.alt=`${companion.name}と夜明け`;}
      if(frame.duration&&run.index<frames.length-1){run.timer=setTimeout(()=>{run.index++;paint();},frame.duration);}
      else if(frame.duration){run.timer=setTimeout(endStory,frame.duration);}
    };
    run.advance=()=>{
      if(activeStory!==run)return;
      if(run.timer){clearTimeout(run.timer);run.timer=null;}
      if(run.index<frames.length-1){run.index++;paint();}
      else endStory();
    };
    paint();
  }
  function showFirstNight(){
    playStory([{moment:'prologue',image:DUNGEONS[1].departureArt,eyebrow:'THE FIRST NIGHT',title:'真夜中の百貨店',lines:[
      '午前0時。閉店したはずの百貨店に、明かりがともる。',
      '店内には、奇妙なモンスターたち。',
      '誰もいない受付から「おかえりなさいませ」と声がした。ここへ来るのは初めてなのに。',
      '最上階の金庫を開ければ、この夜は終わるという。'
    ],button:'冒険を始める'}],()=>{try{localStorage.setItem(INTRO_STORY_KEY,'1');}catch(e){}});
  }
  function showReturnNight(){
    const lines=
      ['たしかに朝を迎えた。最後の金庫を開け、百貨店を出たはずだった。',
        'それなのに、入口の大時計はまた午前0時を指している。',
        '受付の来店記録には、もう「お帰りなさい」と書かれていた。'];
    playStory([{moment:'prologue',image:DUNGEONS[1].departureArt,eyebrow:'THE SAME NIGHT',title:'終わったはずの夜',lines,button:'百貨店へ入る'}],()=>{
      try{localStorage.setItem(RETURN_STORY_KEY,'1');}catch(e){}
    });
  }
  function showActInterlude(act){
    const revisiting=(statsFor(1).clears||0)>0;
    const companionName=selectedCompanion().name;
    const frame=act===1?
      {moment:'act-clear',image:DUNGEONS[1].battleArt[0],eyebrow:'ACT 1 CLEAR',title:'眠らない売り場',lines:[
        '店内の明かりが、次々と灯った。',
        revisiting?`館内放送が、今夜の相棒「${companionName}」の名前を告げた。誰も登録していないはずなのに。`:'館内放送が「おかえりなさいませ」と繰り返す。返事をする客は、ほかにいない。'
      ],button:'次へ'}:
      {moment:'act-clear',image:DUNGEONS[1].battleArt[1],eyebrow:'ACT 2 CLEAR',title:'地下の秘密倉庫',lines:[
        '重い扉が開く。最上階への道が現れた。',
        '散らばった帳簿には「23:59」の打刻が何行も並んでいる。',
        revisiting?'新しいページには、今夜の入店時刻がすでに記されていた。':'最後の「退店確認」欄だけが、何度も貼り直されていた。'
      ],button:'次へ'};
    playStory([frame]);
  }
  function showFinalBossOmen(){
    const revisiting=(statsFor(1).clears||0)>0;
    playStory([{moment:'boss-omen',image:DUNGEONS[1].battleArt[2],eyebrow:'ACT 3 · THE FINAL VAULT',title:'覚えている女社長',lines:revisiting?[
      '最上階の金庫室。女社長MIKAは、こちらが名乗る前に微笑んだ。',
      '「前は、あと少しで夜明けでしたのに」',
      '前に来た覚えはない。その言葉だけが、妙にはっきり耳に残る。'
    ]:[
      '金庫室の扉は、触れる前にひとりでに開いた。',
      '女社長MIKAが、待ちわびたように微笑む。',
      '「おかえりなさい。今夜こそ、無事にお帰りになれるといいですね」'
    ],button:'決戦へ進む'}]);
  }
  function showDawnSequence(){const d=DUNGEONS[1];
    playStory([
      {moment:'vault',image:d.clearVaultArt||d.battleArt[2],eyebrow:'THE FINAL VAULT',title:'最後の鍵が外れた',lines:['金庫から、まばゆい光があふれる。','その奥で、誰もいないレジが一度だけ鳴った。'],button:'次へ',tapToAdvance:true},
      {moment:'dawn',image:d.dawnArt||d.art,eyebrow:'THE CLOCK STARTS',title:'時計が動き始めた',lines:['真夜中の百貨店に、朝が訪れる。'],button:'次へ',tapToAdvance:true},
      {moment:'complete',image:d.dawnArt||d.art,eyebrow:'DUNGEON CLEAR',title:'夜明けの百貨店',lines:['3つのACTを踏破した！'],button:'結果を見る',companion:true}
    ]);
  }
  const JOURNAL=[
    {id:'receipt',number:'01',title:'返品不可のレシート',condition:'この百貨店に3回挑戦する',unlocked:s=>(s.attempts||0)>=3,
      image:DEPARTMENT_ART+'entrance.jpg',leadLines:['誰もいないレジが、ひとりでに紙を吐き出した。','購入時刻は、まだ来ていない明日の午前0時。'],lines:['品名「帰宅」。数量「1」。','購入者の欄には、今夜連れてきたゴイモンの名前。','いちばん下にだけ、赤い文字で「返品不可／受渡未了」。']},
    {id:'ledger',number:'02',title:'帰れなかった従業員',condition:'ACT 2のボスを1度倒す',unlocked:s=>(s.act2Bosses||0)>=1,
      image:DEPARTMENT_ART+'act2.jpg',leadLines:['地下倉庫の帳簿は、どのページも計算が合っていた。','ただ一列だけ、数字ではなく人の名前が並んでいる。'],lines:['それは閉店前、この店で働いていた従業員の名簿。','全員の退勤時刻は「23:59」。','「帰宅した人数：0」の数字だけが、何年経っても変わらない。']},
    {id:'morning',number:'03',title:'夜明けの集合写真',condition:'初めて3 ACTをクリアする',unlocked:s=>(s.clears||0)>=1,
      image:DEPARTMENT_ART+'dawn.jpg',leadLines:['朝が来た。扉は開き、止まっていた時計も動き出す。','それでも相棒は、誰もいない展示室を見つめていた。'],lines:['壁には、今夜の冒険を写した古い集合写真がある。','写真の自分は、まだ着たことのない服を着ていた。','背後に立つ店員だけは、すべての写真に同じ顔で写っている。']},
    {id:'invitation',number:'04',title:'三人目のお客様',condition:'異なる2体のゴイモンでクリアする',unlocked:s=>(s.clearedCompanions||[]).length>=2,
      image:DEPARTMENT_ART+'vault-open.jpg',leadLines:['別のゴイモンと金庫を開けた瞬間、奥で古いレジが鳴った。','店内には、もう誰もいないはずだった。'],lines:['レシートには「次の行き先：こだまの迷宮」。','その下に「ご来店人数：3名様」。','自分とゴイモンを数え直したとき、すぐ後ろで足音がひとつ止まった。']}
  ];
  function journalUnlocked(){const stats=statsFor(1);return JOURNAL.filter(entry=>entry.unlocked(stats));}
  function renderJournalSummary(){const unlocked=journalUnlocked();const total=JOURNAL.length;
    const summary=$('journalSummary');if(summary)summary.textContent=`${unlocked.length}/${total}`;
    const open=$('journalOpen');if(open){const unread=unlocked.some(entry=>!journalSeen.has(entry.id));open.classList?.toggle?.('has-unread',unread);open.setAttribute?.('aria-label',unread?'夜の記録：新しい物語があります':'夜の記録');}
  }
  function showJournal(){const unlocked=journalUnlocked(),stats=statsFor(1);
    $('journalCount').textContent=`${unlocked.length} / ${JOURNAL.length}`;
    $('journalEntries').innerHTML=JOURNAL.map(entry=>{const ready=entry.unlocked(stats),newItem=ready&&!journalSeen.has(entry.id);
      return `<button type="button" class="journal-entry ${ready?'unlocked':'locked'} ${newItem?'unread':''}" data-journal="${entry.id}" ${ready?'':'disabled'}><span class="journal-entry-number">${entry.number}</span><span class="journal-entry-main"><strong>${escapeHtml(ready?entry.title:'？？？？？？')}</strong><small>${escapeHtml(ready?'記録を読む':entry.condition)}</small></span><span class="journal-entry-badge">${newItem?'NEW':ready?'読む':'LOCK'}</span></button>`;
    }).join('');
    $('journalEntries').querySelectorAll('[data-journal]').forEach(btn=>btn.onclick=()=>openJournalEntry(btn.dataset.journal));
    $('journalOverlay').hidden=false;
  }
  function openJournalEntry(id){const entry=JOURNAL.find(item=>item.id===id&&item.unlocked(statsFor(1)));if(!entry)return;
    journalSeen.add(id);storeJson(JOURNAL_SEEN_KEY,[...journalSeen]);renderJournalSummary();
    $('journalOverlay').hidden=true;
    playSfx('journal');
    playStory([{moment:'record-intro',image:entry.image,eyebrow:`MIDNIGHT RECORD ${entry.number}`,title:'閉店後に残されたもの',lines:entry.leadLines,button:'次へ',tapToAdvance:true},
      {moment:'record',image:entry.image,eyebrow:`MIDNIGHT RECORD ${entry.number}`,title:entry.title,lines:entry.lines,button:'記録を閉じる'}]);
  }
  function showLatestJournalIfNew(){const unread=journalUnlocked().filter(entry=>!journalSeen.has(entry.id));if(unread.length)openJournalEntry(unread[unread.length-1].id);}
  $('storyContinue').onclick=()=>{const run=activeStory;if(run?.frames[run.index]?.tapToAdvance)run.advance();else endStory();};
  $('storyOverlay').onclick=e=>{if(e.target===$('storyOverlay')&&!activeStory?.frames[activeStory.index]?.tapToAdvance)endStory();};
  const NODE={battle:['⚔','通常戦'],elite:['☠','強敵'],event:['？','未知'],rest:['✚','休憩'],treasure:['✦','宝箱'],shop:['▣','SHOP'],boss:['🐉','ボス']};
  function makeRoute(){
    // Every complete path has 6 or 7 battles including the boss, regardless of lane.
    // SHOP is placed after the player has had time to earn COIN; other utilities stay shuffled.
    const shopFloor=random([5,6,7]);
    const remaining=shuffled([1,2,3,4,5,6,7].filter(x=>x!==shopFloor));
    const flexFloor=remaining[0],utilityFloors=new Set([shopFloor,remaining[1]]);
    const route=Array.from({length:9},(_,i)=>{
      if(i===0)return ['battle','battle','battle'];
      if(i===8)return [null,'boss',null];
      if(i===flexFloor)return shuffled(['battle','rest','event']);
      if(utilityFloors.has(i))return shuffled(i===shopFloor?['rest','treasure','shop']:['rest','treasure','event']);
      return shuffled(['battle','battle','elite']);
    });
    const edges=Array.from({length:8},(_,i)=>{
      if(i===7)return [[0,1],[1,1],[2,1]];
      return [[0,0],[1,1],[2,2],random([[1,0],[1,2]]),random([[0,1],[2,1]])];
    });
    return {route,edges};
  }
  const reachableLane=lane=>state.stage===0||state.routeEdges[state.stage-1].some(([from,to])=>from===state.routePath[state.stage-1]&&to===lane);
  function showRoute(){setScreen('route');
    $('routeActLabel').textContent=`YOUR PATH / ACT ${state.act} / 3`;
    $('routeWordRange').textContent=`${state.examGrade}級 · ${state.dungeon===2?'日→英・音声':'英→日'} · 単語 ${actWordLabel()}　｜　⚔ 通常戦　☠ 強敵　？ 未知　✚ 休憩　✦ 宝箱　▣ SHOP`;
    const pos=(i,lane)=>({x:50+100*i,y:45+75*lane});const lines=[];
    for(let i=0;i<8;i++)for(const [lane,next] of state.routeEdges[i]){const a=pos(i,lane),b=pos(i+1,next);lines.push(`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="${i<state.stage&&state.routePath[i]===lane&&state.routePath[i+1]===next?'traveled':''}"/>`);}
    $('routeMap').innerHTML=`<svg class="route-lines" viewBox="0 0 900 240" preserveAspectRatio="none" aria-hidden="true">${lines.join('')}</svg>`+state.route.flatMap((col,i)=>col.map((kind,lane)=>{if(!kind)return '';const p=pos(i,lane),active=i===state.stage&&reachableLane(lane),picked=state.routePath[i]===lane&&i<state.stage;
      return `<button class="route-node ${active?'available':''} ${picked?'picked':''} ${i<state.stage&&!picked?'faded':''}" type="button" style="left:${p.x/9}%;top:${p.y/2.4}%" data-stage="${i}" data-lane="${lane}" ${active?'':'disabled'} aria-label="${i+1}段目 ${NODE[kind][1]}${active?'へ進む':''}"><span>${NODE[kind][0]}</span></button>`;})).join('');
    const lanes=['上段','中段','下段'];
    const choices=state.route[state.stage].map((kind,lane)=>{
      if(!kind||!reachableLane(lane))return '';
      return `<button type="button" data-lane="${lane}">${lanes[lane]} · ${NODE[kind][1]}</button>`;
    }).join('');
    $('routeOptions').innerHTML=`<strong>エリア ${state.stage+1} / 9</strong><div class="route-lanes" role="group" aria-label="進める道">${choices}</div>`;
    for(const container of [$('routeMap'),$('routeOptions')]){
      container.querySelectorAll('button[data-lane]:not(:disabled)').forEach(button=>{
        button.onclick=()=>chooseRoute(Number(button.dataset.lane));
      });
    }
    saveCheckpoint();
  }
  function chooseRoute(lane){if(!reachableLane(lane))return;playSfx('confirm');const kind=state.route[state.stage][lane];state.routePath[state.stage]=lane;
    recordRun('depth');
    state.choiceOffer=null;state.choiceEvent=null;state.choiceSpecialOptions=null;
    state.currentEncounter={nodeType:kind};
    if(kind==='rest'){showChoice('camp');return;}
    if(kind==='treasure'){showChoice('treasure');return;}
    if(kind==='shop'){openShop();return;}
    if(kind==='event'){showChoice('event');return;}
    // Teach single-target tactics first; introduce synergistic pairs as the run advances.
    const mixedEligible=state.act>=2&&(state.act===3||state.stage>=4);
    const mixedChance=state.act===3?(state.stage>=5?(kind==='elite'?.70:.25):(kind==='elite'?.38:.12)):(kind==='elite'?.45:.12);
    const mixed=mixedEligible&&kind!=='boss'&&Math.random()<mixedChance;
    const normalPool=state.act===1&&state.stage<2?normalMonsters.slice(0,5):normalMonsters;
    const first=random(normalPool);
    const second=random(normalPool.filter(e=>e.name!==first.name));
    const normalPair=state.stage>=2&&Math.random()<(state.act===1?.55:state.act===2?.70:.80);
    const supportKinds=['support','conductor'];
    const lone=normalPair?first:supportKinds.includes(first.kind)?random(normalPool.filter(e=>!supportKinds.includes(e.kind))):first;
    const mixedMinions=normalMonsters.filter(e=>['support','sentinel','conductor','counter','inventory'].includes(e.kind));
    const hardMix=(a,b)=>(a.kind==='exchange'&&b.kind==='support')||(a.kind==='inflator'&&['support','sentinel','counter'].includes(b.kind))||(a.kind==='sapper'&&b.kind==='counter');
    const pairCandidates=eliteMonsters.flatMap(a=>mixedMinions.map(b=>({a,b}))).filter(({a,b})=>state.act===3&&state.stage>=5||!hardMix(a,b));
    const {a:elitePartner,b:normalPartner}=random(pairCandidates);
    const template=kind==='boss'?{enemies:[bossMonsters[state.act]]}:mixed?{enemies:[elitePartner,normalPartner]}:kind==='elite'?{enemies:[random(eliteMonsters)]}:{enemies:normalPair?[first,second]:[lone]};
    state.currentEncounter.wordRange=wordRangeForFight(state.act,state.actFight,kind==='boss');
    const actStrength=state.act-1;
    state.currentEncounter.enemies=template.enemies.map((e,i)=>{
      const hp=Math.round((e.hp+(kind==='elite'&&!mixed?8:0)+state.stage*2+actStrength*9)*(mixed?(i===0?.78:.85):normalPair&&kind==='battle'?.82:1));
      const attack=Math.max(1,Math.round((e.attack+(kind==='elite'&&!mixed?1:0)+(state.stage>=5?1:0)+actStrength)*(mixed?(i===0?.82:.78):normalPair&&kind==='battle'?.80:1)));
      // ACT3 normal foes, including the normal half of mixed encounters, need an extra step up.
      // Elite and boss stats are intentionally unchanged by this normal-only adjustment.
      const act3Normal=state.act===3&&normalMonsters.some(m=>m.name===e.name);
      return {...e,hp:act3Normal?Math.round(hp*1.18):hp,attack:act3Normal?Math.round(attack*1.12):attack};
    });
    startBattle();
    if(state.dungeon===1&&kind==='boss'&&state.act===3)showFinalBossOmen();
  }
  function startAct(){state.stage=0;state.actFight=0;const map=makeRoute();state.route=map.route;state.routeEdges=map.edges;state.routePath=[];showRoute();}
  function start(){refreshCarryInventory();renderLoadouts();refreshCompanions();renderSelectedCompanion();if(!selectedCompanion())return;if(state.dungeon===2&&!stage2Unlocked())return;playSfx('confirm');clearCheckpoint();state.missionOwner=GoimonDungeonMission.owner();state.missionRecorded=false;state.hp=START_HP;state.maxHp=START_HP;state.act=1;state.type=selectedCompanion().type;state.typeBoost=false;state.specialBoosts=[];
    state.owned=[...carryNames()];state.specialSkillOffer=null;state.choiceSpecialOptions=null;state.questions=0;state.correct=0;state.fight=0;state.coins=0;state.artifacts=[];state.artifactActUpgrades=[];
    state.eventHistory=[];state.choiceEvent=null;
    recordRun('start');
    state.basicAttack=5;state.basicGuard=3;state.seenWords=[];state.wrongWords=[];state.battleWrongQuestions=[];state.runWrongQuestions=[];state.artifactTurnUses=new Set();state.artifactBattleUses=new Set();state.artifactDiscountUsed=false;state.artifactFreeShopUsed=false;startAct();
    if(state.dungeon===1){
      if(!statsFor(1).clears&&localStorage.getItem(INTRO_STORY_KEY)!=='1')showFirstNight();
      else if(statsFor(1).clears>0&&localStorage.getItem(RETURN_STORY_KEY)!=='1')showReturnNight();
    }}
  function draw(n){for(let i=0;i<n&&state.hand.length<MAX_HAND;i++){if(!state.deck.length){state.deck=shuffled(state.used.splice(0));}if(!state.deck.length)break;state.hand.push(state.deck.pop());
      if(state.phase==='battle'&&!state.battleOpeningDraw){state.artifactDraws++;if(hasArtifact('CashFlow')&&state.artifactDraws>=2&&!state.artifactTurnUses.has('CashFlow')){state.block+=3;state.artifactTurnUses.add('CashFlow');}}}}
  function pickCard(title,detail,candidates,choose,skip){
    if(!candidates.length){skip?.();return;}
    state.cardSelection={title};$('cardPickTitle').textContent=title;$('cardPickDetail').textContent=detail;
    $('cardPickOptions').innerHTML='';
    candidates.forEach(({name,index})=>{const s=getSkill(name),b=document.createElement('button');b.type='button';
      b.innerHTML=`<strong>${escapeHtml(s.label)}</strong><small>${escapeHtml(effects(s))} · ${FMT[s.format]}</small>`;
      b.onclick=()=>{state.cardSelection=null;$('cardPickModal').hidden=true;choose(name,index);renderBattle();};$('cardPickOptions').appendChild(b);});
    $('cardPickSkip').onclick=()=>{state.cardSelection=null;$('cardPickModal').hidden=true;skip?.();renderBattle();};
    $('cardPickModal').hidden=false;
  }
  function handChoices(){return state.hand.map((name,index)=>({name,index}));}
  function usedChoices(){return state.used.map((name,index)=>({name,index}));}
  // Upgraded cards stay upgraded while cycling through this battle's hand/USED/deck.
  // The next battle is rebuilt from state.owned, so FIFO never permanently upgrades a SKILL.
  const fifoUpgrade=card=>hasArtifact('FIFOBox')&&!card.endsWith('+')&&skills[baseName(card)]?.plus?card+'+':card;
  function takeUsed(count){
    const candidates=usedChoices().filter(x=>!['Remind','Extend','Replay'].includes(baseName(x.name)));
    if(!count||!candidates.length)return;
    pickCard('USEDから回収',hasArtifact('FIFOBox')?'FIFO Box：強化可能なSKILLは、この戦闘中＋に強化':'回収するカードを選ぼう',candidates,(name,index)=>{
      const currentIndex=state.used[index]===name?index:state.used.indexOf(name);
      if(currentIndex<0)return;
      if(state.hand.length<MAX_HAND){const card=state.used.splice(currentIndex,1)[0];state.hand.push(fifoUpgrade(card));state.recoveredTurn++;}
      if(count>1&&state.hand.length<MAX_HAND)takeUsed(count-1);
    });
  }
  function discardHand(count,drawAfter=0,seal=false){
    if(!count||!state.hand.length){if(drawAfter)draw(drawAfter);return;}
    pickCard(seal?'SEALするカード':'捨てるカード',seal?'この戦闘では戻りません':'選んだカードをUSEDに送ります',handChoices(),(name,index)=>{
      const currentIndex=state.hand[index]===name?index:state.hand.indexOf(name);
      if(currentIndex<0){if(drawAfter)draw(drawAfter);return;}
      const removed=state.hand.splice(currentIndex,1)[0];if(seal){state.sealed.push(removed);onCardExhausted();}else{state.used.push(removed);state.discardedTurn++;}
      if(count>1)discardHand(count-1,drawAfter,seal);else if(drawAfter)draw(drawAfter);
    },()=>{if(drawAfter)draw(drawAfter);});
  }
  function replayUsed(){
    if(state.replayUsed)return;
    const candidates=usedChoices().filter(x=>!['Replay','Command','Remind','Extend'].includes(baseName(x.name)));
    pickCard('AP0で再使用','再使用するSKILLの問題にもう一度正解しよう',candidates,(name,index)=>{
      if(state.hand.length>=MAX_HAND)return;
      const currentIndex=state.used[index]===name?index:state.used.indexOf(name);
      if(currentIndex<0)return;
      const card=fifoUpgrade(state.used.splice(currentIndex,1)[0]);state.hand.push(card);state.freeReplayCard=card;state.replayUsed=true;
      openQuestion(state.hand.length-1);
    });
  }
  const BOSS_SERIOUS_TURN=15;
  const bossLines={
    hodaka:{opening:'へい、一丁！',lowHp:'いい汗かいてきたな！',serious:'ここからは強火だ！',special:'麺がのびる前に食らいな！'},
    riki:{opening:'全力で来い！',lowHp:'ナイスバッティング！',serious:'延長戦だ。ギア上げるぞ！',special:'赤ペン一本、真剣勝負！'},
    mika:{opening:'では、商談を始めます。',lowHp:'その一手、買いましょう。',serious:'ここからは私が仕切ります。',special:'これにて、決算。'}
  };
  const speechLabels={opening:'開戦',lowHp:'HP残り1/3以下',serious:'本気',special:'特殊技'};
  function showBossLine(box,boss,cue){
    const key=boss.bossId+'-'+cue;
    if(box.dataset.line!==key){box.dataset.line=key;box.innerHTML=`<small>${escapeHtml(boss.name)} · ${speechLabels[cue]}</small><strong>${bossLines[boss.bossId][cue]}</strong>`;}
    box.hidden=false;
  }
  function renderBossSpeech(){
    const box=$('bossSpeech'),boss=alive().find(e=>bossLines[e.bossId]);
    if(!boss){box.hidden=true;return;}
    let cue;
    if(state.turn===1&&!boss.openingSpoken){boss.openingSpoken=true;cue='opening';}
    if(state.turn>=BOSS_SERIOUS_TURN&&!boss.seriousTurn15Spoken){boss.seriousTurn15Spoken=true;cue='serious';}
    if(!cue&&boss.hp*3<=boss.maxHp&&!boss.lowHpSpoken){boss.lowHpSpoken=true;cue='lowHp';}
    if(cue){boss.speechTurn=state.turn;boss.speechCue=cue;}
    if(boss.speechTurn===state.turn&&speechLabels[boss.speechCue]&&(boss.speechCue!=='serious'||state.turn>=BOSS_SERIOUS_TURN))showBossLine(box,boss,boss.speechCue);
    else box.hidden=true;
  }
  const retryHp=()=>Math.min(state.maxHp,(state.battleStartHp||0)+10);
  function startBattle(retry=false){if(!retry){state.battleWrongQuestions=[];state.battleReviewUsed=false;state.battleReviewRevived=false;state.lastBattleArtifact=null;state.eliteArtifactOffer=null;}
    selectedHandIndex=-1;
    state.enemies=state.currentEncounter.enemies.map((e,i)=>({...e,id:i,maxHp:e.hp,shield:0,canceled:false,weak:0}));
    state.encounterWordRange=state.currentEncounter.wordRange;
    state.wordQueue=shuffled(questionBank().words.slice(...state.encounterWordRange));
    state.selected=0;state.deck=shuffled([...Array(state.basicAttack).fill('Attack'),...Array(state.basicGuard).fill('Guard'),...state.owned.map(name=>state.artifactActUpgrades?.includes(baseName(name))&&!name.endsWith('+')?name+'+':name)]);
    state.used=[];state.hand=[];state.turn=1;state.carryOver=0;state.block=0;state.guardPriceCut=0;state.ap=3;state.apTotal=3;state.buff=1;state.nextPlus=0;state.commandUsed=false;state.turnDamage=0;state.turnGuardGained=0;
    for(const enemy of state.enemies){if(bestiaryRoster.some(m=>m.kind===enemy.kind&&m.name===enemy.name))seenEnemyKinds.add(enemy.name);}
    storeJson(BESTIARY_KEY,[...seenEnemyKinds]);renderBestiarySummary();
    state.sealed=[];state.growUses=0;state.discardedTurn=0;state.recoveredTurn=0;state.correctFormats=[];state.turnUsedNames=[];state.replayUsed=false;state.freeReplayCard=null;state.chainApGained=0;state.momentumActive=false;state.momentumDrawn=0;state.reserveAp=0;state.reserveUsed=false;state.cardSelection=null;$('cardPickModal').hidden=true;
    state.artifactAttacks=0;state.artifactCardUses=0;state.artifactDraws=0;state.artifactCorrectStreak=0;state.artifactUniqueCards=[];state.artifactCompound=0;state.artifactNextGuard=0;
    state.artifactTurnUses=new Set();state.artifactBattleUses=new Set();state.typeTurnUses=new Set();state.typeBattleUses=new Set();state.typeCorrectNames=new Set();state.shieldPierce=0;
    if(hasArtifact('IronShield'))state.block+=5;
    if(!retry){
      if(hasArtifact('VitalDrop'))state.hp=Math.min(state.maxHp,state.hp+3);
      state.battleStartHp=state.hp;
    }
    state.notice='';state.phase='battle';state.battleOpeningDraw=true;draw(5+(hasArtifact('LuckyHand')?1:0)+(hasArtifact('ForecastAI')?2:0));state.battleOpeningDraw=false;state.artifactDraws=0;setScreen('battle');renderBattle();}
  function intent(e,turn=state.turn){
    const result=baseIntent(e,turn);
    // Long fights should demand more than repeatedly playing guard/heal cards.
    const pressure=Math.min(8,Math.max(0,turn-6));
    if(!result.attack||!pressure)return result;
    const attack=result.attack+pressure;
    // Preserve the move's name and other effects, but display its actual attack value.
    const label=result.label.replace(new RegExp(`(^|\\D)${result.attack}(?!\\d)`),(_,prefix)=>prefix+attack);
    return {...result,attack,label};
  }
  function baseIntent(e,turn=state.turn){
    const t=turn;
    const boosted=state.enemies.some(x=>x.hp>0&&x!==e&&x.kind==='conductor');
    const a=e.attack+(boosted?4:0);
    if(e.kind==='support'){
      if(t%2){
        const partner=state.enemies.find(x=>x.hp>0&&x.id!==e.id);
        if(!partner)return {attack:a,label:`⚔ 攻撃 ${a}`};
        const wounded=alive().some(x=>x.hp<x.maxHp);
        return wounded?{heal:16,label:'✚ 味方を回復 16'}:{guardAlly:6,label:'🛡 味方に防御＋6'};
      }
      return {attack:a,label:`⚔ 攻撃 ${a}`};
    }
    if(e.kind==='sentinel')return t%2?{guardAlly:12,label:'🛡 味方に防御＋12'}:{attack:a,label:`⚔ 攻撃 ${a}`};
    if(e.kind==='conductor')return t%2?{label:'✷ 味方の攻撃＋4（常時）'}:{attack:a,label:`⚔ 攻撃 ${a}・指揮中`};
    if(e.kind==='tank')return t%2?{shield:11,label:'⬡ 防御＋11'}:{attack:a,label:`⚔ 攻撃 ${a}`};
    if(e.kind==='charger')return t%2?{label:'ϟ 力をためる'}:{attack:a*2,label:`ϟ 大技 ${a*2}`};
    if(e.kind==='counter')return state.block>=10?{attack:a+5,pierceBlock:5,label:`◉ 防御崩し ${a+5}（防御−5）`}:{attack:a,label:`⚔ 攻撃 ${a}（防御10以上で変化）`};
    if(e.kind==='inflator')return {attack:a+Math.min(15,3*Math.floor((t-1)/2)),label:`⚔ 上昇攻撃 ${a+Math.min(15,3*Math.floor((t-1)/2))}`};
    // Antitrust Cerberus punishes repeating one successful card, not stacking damage with block removal.
    if(e.kind==='breaker')return t%3===0?{repeatStrike:a+9,label:`⚖ 同名2回発動で攻撃${a+9}`}:{attack:a,...(t%3===1?{shield:5}:{}),label:t%3===1?`⚔ 攻撃 ${a}・防御＋5`:`⚔ 攻撃 ${a}`};
    if(e.kind==='disruptor')return t%3===1?{shield:10,label:'⬡ 防御＋10'}:{attack:a,label:`⚔ 攻撃 ${a}`};
    if(e.kind==='trickster')return t%3===0?{attack:a+10,label:`⚠ 変則強攻撃 ${a+10}`}:{attack:a,...(t%3===1?{shield:5}:{}),label:t%3===1?`⚔ 攻撃 ${a}・防御＋5`:`⚔ 攻撃 ${a}`};
    if(e.kind==='variable')return t%2?{shield:7,label:'⬡ 分岐：防御＋7'}:{attack:a+5,label:`⚔ 分岐：攻撃 ${a+5}`};
    if(e.kind==='swarm')return t%2?{attack:a,label:`⚔ 攻撃 ${a}`}:{attack:a*2,label:`⚔ 連打 ${a*2}`};
    if(e.kind==='leech')return t%3===0?{attack:a+3,lifeSteal:5,label:`♡ 吸収攻撃 ${a+3}・HP＋5`}:{attack:a,label:`⚔ 攻撃 ${a}`};
    if(e.kind==='inventory')return t%3===1?{junk:1+(t%2),label:`▣ 不良在庫＋${1+(t%2)}枚`}:{attack:a,label:`⚔ 攻撃 ${a}`};
    // No immediate damage: the next player turn's defense cards earn four less guard each.
    if(e.kind==='sapper')return t%3===0?{guardPriceCut:4,shield:6,label:'▼ 次ターン防御−4/枚・自身防御＋6'}:{attack:a,label:`⚔ 攻撃 ${a}`};
    // The Joker pays exactly the same HP as the damage it attempts to deal; block can stop only the player's loss.
    if(e.kind==='exchange'){const trade=a+6;return t%3===2?{attack:trade,selfDamage:trade,shield:6,label:`♠ 等価交換 ${trade}・自身HP−${trade}・防御＋6`}:{attack:a,label:`⚔ 攻撃 ${a}`};}
    if(e.kind==='taxer')return t%3===0?{attack:a+9,label:`⚠ 徴収攻撃 ${a+9}`}:{attack:a,label:`⚔ 攻撃 ${a}`};
    if(e.kind==='boss'){
      const phase2=t>=BOSS_SERIOUS_TURN,phaseText=phase2?'【本気】':'';
      const cycle=(t-1)%4;
      const thirdStrike=phase2?18:15;
      if(e.bossId==='hodaka'){
        if(cycle===0){const strike=Math.round((a+(phase2?3:0))*.8);return {attack:strike,label:`🍜 ${phaseText}麺打ち ${strike}`};}
        if(cycle===1)return {attack:7+(phase2?3:0),shield:10+(phase2?4:0),label:`♨ ${phaseText}湯気の壁：防御＋${10+(phase2?4:0)}・攻撃${7+(phase2?3:0)}`};
        if(cycle===2)return {attack:thirdStrike,label:`🔥 ${phaseText}熱湯スープ ${thirdStrike}`};
        return {quizFormat:'q12',quizCount:1,quizAttack:30,label:`🍜 ${phaseText}ラーメンアタック：大問12正解で回避／失敗30ダメージ`};
      }
      if(e.bossId==='riki'){
        if(cycle===0){const strike=Math.round((a+(phase2?4:0))*.8);return {attack:strike,label:`📘 ${phaseText}確認テスト ${strike}`};}
        if(cycle===1)return {attack:10+(phase2?4:0),shield:14+(phase2?6:0),label:`📒 ${phaseText}仕訳指導：防御＋${14+(phase2?6:0)}・攻撃${10+(phase2?4:0)}`};
        if(cycle===2)return {attack:thirdStrike,label:`🔥 ${phaseText}熱血追試 ${thirdStrike}`};
        return {quizFormat:'q11',quizCount:2,quizAttack:9+(phase2?4:0),apTax:1,label:`🖍 ${phaseText}赤ペン指導：大問11を2問とも正解で回避／失敗時攻撃${9+(phase2?4:0)}・次AP−1`};
      }
      if(e.bossId==='mika'){
        if(cycle===0){const strike=Math.round((a+(phase2?5:0))*.8);return {attack:strike,label:`💼 ${phaseText}業績命令 ${strike}`};}
        if(cycle===1)return {heal:12+(phase2?4:0),shield:20+(phase2?6:0),label:`💎 ${phaseText}資本増強：HP＋${12+(phase2?4:0)}・防御＋${20+(phase2?6:0)}`};
        if(cycle===2)return {attack:thirdStrike,junk:phase2?2:1,label:`📉 ${phaseText}不採算処理：攻撃${thirdStrike}・不良在庫＋${phase2?2:1}枚`};
        return {quizFormat:'q12',quizCount:3,quizAttack:a+15+(phase2?6:0),label:`👑 ${phaseText}最終決済：大問12を3問すべて正解で回避／失敗${a+15+(phase2?6:0)}ダメージ`};
      }
      return {attack:a,label:`⚔ 攻撃 ${a}`};
    }
    return {attack:a,label:`⚔ 攻撃 ${a}`};}
  function alive(){return state.enemies.filter(e=>e.hp>0);}
  function chosenTarget(){return state.enemies[state.selected]?.hp>0?state.enemies[state.selected]:alive()[0];}
  function showHandCard(index){
    if(state.phase!=='battle'||state.pending||state.cardSelection)return;
    playSfx('select');
    // A readable five-card hand goes straight to the question with one tap.
    if(state.hand.length<6){selectedHandIndex=-1;openQuestion(index);return;}
    // In a crowded hand, first lift the card to inspect it; tapping again plays it.
    if(selectedHandIndex===index){selectedHandIndex=-1;openQuestion(index);return;}
    selectedHandIndex=index;renderBattle();
  }
  function renderHandPreview(){
    const preview=$('handCardPreview'),name=state.hand[selectedHandIndex];
    if(!name){preview.hidden=true;return;}
    const skill=getSkill(name),cost=state.freeReplayCard===name?0:cardCost(name,skill);
    const usable=cost<=state.ap&&!(baseName(name)==='Command'&&state.commandUsed)&&!(skill.replay&&state.replayUsed)&&!(skill.reserveAp&&state.reserveUsed);
    $('handPreviewName').textContent=`${skill.label} · ${cost}AP`;
    $('handPreviewEffect').textContent=`${effects(skill)} · ${FMT[skill.format]||''}`;
    $('handPreviewUse').disabled=!usable;
    $('handPreviewUse').textContent=usable?'このカードを使う':'AP不足・使用不可';
    $('handPreviewUse').onclick=()=>{const index=selectedHandIndex;selectedHandIndex=-1;preview.hidden=true;openQuestion(index);};
    $('handPreviewClose').onclick=()=>{selectedHandIndex=-1;renderBattle();};
    preview.hidden=false;
  }
  function renderBattle(){if(state.phase!=='battle')return;
    renderBossSpeech();
    $('battleActLabel').textContent=`ACT ${state.act} / 3`;
    $('battleDungeonName').textContent=DUNGEONS[state.dungeon].title;
    const background=DUNGEONS[state.dungeon].battleArt?.[state.act-1]||'';
    const arena=$('combatStage').closest?.('.arena');
    if(arena){arena.classList.toggle('dungeon-illustrated',!!background);
      arena.classList.toggle('boss-encounter',state.currentEncounter.nodeType==='boss');
      arena.style.setProperty('--battle-scene',background?`url("${background}")`:'none');}
    $('floorLabel').textContent=`エリア ${state.stage+1} / 9 · 単語 No.${state.encounterWordRange[0]+1}〜${state.encounterWordRange[1]} · ターン ${state.turn}`;
    $('floorPips').innerHTML=state.route.map((_,i)=>`<span class="${i<state.stage?'done':i===state.stage?'current':''}">${i===8?'★':i+1}</span>`).join('');
    $('enemyLine').className=`enemy-line enemy-count-${alive().length}`;
    $('enemyLine').innerHTML=alive().map(e=>`<button type="button" class="enemy ${chosenTarget()?.id===e.id?'selected':''}" data-enemy="${e.id}" aria-pressed="${chosenTarget()?.id===e.id}" aria-label="攻撃対象に${escapeHtml(e.name)}を選ぶ">
      <div class="enemy-vitals"><div class="enemy-title">${escapeHtml(e.name)}</div><div class="enemy-hp"><i style="width:${100*e.hp/e.maxHp}%"></i></div><div class="enemy-values">HP ${e.hp} / ${e.maxHp} ${e.shield?' · 防御'+e.shield:''}</div>
      <div class="enemy-intent"><span class="intent-kicker">NEXT</span><span class="intent-action">${escapeHtml(e.canceled?'⊘ 攻撃封じ':intent(e).label)}</span></div>${hasArtifact('MarketReport')?`<div class="enemy-future-intent">その次：${escapeHtml(intent(e,state.turn+1).label)}</div>`:''}</div>
      <div class="enemy-portrait">${window.enemyArt?window.enemyArt(e.kind,e.name):escapeHtml(e.icon)}${chosenTarget()?.id===e.id&&alive().length>1?'<span class="target-marker" aria-hidden="true">TARGET</span>':''}</div><div class="enemy-role">${ENEMY_ROLES[e.kind]||'敵'}${state.enemies.some(x=>x.hp>0&&x!==e&&x.kind==='conductor')?' · 指揮強化中':''}</div></button>`).join('');
    $('enemyLine').querySelectorAll('[data-enemy]').forEach(b=>b.onclick=()=>{state.selected=Number(b.dataset.enemy);playSfx('select');renderBattle();});
    $('intentList').innerHTML=alive().map(e=>`<div class="intent-row"><b>${escapeHtml(e.name)}</b><strong>${escapeHtml(e.canceled?'⊘ 攻撃封じ':intent(e).label)}${hasArtifact('MarketReport')?`<small>次ターン：${escapeHtml(intent(e,state.turn+1).label)}</small>`:''}</strong></div>`).join('');
    $('heroHpFill').style.width=`${Math.max(0,100*state.hp/state.maxHp)}%`;$('heroHpText').textContent=`HP ${state.hp} / ${state.maxHp}${state.block?' · 防御 '+state.block:''}`;
    $('heroDebuff').hidden=!(state.guardPriceCut>0);$('heroDebuff').textContent=state.guardPriceCut>0?`▼ 防御カード −${state.guardPriceCut}/枚`:'';
    $('apDisplay').textContent=`AP ${state.ap}/${Math.max(state.ap,Number(state.apTotal)||3)}`;
    $('growthDisplay').hidden=state.growUses<=0;
    $('growthDisplay').textContent=`🌱 芽 ${state.growUses}`;
    $('drawCount').textContent=state.deck.length;$('usedCount').textContent=state.used.length;$('usedPoolCount').textContent=state.used.length;$('correctCount').textContent=state.correct;$('questionCount').textContent=state.questions;
    $('handCount').textContent=`${state.hand.length}枚`;$('battleNotice').textContent=state.notice;
    if(selectedHandIndex>=state.hand.length)selectedHandIndex=-1;
    $('hand').className=state.hand.length>=6?'card-hand stacked':'card-hand';
    $('hand').style.setProperty('--hand-columns',Math.max(1,Math.min(5,state.hand.length)));
    $('hand').innerHTML=state.hand.map((name,i)=>cardHtml(name,i)).join('')||'<p style="color:#c8d8dc">手札がありません。ターン終了で5枚補充します。</p>';
    $('hand').querySelectorAll('[data-card]').forEach(b=>b.onclick=()=>showHandCard(Number(b.dataset.card)));
    renderHandPreview();
    $('endTurnBtn').disabled=!!state.pending;
    if(!state.pending)saveCheckpoint();
  }
  let fxTimer,noticeTimer;
  function flashNotice(message){
    clearTimeout(noticeTimer);
    state.notice=message;
    $('battleNotice').textContent=message;
    noticeTimer=setTimeout(()=>{
      if(state.notice===message){state.notice='';if(state.phase==='battle')$('battleNotice').textContent='';}
    },1500);
  }
  function showBattleFx(kind,message){
    const stage=$('combatStage'),fx=$('battleFx');
    clearTimeout(fxTimer);
    stage.classList.remove('hero-strike','enemy-strike','hero-hurt','enemy-hurt','hero-guard');
    fx.className='battle-fx';
    void stage.offsetWidth;
    stage.classList.add(kind==='attack'?'hero-strike':kind==='enemy'?'enemy-strike':kind==='guard'?'hero-guard':kind==='hit'?'hero-hurt':'enemy-hurt');
    fx.textContent=message;fx.className='battle-fx show '+(kind==='enemy'||kind==='attack'?'hit':kind==='guard'?'guard':'miss');
    fxTimer=setTimeout(()=>{stage.classList.remove('hero-strike','enemy-strike','hero-hurt','enemy-hurt','hero-guard');fx.className='battle-fx';},850);
  }
  function sentenceQuestion(row,wordMeaning){
    // The vocabulary headword may differ from the inflected answer in the sentence.
    const headword=row.answer.toLowerCase();
    const answer=row.choices.find(choice=>choice.toLowerCase()===headword)||row.choices[0];
    const options=shuffled(row.choices);
    const optionNotes=Object.fromEntries(options.map(choice=>[choice,wordMeaning.get(choice.toLowerCase())||(choice===answer&&wordMeaning.get(headword))||'']));
    return {format:'q9',stem:row.en,answer,options,optionNotes,
      explanation:`日本語訳：${row.ja||'（訳データなし）'}${row.note?'\nポイント：'+row.note:''}`};
  }
  function makeQuestion(format){
    const {words,accentChoices,q9s,q11s,q12s,wordMeaning,wordNumber}=questionBank();
    if(format==='word'||format==='audio'||format==='jaen'){
    const pool=words.slice(...state.encounterWordRange);
    if(!state.wordQueue.length)state.wordQueue=shuffled(pool);
    const x=state.wordQueue.pop()||random(words);
    const incorrect=shuffled(pool.filter(w=>w.en!==x.en&&w.ja!==x.ja)).filter((w,i,a)=>a.findIndex(y=>format==='jaen'?y.en===w.en:y.ja===w.ja)===i).slice(0,3);
    const optionNotes=Object.fromEntries([x,...incorrect].map(w=>format==='jaen'?[w.en,w.ja]:[w.ja,w.en]));
    return {format,stem:format==='audio'?'英語を聞いて、意味を選ぼう':format==='jaen'?`「${x.ja}」に当てはまる英語は？`:`「${x.en}」の意味は？`,answer:format==='jaen'?x.en:x.ja,options:shuffled([format==='jaen'?x.en:x.ja,...incorrect.map(w=>format==='jaen'?w.en:w.ja)]),optionNotes,speak:x.en,wordIndex:wordNumber.get(x.en.toLowerCase())-1,explanation:`${x.en}：${x.ja}${x.pos?`（${x.pos}）`:''}`};}
    if(format==='accent'){const available=accentChoices.filter(x=>inEncounter(x.no));const x=random(available.length?available:accentChoices),plain=x.sylRaw.replace(/ˈ/g,'').replace(/ˌ/g,'');
      const syllables=plain.split('-').filter(Boolean);const max=Math.max(syllables.length,x.stress);
      return {format,stem:`${x.en}\n${plain}\n最も強く読む音節は？`,answer:`第${x.stress}音節`,options:Array.from({length:max},(_,i)=>`第${i+1}音節`),speak:x.en,explanation:`${x.en}（${x.ja}）\n強勢：${x.sylRaw}。第${x.stress}音節を強く発音します。${x.note?'\n'+x.note:''}`};}
    if(format==='q9'){
      const available=q9s.filter(x=>inEncounter(wordNumber.get(x.answer.toLowerCase())));
      return sentenceQuestion(random(available.length?available:q9s),wordMeaning);
    }
    if(format==='q12'){
      const x=random(q12s);
      const ordered=x.answer.map(id=>x.chunks.find(c=>c.id===id).text);
      const explanation=`完成英文：${x.completed||[x.stemBefore,...ordered,x.stemAfter].join(' ')}\n日本語訳：${x.ja||'（訳データなし）'}${x.note?'\nポイント：'+x.note:''}${x.grammarFocus?.length?'\n解説：'+x.grammarFocus.join(' / '):''}`;
      return {format,stem:`${x.stemBefore} ＿＿＿＿ ${x.stemAfter}`,answer:x.answer.join('|'),options:[],chunks:shuffled(x.chunks.map(c=>({...c}))),explanation};
    }
    const x=random(q11s),options=shuffled([...new Set([x.answer,...x.distractors])]);return {format,stem:x.stem,answer:x.answer,options,optionNotes:Object.fromEntries(options.map(v=>[v,x.notes?.[v]||wordMeaning.get(v.toLowerCase())||''])),explanation:`日本語訳：${x.ja||'（訳データなし）'}${x.explanation?'\n解説：'+x.explanation:''}${x.comparison?'\n比較：'+x.comparison:''}`};
  }
  function renderOrderChoices(containerId,q,onSubmit){
    const box=$(containerId);box.classList.add('order-grid');box.innerHTML='';
    const chosen=[];
    const sequence=document.createElement('div');sequence.className='order-selected';sequence.setAttribute('aria-live','polite');
    const choices=document.createElement('div');choices.className='order-choices';
    const refresh=()=>{
      sequence.textContent=chosen.length?chosen.map(id=>q.chunks.find(c=>c.id===id).text).join('　'):'ここに語句が並びます';
      choices.innerHTML='';q.chunks.forEach((c)=>{const b=document.createElement('button');b.type='button';b.className='answer-btn';b.textContent=c.text;b.disabled=chosen.includes(c.id);b.onclick=()=>{chosen.push(c.id);refresh();};choices.appendChild(b);});
      submit.disabled=chosen.length!==q.chunks.length;
    };
    const controls=document.createElement('div');controls.className='order-controls';
    const undo=document.createElement('button');undo.type='button';undo.className='order-undo';undo.textContent='1つ戻す';undo.onclick=()=>{chosen.pop();refresh();};
    const submit=document.createElement('button');submit.type='button';submit.className='order-submit';submit.textContent='この順番で回答';submit.onclick=()=>onSubmit(chosen.join('|'));
    controls.append(undo,submit);box.append(sequence,choices,controls);refresh();
  }
  function openQuestion(index){if(state.pending||state.cardSelection||state.phase!=='battle')return;const name=state.hand[index];if(!name)return;const s=getSkill(name),isFreeReplay=state.freeReplayCard===name,cost=isFreeReplay?0:cardCost(name,s);
    if(cost>state.ap||(baseName(name)==='Command'&&state.commandUsed)||(s.replay&&state.replayUsed)||(s.reserveAp&&state.reserveUsed))return;
    const format=state.dungeon===2&&s.format==='word'?(Math.random()<.5?'jaen':'audio'):s.format;
    state.pending={name,index,targetId:chosenTarget()?.id,cost};state.freeReplayCard=null;state.question=makeQuestion(format);
    const q=state.question;$('bossQuizSpeech').hidden=true;$('questionModal').hidden=false;$('questionModal').classList.remove('answered','answered-correct','answered-wrong');$('closeQuestion').hidden=false;$('questionTitle').textContent='英語でSKILLを発動';$('questionType').textContent=state.examGrade+'級 · '+FMT[format];$('questionSkill').textContent=`${s.label} · ${cost}AP · ${effects(s)}`;
    $('questionStem').textContent=q.stem;$('questionResult').textContent='';$('questionResult').className='question-result';$('questionExplanation').hidden=true;$('questionExplanation').textContent='';$('continueQuestion').hidden=true;
    $('listenBtn').hidden=format!=='audio';$('answers').innerHTML='';
    $('answers').classList.remove('order-grid');
    if(format==='q12')renderOrderChoices('answers',q,answer);
    else q.options.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.className='answer-btn';b.textContent=`${i+1}. ${v}`;b.onclick=()=>answer(v);$('answers').appendChild(b);});
    if(format==='audio')speak(q.speak);
  }
  // Boss quizzes interrupt the enemy phase. All required answers must be correct to avoid the move.
  // No skill cards/AP are spent; wrong answers are recorded like ordinary learning questions.
  function openBossChallenge(){
    const boss=alive().find(e=>!e.canceled&&intent(e).quizFormat),move=boss&&intent(boss);
    if(!move)return;
    if(!(move.quizFormat==='q11'?questionBank().q11s:questionBank().q12s).length){flashNotice('特殊技の問題データがないため攻撃を回避');endTurn(true);return;}
    const title={hodaka:'ラーメンアタック',riki:'赤ペン指導',mika:'最終決済'}[boss.bossId]||'ボスの特殊技';
    state.pending={bossChallenge:true,resolved:false,format:move.quizFormat,total:move.quizCount||1,completed:0,missed:false,title,damage:move.quizAttack||0,apTax:move.apTax||0};
    showBossLine($('bossQuizSpeech'),boss,'special');
    renderBossChallengeQuestion();
  }
  function renderBossChallengeQuestion(){
    const p=state.pending;if(!p?.bossChallenge)return;
    p.resolved=false;state.question=makeQuestion(p.format);
    const q=state.question;
    $('questionModal').hidden=false;$('questionModal').classList.remove('answered','answered-correct','answered-wrong');
    $('closeQuestion').hidden=true;$('questionTitle').textContent=`${p.title}を回避せよ！`;
    $('questionType').textContent=`${state.examGrade}級 · ボス特殊技 · ${p.format==='q11'?'大問11':'大問12'} · ${p.completed+1}/${p.total}問`;
    $('questionSkill').textContent=`${p.total}問すべて正解で回避 · 失敗時${p.damage}ダメージ${p.apTax?'＋次ターンAP−1':''}（防御で軽減可） · AP消費なし`;
    $('questionStem').textContent=q.stem;$('questionResult').textContent='';$('questionResult').className='question-result';
    $('questionExplanation').hidden=true;$('questionExplanation').textContent='';$('continueQuestion').hidden=true;
    $('listenBtn').hidden=true;$('answers').innerHTML='';$('answers').classList.remove('order-grid');
    if(p.format==='q12')renderOrderChoices('answers',q,answerBossChallenge);
    else q.options.forEach((value,i)=>{const b=document.createElement('button');b.type='button';b.className='answer-btn';b.textContent=`${i+1}. ${value}`;b.onclick=()=>answerBossChallenge(value);$('answers').appendChild(b);});
  }
  function answerBossChallenge(value){
    const p=state.pending,q=state.question;if(!p?.bossChallenge||p.resolved||!q)return;
    const correct=value===q.answer;p.resolved=true;p.completed++;if(!correct)p.missed=true;
    playSfx(correct?'correct':'wrong');
    state.questions++;if(correct){state.correct++;recordCorrectAnswer();}
    else recordWrongQuestion(q);
    $('answers').querySelectorAll('button').forEach(b=>b.disabled=true);
    $('questionResult').className='question-result '+(correct?'ok':'ng');
    $('questionResult').textContent=p.completed<p.total?`${correct?'✓ 正解！':'不正解'} ${p.completed}/${p.total}問完了`:p.missed?`全${p.total}問終了 · ${p.title}が発動します`:`✓ 全${p.total}問正解！ ${p.title}を完全回避`;
    $('questionExplanation').textContent=q.explanation||'';$('questionExplanation').hidden=false;
    $('continueQuestion').hidden=false;$('continueQuestion').textContent=p.completed<p.total?'次の問題へ':'敵の行動を確認';
    $('questionModal').classList.add('answered',correct?'answered-correct':'answered-wrong');
  }
  function finishBossChallenge(){
    const p=state.pending;if(!p?.bossChallenge||!p.resolved)return;
    if(p.completed<p.total){renderBossChallengeQuestion();return;}
    const avoided=!p.missed;state.pending=null;state.question=null;$('questionModal').hidden=true;
    $('closeQuestion').hidden=false;$('continueQuestion').textContent='戦闘に戻る';endTurn(avoided);
  }
  function speak(word){if(!('speechSynthesis' in window)){const stem=$('reviewModal').hidden?$('questionStem'):$('reviewStem');stem.textContent=`音声非対応の端末です。「${word}」の意味は？`;return;}
    window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(word);u.lang='en-US';u.rate=.85;window.speechSynthesis.speak(u);}
  function recordWrongQuestion(q){
    const entry={format:q.format,stem:q.stem,answer:q.answer,options:[...(q.options||[])],chunks:q.chunks||[],optionNotes:q.optionNotes||{},explanation:q.explanation||'',speak:q.speak||''};
    state.battleWrongQuestions.push(entry);
    state.runWrongQuestions.push({...entry});
  }
  function answer(value){if(!state.pending||state.pending.resolved)return;const q=state.question,p=state.pending,s=getSkill(p.name),correct=value===q.answer;
    playSfx(correct?'correct':'wrong');
    p.resolved=true;state.questions++;if(correct){state.correct++;recordCorrectAnswer();}
    if(!correct)recordWrongQuestion(q);
    if(Number.isInteger(q.wordIndex)){
      state.seenWords.push(q.wordIndex);
      if(!correct)state.wrongWords.push(q.wordIndex);
    }
    const buttons=q.format==='q12'?[]:[...$('answers').querySelectorAll('button')];buttons.forEach((b,i)=>{
      b.disabled=true;const option=q.options[i];if(option===q.answer)b.classList.add('correct');else if(option===value)b.classList.add('wrong');
      const note=q.optionNotes?.[option];if(note){const caption=document.createElement('span');caption.className='answer-translation';caption.textContent=note;b.appendChild(caption);}
    });
    if(q.format==='q12')$('answers').querySelectorAll('button').forEach(b=>b.disabled=true);
    $('questionResult').className='question-result '+(correct?'ok':'ng');$('questionResult').textContent=correct?'✓ 正解！ SKILL発動':q.format==='q12'?'不正解 · 正しい語順を確認しよう':`不正解 · 正解：${q.answer}`;
    $('questionExplanation').textContent=q.explanation||`正解：${q.answer}`;
    $('questionExplanation').hidden=false;
    $('continueQuestion').hidden=false;
    $('questionModal').classList.add('answered',correct?'answered-correct':'answered-wrong');
  }
  function closeQuestion(){if(state.pending?.resolved||state.pending?.bossChallenge)return;state.pending=null;state.question=null;$('questionModal').hidden=true;}
  function finishQuestion(){const p=state.pending;if(!p?.resolved)return;const name=state.hand.splice(p.index,1)[0];const s=getSkill(name);
    selectedHandIndex=-1;
    state.ap-=p.cost;state.used.push(name);if(baseName(name)==='Command')state.commandUsed=true;
    if(state.type==='hirameki'&&s.type==='attack'&&baseName(name)!=='Attack')state.typeBattleUses.add('hirameki');
    // A resolved question is correct iff the result element has the success class.
    const success=$('questionResult').classList.contains('ok');
    const hpBefore=state.enemies.reduce((sum,e)=>sum+e.hp,0),heroBefore=state.hp,blockBefore=state.block;
    const triggered=[];state.breakMessage='';
    state.artifactCardUses++;state.artifactCorrectStreak=success?state.artifactCorrectStreak+1:0;
    if(success){state.turnUsedNames.push(baseName(name));if(!state.correctFormats.includes(state.question.format))state.correctFormats.push(state.question.format);applyCard(s,name,p.targetId);if(s.exhaustOnCorrect){const idx=state.used.lastIndexOf(name);if(idx>=0){state.sealed.push(...state.used.splice(idx,1));onCardExhausted();}}triggered.push(...applyAnswerArtifacts(s),...applyTypeBoost(s,name));}else if(s.dmg){state.buff=1;state.nextPlus=0;}
    if(success&&hasArtifact('TaxDeduction')&&baseName(name)==='BadStock'){state.hp=Math.min(maxHp(),state.hp+3);}
    if(hasArtifact('InventoryManager')&&state.artifactCardUses>=4&&!state.artifactTurnUses.has('InventoryManager')){state.artifactTurnUses.add('InventoryManager');draw(1);}
    if(hasArtifact('MasterAbacus')&&state.artifactCardUses>=5&&!state.artifactTurnUses.has('MasterAbacus')){state.artifactTurnUses.add('MasterAbacus');state.ap+=3;state.apTotal+=3;}
    if(success&&hasArtifact('QualityControl')&&state.artifactCorrectStreak>=2&&!state.artifactTurnUses.has('QualityControl')){state.artifactTurnUses.add('QualityControl');state.block+=5;}
    if(success&&!state.artifactUniqueCards.includes(baseName(name)))state.artifactUniqueCards.push(baseName(name));
    if(hasArtifact('GoldenLedger')&&state.artifactUniqueCards.length>=3&&!state.artifactTurnUses.has('GoldenLedger')){state.artifactTurnUses.add('GoldenLedger');state.ap++;state.apTotal++;}
    const dealt=hpBefore-state.enemies.reduce((sum,e)=>sum+e.hp,0);
    if(success){state.turnDamage=(state.turnDamage||0)+Math.max(0,dealt);state.turnGuardGained=(state.turnGuardGained||0)+Math.max(0,state.block-blockBefore);
      if(state.turnDamage>=50)awardBadge('burst30');if(state.turnGuardGained>=30)awardBadge('guard15');}
    const actionNotice=success?`${s.label}：${dealt?`${dealt}ダメージ`:state.block>blockBefore?`防御＋${state.block-blockBefore}`:state.hp>heroBefore?`HP＋${state.hp-heroBefore}`:'発動'}${triggered.length?' · '+triggered.join(' / '):''}${state.breakMessage?' ・ '+state.breakMessage:''}`:`${s.label}：不発`;
    state.pending=null;state.question=null;$('questionModal').hidden=true;
    if(!alive().length){winBattle();return;}
    if(success)playSfx(dealt?'attack':s.type==='guard'?'guard':s.type==='heal'||state.hp>heroBefore?'heal':'confirm');
    renderBattle();flashNotice(actionNotice);
    showBattleFx(!success?'miss':dealt?'attack':state.block>blockBefore?'guard':'support',success?dealt?`⚔ ${dealt} ダメージ！`:state.block>blockBefore?`🛡 防御 +${state.block-blockBefore}`:state.hp>heroBefore?`✚ HP +${state.hp-heroBefore}`:`✦ ${s.label}`:'MISS');
  }
  function applyAnswerArtifacts(s){const triggered=[];
    const onceTurn=(id,format,action)=>{if(hasArtifact(id)&&s.format===format&&!state.artifactTurnUses.has(id)){action();state.artifactTurnUses.add(id);triggered.push(artifacts[id].name);}};
    const onceBattle=(id,format,action)=>{if(hasArtifact(id)&&s.format===format&&!state.artifactBattleUses.has(id)){action();state.artifactBattleUses.add(id);triggered.push(artifacts[id].name);}};
    if(hasArtifact('EchoBell')&&s.format==='accent'){state.block+=3;triggered.push(artifacts.EchoBell.name);}
    if(hasArtifact('WordLens')&&s.format==='word'){state.nextPlus+=3;triggered.push(artifacts.WordLens.name);}
    onceBattle('SoundShell','audio',()=>{state.hp=Math.min(state.maxHp,state.hp+3);});
    onceTurn('GrammarStar','q9',()=>draw(1));
    if(hasArtifact('SalesBooster')&&state.correctFormats.length>=2&&!state.artifactTurnUses.has('SalesBooster')){state.nextPlus+=6;state.artifactTurnUses.add('SalesBooster');}
    return triggered;
  }
  function applyTypeBoost(s,name){
    const triggered=[],id=state.type;
    const once=(check,action)=>{if(check&&!state.typeTurnUses.has(id)){action();state.typeTurnUses.add(id);triggered.push(`${TYPE_LABELS[id]}の特性${state.typeBoost?'強化':''}`);}};
    if(id==='nagomi')once(s.type==='guard',()=>{state.hp=Math.min(maxHp(),state.hp+(state.typeBoost?4:2));});
    if(id==='tsumugi'){
      state.typeCorrectNames.add(baseName(name));
      once(state.typeCorrectNames.size>=2,()=>{state.block+=state.typeBoost?8:5;});
    }
    if(id==='yomitoki')once(s.format==='q9',()=>{state.shieldPierce=state.typeBoost?8:5;});
    if(id==='shirabe')once(s.format==='word',()=>{state.nextPlus+=state.typeBoost?5:3;});
    if(id==='hibiki')once(s.format==='accent',()=>{state.nextPlus+=state.typeBoost?6:4;});
    if(id==='kotonoha')once(s.format==='q11',()=>{state.block+=state.typeBoost?9:6;});
    return triggered;
  }
  function applyCard(s,name,targetId){const candidates=alive();const target=state.enemies.find(e=>e.id===targetId&&e.hp>0)||candidates[0];
    const spentBlock=s.consumeBlock?Math.min(state.block,s.consumeBlock):0;
    const strike=(s.dmg||0)+(s.blockStrike?Math.min(36,Math.floor(state.block*s.blockStrike)):0)+(s.scaleGrow?state.growUses*s.scaleGrow:0)+(s.scaleDiscard?state.discardedTurn*s.scaleDiscard:0)+(s.scaleRetrieve?state.recoveredTurn*s.scaleRetrieve:0)+(s.bonusDmg&&state.correctFormats.length>=s.formatCount?s.bonusDmg:0)+(s.grow?state.growUses*s.grow:0)+(s.scaleUnique?Math.min(5,new Set(state.turnUsedNames).size)*s.scaleUnique:0)+(s.scaleUsed?Math.min(10,state.used.length)*s.scaleUsed:0)+spentBlock*2+(s.lowHpBonus&&state.hp<=state.maxHp/2?s.lowHpBonus:0);
    if(spentBlock)state.block-=spentBlock;
    if(strike){const victims=s.range>=3?candidates:s.range===2?[target,...candidates.filter(x=>x!==target)].slice(0,2):[target];
      const firstAttackBonus=!state.artifactBattleUses.has('FirstAttack')?(hasArtifact('PowerFang')?4:0):0;
      const firstAttackMultiplier=!state.artifactBattleUses.has('MonopolyCrown')&&hasArtifact('MonopolyCrown')?2:1;
      const raw=((strike+state.nextPlus+(state.artifactCompound||0))*state.buff+firstAttackBonus)*firstAttackMultiplier;
      if(firstAttackMultiplier>1)state.artifactBattleUses.add('MonopolyCrown');
      const defeated=[];
      victims.forEach(e=>{let amount=raw+(s.executeHalf&&e.hp<=e.maxHp/2?s.executeHalf:0);if(!s.pierce){const bypass=Math.min(e.shield,state.shieldPierce);const absorbed=Math.min(Math.max(0,e.shield-bypass),amount);e.shield-=absorbed;amount-=absorbed;}e.hp=Math.max(0,e.hp-amount);if(e.hp===0)defeated.push(e);});
      if(defeated.length){
        if(s.killAp&&!state.chainApGained){state.ap+=1;state.apTotal+=1;state.chainApGained=1;}
        if(s.killSplash){for(const e of alive()){const absorbed=Math.min(e.shield,s.killSplash);e.shield-=absorbed;e.hp=Math.max(0,e.hp-(s.killSplash-absorbed));}}
        if(state.momentumActive&&state.momentumDrawn<2){const count=Math.min(defeated.length,2-state.momentumDrawn);draw(count);state.momentumDrawn+=count;}
      }
      if(s.chainAp&&state.artifactAttacks>=1&&!state.chainApGained){state.ap+=s.chainAp;state.apTotal+=s.chainAp;state.chainApGained=1;}
      state.artifactAttacks=(state.artifactAttacks||0)+1;
      if(defeated.some(e=>e.kind==='conductor')&&alive().length)state.breakMessage='指揮を断った！ 味方強化が消滅';
      else if(defeated.some(e=>e.kind==='sentinel')&&alive().length)state.breakMessage='守護を突破！ 味方への防御支援が消滅';
      else if(defeated.some(e=>e.kind==='support')&&alive().length)state.breakMessage='回復役を撃破！ 回復支援が消滅';
      if(firstAttackBonus)state.artifactBattleUses.add('FirstAttack');
      if(hasArtifact('CompoundInterest'))state.artifactCompound=Math.min(8,state.artifactCompound+2);
      state.buff=1;state.nextPlus=0;state.shieldPierce=0;}
    if(s.seedAtBlock&&state.block>=s.seedAtBlock)state.growUses++;
    if(s.block){
      const recoveryBonus=state.recoveredTurn>0?(s.recoveryBlock||0):0;
      state.block+=Math.max(0,s.block+recoveryBonus-(state.guardPriceCut||0));
    }
    if(s.bonusBlock&&state.correctFormats.length>=s.formatCount)state.block+=s.bonusBlock;
    if(s.bonusBlockPerEnemy)state.block+=candidates.length*s.bonusBlockPerEnemy;
    if(s.drawIfGuard&&state.block>=s.drawIfGuard)draw(1);
    if(s.healIfGuard&&state.block>=s.healIfGuard)state.hp=Math.min(state.maxHp,state.hp+5);
    if(s.grow)state.growUses++;
    if(s.growGain)state.growUses+=s.growGain;
    if(s.killDraw)state.momentumActive=true;
    if(s.reserveAp){state.reserveAp=s.reserveAp;state.reserveUsed=true;}
    if(s.heal)state.hp=Math.min(state.maxHp,state.hp+s.heal);
    if(s.healPct)state.hp=Math.min(state.maxHp,state.hp+Math.round(state.maxHp*s.healPct/100));
    if(s.cancel&&target&&target.hp>0)target.canceled=true;
    if(s.weaken&&target&&target.hp>0)target.weak+=s.weaken;
    if(s.buff)state.buff=2;if(s.nextPlus)state.nextPlus+=s.nextPlus;
    if(s.carry)state.carry=Math.max(state.carry,s.carry);
    if(s.draw&&!s.discardChoose&&!s.sealChoose&&!s.discard)draw(s.draw);
    if(s.retrieve)takeUsed(s.retrieve);
    if(s.replay)replayUsed();
    if(s.discardChoose)discardHand(s.discardChoose,s.draw||0);
    else if(s.sealChoose)discardHand(s.sealChoose,s.draw||0,true);
    else if(s.discard)discardHand(s.discard,s.draw||0);
  }
  function endTurn(bossAnswer){if(state.phase!=='battle'||state.pending||state.cardSelection)return;
    if(alive().some(e=>!e.canceled&&intent(e).quizFormat)&&typeof bossAnswer!=='boolean'){openBossChallenge();return;}
    selectedHandIndex=-1;$('handCardPreview').hidden=true;
    const repeatedCard=state.turnUsedNames.length>new Set(state.turnUsedNames).size;
    let total=0,junkAdded=0,nextGuardPriceCut=0,nextApTax=0,bossEvaded=false;const lifeStealers=[];const actions=[];for(const e of alive()){
      const it=intent(e);
      if(e.canceled){actions.push(`${e.name}：行動封じ`);e.canceled=false;e.weak=0;continue;}
      actions.push(`${e.name}：${it.label}`);
      if(it.quizFormat&&bossAnswer===true){bossEvaded=true;e.weak=0;continue;}
      if(it.shield)e.shield+=it.shield;
      if(it.guardAlly){const ally=alive().find(x=>x.id!==e.id);if(ally)ally.shield+=it.guardAlly;else e.shield+=it.guardAlly;}
      if(it.heal){const ally=alive().slice().sort((a,b)=>a.hp/a.maxHp-b.hp/b.maxHp)[0];if(ally)ally.hp=Math.min(ally.maxHp,ally.hp+it.heal);}
      if(it.junk)junkAdded+=it.junk;
      if(it.guardPriceCut)nextGuardPriceCut=Math.max(nextGuardPriceCut,it.guardPriceCut);
      if(it.apTax)nextApTax=Math.max(nextApTax,it.apTax);
      if(it.lifeSteal)lifeStealers.push({enemy:e,amount:it.lifeSteal});
      if(it.pierceBlock)state.block=Math.max(0,state.block-it.pierceBlock);
      if(it.repeatStrike&&repeatedCard)total+=Math.max(0,it.repeatStrike-e.weak);
      if(it.quizAttack&&bossAnswer===false)total+=Math.max(0,it.quizAttack-e.weak);
      if(it.attack)total+=Math.max(0,it.attack-e.weak);
      if(it.selfDamage)e.hp=Math.max(0,e.hp-it.selfDamage);
      e.weak=0;}
    let taken=Math.max(0,total-state.block);
    if(taken&&hasArtifact('StoneCharm')&&!state.artifactBattleUses.has('StoneCharm')){taken=Math.max(0,taken-10);state.artifactBattleUses.add('StoneCharm');}
    state.hp=Math.max(0,state.hp-taken);
    if(hasArtifact('BadDebtReserve')&&state.hp>0&&state.hp<=maxHp()/2&&!state.artifactBattleUses.has('BadDebtReserve')){state.artifactNextGuard+=15;state.artifactBattleUses.add('BadDebtReserve');}
    if(taken>0)for(const {enemy,amount} of lifeStealers)enemy.hp=Math.min(enemy.maxHp,enemy.hp+amount);
    state.carryOver=Math.min(state.carry||0,Math.max(0,state.block-total));state.used.push(...state.hand.splice(0));
    // At most two junk cards are added in a turn. Correct answers exhaust them; wrong answers recycle through USED.
    for(let j=0;j<Math.min(2,junkAdded);j++)state.deck.splice(Math.floor(Math.random()*(state.deck.length+1)),0,'BadStock');
    if(state.hp<=0){GoimonDungeonMission.recordDefeat(state);playSfx('defeat');showChoice('defeat');return;}
    if(!alive().length){winBattle();return;}
    const bonusAp=Math.min(state.ap,state.reserveAp);const reserveGuard=hasArtifact('ReserveVault')?Math.min(2,state.ap)*2:0;state.turn++;state.apTotal=3+bonusAp;state.ap=Math.max(1,state.apTotal-nextApTax);state.reserveAp=0;state.reserveUsed=false;state.block=state.carryOver+reserveGuard+state.artifactNextGuard;state.guardPriceCut=nextGuardPriceCut;state.artifactNextGuard=0;state.carry=0;state.buff=1;state.nextPlus=0;state.shieldPierce=0;state.commandUsed=false;state.discardedTurn=0;state.recoveredTurn=0;state.correctFormats=[];state.turnUsedNames=[];state.replayUsed=false;state.chainApGained=0;state.momentumActive=false;state.momentumDrawn=0;state.turnDamage=0;state.turnGuardGained=0;state.artifactTurnUses.clear();state.typeTurnUses.clear();state.typeCorrectNames.clear();state.artifactAttacks=0;state.artifactCardUses=0;state.artifactDraws=0;state.artifactCorrectStreak=0;state.artifactUniqueCards=[];state.artifactCompound=0;
    state.battleOpeningDraw=true;draw(5);state.battleOpeningDraw=false;renderBattle();flashNotice(bossEvaded?'全問正解！ 特殊技を完全回避':junkAdded?`不良在庫＋${Math.min(2,junkAdded)}枚`:taken?`HP −${taken}`:total?'防御成功':'敵が行動した');showBattleFx(total>0?'enemy':'guard',bossEvaded?'✦ PERFECT DODGE!':taken?`💥 ${taken} ダメージ！`:total>0?'🛡 BLOCK!':'✦ 敵が行動した');if(total>0)playSfx(taken>0?'hurt':'guard');}
  // Rarity is rolled separately for each of the three offered cards.
  function rewardRank(mode,roll){
    if(mode==='eliteReward')return roll<.95?'R':'SR';
    if(mode==='bossReward')return roll<.20?'R':'SR';
    if(mode==='treasure')return roll<.80?'N':'R';
    return roll<.95?'N':'R';
  }
  function rewardOptions(mode){const possible=availableRewardSkills().filter(canAddSkill);
    const offered=[];for(let i=0;i<3&&possible.length;i++){
      const rank=rewardRank(mode,Math.random());const pool=possible.filter(x=>skills[x].rank===rank);
      // If all cards of a rarity are already owned/offered, substitute an available card.
      const chosen=weightedReward(pool.length?pool:possible);offered.push(chosen);possible.splice(possible.indexOf(chosen),1);
    }return offered;}
  function openShop(){
    state.artifactDiscountUsed=false;
    const available=availableRewardSkills().filter(canAddSkill);
    const n=random(available.filter(x=>skills[x].rank==='N'));
    const r=random(available.filter(x=>skills[x].rank==='R'));
    const a=artifactRoll('shop');
    state.shopStock=[
      {type:'skill',key:n,price:25,name:n?skills[n].label:'N-SKILL',detail:n?briefEffect(skills[n]):'売り切れ',icon:'⚔',sold:!n},
      {type:'skill',key:r,price:65,name:r?skills[r].label:'R-SKILL',detail:r?briefEffect(skills[r]):'売り切れ',icon:'✷',sold:!r},
      {type:'artifact',key:a,price:artifactPrice(a),name:a?`${artifacts[a].name} · ${artifacts[a].rank}`:'ARTIFACT',detail:a?artifacts[a].effect:'売り切れ',icon:a?artifacts[a].icon:'◈',sold:!a},
      {type:'heal',price:25,name:'HP＋25',detail:'最大HPまで回復',icon:'✚',sold:false},
      {type:'remove',price:35,name:'カード削除',detail:'通常攻撃か防御を1枚削除',icon:'↶',sold:false}
    ];
    showChoice('shop');
  }
  function renderShop(){
    $('choiceEyebrow').textContent='SHOP';$('choiceTitle').textContent=`SHOP　◉ ${state.coins} COIN`;
    $('choiceDescription').textContent='探索中に使うCOINで購入。商品は各1回限り。';
    $('choiceCards').innerHTML=state.shopStock.map((x,i)=>{const price=shopPrice(x);const icon=x.type==='artifact'&&x.key?artifactPicture(x.key):`<span class="shop-icon">${x.icon}</span>`;return `<button class="shop-item ${x.sold?'sold':''}" type="button" data-buy="${i}" ${x.sold||state.coins<price?'disabled':''}>${icon}<strong>${escapeHtml(x.name)}</strong><small>${escapeHtml(x.detail)}</small><b>${x.sold?'SOLD':price?price+' COIN':'FREE'}</b></button>`;}).join('');
    $('choiceCards').querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>buyShop(Number(b.dataset.buy)));
    $('skipChoice').textContent='SHOPを出る';
  }
  function shopPrice(item){if(!item)return Infinity;
    const half=hasArtifact('ShareholderTicket') ? 0.8 : 1;
    const firstPurchase=hasArtifact('PowerLeaf')&&!state.artifactDiscountUsed ? 0.2 : 1;
    return Math.ceil(item.price*half*firstPurchase);
  }
  function buyShop(index){const item=state.shopStock[index];if(!item||item.sold||state.coins<shopPrice(item))return;
    if(item.type==='remove'){state.shopRemoveIndex=index;state.removeOrigin='shop';showChoice('removeCard');return;}
    state.coins-=shopPrice(item);item.sold=true;
    if(hasArtifact('PowerLeaf'))state.artifactDiscountUsed=true;
    if(item.type==='skill')state.owned.push(item.key);
    if(item.type==='artifact'){playSfx('artifact');acquireArtifact(item.key);}else playSfx('confirm');
    if(item.type==='heal')state.hp=Math.min(state.maxHp,state.hp+25);
    showChoice('shop');
  }
  function winBattle(){playSfx('victory');state.fight++;
    state.actFight++;
    awardBadge('firstWin');
    if(state.dungeon===2)awardBadge('stage2Win');
    if(!state.battleWrongQuestions?.length){awardBadge('perfectFight');awardBadge(state.dungeon===2?'stage2Perfect':'stage1Perfect');}
    if(state.hp<=10)awardBadge('clutchWin');
    state.choiceOffer=null;state.eliteArtifactOffer=null;state.choiceEvent=null;state.choiceSpecialOptions=null;
    if(hasArtifact('LifeSeed'))state.hp=Math.min(state.maxHp,state.hp+3);
    if(hasArtifact('CoinCharm'))state.coins+=5;
    if(hasArtifact('FinalBalanceSheet')&&state.block>=10)state.maxHp+=6;
    state.lastBattleArtifact=null;
    if(state.currentEncounter.nodeType==='elite')state.eliteArtifactOffer=artifactRoll('elite');
    if(state.currentEncounter.nodeType==='boss'){
      const drop=artifactRoll('boss');
      if(drop){acquireArtifact(drop);state.lastBattleArtifact=drop;}
    }
    if(state.currentEncounter.nodeType==='boss'){
      awardBadge('actBoss');
      awardBadge(state.dungeon===2?'stage2Boss':'stage1Boss');
      if(state.dungeon===1&&state.act===2)recordRun('boss2');
      if(state.act===3){awardBadge(state.dungeon===2?'secondClear':'firstClear');recordRun('clear');clearCheckpoint();showChoice('complete');if(state.dungeon===1)showDawnSequence();}
      else {showChoice('special');if(state.dungeon===1)showActInterlude(state.act);}
      return;
    }
    state.coins+=state.currentEncounter.nodeType==='elite'?25:12;
    showChoice(state.currentEncounter.nodeType==='elite'?'eliteReward':'reward');}
  function selectUpgrade(index,silent=false){
    if(state.choiceMode!=='upgrade'||!Number.isInteger(index)||!state.owned[index]||state.owned[index].endsWith('+'))return;
    if(!silent)playSfx('select');
    upgradeSelectionIndex=index;
    const name=state.owned[index],before=getSkill(name),after=getSkill(name+'+');
    $('choiceCards').querySelectorAll('[data-upgrade-index]').forEach(button=>{
      const selected=Number(button.dataset.upgradeIndex)===index;
      button.classList.toggle('selected',selected);
      button.setAttribute('aria-pressed',String(selected));
    });
    $('upgradePreview').innerHTML=`<div class="upgrade-preview-heading"><span class="upgrade-preview-icon">${escapeHtml(after.icon)}</span><div><small>強化内容を比較</small><h3>${escapeHtml(before.label)} <span>→ ${escapeHtml(after.label)}</span></h3></div></div>
      <div class="upgrade-compare"><div class="upgrade-compare-card"><span class="upgrade-state-label">強化前</span><strong>${before.ap} AP</strong><p>${escapeHtml(effects(before))}</p><small>${escapeHtml(FMT[before.format]||'問題形式なし')}</small></div>
      <div class="upgrade-compare-card upgraded"><span class="upgrade-state-label">強化後</span><strong>${after.ap} AP</strong><p>${escapeHtml(effects(after))}</p><small>${escapeHtml(FMT[after.format]||'問題形式なし')}</small></div></div>
      <p class="upgrade-hint">確認して「このSKILLを強化する」を押すと、1枚だけ強化します。</p>`;
    $('confirmUpgradeBtn').hidden=false;
    $('confirmUpgradeBtn').textContent=`${after.label} に強化する`;
  }
  function confirmUpgrade(){
    if(state.choiceMode!=='upgrade'||upgradeSelectionIndex===null)return;
    const index=upgradeSelectionIndex;
    if(!state.owned[index]||state.owned[index].endsWith('+'))return;
    playSfx('confirm');
    state.owned[index]+='+';
    upgradeSelectionIndex=null;
    advance();
  }
  function selectRewardSkill(name){
    if(!['reward','eliteReward'].includes(state.choiceMode)||!state.choiceOffer?.includes(name)||!canAddSkill(name))return;
    playSfx('select');
    rewardSelection={kind:'skill',key:name};
    const s=getSkill(name);
    $('rewardPreviewRank').textContent=`${s.rank} · ${DECK_TYPES[s.type]||'SKILL'}`;
    $('rewardPreviewName').textContent=s.label;
    $('rewardPreviewAp').textContent=`${s.ap} AP`;
    $('rewardPreviewEffect').textContent=effects(s);
    $('rewardPreviewFormat').textContent=`問題形式：${FMT[s.format]||s.format}`;
    $('rewardPreview').hidden=false;
    $('rewardPreviewClose').focus?.();
    $('confirmRewardBtn').hidden=false;$('confirmRewardBtn').disabled=false;
    $('confirmRewardBtn').textContent='このSKILLを獲得する';
    $('choiceCards').querySelectorAll('[data-reward]').forEach(btn=>{const active=btn.dataset.reward===name;btn.setAttribute('aria-pressed',String(active));btn.classList?.toggle?.('reward-selected',active);});
    $('choiceCards').querySelectorAll('[data-elite-artifact]').forEach(btn=>btn.classList?.remove?.('reward-selected'));
  }
  function selectSpecialReward(id){
    if(state.choiceMode!=='special')return;
    const option=state.choiceSpecialOptions?.find(option=>option.id===id&&!option.disabled);
    if(!option)return;
    playSfx('select');
    rewardSelection={kind:'special',key:id};
    $('rewardPreviewRank').textContent=option.label;
    $('rewardPreviewName').textContent=option.title;
    $('rewardPreviewAp').textContent='ACT報酬';
    $('rewardPreviewEffect').textContent=option.detail;
    $('rewardPreviewFormat').textContent='獲得を決定すると次のACTに進みます。';
    $('rewardPreview').hidden=false;
    $('rewardPreviewClose').focus?.();
    $('confirmRewardBtn').hidden=false;$('confirmRewardBtn').disabled=false;
    $('confirmRewardBtn').textContent='この報酬を獲得する';
    $('choiceCards').querySelectorAll('[data-special]').forEach(btn=>{const active=btn.dataset.special===id;btn.setAttribute('aria-pressed',String(active));btn.classList?.toggle?.('reward-selected',active);});
  }
  $('rewardPreviewClose').onclick=()=>{
    rewardSelection=null;
    $('rewardPreview').hidden=true;
    $('confirmRewardBtn').hidden=true;
    $('confirmRewardBtn').disabled=true;
    $('choiceCards').querySelectorAll('.reward-selected').forEach(button=>{
      button.classList.remove('reward-selected');
      button.setAttribute('aria-pressed','false');
      button.focus();
    });
  };
  function confirmReward(){
    const selection=rewardSelection;if(!selection)return;
    playSfx('confirm');
    rewardSelection=null;
    if(selection.kind==='skill'&&['reward','eliteReward'].includes(state.choiceMode)&&state.choiceOffer?.includes(selection.key))rewardPicked(selection.key);
    else if(selection.kind==='special'&&state.choiceMode==='special')chooseSpecial(selection.key);
  }
  const storeEvents={
    register:{
      title:'釣り銭の合わないレジ',
      scene:'誰もいないレジが開いた。レシートには、まだ触れていないあなたの指の本数が印字されている。',
      choices:[
        {label:'奥の硬貨まで拾う',effect:'HP−7 ／ COIN＋22',hp:-7,coins:22},
        {label:'受け皿の硬貨だけ拾う',effect:'COIN＋6',coins:6}
      ]
    },
    cafe:{
      title:'二人分の夜食',
      scene:'閉店した食堂に、あなたと相棒の名前で予約が入っている。二つの椅子はまだ温かい。',
      choices:[
        {label:'相棒と定食を分ける',effect:'COIN−12 ／ HP＋25',coins:-12,hp:25},
        {label:'無料のお茶を飲む',effect:'HP＋7',hp:7}
      ]
    },
    tailor:{
      title:'試着室の仕立屋',
      scene:'カーテンの向こうから採寸の声がする。隙間に見える足は、相棒と同じ形をしている。',
      choices:[
        {label:'相棒の外套を仕立てる',effect:'COIN−20 ／ この挑戦の最大HPと現在HP＋8',coins:-20,maxHp:8,hp:8},
        {label:'ほつれだけ直す',effect:'HP＋6',hp:6}
      ]
    },
    exchange:{
      title:'返品専用カウンター',
      scene:'「お帰りのお客様は、一品お返しください」。窓口の札には、入館前に撮られたはずのない二人の後ろ姿。',
      choices:[
        {label:'通常攻撃を返品する',effect:'基本の攻撃カード−1枚 ／ COIN＋10',card:'basicAttack',coins:10},
        {label:'通常防御を返品する',effect:'基本の防御カード−1枚 ／ COIN＋10',card:'basicGuard',coins:10}
      ]
    }
  };
  function drawMapEvent(){
    const pool=['altar','spring','merchant'];
    if(state.dungeon===1)pool.push(...Object.keys(storeEvents));
    let remaining=pool.filter(id=>!state.eventHistory?.includes(id));
    if(!remaining.length){
      const previous=state.eventHistory.at(-1);
      state.eventHistory=[];
      remaining=pool.filter(id=>id!==previous);
    }
    const id=random(remaining);
    state.eventHistory=[...(state.eventHistory||[]),id];
    return id;
  }
  function storeEventLimit(option){
    if(state.coins+(option.coins||0)<0)return 'COIN不足';
    if(state.hp+(option.hp||0)<=0)return 'HP不足';
    if(option.card&&!state[option.card])return '対象カードなし';
    return '';
  }
  function renderStoreEvent(id){
    const event=storeEvents[id];
    $('choiceTitle').textContent=event.title;
    $('choiceDescription').textContent=event.scene;
    $('choiceCards').innerHTML=event.choices.map((option,index)=>{
      const limit=storeEventLimit(option);
      return `<button type="button" class="choice-action" id="storeEvent${index}" ${limit?'disabled':''}><strong>${option.label}</strong><small>${option.effect}${limit?'（'+limit+'）':''}</small></button>`;
    }).join('');
    event.choices.forEach((option,index)=>{
      $('storeEvent'+index).onclick=()=>{
        if(state.phase!=='choice'||state.choiceEvent!==id||storeEventLimit(option))return;
        state.coins+=option.coins||0;
        state.maxHp+=option.maxHp||0;
        state.hp=Math.min(state.maxHp,state.hp+(option.hp||0));
        if(option.card)state[option.card]--;
        playSfx('confirm');
        advance();
      };
    });
  }
  function showChoice(mode){state.choiceMode=mode;upgradeSelectionIndex=null;rewardSelection=null;setScreen('choice');$('choiceScreen').classList?.toggle?.('complete-scene',mode==='complete');$('choiceScreen').classList?.toggle?.('upgrade-scene',mode==='upgrade');$('choiceScreen').classList?.toggle?.('reward-scene',['reward','eliteReward','special'].includes(mode));$('choiceCards').innerHTML='';$('choiceCards').className=mode==='eliteReward'?'choice-cards elite-offers':'choice-cards';$('skipChoice').hidden=false;$('confirmUpgradeBtn').hidden=true;$('confirmRewardBtn').hidden=true;$('confirmRewardBtn').disabled=true;$('rewardPreview').hidden=true;
    if(mode==='special'){
      const preferredRank=rewardRank('bossReward',Math.random());
      const eligible=availableRewardSkills().filter(canAddSkill);
      const skill=state.specialSkillOffer||random(eligible.filter(x=>skills[x].rank===preferredRank))||random(eligible.filter(x=>skills[x].rank===(preferredRank==='SR'?'R':'SR')));
      const boost=random(Object.keys(SPECIAL_BOOSTS).filter(id=>!state.specialBoosts.includes(id)));
      const alternate=random(Object.keys(SPECIAL_BOOSTS).filter(id=>id!==boost&&!state.specialBoosts.includes(id)));
      $('choiceEyebrow').textContent=`ACT ${state.act} BOSS DEFEATED`;$('choiceTitle').textContent=`${bossMonsters[state.act].name} を撃破！`;
      $('choiceDescription').textContent=`3つの特別報酬から1つ選択。${state.lastBattleArtifact?'ARTIFACT「'+artifacts[state.lastBattleArtifact].name+'」を獲得。':''}`;
      const options=state.choiceSpecialOptions||[{id:'skill',label:'SPECIAL SKILL',title:skill?skills[skill].label:'SKILL',detail:skill?effects(skills[skill]):'候補なし',icon:'✦',className:'skill',disabled:!skill},
        !state.typeBoost&&TYPE_EFFECTS[state.type]?{id:'type',label:'TYPE BOOST',title:`${TYPE_LABELS[state.type]}の特性強化`,detail:TYPE_BOOST_EFFECTS[state.type],icon:'◈',className:'type'}:{id:alternate||boost,label:'SPECIAL BOOST',title:SPECIAL_BOOSTS[alternate||boost]?.name||'強化済み',detail:SPECIAL_BOOSTS[alternate||boost]?.effect||'候補なし',icon:'✧',className:'boost',disabled:!(alternate||boost)},
        {id:boost,label:'SPECIAL BOOST',title:SPECIAL_BOOSTS[boost]?.name||'強化済み',detail:SPECIAL_BOOSTS[boost]?.effect||'候補なし',icon:'✧',className:'boost',disabled:!boost}];
      state.choiceSpecialOptions=options;
      if(!state.specialSkillOffer)state.specialSkillOffer=skill;
      $('choiceCards').innerHTML=options.map(x=>`<button type="button" class="special-choice ${x.className}" data-special="${x.id||''}" ${x.disabled?'disabled':''}><span class="special-label">${x.label}</span><span class="special-icon">${x.icon}</span><strong>${escapeHtml(x.title)}</strong><small>${escapeHtml(x.detail)}</small></button>`).join('');
      $('choiceCards').querySelectorAll('[data-special]').forEach(b=>b.onclick=()=>selectSpecialReward(b.dataset.special));
      $('skipChoice').hidden=true;
    } else if(mode==='actReady'){
      $('choiceEyebrow').textContent='ACT CHECKPOINT';$('choiceTitle').textContent=`ACT ${state.act} に進もう！`;
      $('choiceDescription').textContent=`ここで中断可能。HP ${state.hp}/${maxHp()}、SKILL ${state.owned.length}種類、ARTIFACT ${state.artifacts.length}個、COIN ${state.coins}。このブラウザに再開データを保存しました。`;
      const innovationChoices=hasArtifact('InnovationPlan')?[...new Set(state.owned.map(baseName))].filter(name=>skills[name]?.plus&&!state.owned.includes(name+'+')):[];
      $('choiceCards').innerHTML=innovationChoices.length?`<div class="choice-action"><strong>Innovation Plan</strong><small>このACTで＋に強化するSKILLを選ぼう</small></div>${innovationChoices.map(name=>`<button type="button" class="choice-action ${state.artifactActUpgrades.includes(name)?'selected':''}" data-innovation="${escapeHtml(name)}"><strong>${escapeHtml(skills[name].label)}＋</strong><small>${escapeHtml(briefEffect(getSkill(name+'+')))}</small></button>`).join('')}`:`<div class="choice-action"><strong>次の単語範囲</strong><small>${actWordLabel()}</small></div>`;
      $('choiceCards').querySelectorAll('[data-innovation]').forEach(button=>button.onclick=()=>{state.artifactActUpgrades=[button.dataset.innovation];showChoice('actReady');});
      $('skipChoice').textContent=`ACT ${state.act} を始める`;
      $('skipChoice').hidden=innovationChoices.length>0&&!state.artifactActUpgrades.length;
    } else if(mode==='treasure'){
      $('choiceEyebrow').textContent='TREASURE';$('choiceTitle').textContent='ARTIFACTを発見！';
      $('choiceDescription').textContent='探索中ずっと有効。3つのARTIFACTから1つ選ぼう。';
      const offered=state.choiceOffer||Array.from({length:3}).reduce((acc)=>{const id=artifactRoll(state.choiceEvent?'event':'treasure',acc);if(id)acc.push(id);return acc;},[]);
      state.choiceOffer=offered;
      $('choiceCards').innerHTML=offered.map(id=>`<button class="artifact-choice" type="button" data-artifact="${id}">${artifactPicture(id)}<strong>${artifacts[id].name} · ${artifacts[id].rank}</strong><small>${artifacts[id].effect}</small></button>`).join('')||'<p>すべてのARTIFACTを入手済みです。</p>';
      $('choiceCards').querySelectorAll('[data-artifact]').forEach(b=>b.onclick=()=>{playSfx('artifact');acquireArtifact(b.dataset.artifact);advance();});
      $('skipChoice').textContent='獲得せずに進む';
    } else if(mode==='shop'){
      renderShop();
    } else if(mode==='removeCard'){
      const atCamp=state.removeOrigin==='camp';
      $('choiceEyebrow').textContent='DECK EDIT';$('choiceTitle').textContent='削除するカードを選ぼう';
      $('choiceDescription').textContent=atCamp?'基本カードを1枚削除して、デッキを整えよう。':'COINは削除確定時に消費します。';
      $('choiceCards').innerHTML=[['Attack',state.basicAttack],['Guard',state.basicGuard]].filter(([,count])=>count>0).map(([id,count])=>`<button class="choice-action" data-remove="${id}"><strong>${skills[id].label}</strong><small>現在 ${count}枚 → 1枚削除</small></button>`).join('');
      $('choiceCards').querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{
        if(!atCamp){const item=state.shopStock[state.shopRemoveIndex];if(!item||item.sold||state.coins<shopPrice(item))return;state.coins-=shopPrice(item);item.sold=true;if(hasArtifact('PowerLeaf'))state.artifactDiscountUsed=true;}
        if(b.dataset.remove==='Attack')state.basicAttack--;else state.basicGuard--;
        if(atCamp){state.removeOrigin='shop';advance();}else showChoice('shop');
      });
      $('skipChoice').textContent=atCamp?'回復所へ戻る':'購入をやめる';
    } else if(mode==='reward'||mode==='eliteReward'){
      $('choiceEyebrow').textContent=mode==='bossReward'?'BOSS DEFEATED':'BATTLE CLEARED';
      $('choiceTitle').textContent=mode==='bossReward'?'番人を倒した！':mode==='treasure'?'宝箱を発見！':mode==='eliteReward'?'強敵を撃破！':'戦闘勝利！';
      $('choiceDescription').textContent=mode==='eliteReward'?'ARTIFACTまたはSKILLを1つ選択。SKILLは効果を確認して決定 · COIN＋25':'SKILLを選択 → 効果を確認 → 獲得を決定 · COIN＋12';
      state.choiceOffer=state.choiceOffer||rewardOptions(mode);
      const artifactId=mode==='eliteReward'?state.eliteArtifactOffer:null;
      $('choiceCards').innerHTML=(artifactId?`<button class="artifact-choice elite-artifact" type="button" data-elite-artifact="${artifactId}">${artifactPicture(artifactId)}<strong>${artifacts[artifactId].name} · ${artifacts[artifactId].rank}</strong><small>${artifacts[artifactId].effect}</small></button>`:'')+state.choiceOffer.map(x=>cardHtml(x,0,true)).join('');
      $('choiceCards').querySelectorAll('[data-elite-artifact]').forEach(b=>b.onclick=()=>eliteArtifactPicked(b.dataset.eliteArtifact));
      $('choiceCards').querySelectorAll('[data-reward]').forEach(b=>b.onclick=()=>selectRewardSkill(b.dataset.reward));
      $('skipChoice').textContent='獲得せずに進む';
    } else if(mode==='event'){
      const event=state.choiceEvent||drawMapEvent();state.choiceEvent=event;$('choiceEyebrow').textContent='UNKNOWN EVENT';
      if(storeEvents[event]){
        renderStoreEvent(event);
      } else if(event==='altar'){
        $('choiceTitle').textContent='不思議な祭壇';$('choiceDescription').textContent='淡く光る祭壇。力を捧げれば、何かが得られるという。';
        $('choiceCards').innerHTML=`<button type="button" class="choice-action" id="eventRisk" ${state.hp<=20?'disabled':''}>✦<strong>力を捧げる</strong><small>HP−20 / ARTIFACT候補${state.hp<=20?'（HP不足）':''}</small></button><button type="button" class="choice-action" id="eventSafe">♡<strong>祈る</strong><small>HP＋12</small></button>`;
        $('eventRisk').onclick=()=>{if(state.hp<=20)return;state.hp-=20;showChoice('treasure');};
        $('eventSafe').onclick=()=>{state.hp=Math.min(state.maxHp,state.hp+12);advance();};
      } else if(event==='spring'){
        $('choiceTitle').textContent='夜更けの休憩室';$('choiceDescription').textContent='静かな休憩室。回復するか、力を磨くか。';
        $('choiceCards').innerHTML='<button type="button" class="choice-action" id="eventRisk">✦<strong>技を磨く</strong><small>SKILLを1枚強化</small></button><button type="button" class="choice-action" id="eventSafe">♡<strong>泉で休む</strong><small>HP＋18</small></button>';
        $('eventRisk').onclick=()=>{state.upgradeFromEvent=true;showChoice('upgrade');};
        $('eventSafe').onclick=()=>{state.hp=Math.min(state.maxHp,state.hp+18);advance();};
      } else {
        $('choiceTitle').textContent='旅の商人';$('choiceDescription').textContent='道端にSKILLを扱う商人がいる。HPと引き換えにカードを見せてくれる。';
        $('choiceCards').innerHTML=`<button type="button" class="choice-action" id="eventRisk" ${state.hp<=18?'disabled':''}>✦<strong>取引する</strong><small>HP−18 / ARTIFACT候補${state.hp<=18?'（HP不足）':''}</small></button><button type="button" class="choice-action" id="eventSafe">↶<strong>通り過ぎる</strong><small>何も失わない</small></button>`;
        $('eventRisk').onclick=()=>{if(state.hp<=18)return;state.hp-=18;showChoice('treasure');};
        $('eventSafe').onclick=advance;
      }
      $('skipChoice').textContent='何もせず進む';
    } else if(mode==='camp'){
      $('choiceEyebrow').textContent='REST SITE';$('choiceTitle').textContent='静かな回復所';
      $('choiceDescription').textContent='次の戦いに備えて、1つ選ぼう。';
      $('choiceCards').innerHTML='<button type="button" class="choice-action" id="campHeal">✚<strong>HP +25</strong><small>回復する</small></button><button type="button" class="choice-action" id="campUpgrade">✦<strong>SKILL+</strong><small>1枚強化</small></button><button type="button" class="choice-action" id="campRemove" '+(state.basicAttack+state.basicGuard===0?'disabled':'')+'>↶<strong>デッキ整理</strong><small>基本カードを1枚削除</small></button>';
      $('campHeal').onclick=()=>{state.hp=Math.min(state.maxHp,state.hp+25);advance();};$('campUpgrade').onclick=()=>{state.upgradeFromEvent=false;showChoice('upgrade');};$('campRemove').onclick=()=>{state.removeOrigin='camp';showChoice('removeCard');};$('skipChoice').hidden=true;
    } else if(mode==='upgrade'){
      $('choiceEyebrow').textContent='UPGRADE';$('choiceTitle').textContent='どのSKILLを強化する？';
      $('choiceDescription').textContent='SKILLを選んで強化前後を比較。確定するまでは変更されません。';
      const choices=state.owned.map((name,index)=>({name,index})).filter(({name})=>!name.endsWith('+'));
      const groups=new Map();
      choices.forEach(({name,index})=>{if(!groups.has(name))groups.set(name,{name,index,count:0});groups.get(name).count++;});
      $('choiceCards').innerHTML=choices.length?`<div class="upgrade-layout"><div class="upgrade-list-panel"><div class="upgrade-list-heading">強化できるSKILL <span>${choices.length}枚</span></div><div class="upgrade-list">${[...groups.values()].map(({name,index,count})=>{const s=getSkill(name);return `<button type="button" class="upgrade-item" data-upgrade-index="${index}" aria-pressed="false"><span class="upgrade-item-icon ${s.type}">${escapeHtml(s.icon)}</span><span class="upgrade-item-copy"><strong>${escapeHtml(s.label)}</strong><small>${escapeHtml(briefEffect(s))}</small></span><span class="upgrade-item-meta"><b>${s.ap} AP</b>${count>1?`<small>×${count}</small>`:''}</span></button>`;}).join('')}</div></div><section class="upgrade-preview" id="upgradePreview" aria-live="polite"></section></div>`:'<div class="upgrade-empty">すべてのSKILLを強化済みです。代わりにHPを25回復できます。</div>';
      $('choiceCards').querySelectorAll('[data-upgrade-index]').forEach(button=>button.onclick=()=>selectUpgrade(Number(button.dataset.upgradeIndex)));
      if(choices.length)selectUpgrade(choices[0].index,true);
      $('skipChoice').textContent=choices.length?(state.upgradeFromEvent?'強化せず進む':'回復所へ戻る'):'HPを25回復して進む';
    } else if(mode==='defeat'){
      $('choiceEyebrow').textContent='RUN ENDED';$('choiceTitle').textContent='挑戦はここまで';
      $('choiceDescription').textContent=`ACT${state.act}・エリア${state.stage+1}で敗北。${state.questions}問に挑戦し、${state.correct}問正解しました。次はルートを変えてみよう。`;
      $('choiceCards').innerHTML='';
      $('skipChoice').textContent='最初から再挑戦';
    } else if(mode==='complete'){
      $('choiceEyebrow').textContent='DUNGEON CLEAR';$('choiceTitle').textContent=state.dungeon===1?'夜明けの百貨店':`${DUNGEONS[state.dungeon].title} 制覇！`;
      $('choiceDescription').textContent=`ACT 3 / 3 踏破 · ${state.fight}戦 · ${state.correct}/${state.questions}問正解`;
      $('choiceCards').innerHTML=`${state.dungeon===1?'<div class="clear-sunrise-art" role="img" aria-label="真夜中の百貨店に朝が訪れる"></div>':''}<div class="clear-stats"><div><small>冒険の記録</small><strong>${state.correct} / ${state.questions}</strong><span>正解 / 出題</span></div><div><small>残りHP</small><strong>${state.hp} / ${state.maxHp}</strong><span>3 ACT CLEAR</span></div><div><small>クリア報酬</small><strong>✦ 50</strong><span>星のかけら（試遊版・未付与）</span></div></div><p class="clear-word-record">学んだ単語 ${new Set(state.seenWords).size}語 · 誤答 ${new Set(state.wrongWords).size}語</p>`;
      $('skipChoice').textContent='編成を変えて再挑戦';
    }
    const reviewAvailable=['reward','eliteReward','special','defeat','complete'].includes(mode)&&!state.battleReviewUsed&&(state.battleWrongQuestions||[]).length>0;
    $('reviewWrongBtn').hidden=!reviewAvailable;
    if(reviewAvailable){$('reviewWrongBtn').textContent=mode==='defeat'?`✚ 間違えた問題を復習して HP${retryHp()}で再挑戦`:`✚ 間違えた問題を復習して HP＋10（${state.battleWrongQuestions.length}問）`;}
    saveCheckpoint();
  }
  function beginWrongReview(){
    if(state.battleReviewUsed||!state.battleWrongQuestions?.length)return;
    exitReviewQuestions=null;
    $('reviewMode').textContent='REVIEW BONUS';$('reviewTitle').textContent='間違えた問題を復習';$('reviewExitSkip').hidden=true;
    state.reviewIndex=0;$('reviewModal').hidden=false;renderWrongReview();
  }
  let runExitAction=null;
  let exitReviewQuestions=null;
  const reviewQuestions=()=>exitReviewQuestions||state.battleWrongQuestions;
  function uniqueRunWrongQuestions(){
    const seen=new Set();return (state.runWrongQuestions||[]).filter(q=>{
      const key=`${q.format}\u0000${q.stem}\u0000${q.answer}`;
      if(seen.has(key))return false;seen.add(key);return true;
    });
  }
  function renderWrongReview(){
    const questions=reviewQuestions(),q=questions[state.reviewIndex];if(!q)return;
    $('reviewProgress').textContent=`${state.reviewIndex+1} / ${questions.length}`;
    $('reviewStem').textContent=q.stem;
    $('reviewResult').textContent='';$('reviewResult').className='question-result';
    $('reviewExplanation').hidden=true;$('reviewExplanation').textContent='';$('reviewNext').hidden=true;
    $('reviewNext').textContent=state.reviewIndex===questions.length-1?(exitReviewQuestions?'総復習を完了する':'復習完了 · HP＋10'):'次の問題へ';
    $('reviewListen').hidden=q.format!=='audio';
    $('reviewAnswers').innerHTML='';
    $('reviewAnswers').classList.remove('order-grid');
    if(q.format==='q12')renderOrderChoices('reviewAnswers',q,answerWrongReview);
    else q.options.forEach((option,i)=>{const b=document.createElement('button');b.type='button';b.className='answer-btn';b.textContent=`${i+1}. ${option}`;b.onclick=()=>answerWrongReview(option);$('reviewAnswers').appendChild(b);});
    if(q.format==='audio'&&q.speak)speak(q.speak);
  }
  function answerWrongReview(value){
    const q=reviewQuestions()[state.reviewIndex];if(!q||!$('reviewNext').hidden)return;
    if(value!==q.answer){playSfx('wrong');$('reviewResult').className='question-result ng';$('reviewResult').textContent='もう一度考えてみよう。';return;}
    playSfx('correct');
    $('reviewResult').className='question-result ok';$('reviewResult').textContent='正解！';
    $('reviewExplanation').textContent=q.explanation||`正解：${q.answer}`;$('reviewExplanation').hidden=false;
    [...$('reviewAnswers').querySelectorAll('button')].forEach((b,i)=>{b.disabled=true;if(q.format==='q12')return;const option=q.options[i];if(option===q.answer)b.classList.add('correct');const note=q.optionNotes?.[option];if(note){const span=document.createElement('span');span.className='answer-translation';span.textContent=note;b.appendChild(span);}});
    $('reviewNext').hidden=false;
  }
  function nextWrongReview(){
    if($('reviewNext').hidden)return;
    if(state.reviewIndex<reviewQuestions().length-1){state.reviewIndex++;renderWrongReview();return;}
    $('reviewModal').hidden=true;
    if(exitReviewQuestions){exitReviewQuestions=null;finishRunExit();return;}
    state.battleReviewUsed=true;
    if(state.choiceMode==='defeat'){
      state.hp=retryHp();state.battleReviewRevived=true;startBattle(true);
    }else{
      state.hp=Math.min(state.maxHp,state.hp+10);showChoice(state.choiceMode);
    }
  }
  function openRunExit(action){
    if(!['route','battle','choice'].includes(state.phase)||state.choiceMode==='complete')return;
    runExitAction=action;exitReviewQuestions=null;closeHelp();
    const unique=uniqueRunWrongQuestions(),all=(state.runWrongQuestions||[]).length;
    $('runExitCount').textContent=all?`この挑戦の誤答 ${all}問 · 復習対象 ${unique.length}問`:'この挑戦の誤答 0問';
    $('runExitDetail').textContent=all?`${action==='pause'?'復習後に進行を保存して中断します。':'復習後に挑戦を終了します。'} 同じ問題の重複はまとめて出題します。`:`まだ間違えた問題はありません。${action==='pause'?'進行を保存して中断できます。':'挑戦を終了できます。'}`;
    $('runExitYes').disabled=!unique.length;
    $('runExitNo').textContent=action==='pause'?'NO · 保存して中断':'NO · 挑戦を終了';
    $('runExitOverlay').hidden=false;
  }
  function finishRunExit(){
    $('reviewModal').hidden=true;$('runExitOverlay').hidden=true;
    if(runExitAction==='pause'&&saveCheckpoint()===false){
      $('runExitOverlay').hidden=false;
      $('runExitDetail').textContent='この端末に保存できませんでした。保存を再試行するか、冒険に戻ってください。';
      return;
    }
    else if(runExitAction==='abandon')clearCheckpoint();
    runExitAction=null;exitReviewQuestions=null;
    state.pending=null;state.question=null;state.cardSelection=null;state.choiceMode=null;
    $('questionModal').hidden=true;$('cardPickModal').hidden=true;
    setScreen('intro');renderDungeonPicker();renderSelectedCompanion();renderLoadouts();
  }
  function beginRunExitReview(){
    if(!runExitAction)return;
    const questions=uniqueRunWrongQuestions();
    if(!questions.length){finishRunExit();return;}
    exitReviewQuestions=questions;state.reviewIndex=0;
    $('runExitOverlay').hidden=true;
    $('reviewMode').textContent='RUN REVIEW';$('reviewTitle').textContent='この挑戦の誤答を総復習';$('reviewExitSkip').hidden=false;
    $('reviewModal').hidden=false;renderWrongReview();
  }
  function chooseSpecial(id){if(state.choiceMode!=='special')return;
    if(id==='skill'){if(!state.specialSkillOffer)return;state.owned.push(state.specialSkillOffer);}
    else if(id==='type'){if(state.typeBoost)return;state.typeBoost=true;}
    else if(SPECIAL_BOOSTS[id]&&!state.specialBoosts.includes(id)){
      state.specialBoosts.push(id);
      if(id==='maxHp'){state.maxHp+=15;state.hp=Math.min(maxHp(),state.hp+15);}
      if(id==='purify'){state.basicAttack=Math.max(0,state.basicAttack-1);state.basicGuard=Math.max(0,state.basicGuard-1);}
    }else return;
    state.specialSkillOffer=null;state.choiceSpecialOptions=null;
    state.act++;state.artifactActUpgrades=[];saveCheckpoint();showChoice('actReady');
  }
  function eliteArtifactPicked(id){if(state.choiceMode!=='eliteReward'||!id||id!==state.eliteArtifactOffer)return;playSfx('artifact');acquireArtifact(id);advance();}
  function rewardPicked(name){if(canAddSkill(name))state.owned.push(name);advance();}
  function advance(){state.stage++;state.choiceOffer=null;state.eliteArtifactOffer=null;state.choiceEvent=null;state.choiceSpecialOptions=null;showRoute();}
  function skipChoice(){if(state.choiceMode==='defeat'||state.choiceMode==='complete'){const wasDungeonOne=state.dungeon===1;clearCheckpoint();setScreen('intro');renderLoadouts();renderDungeonPicker();if(wasDungeonOne)showLatestJournalIfNew();return;}
    if(state.choiceMode==='actReady'){startAct();return;}
    if(state.choiceMode==='removeCard'){showChoice(state.removeOrigin==='camp'?'camp':'shop');return;}
    if(state.choiceMode==='shop'){advance();return;}
    if(state.choiceMode==='upgrade'){if(!state.owned.some(x=>!x.endsWith('+'))){state.hp=Math.min(state.maxHp,state.hp+25);advance();return;}if(state.upgradeFromEvent){advance();return;}showChoice('camp');return;}
    if(['reward','eliteReward','treasure','event'].includes(state.choiceMode))advance();}
  function closeDungeonMap(){$('dungeonMap').hidden=true;}
  $('examGrade').onchange=e=>{if(state.phase==='intro'){state.examGrade=e.target.value==='1'?1:2;saveSetup();}};
  $('dungeonMapOpen').onclick=()=>{dungeonMapPage=Math.floor((state.dungeon-1)/DUNGEON_PAGE_SIZE);renderDungeonPicker();$('dungeonMap').hidden=false;};
  $('dungeonMapClose').onclick=closeDungeonMap;
  $('dungeonMapPrev').onclick=()=>{dungeonMapPage=Math.max(0,dungeonMapPage-1);renderDungeonPicker();};
  $('dungeonMapNext').onclick=()=>{dungeonMapPage++;renderDungeonPicker();};
  $('dungeonMap').onclick=e=>{if(e.target===$('dungeonMap'))closeDungeonMap();};
  $('dungeonPicker').onclick=e=>{const b=e.target.closest?.('[data-dungeon]');if(!b||b.disabled)return;
    const picked=Number(b.dataset.dungeon);if(!DUNGEONS[picked]||(picked===2&&!stage2Unlocked()))return;
    state.dungeon=picked;saveSetup();renderDungeonPicker();renderLoadouts();closeDungeonMap();};
  $('companionPickOpen').onclick=openCompanions;$('signatureDetailOpen').onclick=showSignature;$('skillPickOpen').onclick=openSkills;
  $('bestiaryOpen').onclick=()=>showBestiary();$('usedPoolOpen').onclick=showUsed;
  $('journalOpen').onclick=showJournal;
  $('journalClose').onclick=()=>{$('journalOverlay').hidden=true;};
  $('journalOverlay').onclick=e=>{if(e.target===$('journalOverlay'))$('journalOverlay').hidden=true;};
  $('skillConfirm').onclick=()=>{$('skillOverlay').hidden=true;};
  for(const [overlayId,closeId] of [['companionOverlay','companionClose'],['signatureOverlay','signatureClose'],['skillOverlay','skillClose'],['bestiaryOverlay','bestiaryClose'],['usedOverlay','usedClose']]){
    $(closeId).onclick=()=>{$(overlayId).hidden=true;};
    $(overlayId).onclick=e=>{if(e.target===$(overlayId))$(overlayId).hidden=true;};
  }
  $('badgeFilters').querySelectorAll('[data-badge-filter]').forEach(b=>b.onclick=()=>{badgeFilter=b.dataset.badgeFilter;renderBadges();});
  $('badgeOpen').onclick=showBadges;$('badgeMenuOpen').onclick=()=>{closeHelp();showBadges();};
  $('badgeClose').onclick=()=>{$('badgeOverlay').hidden=true;};
  $('badgeOverlay').onclick=e=>{if(e.target===$('badgeOverlay'))$('badgeOverlay').hidden=true;};
  $('startBtn').onclick=()=>{
    if(readCheckpoint())$('restartDialog').showModal();
    else start();
  };
  $('restartCancel').onclick=()=>$('restartDialog').close();
  $('restartConfirm').onclick=()=>{
    $('restartDialog').close();
    start();
  };
  $('endTurnBtn').onclick=endTurn;$('skipChoice').onclick=skipChoice;$('confirmUpgradeBtn').onclick=confirmUpgrade;$('confirmRewardBtn').onclick=confirmReward;
  $('reviewWrongBtn').onclick=beginWrongReview;$('reviewNext').onclick=nextWrongReview;
  $('reviewListen').onclick=()=>{const q=reviewQuestions()[state.reviewIndex];if(q?.speak)speak(q.speak);};
  $('reviewExitSkip').onclick=()=>{if(exitReviewQuestions)finishRunExit();};
  $('pauseRunBtn').onclick=()=>openRunExit('pause');
  $('abandonRunBtn').onclick=()=>openRunExit('abandon');
  $('runExitYes').onclick=beginRunExitReview;
  $('runExitNo').onclick=finishRunExit;
  $('runExitCancel').onclick=()=>{runExitAction=null;exitReviewQuestions=null;$('runExitOverlay').hidden=true;};
  $('resumeBtn').onclick=resumeCheckpoint;
  $('artifactButton').onclick=()=>{renderResources();$('artifactOverlay').hidden=false;};
  $('closeArtifacts').onclick=()=>{$('artifactOverlay').hidden=true;};
  $('artifactOverlay').onclick=e=>{if(e.target===$('artifactOverlay'))$('artifactOverlay').hidden=true;};
  function closeHelp(){$('helpOverlay').hidden=true;$('menuToggle').setAttribute('aria-expanded','false');}
  $('menuToggle').onclick=()=>{
    if(!$('helpOverlay').hidden){closeHelp();return;}
    $('menuRunActions').hidden=!['route','battle','choice'].includes(state.phase)||state.choiceMode==='complete';
    $('helpStats').innerHTML=[['ACT',`${state.act}/3`],['戦闘',`${state.fight}回`],['正解',`${state.correct}/${state.questions}問`],['HP',`${state.hp}/${state.maxHp}`],['山札',`${state.deck.length}枚`],['USED',`${state.used.length}枚`],['COIN',`${state.coins}`]].map(([label,value])=>`<span><small>${label}</small><strong>${value}</strong></span>`).join('');
    $('helpOverlay').hidden=false;$('menuToggle').setAttribute('aria-expanded','true');
  };
  $('deckMenuOpen').onclick=()=>{closeHelp();showDeck();};
  $('deckClose').onclick=()=>{$('deckOverlay').hidden=true;};
  $('deckOverlay').onclick=e=>{if(e.target===$('deckOverlay'))$('deckOverlay').hidden=true;};
  $('deckFilters').querySelectorAll('[data-deck-filter]').forEach(button=>button.onclick=()=>{deckFilter=button.dataset.deckFilter;renderDeck();});
  $('closeHelp').onclick=closeHelp;
  $('helpOverlay').onclick=e=>{if(e.target===$('helpOverlay'))closeHelp();};
  document.addEventListener?.('keydown',e=>{if(e.key==='Escape'){if(!$('dungeonMap').hidden)closeDungeonMap();else if(!$('helpOverlay').hidden)closeHelp();}});
  $('closeQuestion').onclick=closeQuestion;$('continueQuestion').onclick=()=>state.pending?.bossChallenge?finishBossChallenge():finishQuestion();
  $('listenBtn').onclick=()=>{if(state.question?.speak)speak(state.question.speak);};
  window.addEventListener('pageshow',()=>{if(state.phase==='intro'){refreshCompanions();refreshCarryInventory();renderSelectedCompanion();renderLoadouts();if(!$('skillOverlay').hidden)openSkills();}});
  renderSelectedCompanion();renderBestiarySummary();
  renderLoadouts();renderDungeonPicker();renderBadgeSummary();$('resumeBtn').hidden=!readCheckpoint();
})();
