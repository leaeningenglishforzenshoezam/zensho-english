// learning_log.js
(function(){
  const LEVEL_KEY = "zensho_level_v1";

  function getLevel(){
    return localStorage.getItem(LEVEL_KEY) || "1";
  }
  function keyFor(base){
    return `${base}_lv${getLevel()}`;
  }
  function logKey(){
    return keyFor("zensho_learning_log_v1");
  }
  function pad2(n){ return String(n).padStart(2,"0"); }
  function todayKey(){
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
  }
  function safeParse(key){
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
  function safeSave(key, obj){
    localStorage.setItem(key, JSON.stringify(obj));
  }

  // category例: "quiz_enja", "quiz_jaen", "sentence", "accent"
  // correctBool: true/false
  function zenshoLogAdd(category, correctBool){
    const k = logKey();
    const root = safeParse(k);
    const log = (root && typeof root === "object") ? root : {};

    const dayKey = todayKey();
    if (!log[dayKey] || typeof log[dayKey] !== "object") log[dayKey] = {};
    if (!log[dayKey][category] || typeof log[dayKey][category] !== "object") {
      log[dayKey][category] = { attempt:0, correct:0, wrong:0 };
    }

    const slot = log[dayKey][category];
    slot.attempt = Number(slot.attempt||0) + 1;
    if (correctBool) slot.correct = Number(slot.correct||0) + 1;
    else slot.wrong = Number(slot.wrong||0) + 1;

    safeSave(k, log);
  }

  // もし必要なら、あとでカテゴリ単位の消去等も足せます
  window.zenshoLogAdd = zenshoLogAdd;
})();
