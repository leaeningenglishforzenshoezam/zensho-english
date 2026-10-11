document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const D=window.ProgressData, $=id=>document.getElementById(id);
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let level=GOIMONStorage.getItem('zensho_level_v1')==='2'?'2':'1',view='blocks',filter='all';
  const badge=state=>`<span class="badge ${state}">${D.labels[state]}</span>`;
  const matches=state=>filter==='all'||filter===state;
  const url=(page,b)=>`${page}?start=${b.start}&end=${b.end}${['quiz.html','quiz_jaen.html','audio_quiz.html'].includes(page)?'&autostart=1':''}`;
  const link=(href,text,primary=false)=>`<a class="action${primary?' primary':''}" href="${esc(href)}">${esc(text)} →</a>`;
  function blockCard(b) {
    return `<article class="card"><div class="between"><div><h3>Block ${esc(b.id)}</h3><div class="muted">単語 ${b.start}〜${b.end}</div></div>${badge(b.state)}</div>
      <p class="lead">${b.action.label}${b.action.state==='needs_review'?'を復習しよう':'に取り組もう'}</p>
      ${link(url(b.action.page,b),`${b.action.label}を${b.action.state==='needs_review'?'復習':'学習'}`,true)}
      <details><summary>学習ごとの記録・別の学習</summary>
      <table class="stats"><caption class="muted">累計正答率（正解数／回答数）</caption><thead><tr><th scope="col">学習</th><th scope="col">記録</th><th scope="col">状態</th></tr></thead><tbody>
      <tr><th scope="row"><a href="${url('study.html',b)}">暗記 →</a></th><td>${b.study}回<small>延べ確認回数</small></td><td>${b.study?'記録あり':'未挑戦'}</td></tr>
      ${b.items.map(x=>`<tr><th scope="row"><a href="${url(x.page,b)}">${x.label} →</a></th><td>${x.rate===null?'—':x.rate+'%'}<small>${x.correct}／${x.attempt}問</small></td><td>${badge(x.state)}${x.attempt>0&&x.attempt<20?`<small>判定まであと${20-x.attempt}問</small>`:''}</td></tr>`).join('')}
      </tbody></table></details></article>`;
  }
  function examCard(x) {
    return `<article class="card"><div class="between"><h3>${esc(x.label)}</h3>${badge(x.state)}</div>
      <div class="metrics"><div><strong>${x.rate===null?'—':x.rate+'%'}</strong><span>累計正答率</span></div><div><strong>${x.judged}問</strong><span>正誤の記録</span></div></div>
      <p class="muted">正解 ${x.correct}／${x.judged}問${x.judged>0&&x.judged<20?` · 判定まであと${20-x.judged}問`:''}</p>${link(x.page,'学習する')}
      </article>`;
  }
  function q7Card() {
    const q=D.q7(),state=q.sets.length&&q.passed===q.sets.length?'clear':q.touched?'learning':'untouched';
    const needs=q.sets.some(s=>s.last!==null&&s.last<4);
    // SET全体のラベルと絞り込みには最終得点の要復習を優先する。
    const actual=needs?'needs_review':state;
    if(!matches(actual))return '';
    return `<article class="card"><div class="between"><h3>大問7 要約空所補充</h3>${badge(actual)}</div>
      <div class="metrics"><div><strong>${q.passed}／${q.sets.length} SET</strong><span>4問以上正解の経験あり</span></div><div><strong>${q.attempts}回</strong><span>SETへの挑戦</span></div></div>
      ${link('q7.html','SETを選んで学習')}
      <details><summary>SETごとの記録</summary><table class="stats"><thead><tr><th scope="col">SET</th><th scope="col">最終／最高</th><th scope="col">挑戦</th></tr></thead><tbody>
      ${q.sets.map(s=>`<tr><th scope="row">SET ${esc(s.number)}</th><td>${s.last??'—'}／${s.best??'—'}<small>各5点満点</small></td><td>${s.attempts}回${s.last!==null&&s.last<4?'<small>要復習</small>':''}</td></tr>`).join('')}</tbody></table>
      <p class="muted">過去の最高点と最終得点を表示します。累計正答率ではありません。最終得点が4点未満のSETがあれば「要復習」です。</p></details></article>`;
  }
  function listeningCard(x) {
    if(x.state==='pending')return `<article class="card pending"><div class="between"><h3>大問${x.format}</h3>${badge('pending')}</div><p class="muted">現在準備中です。</p></article>`;
    return `<article class="card"><div class="between"><h3>大問${x.format}</h3>${badge(x.state)}</div>
      <div class="metrics"><div><strong>${x.touched}／${x.total}</strong><span>取り組んだ音声教材</span></div><div><strong>${x.rate===null?'—':x.rate+'%'}</strong><span>大問別記録の正答率</span></div></div>
      <p class="muted">正解 ${x.correct}／${x.judged}問${x.judged>0&&x.judged<20?` · 判定まであと${20-x.judged}問`:''}</p>
      ${link(`listening.html?format=${x.format}`,'この大問を学習',true)}
      <details><summary>取り組み回数・記録について</summary><p class="muted">問題演習 ${x.quiz}回 · 音読などの練習 ${x.practice}回（音声教材単位）</p><p class="muted">正答率は大問別記録の追加後に採点した設問から集計します。以前の回数は引き継ぎますが、以前の正誤は大問別に復元できません。大問5は1教材内の各設問を数えます。</p></details></article>`;
  }
  function render() {
    const value=Number($('passLine').value),line=Number.isFinite(value)&&$('passLine').value!==''?Math.max(1,Math.min(100,Math.round(value))):80;
    $('passLine').value=String(line);
    const blocks=D.blocks(level,line),cleared=blocks.filter(x=>x.state==='clear').length;
    $('lv1').setAttribute('aria-pressed',String(level==='1'));$('lv2').setAttribute('aria-pressed',String(level==='2'));
    $('clearCount').textContent=`${cleared}／${blocks.length} ブロック`;
    $('clearProgress').max=blocks.length||1;$('clearProgress').value=cleared;
    $('summary').textContent=['needs_review','learning','untouched'].map(s=>`${D.labels[s]} ${blocks.filter(x=>x.state===s).length}`).join(' · ');
    document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));
    let cards=[];
    $('listTitle').textContent={blocks:'ブロック別',exams:'大問別',listening:'リスニング'}[view];
    $('viewNote').textContent='';
    if(view==='blocks')cards=blocks.filter(x=>matches(x.state)).map(blockCard);
    if(view==='exams') {
      if(level==='1')cards.push(q7Card());
      cards.push(...D.exams(level,line).filter(x=>matches(x.state)).map(examCard));
      if(level==='2')$('viewNote').textContent='2級のアクセント・大問9の記録は「ブロック別」で確認できます。';
    }
    if(view==='listening') {
      if(level==='1')cards=D.listening(level,line).filter(x=>matches(x.state)).map(listeningCard);
      else $('viewNote').textContent='大問2〜6の演習は現在1級のみです。2級の「音声→意味」はブロック別で確認できます。';
    }
    cards=cards.filter(Boolean);$('cards').innerHTML=cards.join('');$('resultCount').textContent=`${cards.length}件`;$('emptyState').hidden=cards.length>0;
  }
  for(const lv of ['1','2'])$('lv'+lv).addEventListener('click',()=>{level=lv;GOIMONStorage.setItem('zensho_level_v1',lv);render();});
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.view;filter='all';render();}));
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;render();}));
  $('passLine').addEventListener('change',render);$('refresh').addEventListener('click',render);
  $('resetGlobal').addEventListener('click',()=>{
    if(!confirm(`全商英検${level}級のブロック進捗だけを削除しますか？\n大問別・リスニング・ゴイモン・苦手記録は削除しません。`))return;
    GOIMONStorage.removeItem(`zensho_block_global_lv${level}_v1`);$('notice').textContent=`${level}級のブロック記録をリセットしました。`;render();
  });
  window.addEventListener('pageshow',()=>{level=GOIMONStorage.getItem('zensho_level_v1')==='2'?'2':'1';render();});
  window.addEventListener('storage',()=>{level=GOIMONStorage.getItem('zensho_level_v1')==='2'?'2':'1';render();});
  render();
});
