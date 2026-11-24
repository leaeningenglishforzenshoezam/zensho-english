/* Small, crisp enemy silhouettes: shared ink, flat fills and no gradients. */
(() => {
  // Character images are keyed by displayed name, not AI role: multiple enemies
  // can share a combat role without sharing the same portrait.
  const characterArt={
    '女社長MIKA':'images/enemies/mika.webp',
    '熱血簿記RIKI':'images/enemies/riki.webp',
    'ラーメン魔人HODAKA':'images/enemies/hodaka.webp',
    'そろばん小僧':'images/enemies/abacus-kid.png',
    '仕訳じじい':'images/enemies/journal-grandpa.png',
    '減価償却ゾンビ':'images/enemies/depreciation-zombie.png',
    'イフキツネ':'images/enemies/if-fox.png',
    'ルックアップテング':'images/enemies/vlookup-tengu.png',
    'SWOT四面鬼':'images/enemies/swot-oni.png',
    'クーリングオフ雪女':'images/enemies/cooling-off-yukionna.png',
    'デフレガリガリ':'images/enemies/deflation-gaunt.png',
    'サムガッパ':'images/enemies/sum-kappa.png',
    '貸し倒れ幽霊':'images/enemies/bad-debt-ghost.png',
    '棚卸ぬらりひょん':'images/enemies/inventory-nurarihyon.png',
    'インフレ入道':'images/enemies/inflation-nyudo.png',
    '独禁法の番犬':'images/enemies/antitrust-cerberus.png',
    'ランビトクイーン':'images/enemies/randbetween-queen.png',
    '値下げオーガ':'images/enemies/price-breaking-oni.png',
    '等価交換ジョーカー':'images/enemies/equal-exchange-joker.png',
    '悪徳税理士':'images/enemies/corrupt-tax-accountant.png',
    // Dungeon 2: station x commerce spirits; same transparent canvas as Dungeon 1.
    '改札ノッペラ':'images/enemies/d2-kaisatsu-noppera.png',
    '棚卸百目':'images/enemies/d2-tanaoroshi-hyakume.png',
    '伝票ヒトダマ':'images/enemies/d2-denpyou-hitodama.png',
    'ツリセンカラクリ':'images/enemies/d2-tsurisen-karakuri.png',
    '精算ノロイ':'images/enemies/d2-seisan-noroi.png',
    '納品バコ':'images/enemies/d2-nouhin-bako.png',
    'コダマラッパ':'images/enemies/d2-kodama-rappa.png',
    '終電ドケイ':'images/enemies/d2-shuuden-dokei.png',
    '泥酔サラリーマン':'images/enemies/d2-elite-doroyoi-salaryman.png',
    '遅延利息板':'images/enemies/d2-elite-chien-risokuban.png',
    '切符ギロチン':'images/enemies/d2-elite-kippu-guillotine.png',
    '忘れ物競売師':'images/enemies/d2-elite-wasuremono-auctioneer.png',
    '終売キオスク':'images/enemies/d2-elite-shuubai-kiosk.png',
    'ぶつかりおばさん':'images/enemies/d2-elite-butsukari-obasan.png'
  };
  const ink='#203c48', cream='#f8edcf', eye='<circle cx="66" cy="43" r="4.4" fill="#203c48"/><circle cx="67.4" cy="41.7" r="1.4" fill="white"/>';
  const body=(color,extras='',face=eye)=>`<ellipse cx="60" cy="80" rx="40" ry="11" fill="#0b2732" opacity=".12"/><path d="M24 69 Q17 39 42 23 Q60 12 83 26 Q106 44 95 73 Q81 91 54 85 Q33 86 24 69Z" fill="${color}" stroke="${ink}" stroke-width="5" stroke-linejoin="round"/>${extras}${face}`;
  const pics={
    attacker:`<path d="M24 43 8 33 23 55M87 44 109 28 102 58" fill="#9dc5ac" stroke="${ink}" stroke-width="5" stroke-linejoin="round"/>${body('#b9d2bc','<path d="M41 25 39 9 54 21 74 11 79 28" fill="#8fb49e" stroke="'+ink+'" stroke-width="4"/><path d="M49 61Q62 72 77 58" fill="none" stroke="'+ink+'" stroke-width="4" stroke-linecap="round"/><path d="M57 65 60 74 65 65" fill="'+cream+'" stroke="'+ink+'" stroke-width="2"/>')}`,
    tank:`<path d="M18 70 8 79 28 78M96 70 110 80 90 79" fill="#a3a0a0" stroke="${ink}" stroke-width="4"/>${body('#a5adb1','<path d="M27 46 43 21 59 36 78 19 93 44 77 70 47 76Z" fill="#778c96" stroke="'+ink+'" stroke-width="4"/><path d="m47 36 6 16-13 10M78 19 70 43 80 55" stroke="#dce1d5" stroke-width="4" fill="none"/>','<circle cx="66" cy="58" r="3" fill="'+ink+'"/>')}`,
    support:`<path d="M60 38C35 24 27 10 38 7 49 5 60 23 60 38ZM60 38C82 14 101 13 98 29 94 42 73 44 60 38" fill="#65aa81" stroke="${ink}" stroke-width="4"/>${body('#8fd0a0','<circle cx="48" cy="48" r="4" fill="'+ink+'"/><path d="M50 65 Q61 74 72 63" fill="none" stroke="'+ink+'" stroke-width="3"/>','<circle cx="74" cy="48" r="4" fill="'+ink+'"/>')}`,
    charger:`<path d="m28 47-10-29 26 17M82 34l22-25-5 39" fill="#f0ad57" stroke="${ink}" stroke-width="5" stroke-linejoin="round"/>${body('#dda55c','<path d="m50 29 12-18-3 21 13-3-18 29 2-19-13 2Z" fill="'+cream+'" stroke="'+ink+'" stroke-width="3"/><path d="M56 65 77 67" stroke="'+ink+'" stroke-width="3"/>')}`,
    sentinel:`<path d="M14 36Q59 5 106 36L99 78 60 104 21 78Z" fill="#8cbaab" stroke="${ink}" stroke-width="5"/><path d="M26 42 59 24 94 43 88 73 60 92 32 73Z" fill="#d2e6cf" stroke="${ink}" stroke-width="3"/><path d="M59 33V81M38 53H80" stroke="#6d9b8c" stroke-width="7" stroke-linecap="round"/><circle cx="46" cy="43" r="3" fill="${ink}"/><circle cx="73" cy="43" r="3" fill="${ink}"/>`,
    conductor:`<path d="M14 34 45 21 60 7 74 22 106 33 88 79 60 91 31 79Z" fill="#98accf" stroke="${ink}" stroke-width="5"/><path d="M19 24 34 12 49 21M72 18 89 8 102 25" fill="none" stroke="#eac47f" stroke-width="5" stroke-linecap="round"/><circle cx="48" cy="49" r="5" fill="${ink}"/><circle cx="73" cy="49" r="5" fill="${ink}"/><path d="M52 70Q60 75 69 69" fill="none" stroke="${ink}" stroke-width="3"/><path d="M95 67q12-19 10-31m-9 9 12-5" fill="none" stroke="#f6d088" stroke-width="4" stroke-linecap="round"/>`,
    counter:`<path d="M22 33 10 8 42 25M79 25l30-17-10 33" fill="#d1b5a0" stroke="${ink}" stroke-width="5"/>${body('#ddc2a5','<path d="M33 39Q47 31 57 42M63 42Q78 30 88 40" fill="none" stroke="'+ink+'" stroke-width="5"/><circle cx="46" cy="51" r="8" fill="'+cream+'" stroke="'+ink+'" stroke-width="3"/><circle cx="76" cy="51" r="8" fill="'+cream+'" stroke="'+ink+'" stroke-width="3"/><path d="m58 59 6 0-3 9Z" fill="#df8c5e" stroke="'+ink+'" stroke-width="2"/>','<circle cx="46" cy="51" r="3" fill="'+ink+'"/><circle cx="76" cy="51" r="3" fill="'+ink+'"/>')}`,
    boss:`<path d="M16 49 5 24 30 34 41 8 56 23 78 9 87 34 111 25 102 59" fill="#8a9abd" stroke="${ink}" stroke-width="5" stroke-linejoin="round"/>${body('#758fb0','<path d="M36 39Q58 17 83 38" stroke="'+cream+'" stroke-width="6" fill="none"/><path d="M47 66q13 12 28 0" fill="none" stroke="'+ink+'" stroke-width="4"/><path d="m51 70 5 9 5-8 6 8 5-9" fill="'+cream+'"/>')}`
  };
  // Temporary distinct vector portraits until the teacher-inspired PNGs are approved.
  // These are only used for Dungeon 2 bosses; Dungeon 1's portrait mappings stay intact.
  const stationBossSketches={
    'LOST & FOUND NAKAJIMA':`<path d="M88 17h25v73H88z" fill="#a9bdad" stroke="${ink}" stroke-width="4"/><path d="M91 35h18M91 54h18M91 73h18" stroke="${ink}" stroke-width="3"/><path d="M96 29q7-9 11 0l-2 6h-7zM98 48l9-3 1 7-9 3z" fill="#f2c978" stroke="${ink}" stroke-width="2"/><path d="M30 63q-15 9-11 26h64q1-22-16-26" fill="#547b88" stroke="${ink}" stroke-width="4"/><ellipse cx="51" cy="46" rx="25" ry="28" fill="#f9dfb5" stroke="${ink}" stroke-width="4"/><path d="M23 27h57l-9-17H33z" fill="#416474" stroke="${ink}" stroke-width="4"/><path d="M31 26h42" stroke="#f2cc77" stroke-width="5"/><circle cx="42" cy="45" r="3" fill="${ink}"/><circle cx="61" cy="45" r="3" fill="${ink}"/><path d="M37 57q14 16 29-1" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><path d="M17 8q-6 9 1 15M90 7q7 9-1 17" fill="none" stroke="#deaa58" stroke-width="4" stroke-linecap="round"/><path d="M14 5v12M86 5v12" stroke="#deaa58" stroke-width="2"/>`,
    '冷酷検札官REI':`<path d="m37 78-19 20-12-7 21-25M60 79l21 19 14-6-22-25" fill="#314a68" stroke="${ink}" stroke-width="4" stroke-linejoin="round"/><path d="M28 49q-11 7-18 25l10 5 21-14M72 46l23 13-3 16-29-13" fill="#527692" stroke="${ink}" stroke-width="4"/><path d="M31 60q12-14 35-8l15 24-31 10-23-13z" fill="#557d9b" stroke="${ink}" stroke-width="4"/><path d="M36 49q-10-16-4-28 8-16 29-9 17 10 9 28l-15 15z" fill="#efd3ad" stroke="${ink}" stroke-width="4"/><path d="M25 24q8-29 43-18l12 14-52 9z" fill="#2f4d6a" stroke="${ink}" stroke-width="4"/><path d="M27 27h42" stroke="#f4d075" stroke-width="4"/><path d="m32 37 14-2m7 0 13 2" stroke="${ink}" stroke-width="3"/><path d="m42 44 18 1" stroke="${ink}" stroke-width="3"/><path d="m93 59 15-8 6 10-15 8z" fill="#f1ce79" stroke="${ink}" stroke-width="3"/>`,
    '忘却車掌YOSHI':`<circle cx="98" cy="21" r="17" fill="#f6e8bb" stroke="${ink}" stroke-width="3"/><path d="M98 10v12l-8 6" fill="none" stroke="${ink}" stroke-width="3"/><path d="M37 62q-11 4-13 27h64q-3-24-15-28" fill="#596b83" stroke="${ink}" stroke-width="4"/><path d="m54 58 4 28m3-22 12 22" fill="none" stroke="#f2cb7f" stroke-width="4"/><ellipse cx="53" cy="44" rx="24" ry="26" fill="#f3d8b0" stroke="${ink}" stroke-width="4"/><path d="M30 41q-10-24 7-31l26 1q16 9 13 29l-11-9-31 4z" fill="#e5e3da" stroke="${ink}" stroke-width="3"/><path d="M27 23h51l-10-15H36z" fill="#364e69" stroke="${ink}" stroke-width="4"/><path d="M31 22h44" stroke="#f1c979" stroke-width="4"/><path d="m41 43 7 1m11-1 7-1" stroke="${ink}" stroke-width="3"/><path d="M46 54q8-4 16 0m-15 4q7 5 15-1" stroke="${ink}" fill="none" stroke-width="2.5"/><path d="M20 84h14l-2 15H22z" fill="#d19c6d" stroke="${ink}" stroke-width="3"/>`
  };
  window.enemyArt=(kind,name)=>{
    const image=characterArt[name];
    if(image)return `<img class="enemy-sprite enemy-art-image transparent" src="${image}" alt="" decoding="async">`;
    if(stationBossSketches[name])return `<svg class="enemy-sprite" viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false" aria-hidden="true">${stationBossSketches[name]}</svg>`;
    return `<svg class="enemy-sprite" viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false" aria-hidden="true">${pics[kind]||pics.attacker}</svg>`;
  };
})();
