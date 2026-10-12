# 全商英検2級 大問11 統合状況

対象ブランチ: `feature/grade-2` （`main` と本番環境は未変更）

## 開発ブランチに実装済み
- `g2q11.html`、`g2q11.css`、`g2q11.js`、`g2q11_questions.js`（200問）
- 品質点検で指摘した15問のデータ修正を反映
- 1級 `paraphrase_quiz.html` はそのまま、2級のホームボタンから `g2q11.html` へ遷移
- `q11_grammar` カテゴリを2級専用として追加
- 2級の正誤を `ZenshoLearningLog.addResult` へ保存する呼び出し
- 保存成功時、正解1問につき `kotoba:0.5` と `bunmyaku:0.5` の加点呼び出し
- 2級専用の苦手データ `zensho_q11_grammar_weak_v1_lv2` とクラウド保存許可設定

## 未確認・公開禁止
- PC/スマートフォンでの実ブラウザ操作テスト
- 1級選択中に2級ページへ直接アクセスした場合の全操作の遮断（現在は警告のみ）
- テストアカウントで学習ログ・GOIMON加点・ブラウザ保存を確認
- 同一問題再演習や複数タブの加点・保存競合検証（学習ログと加点の原子性は未保証）
- 本番Worker側のスキーマは未デプロイのため新しい苦手キーの同期は未実証
- おすすめ画面、学習進捗画面への表示確認
- 全200問の正答一意性・内容の独立監査
- `feature/daily-missions` と競合せず将来統合できるかの確認

## 公開安全確認
`main`、本番Workers、D1には一切変更を加えないこと。
公開前に保存・加点・同期・ブラウザテストを完了すること。

## 2026-10-12 追加検査と修正
- 正解時加点の呼び出し先を `window.Goimon` から実装済みの `window.GoimonUI` に修正。
- 1級選択状態で2級の演習開始・正誤保存ができないようにガードを追加（画面表示自体は許容）。
- 苦手の保存失敗を黙殺せず、操作を元に戻してエラーを通知。
- 問題一覧と文法一覧の見出しをテンプレート文字列に修正。
- 保存の原子性・本番Workerクラウドスキーマ・複数タブ・ブラウザ操作は引き続き未検証。開発ブランチのまま保留。

## 2026-10-12 冪等性に関する追加修正
- `GoimonUI.addLearningPointsOnce()` を公開APIに追加し、演習回・問題ID・演習位置から一意の報酬IDを指定する。
- 学習ログ保存成功時にのみ正解報酬を要求。
- 苦手の保存が失敗した誤答は解答確定せず、学習ログ・報酬の更新を停止して再試行可能にする。
- 現時点で実ブラウザテスト未完了。ログ保存後の加点失敗による部分成功（原子的処理でない）は未解決。

## 2026-10-12 ブラウザテスト環境の確認
- Chromium/Playwright は利用可能だが、本環境のポリシーでローカル file:// ページは ERR_BLOCKED_BY_ADMINISTRATOR。
- localhost HTTP の画面操作も時間切れとなり完了できなかった。
- よって「画面の全機能が動作した」とは判定しない。
- GitHub上のクライアントスクリプト静的検証と、ユーザーのMacでの実操作確認が必要。
- Worker本番とD1本番は未変更。新しい苦手記録キーのクラウド同期は未実証。

## 2026-10-12 自動テスト整備
- `tests/g2q11.test.cjs` に200問/選択肢/解説/SET/級別カテゴリ/クラウドキー/ルーティング/重複防止APIの契約テストを追加。
- `.github/workflows/g2q11-checks.yml` に開発ブランチ限定のGitHub Actionsを追加。
- 初回ワークフロー実行成功: https://github.com/leaeningenglishforzenshoezam/zensho-english/actions/runs/38219850500
- この合格は静的な契約テストを指し、実ブラウザでの保存・クラウド同期・加点成功を保証しない。

## 2026-10-12 保存処理の自動テスト
- `tests/g2q11-storage.test.cjs` を追加し、正誤ログ保存、級別分離、保存失敗の例外、重複報酬抑止、別演習報酬を実行検査した。
- CI 成功 https://github.com/leaeningenglishforzenshoezam/zensho-english/actions/runs/38220265610
- 既存 addLearningPointsOnce は報酬IDをメモリ上でマークしてから保存するため、保存に失敗した場合にそのオブジェクト内のマークが残る。再試行設計とログ／報酬間の原子性は未解決。
- テストは保存環境の模擬実行であり、Macブラウザ／本番クラウド同期は未実証。

## 2026-10-12 報酬保存失敗時の整合性改善
- `GoimonUI.addLearningPointsOnce` は保存前に元オブジェクトを変更せず、複製した個体に取得済み報酬IDとポイントを反映して保存する方式へ変更。
- 報酬保存が例外で失敗しても、元の個体オブジェクトに取得済みIDが残らないことをテストで確認。
- CI成功: https://github.com/leaeningenglishforzenshoezam/zensho-english/actions/runs/38220653688
- 学習ログと育成記録の2つのキーを跨ぐ完全な原子的保存ではないため、片方のみ保存された場合の復旧は引き続き未完成。

## 2026-10-12 Q11未付与報酬の復旧
- `learning_log.js` は2級大問11の正答と未付与報酬IDを**同一ログ書込**で確定させる（`rewardClaimId`）。
- `g2q11_reward_recovery.js` は報酬ID単位で冪等付与し、付与完了後にログから未付与IDを削除する。ページ再訪時に未付与を再処理する。
- 報酬保存成功→ログ側の未付与削除失敗でも、次回処理は取得済みIDで重複加点を避ける。
- 台帳満杯は古い報酬を黙って捨てず、保存を拒否する。
- テスト https://github.com/leaeningenglishforzenshoezam/zensho-english/actions/runs/38221310092 は成功。最新変更もCI再確認を要する。
- Mac/Googleログイン・複数タブ/別端末の実テストは未完了。本番クラウド同期は未保証。

## 2026-10-12 Chromium UI検証拡張
- `tests/g2q11-browser.cjs` で問題一覧・文法一覧・解答に加え、手動苦手登録、再読込後の復元、苦手解除を検証。
- 正答時に模擬GOIMON APIを使い、`kotoba +0.5 / bunmyaku +0.5` 相当の合計1ポイント、単一claim ID、未付与台帳の解消をブラウザ経由で確認。
- ブラウザと静的テスト双方のCI成功 https://github.com/leaeningenglishforzenshoezam/zensho-english/actions/runs/38222356395
- GOIMON加点は本番APIではなくテスト用の模擬処理。実GOIMON個体の成長・進化、Googleログイン・複数タブ競合・スマートフォンUIは引き続き未検証。

## 2026-10-12 実GOIMON APIのブラウザ試験
- `tests/g2q11-browser.cjs` の模擬ポイント処理を除去し、テスト用ブラウザの実 `GoimonUI.loadCurrent / addLearningPointsOnce` を使用。
- 正解前後の個体データ `zensho_goimon_current_v4_lv2` を比較し、ことば＋0.5、ぶんみゃく＋0.5、合計＋1、報酬ID1件の保存を確認。
- GitHub Actions成功: https://github.com/leaeningenglishforzenshoezam/zensho-english/actions/runs/38224834427
- テスト用ブラウザは実在のGoogleアカウントに未接続。実ユーザーや本番D1の個体データは扱わない。
- スマホレイアウト、複数端末同期、競合時の挙動は未検証。

## 2026-10-12 モバイル自動検証
- `tests/g2q11-mobile.cjs` を追加し、375/390/768pxのビューポートで横はみ出し・文法一覧・手動苦手登録・3択回答・解説表示を検証。
- GitHub Actions 成功 https://github.com/leaeningenglishforzenshoezam/zensho-english/actions/runs/38225208899
- Chromiumのモバイルエミュレーションであり、実機Safari/AndroidやGoogleログイン・別端末クラウド同期の検証ではない。
