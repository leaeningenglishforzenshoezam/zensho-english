/* Read the active profile's current companions and archive, in home-level order. */
window.readDungeonCompanions = function () {
  const storage = window.GOIMONStorage;
  const profiles = window.GOIMONProfiles;
  if (!storage || !profiles || profiles.currentAccount() !== profiles.account) return [];
  const levels = storage.getItem('zensho_level_v1') === '2' ? [2, 1] : [1, 2];
  const companions = new Map();
  for (const level of levels) {
    for (const source of ['current', 'archive']) {
      let value;
      try {
        value = JSON.parse(storage.getItem('zensho_goimon_' + source + '_v4_lv' + level));
      } catch { continue; }
      const pets = source === 'current' ? [value] : Array.isArray(value) ? value : [];
      for (const pet of pets) {
        if (!pet || typeof pet.id !== 'string' || !pet.id) continue;
        const entry = window.GoimonDex.getEntry(pet.type, pet.stage);
        if (!entry) continue;
        const id = level + '/' + pet.id;
        if (companions.has(id)) continue;
        companions.set(id, {
          id, type: pet.type, name: pet.nickname || entry.name,
          form: level + '級 · ' + window.GoimonDex.getStageLabel(pet.stage),
          species: window.GoimonDex.getSpecies(pet.type)?.label || 'ゴイモン',
          image: '../' + entry.image
        });
      }
    }
  }
  return [...companions.values()];
};
