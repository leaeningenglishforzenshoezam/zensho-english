// Shared navigation. Uses the existing pages and GOIMON dialogs.
(() => {
 'use strict';
 const bar=document.getElementById('goimon-account-bar');if(!bar)return;
 const paths={menu:'M4 6h16M4 12h16M4 18h16',close:'m6 6 12 12M6 18 18 6',user:'M20 21v-2a7 7 0 0 0-14 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',home:'m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7',book:'M12 5v16M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2Z',egg:'M12 3c-4 0-8 8-8 12a8 8 0 0 0 16 0c0-4-4-12-8-12ZM8 14h.01M16 14h.01m-6 3q2 2 4 0',grid:'M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM14 14h7v7h-7Z',history:'M3 11a9 9 0 1 1 2 7M3 4v7h7M12 7v6l4 2',star:'m12 3 3 6 6 1-4.5 4.5 1 6.5-5.5-3-5.5 3 1-6.5L3 10l6-1Z'};
 const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
 const button=document.createElement('button');button.id='goimon-menu-toggle';button.type='button';button.setAttribute('aria-label','メニューを開く');button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','goimon-navigation');button.innerHTML=icon('menu');bar.prepend(button);
 const dialog=document.createElement('dialog');dialog.id='goimon-navigation';dialog.setAttribute('aria-labelledby','goimon-menu-title');
 const link=(href,label,name,extra='')=>`<a class="gn-link" href="${href}" ${extra}>${icon(name)}<span>${label}</span><span class="gn-arrow" aria-hidden="true">›</span></a>`;
 const lessons=[['list.html','単語一覧'],['study.html','単語を覚える'],['quiz.html','単語クイズ｜英語 → 日本語'],['quiz_jaen.html','単語クイズ｜日本語 → 英語'],['audio_quiz.html','単語クイズ｜音声 → 意味'],['idiom_quiz.html','イディオム'],['listening.html','リスニング'],['accent.html','大問1｜アクセント'],['q7.html','大問7｜要約空所補充'],['dialogue.html','大問8｜会話文空欄補充'],['sentence.html','大問9｜短文空欄補充'],['q10.html','大問10｜長文空欄補充'],['paraphrase_quiz.html','大問11｜言い換え'],['reorder.html','大問12｜語句整序']];
 dialog.innerHTML=`<div class="gn-head"><div><span class="gn-kicker">GOIMON</span><h2 id="goimon-menu-title">メニュー</h2></div><button type="button" class="gn-close" aria-label="メニューを閉じる" autofocus>${icon('close')}</button></div>
 <a class="gn-profile" href="cloud.html"><span class="gn-avatar">${icon('user')}</span><span><strong>プロフィール設定</strong><small id="gn-account">アカウント・保存の確認</small></span><span class="gn-arrow" aria-hidden="true">›</span></a>
 <nav aria-label="GOIMONメインメニュー">
 ${link('index.html','ホーム','home')}${link('recommended.html','今日のおすすめ','star')}
 <div class="gn-section">ゴイモンと学習の記録</div>
 ${link('index.html?panel=goimon','現在のゴイモンの様子','egg','data-panel="goimon"')}${link('index.html?panel=dex','ゴイモン図鑑','grid','data-panel="dex"')}${link('progress.html','学習履歴・進捗','history')}
 <details class="gn-lessons"><summary>${icon('book')}<span>学習メニュー</span><span class="gn-arrow" aria-hidden="true">⌄</span></summary><div>${lessons.map(([href,label])=>`<a href="${href}">${label}<span aria-hidden="true">›</span></a>`).join('')}</div></details>
 </nav><div class="gn-footer"><a href="privacy.html">プライバシーポリシー</a><a href="mailto:goimon.admin@gmail.com">お問い合わせ</a></div>`;
 paths.bell='M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4';
 dialog.querySelector('nav').insertAdjacentHTML('afterbegin',link('announcements.html','お知らせ','bell','id="gn-news"'));
 document.body.append(dialog);
 const newsScript=document.createElement('script');newsScript.src='cloud_news.js';document.head.append(newsScript);
 let previousOverflow='';
 const home=location.pathname.endsWith('/index.html')||location.pathname.endsWith('/');
 function panel(name){const id={goimon:'openGoimonSheetBtn',dex:'openGoimonDexBtn'}[name];document.getElementById(id)?.click();}
 function close(){dialog.close();}
 button.onclick=()=>{if(dialog.open)return;previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';document.getElementById('gn-account').textContent=bar.querySelector('a')?.textContent.replace(/^[●○]\s*/,'')||'アカウント・保存の確認';button.setAttribute('aria-expanded','true');dialog.showModal();};
 dialog.querySelector('.gn-close').onclick=close;
 dialog.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const items=[...dialog.querySelectorAll('button,a[href],summary')].filter(el=>!el.disabled&&el.getClientRects().length);const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;button.setAttribute('aria-expanded','false');button.focus({preventScroll:true});});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
 for(const a of dialog.querySelectorAll('a[data-panel]'))a.addEventListener('click',e=>{if(home){e.preventDefault();close();setTimeout(()=>panel(a.dataset.panel),0);}});
 for(const a of dialog.querySelectorAll('a[href]')){const url=new URL(a.href);if(url.pathname===location.pathname&&!url.search)a.setAttribute('aria-current','page');}
 function initialPanel(){const url=new URL(location.href),name=url.searchParams.get('panel');if(home&&['goimon','dex'].includes(name)){setTimeout(()=>{panel(name);url.searchParams.delete('panel');history.replaceState(null,'',url.pathname+url.search+url.hash);},0);}}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialPanel,{once:true});else initialPanel();
})();
