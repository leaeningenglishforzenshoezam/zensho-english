// Reuse the original GOIMON controls and storage; no second copy of育成 logic.
(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  if (params.get('manage') !== '1') return;
  const section = params.get('section') || (params.get('panel') === 'dex' ? 'dex' : 'overview');
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('management-page');
    const main = document.createElement('main');
    main.className = 'management-main';
    main.innerHTML = `<a href="index.html">← 学習ホーム</a><p class="management-kicker">YOUR GOIMON</p><h1>育成とコレクション</h1><p>これまで育てた相棒の名前・進化・保存箱を確認できます。</p><div class="management-actions"><button data-manage="nickname">ニックネーム入力</button><button data-manage="history">進化の軌跡</button><button data-manage="archive">育てたゴイモンの保存箱</button><button data-manage="dex">ゴイモン図鑑</button><button data-manage="overview">相棒の詳細・技と装備</button></div>`;
    document.body.append(main);const original=document.querySelector('.goimonHomeCard');if(original){original.style.display='block';main.append(original);}
    function open(which) {
      if (which === 'dex') { document.getElementById('openGoimonDexBtn').click(); return; }
      document.getElementById('openGoimonSheetBtn').click();
      let target;
      if (which === 'nickname') {
        if (document.getElementById('goimonNicknameEditorWrap').classList.contains('hidden')) document.getElementById('toggleGoimonNicknameEditorBtn').click();
        target = document.getElementById('goimonNicknameEditInput');
      } else if (which === 'archive') {
        if (document.getElementById('goimonArchiveList').classList.contains('hidden')) document.getElementById('openGoimonArchiveBtn').click();
        target = document.getElementById('goimonArchiveSummary');
      } else if (which === 'history') target = document.getElementById('goimonEvolutionHistoryRow');
      requestAnimationFrame(() => { target?.scrollIntoView({block:'center'}); if (which === 'nickname') target?.focus({preventScroll:true}); });
    }
    main.addEventListener('click', e => { const b=e.target.closest('[data-manage]');if(b)open(b.dataset.manage); });
    // Run after the shared navigation's initial panel routing.
    setTimeout(() => open(section), 0);
  }, {once:true});
})();
