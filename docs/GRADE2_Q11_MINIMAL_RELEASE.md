# 2級・大問11　本番統合時の最小差分

確認日：2026-10-12。比較：`main...feature/grade-2`（差分30ファイル、開発ブランチはmainより先行、main側への未取り込み差分なし）。

## 本番反映に必要な新規ファイル（5点）
- `g2q11.html`
- `g2q11.css`
- `g2q11.js`
- `g2q11_questions.js`（200問）
- `g2q11_reward_recovery.js`（保存済み正答の未付与報酬を再試行）

## 既存コードへの変更（5点）
- `index.html`：級別の大問11への遷移、2級のみ新ページへ
- `learning_categories.js`：2級カテゴリを1件登録
- `learning_log.js`：2級の正答ログと未付与報酬IDの同時保存
- `goimon.js`：既存の重複加点防止関数の公開と、保存前オブジェクトのコピー
- `cloud_schema.js`：2級大問11の苦手記録キーを1つ追加

## 今回は本番統合対象に含めないもの
- `cloud-worker/wrangler.q11-*.jsonc`：新規Cloudflare環境は作らない
- `cloud-worker/tests/q11-*.js`：本番サイトに不要なローカルD1検証用コード
- `tests/g2q11-*`、`.github/workflows/g2q11-checks.yml`：開発テスト用。必要なら別途保持
- `docs/GRADE2_Q11_*.md`、`g2q11_diagnostics.html`：内部手順・診断。公開ページに不要

## 統合前の必須確認（特にクラウド）
1. 本番Workerで利用している`cloud_schema.js`にも、`zensho_q11_grammar_weak_v1_lv2`が許可されていることを確認する。GitHub PagesのJS更新だけでは稼働中のWorker検証ルールが自動更新されるとは限らない。
2. 既存の学習ログキー`zensho_learning_log_v1_lv2`、GOIMON個体キー`zensho_goimon_current_v4_lv2`を引き続き使い、データを初期化しない。
3. 2級：正解/不正解、苦手保存・復元、GOIMON加点、同じ報酬の重複加点防止を確認。
4. 1級：従来の大問11へ遷移し、過去の記録が変わらないことを確認。

## 現状
- 上記変更は`feature/grade-2`に実装済み。
- main、本番Workers、D1は変更していない。
- mainへの統合前に本番Workerのスキーマ互換性を確認。デプロイは明示的な承認後。
