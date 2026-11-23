(() => {
  const owner = () => window.GOIMONProfiles?.currentAccount() || 'guest';
  const today = () => new Date(Date.now() + 9 * 3600000).toISOString().slice(0, 10);
  const key = () => 'goimon_dungeon_mission_v1:' + owner();
  function recordDefeat(run) {
    if (run.missionOwner !== owner() || run.missionRecorded || run.hp > 0 || !(run.fight >= 1)) return;
    try {
      localStorage.setItem(key(), JSON.stringify({ date: today(), wins: run.fight, outcome: 'defeat' }));
      run.missionRecorded = true;
    } catch {}
  }
  function result(date = today()) {
    try {
      const record = JSON.parse(localStorage.getItem(key()));
      return record?.date === date && record.outcome === 'defeat' && record.wins >= 1 ? record : null;
    } catch { return null; }
  }
  function card(host, { completed, claimed, claim }) {
    const section = document.createElement('section');
    section.className = 'card mission-card ' + (completed ? 'completed' : 'open');
    function add(tag, value) {
      const el = document.createElement(tag);
      el.textContent = value;
      section.append(el);
      return el;
    }
    add('h3', 'ダンジョンに挑戦');
    add('p', '1回の冒険でバトルに1回以上勝ち、その後のバトルで負けると達成！');
    add('p', '✦ ほしのかけら 2個').className = 'mission-reward';
    if (completed) add('p', claimed ? '✓ 報酬受取済み' : '✓ 達成済み');
    if (completed && !claimed && claim) add('button', '報酬を受け取る').onclick = claim;
    const link = add('a', 'ダンジョンへ');
    link.href = 'dungeon/index.html';
    link.className = 'btn';
    host.append(section);
  }
  window.GoimonDungeonMission = { owner, recordDefeat, result, card };
})();
