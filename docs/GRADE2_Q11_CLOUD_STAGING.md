# Q11 クラウド同期の隔離検証

## 安全上の発見
既存の `cloud-worker/wrangler.jsonc` と `wrangler.public.jsonc` は、worker 名に `staging` が含まれる一方、D1は `goimon-cloud` の実IDを参照しています。「stagingだから安全」と判断して `--remote` を実行しないこと。

## 今回追加
`cloud-worker/wrangler.q11-local.jsonc` は合成IDのD1を指すローカル専用設定です。GitHub Actionsで他設定のD1 IDと異なることを検査します。Cloudflareへデプロイしません。

## Macでのローカル検証（開発ブランチのみ）
```sh
git switch feature/grade-2
cd cloud-worker
npm ci
npx wrangler d1 migrations apply goimon-grade2-q11-local-test --local --config wrangler.q11-local.jsonc
npx wrangler dev --config wrangler.q11-local.jsonc --local --port 8787
```
`--remote`、`wrangler deploy`、`npm run db:remote` を実行しないこと。

Google実認証を使わず、localhostの模擬認証・Worker API・ローカルD1を組み合わせる統合テストを次に追加する。Googleログインのエンドツーエンド試験にはGoogle側の許可されたテストクライアント設定も必要。

## 本番と分離した外部ステージングの条件
- Cloudflareダッシュボードで**別のD1データベース**と別Workersを用意し、実際の新しいD1 IDを専用設定へ手動登録する
- デプロイ実行前に接続先・対象アカウント・Origin・既存データへの影響を確認する
- 本番Workers・本番D1・`main` には変更しない
- 生徒アカウントや既存データをコピーしない

## 残る検証
- ローカルD1とWorker APIを用いた保存/復元/競合/rescueのエンドツーエンドテスト
- 専用の外部ステージングWorker/D1で2端末の同期検証
- 実Google認証の許可Originとログイン・ログアウトの試験
- 学習ログとGOIMON報酬が同時更新されるケースの競合救済

## GitHub Actionsローカル検証結果（2026-10-12）
- Q11の保存キーと本番設定の分離チェック：合格
- 一時的なGitHubランナーで隔離D1のローカルマイグレーション：成功
- Workers API既存テスト：合格
- 問題データ・ブラウザ操作テストも含め全ジョブ成功：https://github.com/leaeningenglishforzenshoezam/zensho-english/actions/runs/38227769836
- Cloudflareの実アカウント上に別D1/Workerを作成したわけではない。ネットワーク同期・2端末間の引継ぎは未検証。

## 2026-10-12 Q11ローカルD1保存・復元の統合テスト
- `cloud-worker/tests/q11-save.test.js` を追加。隔離された一時D1で2級の苦手記録・学習ログ・GOIMON育成データを1つのスナップショットとして保存・復元。
- revisionを使う古い更新の拒否（HTTP 409）、更新前世代の `save_revisions` への退避、テスト用ユーザーA/Bの分離を検証。
- GitHub Actions 全3ジョブ成功: https://github.com/leaeningenglishforzenshoezam/zensho-english/actions/runs/38228084990
- `handleSave` はWorkersの実API実装を用いたが、HTTPサーバー経由の外部通信、Googleログイン、Cloudflare上のリモートD1接続は未検証。

## 2026-10-12 ローカルHTTP経由のQ11統合テスト
- `cloud-worker/tests/q11-http.test.js` を追加し、Nodeの127.0.0.1 HTTPサーバーを経由して実際のWorkerルーティングとローカルD1を検証。
- テスト用セッショントークンを2クライアントに発行し、苦手・学習履歴・育成データの保存と取得、409競合、リビジョン履歴、アカウント隔離、未認証/不許可Origin拒否を確認。
- Google認証トークン交換や外部のCloudflare接続は行わない。テスト用セッションのみ。
- 全3ジョブ成功: https://github.com/leaeningenglishforzenshoezam/zensho-english/actions/runs/38228356375

## 2026-10-12 外部ステージング前の安全監査
- 既存の `wrangler.jsonc` と `wrangler.public.jsonc` は同じ既存D1を参照。ワーカー名だけでは環境は分離されない。
- `wrangler.q11-staging.example.jsonc` を追加。新規D1 UUID、テスト用Google Client ID、独立Originが未設定のため**そのままデプロイ不可**。
- `tests/g2q11-staging-audit.test.cjs` に、DB分離、ローカルCIから本番デプロイが行われないこと、変更前バックアップと409競合検出経路を点検するテストを追加。
- CI全ジョブ合格: https://github.com/leaeningenglishforzenshoezam/zensho-english/actions/runs/38229277786
- 監査はコード上の安全対策を検査したもの。失敗時のJSONインポートを含む復旧操作の実証や、実Googleログイン検証は別途必要。
- 外部ステージングへのデプロイ実行には、既存D1とは別のDB IDと新規Worker/Originを人が確認し、デプロイ対象を明示してから行う。
