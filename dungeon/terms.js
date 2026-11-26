(() => {
 const terms = {
 'DRAW PILE':'山札。ここからカードを引きます。','END TURN':'ターン終了。敵が行動し、次のターンに進みます。','TAKE SKILL':'このスキルを獲得してデッキに加える。','HOW TO PLAY':'遊び方。画像付きで冒険の流れを説明します。','BATTLE TERMS':'カード・戦闘用語','CARRY OVER':'残った防御やAPを、上限まで次のターンに持ち越す。',
 FROM:'～から',PRIOR:'それまでの',DECK:'デッキ。この挑戦で使うカード全体。', HAND:'手札。今使えるカード。', DRAW:'山札からカードを引く。',USED:'使い終えたカードの置き場。',DISCARD:'効果を使わずに手札を捨てる。',RETRIEVE:'回収。USEDから対象カードを選んで手札に戻す。',REUSE:'再使用。USEDのカードをその場で使う。回収枚数には含みません。',SEAL:'除外。この戦闘が終わるまで使えなくなります。',SPROUT:'芽。戦闘中にたまり、対応する攻撃を強くします。',DMG:'ダメージ。敵に与える攻撃の量。',BLOCK:'防御値。受けるダメージを減らします。',HEAL:'HPを回復する。',PIERCE:'貫通。敵の防御を無視します。',TURN:'ターン。行動する順番。',AREA:'エリア。ダンジョン内の現在地。',NEXT:'敵の次の行動。',USE:'選んだカードを使う。',VICTORY:'戦闘勝利。',AP:'行動ポイント。カードを使うと消費します。',HP:'体力。',COIN:'コイン。買い物に使います。',ARTIFACT:'持っていると効果が働くアイテム。',SKILL:'スキル。カードに備わった技。',ACT:'ダンジョンの区切り。',BASIC:'基本カード。',N:'ノーマル',R:'レア',SR:'スーパーレア',ALL:'すべて',TARGET:'対象',ATTACK:'攻撃',MAX:'最大',PER:'～につき',ON:'～したとき',KO:'撃破',THIS:'この',AFTER:'～した後',BEFORE:'～する前',IF:'もし～なら',ENEMY:'敵',SELF:'自分',COST:'消費',FORMAT:'問題形式',UNIQUE:'異なる種類',CORRECT:'正解',CANCEL:'取り消す',WEAKEN:'弱める',BONUS:'追加',STRIKE:'通常攻撃',GUARD:'通常防御',JUNK:'不良在庫'
 };
 const pairs = `FIRST AID=応急手当|BURST=炸裂|SCREAM=叫び|ENCOURAGE=励ます|REMIND=思い出させる|AID=助ける|PRONOUNCE=発音する|RHYTHM=リズム|COMFORT=慰める|WHISPER=ささやく|FLASH=閃光|ANGLE=角度|SHADE=影|PRESS=押す|SLICE=切り裂く|LOCK=封じる|REPAIR=修理する|SHOCK=衝撃|CURE=治す|COMMAND=命令|SURROUND=取り囲む|DISTURB=妨げる|PRETEND=ふりをする|PROTECT=守る|EXTEND=延ばす|DISAPPEAR=消える|BROADCAST=放送|ABSOLUTE=絶対的な|ECHO=こだま|MELODY=旋律|PULSE=脈動|RESONANCE=共鳴|HARMONY=調和|CRESCENDO=次第に強く|ASSEMBLE=組み立てる|PATTERN=型|LINK=つなぐ|SEQUENCE=順序|REBUILD=再建する|SYMPHONY=交響曲|SAVINGS PLAN=貯蓄計画|RETURN SLIP=返品伝票|SPARK=火花|SHELTER=避難所|TEMPO=テンポ|CHORUS=合唱|INSIGHT=洞察|RESOLVE=決意|REFORM=改革|FORTRESS=要塞|COUNTER=反撃|GUARD SHIFT=防御の切り替え|REPLAY=もう一度使う|GROW=育つ|HARVEST=収穫|SELECT=選ぶ|TRIGGER=引き金|SACRIFICE=犠牲|FOCUS=集中|FINALE=終幕|RESONANT FIELD=共鳴の場|PURIFY=浄化する|ARCHIVE=記録を保存する|OVERGROWTH=繁茂|RECAST=作り直す|AFTERIMAGE=残像|CHAIN=連鎖|SEED=種|SWEEP=一掃する|MOMENTUM=勢い|RESERVE=蓄える|IGNITION=点火|FINISHER=とどめの一撃|CLEARANCE=在庫一掃|LEDGER CUT=帳簿の一撃|TWIN GUARD=二重防御|NIGHT SHIFT=夜勤|OVERTIME=時間外勤務|TEAMWORK=協力|INDEX=索引|AFTER HOURS=営業時間外|SAFE EXIT=安全な出口|OPEN BOOK=開いた本|CLOSEOUT=売り尽くし|LAST CALL=最終案内|NIGHT MARKET=夜市|STOCK RESERVE=予備在庫|CASHBACK=払い戻し|MARGIN CALL=追加証拠金の請求|QUICK AUDIT=簡易監査|LAST MINUTE=土壇場|BALANCE SHEET=貸借対照表|REORDER=並べ直す|BULK SALE=まとめ売り|PRICE MATCH=価格対抗|CHAIN REACTION=連鎖反応|FINAL INVOICE=最終請求書`;
 for(const pair of pairs.split('|')){const [word,meaning]=pair.split('=');terms[word]=meaning}
 const pattern=new RegExp('(?<![A-Za-z])('+Object.keys(terms).sort((a,b)=>b.length-a.length).join('|')+')(?![A-Za-z])','g');
 const scope='#battle,#choiceScreen,#helpOverlay,#usedOverlay,#deckOverlay,#intro,#skillOverlay,#runResources,#questionSkill,#questionType,#cardPickModal,.copy';
 const excluded='#endTurnBtn,script,style,select,option,dialog,[data-word],#questionStem,#answers,#questionExplanation';
 const dialog=document.createElement('dialog');dialog.className='translation';dialog.setAttribute('aria-label','用語の日本語訳');
 dialog.innerHTML='<strong></strong><p></p><button type="button">閉じる</button> <button type="button" hidden></button>';document.body.append(dialog);
 const [close,act]=dialog.querySelectorAll('button');close.onclick=()=>dialog.close();
 function explain(word){
  const control=word.closest('button,summary,a');
  dialog.querySelector('strong').textContent=word.dataset.word;dialog.querySelector('p').textContent=terms[word.dataset.word];
  act.hidden=!control||control.disabled;act.textContent=({'TAKE SKILL':'獲得する','USE':'カードを使う','HOW TO PLAY':'遊び方を開く','BATTLE TERMS':'用語一覧を開く'})[word.dataset.word]||'この項目を選ぶ';
  act.onclick=()=>{dialog.close();if(control?.isConnected)control.click()};
  dialog.showModal();close.focus()
 }
 document.addEventListener('click',ev=>{const word=ev.target.closest?.('[data-word]');if(word){ev.preventDefault();ev.stopImmediatePropagation();explain(word)}},true);
 document.addEventListener('keydown',ev=>{if((ev.key==='Enter'||ev.key===' ')&&ev.target.matches('[data-word]')){ev.preventDefault();ev.stopImmediatePropagation();explain(ev.target)}},true);
 function decorate(node){
  if(node.nodeType===1&&node.closest(excluded))return;
  if(node.nodeType!==3){for(const child of [...node.childNodes])decorate(child);return}
  const parent=node.parentElement;if(!parent?.closest(scope)||parent.closest(excluded))return;
  const str=node.data,matches=[...str.matchAll(pattern)];if(!matches.length)return;
  const frag=document.createDocumentFragment();let start=0;
  for(const match of matches){frag.append(str.slice(start,match.index));const word=document.createElement('span');word.dataset.word=word.textContent=match[0];word.tabIndex=0;word.setAttribute('role','button');word.setAttribute('aria-label',match[0]+'の日本語訳');frag.append(word);start=match.index+match[0].length}
  frag.append(str.slice(start));node.replaceWith(frag)
 }
 const observer=new MutationObserver(changes=>{observer.disconnect();for(const change of changes)for(const n of change.addedNodes)if(n.isConnected)decorate(n);observe()});
 function observe(){observer.observe(document.body,{childList:true,subtree:true})}
 decorate(document.body);observe()
})();
