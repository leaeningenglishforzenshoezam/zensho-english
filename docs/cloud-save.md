# Googleログイン・クラウド保存：検証ブランチ

基準：main `9c87842`。開発ブランチ：`codex/google-cloud-save`。
mainへのマージ、GitHub Pages設定変更、本番Workerデプロイは未実施。

## 調査結果と再利用

| 既存成果物 | 確認結果 | 対応 |
|---|---|---|
| goimon-cloud-foundation.zip | 調査・ダウンロード専用 | 読み取り専用バックアップを残し、新しい対象定義とアカウントに対応 |
| goimon-cloud-worker.zip | jose署名検証、D1、CAS更新、旧版保存あり | 再利用。必須JWTクレーム、入力サイズ制限、共有スキーマ、レート制限を追加 |
| goimon-cloud-login-stage.zip | 手動保存・復元の画面のみ | ログイン導線を継承。直接上書き復元を廃止し、アカウント別保存と3方向比較を実装 |
| 現行main | 上記ファイルは未導入 | 学習処理は維持し、保存アクセスをGOIMONStorageに切替 |

旧版では、特別進化用 learning_achievements、block_stats、goimon_dialogue_history が対象外だった。
cloud_schema.jsをブラウザとWorkerの唯一の許可リストにした。UI設定・一時セッション・カーソルは端末内だけに保存する。

## 利用者の流れ

1. cloud.htmlでGoogleログイン。
2. 初回の空アカウントだけ、必要なら「ゲストの記録を初回引き継ぎ」。ゲストは削除されない。
3. 「同期する」。既存クラウドデータもここで取り込む。
4. トップから学習。アカウント別に端末保存され、通信は学習処理を妨げない。
5. 学習終了後、この画面に戻ってGoogleログインし「同期する」。別端末でも同じ操作。

**自動バックグラウンド同期・永続ログインは実装していない。** Googleトークンは画面メモリだけに保持する。ページを離れた後は再認証して同期する。端末の学習先アカウントは継続するが、これは認証状態とは別。

## データ安全性

- 従来のlocalStorageキーはゲストとしてそのまま残る。
- 認証済みWorkerの内部userIdを使い、別の名前空間にアカウントデータを格納する。クライアントが指定したユーザーIDはAPIで受け付けない。
- 開いた学習ページは開始時のアカウントに固定。別タブで切り替えてもデータの所属が変わらない。
- プロファイル全体は1回のsetItemで保存し、容量不足で一部だけ復元されることを防ぐ。
- 同じキーの古い値を保持するタブからの書き込みは復旧用に保存して停止。タブごとの書込前ジャーナルも保持する。
- ログイン後の学習はWeb Locksでアカウントにつき1タブだけ書き込み可能。別タブの学習中は同期も止める。タブを閉じてから再読み込み・同期する。ロック取得前の初期書き込みもジャーナルに保存し、取得後に適用する。
- 同期はWeb Locksで直列化。送信中に端末が変化したら端末には適用しない。
- 前回同期したbase、現在の端末、最新クラウドをキー単位で3方向比較。異なるキーの変更は統合。同じキーの双方変更は停止して選択する。育成値の加算や配列結合を推測しない。
- クラウド更新はD1の原子的な比較更新（CAS）。GET後に別端末が更新してもHTTP409で止まる。
- 送信成功後に応答が消えた場合も、再同期時に最新データと比較する。
- 旧クラウド世代はsave_revisionsに保持。端末の適用前状態はrecoveryに保持。自動削除はしないため、長期運用では保存量の監視と保持期間設計が必要。

## API

`GET /api/v1/save`: 認証済みuserId、revision、snapshotを返す。
`POST /api/v1/save`: `{expectedRevision, snapshot:{schemaVersion:1,data}}`。
Origin完全一致、Bearer認証、RS256/署名/issuer/audience/exp/iat/sub検証。
最大JSON保存サイズ900,000 bytes、最大250キー。キー許可・JSON・トップレベル型・深さ・危険プロパティを検証。学習スコアの正当性の証明にはならないのでランキングにはそのまま使用しない。
ストリーム読取上限920,000 bytes。JSON以外を拒否。応答はno-store。Googleメール・名前はDBに保存しない。

## 本人の設定が必要なもの

### 1. Google Cloud

Google Auth Platformでプロジェクトを選び、ブランド情報・対象ユーザーを設定する。
「クライアント」→ OAuthクライアント作成 → **ウェブ アプリケーション**。
承認済みJavaScript生成元：

- ローカル検証：`http://localhost:8765`（必要なら `http://127.0.0.1:8765` も追加）
- 将来の本番：`https://leaeningenglishforzenshoezam.github.io`

パス `/zensho-english` は生成元に含めない。テスト中のアプリなら利用するGoogleアカウントをテストユーザーに追加する。
クライアントIDを控える。**クライアントシークレットは不要・共有不要。**

### 2. Cloudflare

Node.js 22以降のPCで、このブランチを取得して実行する。

```sh
cd cloud-worker
npm ci
npx wrangler login
npx wrangler d1 create goimon-cloud
```

表示されたdatabase_idを `cloud-worker/wrangler.jsonc` に記入する。
同ファイルの `GOOGLE_CLIENT_ID` を実IDに、`ALLOWED_ORIGIN` を検証中は `http://localhost:8765` にする。
Worker名は `goimon-cloud-api-staging` のまま、本番と分ける。

```sh
npm run db:remote
npm run deploy
```

出力される `https://goimon-cloud-api-staging.<サブドメイン>.workers.dev` を控える。
Web認証は `wrangler login` のブラウザで本人が行う。APIトークンや秘密鍵をチャットに貼らない。

### 3. フロント設定と検証

`cloud_config.js` の `googleClientId` と `apiBase` に上記2値を入れる。
リポジトリのルートで：

```sh
python3 -m http.server 8765
```

`http://localhost:8765/cloud.html` を開く。mainのGitHub Pagesは切り替えない。
スマホとの実地試験には、別の検証用HTTPSサイトが必要。本番リポジトリのPages参照ブランチを変更せず、別の検証用GitHub Pagesリポジトリでこのブランチを公開し、そのOriginをGoogleとWorker両方に設定する。ALLOWED_ORIGINは現状1件なので、検証環境のOriginを統一する。

## ローカルで確認するコマンド

```sh
node --test tests/cloud.test.cjs tests/cloud-ui.test.cjs
node tests/progress.test.cjs
cd cloud-worker
npm ci
npm test
npx wrangler deploy --dry-run
```

ブラウザ検証はPlaywrightとChromiumを用意し、ルートでHTTPサーバー起動後に `node tests/cloud-browser.cjs`。GoogleとAPIはモック。実Google認証・本番D1接続の証明にはならない。

## 公開前の残作業

- 本人のGoogleクライアントID、Cloudflare D1・検証Worker作成。
- 実Googleアカウント2個、スマホ・PC2台で初回引継ぎ、競合、オフライン後の復帰を確認。
- 実端末のデータ量と対象キーを確認。上限超過は削除せず同期を止める。
- 長期保存容量、復旧世代の保持方針、利用者向け保存・削除方針を確定。
- 検証完了後にmainへのPRをレビューし、設定を本番用にしたうえで公開する。

## この作業環境での検証結果

- フロント保存・同期ロジック：9テスト。アカウント分離、ゲスト維持、競合解決、オフライン、通信中の変更、容量不足、ロック取得待ちと拒否を検証。
- Worker：7テスト。実署名JWT、ローカルD1、同時作成・更新、履歴、ユーザー分離、サイズ、CORS、認証、レート制限。
- 既存progress.test.cjs：全項目通過。
- Wrangler dry-run：成功。リモートデプロイはしていない。
- 実ブラウザ：Playwright用Chromiumの取得が完了できず未実行。tests/cloud-browser.cjsを用意。Google認証とAPIのモックであり、実サービス接続は別途必要。
- GitHub接続後、検証ブランチへ保存。添付パッチでも再現可能。

公式仕様の参照：
- https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
- https://developers.google.com/identity/gsi/web/guides/display-button
- https://developers.cloudflare.com/d1/platform/limits/

2026-10-09: sharpをoverridesで0.35.5に固定。npm audit 0件、Workerテスト7件とdry-run通過。
