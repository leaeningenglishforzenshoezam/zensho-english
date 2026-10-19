// Shared fixed avatar catalog. Never accepts uploaded images or arbitrary URLs.
(function(root){
 const entries=[
  {
    "id": "egg",
    "name": "たまご",
    "image": "images/goimon/goimon_egg.png"
  },
  {
    "id": "boy",
    "name": "おとこのこ",
    "image": "images/avatars/boy.svg"
  },
  {
    "id": "girl",
    "name": "おんなのこ",
    "image": "images/avatars/girl.svg"
  },
  {
    "id": "nagomi:child",
    "name": "ラミア",
    "image": "images/goimon/nagomi_child.png"
  },
  {
    "id": "nagomi:growth",
    "name": "ラミナス",
    "image": "images/goimon/nagomi_growth.png"
  },
  {
    "id": "nagomi:mid",
    "name": "ラムノエル",
    "image": "images/goimon/nagomi_mid.png"
  },
  {
    "id": "nagomi:final",
    "name": "セラフィラムノア",
    "image": "images/goimon/nagomi_final.png"
  },
  {
    "id": "hirameki:child",
    "name": "フェネ",
    "image": "images/goimon/hirameki_child.png"
  },
  {
    "id": "hirameki:growth",
    "name": "フェネロ",
    "image": "images/goimon/hirameki_growth.png"
  },
  {
    "id": "hirameki:mid",
    "name": "フェネグラ",
    "image": "images/goimon/hirameki_mid.png"
  },
  {
    "id": "hirameki:final",
    "name": "フェネノクス",
    "image": "images/goimon/hirameki_final.png"
  },
  {
    "id": "tsumugi:child",
    "name": "ミコラ",
    "image": "images/goimon/tsumugi_child.png"
  },
  {
    "id": "tsumugi:growth",
    "name": "クラージュ",
    "image": "images/goimon/tsumugi_growth.png"
  },
  {
    "id": "tsumugi:mid",
    "name": "オンミョーゲ",
    "image": "images/goimon/tsumugi_mid.png"
  },
  {
    "id": "tsumugi:final",
    "name": "セイメイラ",
    "image": "images/goimon/tsumugi_final.png"
  },
  {
    "id": "yomitoki:child",
    "name": "レムパス",
    "image": "images/goimon/yomitoki_child.png"
  },
  {
    "id": "yomitoki:growth",
    "name": "レムオルド",
    "image": "images/goimon/yomitoki_growth.png"
  },
  {
    "id": "yomitoki:mid",
    "name": "レムトラス",
    "image": "images/goimon/yomitoki_mid.png"
  },
  {
    "id": "yomitoki:final",
    "name": "レムインカ",
    "image": "images/goimon/yomitoki_final.png"
  },
  {
    "id": "shirabe:child",
    "name": "プラチル",
    "image": "images/goimon/shirabe_child.png"
  },
  {
    "id": "shirabe:growth",
    "name": "プラネモ",
    "image": "images/goimon/shirabe_growth.png"
  },
  {
    "id": "shirabe:mid",
    "name": "プラチラス",
    "image": "images/goimon/shirabe_mid.png"
  },
  {
    "id": "shirabe:final",
    "name": "ノーティプス",
    "image": "images/goimon/shirabe_final.png"
  },
  {
    "id": "hibiki:child",
    "name": "ケロル",
    "image": "images/goimon/hibiki_child.png"
  },
  {
    "id": "hibiki:growth",
    "name": "ゴロッグ",
    "image": "images/goimon/hibiki_growth.png"
  },
  {
    "id": "hibiki:mid",
    "name": "ライゲロ",
    "image": "images/goimon/hibiki_mid.png"
  },
  {
    "id": "hibiki:final",
    "name": "トルゲロス",
    "image": "images/goimon/hibiki_final.png"
  },
  {
    "id": "kotonoha:child",
    "name": "カメロン",
    "image": "images/goimon/kotonoha_child.png"
  },
  {
    "id": "kotonoha:growth",
    "name": "トリレオン",
    "image": "images/goimon/kotonoha_growth.png"
  },
  {
    "id": "kotonoha:mid",
    "name": "シルクレオ",
    "image": "images/goimon/kotonoha_mid.png"
  },
  {
    "id": "kotonoha:final",
    "name": "ファントレオ",
    "image": "images/goimon/kotonoha_final.png"
  },
  {
    "id": "mr_uno:child",
    "name": "魔法見習いUNO",
    "image": "images/goimon/mr_uno_child.png"
  },
  {
    "id": "mr_uno:growth",
    "name": "デスイーターUNO",
    "image": "images/goimon/mr_uno_growth.png"
  },
  {
    "id": "mr_uno:mid",
    "name": "フィジカル覚醒UNO",
    "image": "images/goimon/mr_uno_mid.png"
  },
  {
    "id": "mr_uno:final",
    "name": "理の境地MR.UNO",
    "image": "images/goimon/mr_uno_final.png"
  },
  {
    "id": "q7_special:child",
    "name": "大問7 特別ルート・幼体",
    "image": "images/goimon/q7_inventors_child.png"
  },
  {
    "id": "q7_special:growth",
    "name": "大問7 特別ルート・成長体",
    "image": "images/goimon/q7_inventors_growth.png"
  },
  {
    "id": "q7_special:mid",
    "name": "大問7 特別ルート・中級体",
    "image": "images/goimon/q7_inventors_mid.png"
  },
  {
    "id": "q7_special:final",
    "name": "大問7 特別ルート・上級体",
    "image": "images/goimon/q7_inventors_final.png"
  },
  {
    "id": "q8_special:child",
    "name": "大問8 特別ルート・幼体",
    "image": "images/goimon/q8_odin_sleipnir_child.png"
  },
  {
    "id": "q8_special:growth",
    "name": "大問8 特別ルート・成長体",
    "image": "images/goimon/q8_odin_sleipnir_growth.png"
  },
  {
    "id": "q8_special:mid",
    "name": "大問8 特別ルート・中級体",
    "image": "images/goimon/q8_odin_sleipnir_mid.png"
  },
  {
    "id": "q8_special:final",
    "name": "大問8 特別ルート・上級体",
    "image": "images/goimon/q8_odin_sleipnir_final.png"
  },
  {
    "id": "q10_special:child",
    "name": "大問10 特別ルート・幼体",
    "image": "images/goimon/q10_kraken_child.png"
  },
  {
    "id": "q10_special:growth",
    "name": "大問10 特別ルート・成長体",
    "image": "images/goimon/q10_kraken_growth.png"
  },
  {
    "id": "q10_special:mid",
    "name": "大問10 特別ルート・中級体",
    "image": "images/goimon/q10_kraken_mid.png"
  },
  {
    "id": "q10_special:final",
    "name": "大問10 特別ルート・上級体",
    "image": "images/goimon/q10_kraken_final.png"
  }
];
 root.GOIMONAvatars={entries,get:id=>entries.find(e=>e.id===id),unlocked(id,data){if(["egg","boy","girl"].includes(id))return true;if(!entries.some(e=>e.id===id))return false;return ["1","2"].some(level=>{try{return JSON.parse(data["zensho_goimon_dex_discovery_v2_lv"+level]||"{}")[id]===true;}catch{return false;}});}};
})(globalThis);
