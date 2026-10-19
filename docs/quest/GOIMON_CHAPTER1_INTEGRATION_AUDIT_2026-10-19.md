# 第1章統合監査・実装計画

調査日：2026-10-19。対象はGitHub上のソース。公開環境へのデプロイ確認・書込みは行っていない。
作業ブランチ：`integration/chapter1-story-20261019`。
今回はSTEP 1（監査）とSTEP 2（統合脚本）を対象とし、実行コード・既存セーブ・DB・本番設定は変更しない。

## 1. ブランチの実態

| ブランチ | 調査時HEAD | 確認結果 |
|---|---|---|
| main | `1fed0744a449f7f86066de831d5a6d85aba75adf` | 公開用。2級大問11の文法演習・設定・一覧内解答を含む。変更禁止 |
| feature/daily-missions | `0d1e42ef00e358ddc21655d41e7cdaa2d3d66d31` | 存在。storyの祖先。ミッション発行・採点・報酬の隔離APIまで。これを最新の完成UIとして採用しない |
| recovery/learning-quest-ui-20261016 | `6b36df72cd188c1d392837ee6bddee56c5e04238` | このWorkの前回保存地点。級切替、3分類、育成管理復帰、テーマ、ガチャ確率。storyの祖先 |
| story/goimon-world-bible | `2ff3cbc1bdb0e3d10340a8be4b3c21e691ef0602` | 今回の文書作業の基点。指定6文書、実問題からの出題、復習復帰、名前ヘルパーを含む。統合ノベル・恒久保存は未実装 |
| experiment/skill-balance-long-battle-20261017 | `bb70633a891ef79864722484f707e0665a160591` | storyとは分岐。51技の分類・調整、大問9/11/12・イディオムの出題UI。story未収録の22コミットを保持する必要あり |
| feature/grade-2 | `d66ced08fbf6c36a02bca804c65d8ffbc811d2f5` | 2級開発系列。mainとは分岐。丸ごと取り込まない |
| feature/g2q11-settings-catalog | `2be7ea480d6cc48234a34dea185dfe962cb8e1a5` | 個別番号指定を除き範囲指定を残す設定改善系列。公開版との重複を調べてから扱う |
| release/grade2-q11-minimal | `83ff4e184173d5a74e0643ea737dca874fbe9c24` | 2級大問11の最小公開候補系列。mainが持つ改善を古い候補で置換しない |
| recovery/local-preview-backup-20261016 | `9d465e17f14bf3a5ac2820cb833c7b08b1b64a3d` | 復元用バックアップ。基準版にはしない |

そのほかの10本の `codex/*` も調査。8本はmainの祖先（紙出力折畳み、推奨カテゴリ、Google保存、ホーム助言、長文紙出力、進捗UI、8/10問題選択、推奨UI簡素化）。`codex/fix-q7-navigation` と `codex/recommended-kraken-guide` はmainに対してそれぞれ1個の固有コミットを持つ。古い別案が残る可能性があるため、自動で現行UIに戻さない。全参照SHAは `GOIMON_BRANCH_SNAPSHOT_2026-10-19.tsv` に保存。

### 祖先関係・統合の予行結果

- daily-missions → recovery → story は祖先関係で確認。storyはdailyより46、recoveryより42コミット先。
- mainとstoryは分岐。main側だけに3コミット、story側だけに249コミット。main側3件は2級大問11追加、級別ラベル、設定・一覧の改善。
- `git merge-tree --write-tree --name-only HEAD origin/main` は競合なし。ただしこれは構文上の統合可否であり、動作保証ではない。統合後に級別導線と同期を検証する。
- storyとSKILL実験版の統合予行は `battle-prototype/ui.js` と `quest_test.html` で競合。旧版・新版どちらか丸ごとの採用は不可。
- SKILL実験側の通常問題は `C.questions` の試作用プールを使用。story側は500単語と熟語287件から選び、STAGE範囲・重複防止・復習リンクを持つ。両者を手作業で接続する。
- SKILL実験側の大問1・3は形式定義があるが実出題は未接続。未対応の形式を単語4択へ無言で置き換えない。

## 2. このWorkの到達点と再利用箇所

| 機能 | 現在の実装 | 第1章での扱い |
|---|---|---|
| 学習・育成・ログイン | rootの各HTML/JS、`goimon.js`、`goimon_dex.js`、`cloud_storage.js`、`cloud_auto.js`、`cloud_sync.js` | 維持。書式・既存キーを変更しない |
| 報酬付きミッション | `daily-missions/mission_flow.mjs` / `mission_play.mjs`、Workerの発行/採点/claim | 独立したまま維持。物語閲覧でclaimを呼ばない |
| 公開候補API | `cloud-worker/src/mission_release.js`、環境フラグ | 本体indexの上に限定ルートを足す候補。コードの存在と本番公開済みを混同しない |
| ガチャ | `cloud-worker/src/economy.js`、repositoryの操作ID・revision | 通常N94/R5/SR1、10連最終枠R:SR=5:1を保持。体験用報酬と実所持品を混ぜない |
| バトル計算 | `battle-prototype/core.js` / `catalog.js` | 再利用。新しい戦闘エンジンを作らない。SKILL版の調整と併合して回帰試験 |
| STAGE0〜5 | `battle-prototype/tutorial.js` / `ui.js`、`quest_test.html` | チュートリアル・5戦・操作案内を再利用。ただし現在は自由編成の試作、学習加点なし |
| 出題と復習 | `question_bank.js`、`return_to_quest.js`、`renderPracticeRoutes()` | 範囲・正答一意性・学習への戻り導線を保持し、多形式ルーターと接続 |
| 統合ホーム・エリア挑戦 | `local-preview/app.js` | このWorkの新ホーム。相棒選択、装備、時間制限、HP/技の持越しを保持。`/local-api/` 専用を公開APIと誤認しない |
| 画像 | `images/goimon/`、`local-preview/art/forest.jpeg`・`enemy1..5.jpeg` | 既存相棒・森・5体を流用。追加絵がなくても背景色と字幕で読めるようにする |
| 名前 | `battle-prototype/story_names.js` | 再利用可能だが、`quest_test.html` からまだ読み込まれていない。ヘルパー追加＝画面反映済みではない |

### 現在の保存方式

1. `quest_test.html` の `tutorial=T.create()` と戦闘状態はメモリ。通常の再読み込みで失う。
2. `goimon_quest_demo_return_v1` はsessionStorage。復習リンクからの復帰だけを最大24時間扱う。アカウント別恒久セーブでも、クラウドセーブでもない。
3. local-previewは `goimon-recovery-area-v2` と `goimon-recovery-battle` に一時保存。挑戦時のHP・技を引き継ぐが、汎用キーでアカウント分離されていない。ローカルサーバー再起動でデモ記録を初期化する。
4. local-previewの `/local-api/clear` はデモ用申告。正式な勝利検証ではない。物語完了やクライアント任意フラグから実通貨を付与してはいけない。
5. 本来の学習はアカウント別GOIMONStorageとrevision付きクラウド保存。`cloud_schema.js` の許可リストはクエスト進行を受け付けない。Workerの `src/validation.js` も同じスキーマを使う。単に新しいキーを追加して「同期済み」としない。

### 名前・相棒の取得経路

- `cloud_sync.js:acceptProfile()` がプロフィール `username` をsessionの `displayName` に反映。Google本名から代入しない。
- 名前ヘルパーには `sessionStorage`、`GOIMON_CLOUD_CONFIG.apiBase`、現在のアカウントIDを必ず渡す。トークン形式・有効期限・API一致・アカウント一致を検証し、未ログイン/不一致/空文字なら「あなた」。任意引数を省略して検証を弱めない。
- 相棒は級別 `zensho_goimon_current_v4_lv{level}` と `archive_v4` を、出発時のpartnerIdで探す。nickname→`GoimonDex.getEntry(type,stage).name`→「相棒ゴイモン」。先頭の相棒を勝手に選ばない。
- 戦闘の能力・編成は出発時に固定する一方、表示名と図鑑名はシーン開始時に対象IDから再解決。変更は幕間で反映。相棒切替は挑戦終了後。IDがなくなったら選択画面へ戻して記録は保持。
- DOMはtextContentで描画。名前をHTMLとして評価しない。再閲覧でも現在の名前を差し込み、個人名入り本文をクラウドに複製しない。

## 3. 相違・衝突と解決案

| 相違 | 影響 | 解決方針 |
|---|---|---|
| 旧4行のintro/endingsとV3/V4 | 落石・共鳴・モリィ・黒い霧が欠落 | 旧文を正式稿にせず、新規V5脚本を作る。旧試作は接続完了まで維持 |
| Bible初期の未確定事項、章数固定の旧表 | ペア限定、終盤順序、章数が不一致 | 最新ユーザー指定と名前ポリシー、Bible追記、V4を優先。旧120ステージ表は採用しない |
| V4の遠隔石碑映像 | 新たな魔法規則を確定させてしまう | V5案：最初は谷越しに石碑を見て、4戦を経て同じ石碑の広場へ到達。祭壇はその足元の台座。石碑は一基のみ |
| V4の逐語通訳の残存 | 最新字幕仕様と不一致 | 「けがを確かめたいって」等を削り、主人公本人の台詞にする |
| 山猫戦に未記述の黒い霧 | 終盤の「さっき見た」が唐突 | STAGE3後に一筋だけ観測。正体は説明せず、後の自動作動とつなぐ |
| 教習テキストの誤答半減・120% | coreの誤答攻撃1・被ダメ1.5倍と不一致 | バトル接続時に説明を現行計算へ統一。今回は実行コードを変更しない |
| 試作の毎戦全回復とlocal-previewの持越し | 戦闘を移すだけではエリア仕様が変わる | 第1章は1〜5の持越しを基準にアダプター化。試作用自由戦は維持 |
| 黒い霧の直前再挑戦とエリア敗北リセット | STAGE5後の消耗状態で詰まる可能性 | 新イベント戦に専用チェックポイントを設ける案。初戦は持越し。再戦で元の直前HPへ戻す案と、霧戦だけ独立挑戦にする案を比較し、回復・使用回数を無断変更しない。戦闘調整前にルールを明示 |
| 最終守護者勝利が旧エリア完了 | 霧戦前に第1章完了扱いになる | エリア初回クリアとchapterCompletedを別フラグに。第1章完了は霧戦勝利＋章末読了 |
| 旧保存の数値stage 1..5 | 第6戦追加でtutorial.clear()が拒否 | 永続ID `ch1.forest.s1..s5` と `ch1.mist`、legacyStage番号を別管理。霧を無理にT.clear(6)へ通さない |
| 既読スキップ・再閲覧 | 戦闘/報酬までスキップする危険 | 閲覧専用モードでは戦闘・claim・解除を発火しない。初回進行は必要勝利で止める |

## 4. 実装ロードマップと完了条件

### STEP 1・2：今回
- 指定6文書、試作コード、保存、全ブランチ参照を監査。本書と参照一覧を保存。
- `GOIMON_CHAPTER1_NOVEL_INTEGRATED_V5.md` に導入→STAGE0→1〜5→記憶→？？？→霧→旅立ちを統合。
- 追加した地理・繋ぎ台詞・再挑戦演出は統合案と明記。既存の世界設定を勝手に確定し直さない。

### 次の実装A：基盤を統合してSTEP 3へ
- 実装前にリモートHEADを再取得。他スレッドが更新していたら今回のSHAからの差分を読む。
- この専用開発ブランチへmainを統合し、2級大問11を保持。main自体は触らない。
- SKILL実験版を手動統合。競合するui.js/quest_test.htmlは「実問題範囲・復習導線」と「大問別SKILL出題」の両方を残す。毒等の不採用効果を復活させない。
- `battle-prototype/chapter1_story.js` 等にシーンID・行ID・speaker・text・背景キー・遷移条件を定義。章制御を5戦配列から分離。終端/重複ID/到達不能/勝利なし迂回を検証。
- 完了条件：既存学習・ミッション・技形式の回帰試験が通り、全文のシーン遷移をコード上で追える。

### 実装B：STEP 4・5 ノベルUIと名前
- `quest_chapter1.html`（案）を既存クエストの追加入口とし、ホームから接続。旧試作画面は検証用に残す。
- 背景＋発話者＋本文、タップ/Enterで進む、戻る/履歴/中断、既読だけのスキップ。1回に1発話か短い地の文。長い本文はスクロール可能にし、スクロールを次へタップと誤判定しない。
- 320〜430px幅、文字拡大、キーボード、動きを減らす設定、履歴を閉じた後のフォーカスを確認。
- 名前ヘルパーを読み込み実データへ接続。アカウント変更時は進行を止めて再読込。画像の読込失敗はCSS背景へ。
- 完了条件：ログアウト/期限切れで別人名が出ない。改名/進化/相棒切替、HTMLを含む入力で安全に表示できる。

### 実装C：STEP 6 バトル接続
- core/catalog/question_bank/skill routingを共有。ui.jsの開始・解答・終了をアダプターとして切り出し、試作と第1章の両方で利用する。新エンジンや二重の採点器を作らない。
- STAGE0は教習＋体験ガチャ/装備、1〜5は既存敵・範囲・時間制限。HP/技をシーン遷移でリセットしない。
- `ch1.mist` は既存エンジン上の追加敵設定。勝利時に守護者救出を演出し、複雑な護衛ゲージや新戦闘ルールは初版に追加しない。出題は既存1級単語範囲＋使用SKILLの指定形式を保持する案。時間・敵数値・再挑戦時回復は調整対象。
- 番人敗北は現在のエリア再挑戦方針を維持。霧戦敗北の例外は上記衝突を解決してから接続。学習復帰先は章・battleIdを検証する。
- 完了条件：勝利でだけ先に進む。敗北/中断/二重クリック/再読込で二重報酬や進行消失がない。

### 実装D：STEP 7 保存と同期
- 保存モデル案：schemaVersion、scriptVersion、accountScope、level、partnerId、sceneId、lineId、readLineIds、clearedBattleIds、chapterCompleted、runId、戦闘checkpoint、revision。
- 既読は行ID＋改稿版で扱い、新しい行を既読スキップしない。名前・本文・画像そのものはセーブしない。
- まずアカウント/ゲスト・級別に端末保存。旧recoveryキーはバックアップして読み取り移行し、元キーは削除しない。旧クリアを物語既読に自動変換しない。
- クラウドは既存学習saveへの未許可キー混入を避け、専用テーブル・認証済みルート・revision制御を追加する方針。ストーリー進行を実報酬の根拠にしない。
- 別端末の進行競合は自動で古いcheckpointを上書きせず、読み取り可能な履歴を保持。既読の和集合と戦闘状態の競合を区別する。
- Workerが未対応なら明確に端末保存のみと表示。既存学習同期を止めない。
- 完了条件：保存失敗、別アカウント、旧セーブ、2端末競合、途中更新で既存学習・相棒・所持品が変化しない。

### 実装E：STEP 8・9 画像と通し検証
- 新画像は `images/quest/chapter1/` に追加。既存ファイルを改名/上書きしない。
- `forest-path.webp` / `rockfall.webp` / `stele-clearing.webp` / `guardian-court.webp` / `memory-fragment.webp` / `forest-exit.webp`：背景1536×1024（3:2）推奨。
- `morii.png` / `mysterious-shadow.png` / `black-mist.png`：透過1024×1024推奨。？？？の顔・正体は出さない。モリィは既存イラスト未確認につき仮シルエット可。
- 以上は追加ファイル名の提案で、画像が存在するという意味ではない。本文と描画キーをマニフェストで分離し、未提供の絵は既存森背景/無地を使う。
- 既存enemy1〜5とゴイモン図鑑画像を参照。石碑の形・傷・五本指/三本指を確認。BGM制作・差替えは対象外。
- 通し試験：冒頭/教習/全5戦/霧戦/章末、通常敗北/霧敗北、保存再開、復習復帰、未読と既読、再閲覧の無報酬、画像欠落、スマホ長文、級・名前・相棒の変更。
- 別枠で通常学習、2級大問11、ミッション採点/報酬、ガチャ、所持品、ログイン同期の回帰試験を通す。合格後も公開反映は別工程。

## 5. 今回の検証範囲

`node --test tests/quest-question-bank.test.cjs tests/quest-tutorial.test.cjs tests/battle-answer-rules.test.cjs`：11テスト成功。
今回の11件は既存ロジックの基準確認であり、未実装の第1章を通しプレイした結果ではない。
STEP 3〜9、SKILL実験版の統合・調整、公開デプロイはまだ実施していない。
