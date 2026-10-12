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
