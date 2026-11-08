/* Presentation only: never changes answers, scoring, storage or quiz handlers. */
(function () {
  'use strict';
  function counter(stats, progress, answered) {
    const score = stats.match(/正解\s*(\d+)/)?.[1] || '0';
    const current = (progress || stats).match(/第\s*(\d+)問\s*\/\s*(\d+)問/);
    const session = stats.match(/今回：\s*(\d+)\s*\/\s*(\d+)/);
    if (current) return `${current[1]} / ${current[2]}問 · 正解 ${score}`;
    if (session) return `${Math.min(Number(session[2]), Number(session[1]) + (answered ? 0 : 1))} / ${session[2]}問 · 正解 ${score}`;
    return '';
  }
  window.StudyFocus = { counter };
  function mount() {
    const box = document.getElementById('playBox');
    if (!box || box.dataset.focusMounted) return;
    box.dataset.focusMounted = '1';
    box.classList.add('study-focus');
    const find = id => box.querySelector('#' + id);
    const stats = find('stats');
    const progress = find('questionProgress') || find('questionNo');
    const next = find('nextQTop') || find('nextBtn') || find('nextQ');
    const results = ['result', 'detail', 'feedbackBox'].map(find).filter(Boolean);
    const bank = find('chunkBank')?.parentElement;
    const slots = find('answerSlots')?.parentElement;
    const choices = bank || find('choices') || find('choicesBox');
    const header = document.createElement('div'); header.className = 'study-focus-bar';
    const count = document.createElement('span'); count.className = 'study-focus-count';
    header.append(count);
    const more = document.createElement('details'); more.className = 'study-focus-more';
    const title = document.createElement('summary'); title.textContent = '詳細';
    const content = document.createElement('div'); content.className = 'study-focus-options';
    more.append(title, content); header.append(more); box.prepend(header);
    [stats, progress, find('qMeta'), find('questionNoLine')].filter(Boolean).forEach(el => content.append(el));
    ['backBtn', 'jumpIdiomBtn', 'jumpParaphraseBtn', 'manualWeakBtn', 'prevBtn'].map(find).filter(Boolean).forEach(el => content.append(el));
    const audioQuiz = location.pathname.endsWith('audio_quiz.html');
    if (!audioQuiz) {
      const sound = find('speakQ') || find('speakBtn') || find('readBtn');
      if (sound) {
        const oldParent = sound.parentElement;
        sound.classList.add('study-focus-sound'); header.append(sound);
        if (oldParent !== box && oldParent.textContent.includes('※自動発音')) oldParent.classList.add('study-focus-empty');
      }
    }
    if (next) { next.classList.add('study-focus-next'); header.append(next); }
    // Remove only redundant navigation, retaining the existing button and its listeners.
    const duplicate = next?.id === 'nextQTop' ? find('nextQ') : null;
    if (duplicate) duplicate.classList.add('study-focus-duplicate');
    box.querySelectorAll('.row, .questionNavRow').forEach(el => {
      if (!el.textContent.trim()) el.classList.add('study-focus-empty');
    });
    let review = null;
    if (bank && slots) {
      review = document.createElement('details'); review.className = 'study-focus-review'; review.open = true;
      const summary = document.createElement('summary'); summary.textContent = '自分の解答・語句カードを確認';
      bank.before(review); review.append(summary, bank, slots);
      const controls = document.createElement('div'); controls.className = 'study-focus-answer-tools';
      ['hintBtn', 'resetBtn', 'checkBtn'].map(find).filter(Boolean).forEach(el => controls.append(el));
      if (next) controls.append(next);
      header.after(controls);
    }
    box.querySelectorAll('.row').forEach(el => { if (!el.textContent.trim()) el.classList.add('study-focus-empty'); });
    const anchors = results.map(el => { const marker = document.createComment('feedback-position'); el.before(marker); return marker; });
    let previous = false;
    const update = () => {
      // Feedback is empty on a fresh question. A validation warning is not an answer.
      const ready = next ? !next.disabled && results.some(el => el.textContent.trim()) : !!find('feedbackBox') && !find('feedbackBox').classList.contains('hidden');
      const value = counter(stats?.textContent || '', progress?.textContent || '', ready);
      if (count.textContent !== value) count.textContent = value;
      if (ready === previous) return;
      previous = ready; box.classList.toggle('study-focus-answered', ready); more.open = false;
      if (review) review.open = !ready;
      if (ready && (review || choices)) results.forEach(el => (review || choices).before(el));
      else results.forEach((el, i) => anchors[i].after(el));
      if (ready) {
        requestAnimationFrame(() => {
          if (!box.getClientRects().length) return;
          const first = results.find(el => el.textContent.trim());
          if (!first) return;
          const rect = first.getBoundingClientRect();
          if (rect.top < 72 || rect.top > innerHeight * .25) box.scrollIntoView({block:'start', behavior:'auto'});
        });
      }
    };
    const observer = new MutationObserver(update);
    [stats, progress, next, ...results].filter(Boolean).forEach(el => observer.observe(el, {childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:['disabled','class']}));
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
