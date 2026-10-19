# Sitesの修正をGitHubへ統合

土台: feature/goimon-deformed-dex-20261019、5ae0013d。
Sitesの公開済み修正元: 2390b3d6771c15f7645d87ce362d0cb7cf3a5d02。

落石前・落下中・落石後、場面16の12行目からの記憶、場面20の霧、登場人物の配置・話者表示を取り込んだ。
3秒以内の攻撃力・防御力1.1倍、乱数±5%、ステージクリア時の欠損HP半分回復、回復技の正解時50%以上回復を取り込んだ。
解説は任意で開閉。単語の意味を繰り返す定型文は表示しない。時間切れ・防御失敗の練習とBGMの3場面切り替えも保存。

通常ホーム、学習メニュー、相棒管理、図鑑、ミッション一覧から移動する。
新しいクエスト編成は1級の現役・保存箱の相棒と、所持SKILL・EQUIPMENTを参照する。旧試遊の途中記録は消去しない。
確認用サイトの生成: `node scripts/build-player-preview.cjs <出力ディレクトリ>`。
出力先だけクラウド接続を無効化する。GitHubの接続設定・mainは変更しない。

検証: checks/quest-revision.cjs、checks/chapter-flow.cjs、所持品保存テスト。
ミッション6種類から学習画面への遷移先を確認済み。
ブラウザ・スマホの通し操作、Googleログイン、クラウド同期、正式報酬付与は未検証・未接続。

## Home and quest hub refinement
- Learning home removes the inline audio panel and partner shortcut. Existing management card and controls are retained on the management route.
- Shared navigation links to quest_home.html and opens a compact BGM dialog; saved IndexedDB tracks and preference keys are preserved.
- Quest hub reads the existing account-scoped chapter save, links to resume, optional reconfiguration, map, inventory and missions. Configuration only writes after departure.
- Gacha and fragment award/spend remain explicitly unavailable; no synthetic currency is created.
- Responsive grid/button sizing corrected. Browser/mobile visual QA unavailable in this environment; logic checks passed.
