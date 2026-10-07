(function () {
  'use strict';
  const n = value => Number.isFinite(Number(value)) ? Math.max(0, Math.floor(Number(value))) : 0;
  function read(key) { try { const x=JSON.parse(localStorage.getItem(key)||'{}'); return x && typeof x==='object' && !Array.isArray(x) ? x : {}; } catch (_) { return {}; } }
  const modes = [
    ['quizAttempted','quizCorrect','英→日','quiz.html'],
    ['quizAttemptedJaEn','quizCorrectJaEn','日→英','quiz_jaen.html'],
    ['accentAttempted','accentCorrect','アクセント','accent.html'],
    ['sentenceAttempted','sentenceCorrect','大問9','sentence.html'],
    ['audioAttempted','audioCorrect','音声→意味','audio_quiz.html']
  ];
  const labels = {untouched:'未挑戦',learning:'学習中',needs_review:'要復習',clear:'目安クリア',pending:'準備中'};
  function status(attempt, correct, line, activity=attempt) {
    if (!activity) return 'untouched';
    if (attempt < 20) return 'learning';
    return correct/attempt*100 < line ? 'needs_review' : 'clear';
  }
  function blocks(level, line) {
    const list = (level==='2' ? window.BLOCKS_2KYU : window.BLOCKS_1KYU) || [];
    const saved=read(`zensho_block_global_lv${level}_v1`).byBlock || {};
    return list.map(b=>{
      const rec=saved[b.id] || {}, study=n(rec.studyDone);
      const items=modes.map(([a,c,label,page])=>{
        const attempt=n(rec[a]),correct=Math.min(attempt,n(rec[c]));
        const state=status(attempt,correct,line);
        return {label,page,attempt,correct,state,rate:attempt?Math.round(correct/attempt*100):null};
      });
      const state=items.some(x=>x.state==='needs_review')?'needs_review':study && items.every(x=>x.state==='clear')?'clear':study || items.some(x=>x.attempt)?'learning':'untouched';
      const weak=items.filter(x=>x.state==='needs_review').sort((a,b)=>a.correct/a.attempt-b.correct/b.attempt)[0];
      const action=weak || (!study?{label:'暗記',page:'study.html'}:items.find(x=>x.state!=='clear') || items.slice().sort((a,b)=>a.rate-b.rate)[0]);
      return {...b,study,items,state,action};
    });
  }
  function exams(level,line) {
    const sums={};
    Object.values(read(`zensho_learning_log_v1_lv${level}`)).forEach(day=>{
      if(!day || typeof day!=='object')return;
      Object.entries(day).forEach(([key,s])=>{if(!s || typeof s!=='object')return;const v=sums[key] ||= {attempt:0,correct:0,wrong:0};for(const k of ['attempt','correct','wrong'])v[k]+=n(s[k]);});
    });
    const blockKeys=new Set(['study','quiz_enja','quiz_jaen','audio_quiz','accent','sentence','listening','q7']);
    return window.LearningCategories.getProgressCategories(level).filter(c=>!blockKeys.has(c.key)).map(c=>{
      const s=sums[c.key]||{attempt:0,correct:0,wrong:0}, judged=s.correct+s.wrong;
      return {...c,...s,judged,state:status(judged,s.correct,line,s.attempt),rate:judged?Math.round(s.correct/judged*100):null};
    });
  }
  function q7() {
    const saved=read('q7SetHistory_v1');
    const sets=(window.q7Sets||[]).map(s=>{
      const h=saved[s.id]||{};
      const valid=x=>Number.isInteger(x)&&x>=0&&x<=5;
      return {id:s.id,title:s.title,number:s.number,attempts:n(h.attempts),last:valid(h.lastScore)?h.lastScore:null,best:valid(h.bestScore)?h.bestScore:null,passed:h.passed===true || valid(h.bestScore)&&h.bestScore>=4};
    });
    return {sets,passed:sets.filter(s=>s.passed).length,touched:sets.filter(s=>s.attempts>0).length,attempts:sets.reduce((a,s)=>a+s.attempts,0)};
  }
  function listening(level,line) {
    const catalogs=level==='1'?{2:typeof LISTENING_TYPE2_1KYU==='undefined'?[]:LISTENING_TYPE2_1KYU,3:typeof listeningType3_1kyu==='undefined'?[]:listeningType3_1kyu,5:window.LISTENING_TYPE5_1KYU||[]} : {};
    const methods=read(`zensho_listening_method_attempts_v1_lv${level}`),legacy=read(`zensho_listening_attempts_v1_lv${level}`),scores=window.ListeningProgress.read(level);
    return [2,3,4,5,6].map(format=>{
      if(!catalogs[format])return {format,state:'pending'};
      let touched=0,quiz=0,practice=0;
      for(const q of catalogs[format]) {
        const m=methods[q.id]||{};
        const count=n(m.quiz ?? legacy[q.id]);
        const other=n(m.dictation)+n(m.overlapping)+n(m.shadowing);
        quiz+=count;practice+=other;if(count+other>0)touched++;
      }
      const s=scores[format]||{},correct=n(s.correct),wrong=n(s.wrong),judged=correct+wrong;
      return {format,total:catalogs[format].length,touched,quiz,practice,correct,judged,rate:judged?Math.round(correct/judged*100):null,state:status(judged,correct,line,quiz+practice+judged)};
    });
  }
  window.ProgressData={read,n,modes,labels,status,blocks,exams,q7,listening};
})();
