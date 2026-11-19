(function(root) {
  'use strict';

  // Base stats before scaling to the partner's evolution stage.
  const encounters = {
    1: { hp: 120, defense: 20, attack: 8.1 },
    2: { hp: 130, defense: 22, attack: 8.1 },
    3: { hp: 140, defense: 24, attack: 8.1 },
    4: { hp: 145, defense: 20, attack: 8.1 },
    5: { hp: 210, defense: 32, attack: 11 },
    6: { hp: 155, defense: 22, attack: 8.1 },
    7: { hp: 185, defense: 28, attack: 11 },
    8: { hp: 175, defense: 24, attack: 9 },
    9: { hp: 320, defense: 36, attack: 14 }
  };

  function enemy(catalog, id, stage) {
    const scale = Math.max(1, Number(stage) || 1);
    const kind = id === 9 ? 'boss' : id === 5 || id === 7 ? 'tank' : 'normal';
    const base = catalog.enemies[kind];
    const stats = encounters[id];
    const hp = Math.round(stats.hp * scale);
    return {
      ...base,
      id: 'ch2-enemy-' + id,
      attr: id === 1 || id >= 8 ? 'mirage' : 'metal',
      reference: 9 * scale,
      hp,
      maxHp: hp,
      attack: Math.round(stats.attack * scale),
      defense: Math.round(stats.defense * scale),
      speed: Math.round(base.speed * scale),
      shield: { hits: 0, factor: 1 }
    };
  }

  const api = { enemy };
  if (typeof module !== 'undefined') module.exports = api;
  else root.GoimonChapter2Battle = api;
})(typeof window !== 'undefined' ? window : globalThis);
