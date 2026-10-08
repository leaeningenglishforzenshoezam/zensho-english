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
5. 学習終了後、同じタブでこの画面に戻って「同期する」。別端末・新しいタブではGoogleログインして同期する。

**保存は手動同期。ログインは同じタブで最大24時間継続する。** Google IDトークンは保存せず、検証済みIDトークンと引き換えにWorkerが発行するランダムな認証情報をsessionStorageに保持する。D1はそのSHA-256ハッシュのみ保存する。期限切れ・サーバー失効時は再ログインが必要。sessionStorageはブラウザのタブ復元機能で復元される場合もあるが、サーバーの24時間期限は延長しない。共用端末では明示的にログアウトする。端末の学習先アカウントと認証状態は別で、認証切れでも端末内の学習は続けられる。

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

`POST /api/v1/session`: Google IDトークンを検証し、GOIMON認証情報と内部userId・期限を返す。
`GET /api/v1/session`: 認証情報の有効性と所属アカウントを確認する。
`DELETE /api/v1/session`: 現在の認証情報をサーバーで失効させる。
`GET /api/v1/save`: 認証済みuserId、revision、snapshotを返す。
`POST /api/v1/save`: `{expectedRevision, snapshot:{schemaVersion:1,data}}`。
Origin完全一致、Bearer認証。Google IDトークンにはRS256/署名/issuer/audience/exp/iat/sub検証を行う。保存APIはGOIMON認証情報を検証し、移行中の旧クライアント向けにGoogle IDトークンも受け付ける。認証前のIP単位上限600回/分、保存のアカウント単位上限60回/分。認証情報の発行はGoogle subごとに60回/分。D1内の有効セッションはアカウントごとに最大10件。

認証情報はCookieではなくAuthorizationヘッダーで送る。sessionStorageは同一OriginのJavaScriptから読めるため、XSS対策と同じGitHub Pages Origin上の他プロジェクトの管理が必要。認証情報は学習バックアップやlocalStorageには含めない。オフラインでのログアウトは端末側を先に解除し、サーバー失効が未確認であると表示する。
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
node preview-server.cjs
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

ブラウザ検証はPlaywrightとChromiumを用意し `node tests/cloud-browser.cjs`。サーバーはテストが自動起動する。別のChromium実行ファイルは環境変数 `GOIMON_CHROMIUM_PATH` で指定できる。GoogleとAPIはモック。実Google認証・本番D1接続の証明にはならない。

## 公開前の残作業

- Googleクライアント、D1、旧検証Workerは本人設定済み。今回のログイン継続版を反映するには、更新コードで `npm run db:remote`（0002_sessions追加）後に `npm run deploy`。既存の0001はCREATE IF NOT EXISTSなので手動作成済みDBにも適用可能。新しいフロントは新しいWorkerの反映後に使用する。
- 実Googleアカウント2個、スマホ・PC2台で初回引継ぎ、競合、オフライン後の復帰を確認。
- 実端末のデータ量と対象キーを確認。上限超過は削除せず同期を止める。
- 長期保存容量、復旧世代の保持方針、利用者向け保存・削除方針を確定。
- 検証完了後にmainへのPRをレビューし、設定を本番用にしたうえで公開する。

## この作業環境での検証結果

- フロント保存・同期ロジック：9テスト。アカウント分離、ゲスト維持、競合解決、オフライン、通信中の変更、容量不足、ロック取得待ちと拒否を検証。
- Worker：8テスト。実署名JWT、ローカルD1、同時作成・更新、履歴、ユーザー分離、サイズ、CORS、認証、レート制限、専用セッションのハッシュ保存・失効・期限・件数上限。
- 既存progress.test.cjs：全項目通過。
- Wrangler dry-run：成功。リモートデプロイはしていない。
- 実ブラウザ：Chromiumで19画面×ゲスト・アカウントの表示、実クイズのオフライン解答、復帰同期、401/429/500、送信後の応答消失、CAS競合、Web Locks、容量不足・書き出しを自動検証し通過。Googleと保存APIはテスト用応答を使用し、ユーザーの実データにはアクセスしていない。
- GitHub接続後、検証ブランチへ保存。添付パッチでも再現可能。

公式仕様の参照：
- https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
- https://developers.google.com/identity/gsi/web/guides/display-button
- https://developers.cloudflare.com/d1/platform/limits/

2026-10-09: sharpをoverridesで0.35.5に固定。npm audit 0件、Workerテスト7件とdry-run通過。

## 2026-10-09 実機確認と追加自動検証

本人確認済み：実Googleログイン、学習後の保存、別ブラウザへの復元、別アカウント分離、競合停止、クラウド側を選んだ解消。
こちらのChromium検証：読み込み済みクイズをブラウザのオフライン状態で3問解答し、永続保存と復帰後の送信を確認。実クラウドのユーザー記録は変更せず、APIをモックして障害を注入した。

| ケース | 結果 |
|---|---|
| 19画面・ゲストとアカウント各モード | JS例外なし |
| オフライン解答→再接続→同期 | ローカルの学習ログと送信ログが一致 |
| 401・429・500 | ローカルプロファイルを維持 |
| API保存成功後に応答だけ消失 | 再同期で二重更新なし |
| GETとPOSTの間にクラウド世代が更新 | 競合停止、再試行可能 |
| 同じアカウントの学習タブと同期画面 | 実Web Locksで同時書込を停止 |
| 容量不足 | 保存済み状態を維持、未保存コピーをダウンロード可能 |
| ログアウト後のバックアップ | ゲスト記録を出力 |

最後のケースで、前アカウントのIDを参照する不具合を修正した。クラウド同期先の混在ではなく、手動バックアップの出力対象の問題。
未確認：実スマホのブラウザ、フロントと実Google・D1を通した無人E2E。実ログイン関連は上記本人確認とWorkerのJWT/D1自動テストを根拠とする。

## ログイン継続版の追加検証

- Chromium：学習ページへの移動と再読み込み後、Google認証を再実行せず復帰。
- 通信不能での復帰は認証情報を維持し「ログイン状態を再確認」で再試行。
- クライアント期限切れ、サーバー失効、別タブのアカウント切替で認証を解除し、学習記録を維持。
- ログアウトでサーバーセッションを削除し、再読み込みしても復帰しない。
- 既存のオフライン解答・競合停止・応答消失・容量不足・19画面の表示も再検証済み。
- 実Googleからの専用セッション発行と実Cloudflareへの0002適用は、本人の再デプロイ後に確認する。

## プロフィール登録と運営者の確認

cloud.htmlをログイン→プロフィール登録→保存・学習の順に整理。初回登録前でも学習へのリンクから端末内の学習は続けられる。登録済みプロフィールはログイン復帰時に取得し、編集可能。

- ユーザー名：1〜24文字、本名不要・重複可。制御文字・不可視書式文字・山括弧は拒否。表示はtextContentを使用。
- 区分：生徒／教員。自己申告であり、教員の選択による他ユーザーの閲覧権限はない。
- 生徒：高校1〜3年／その他、受験級1〜3級／未定。受験級の選択は教材提供範囲の保証ではない。
- 教員：学年・受験級はnullで保存する。
- 登録情報の用途と運営者が確認することを画面に明示。連絡先・学校名は収集しない。メール配信機能は含まない。

`GET/POST /api/v1/profile` は既存と同じ認証・Origin・レート制限を使用。認証済み内部userIdに紐づく本人のプロフィールだけを扱う。POSTはexpectedRevisionとprofileを送り、競合は409。入力上限4096bytes。プロフィールのrevisionは学習記録と独立し、学習データを変更しない。

0003_user_profiles.sqlの適用が必要。公開前に0002とまとめて `npm run db:remote` で反映できる。運営者専用のWeb一覧画面は未実装。CloudflareのD1管理画面から、権限を持つ運営者が以下で一覧確認できる。

```sql
SELECT username, role, grade, exam_level, updated_at
FROM user_profiles
ORDER BY updated_at DESC;
```

追加検証：プロフィール入力検証、実ローカルD1で別アカウント分離・同時登録CAS・不正入力・サイズ上限・学習保存不変。Chromiumで登録、復帰、編集、保存失敗時の入力保持、競合停止、教員への切替、アカウント分離、390px幅のレイアウトを確認。Workerは合計10テスト。

## プライバシーポリシーの公開準備（2026-10-09）

個人運営、連絡窓口 goimon.admin@gmail.com。個人用メールはポリシーに掲載しない。
privacy.htmlは認証不要・JavaScript不要の確認用案。トップ／Googleログイン前／プロフィール登録前からリンク。目的はログインと引継ぎ、学年・受験級に応じた支援、不具合対応と改善の3点。Google IDトークンの一時受領とDBへの保存を区別し、問い合わせメールの情報も含める。

公開前の未完了事項：
- 正式な運営者表示と必要な開示事項を確認する。氏名や住所を推測して公開しない。
- save_revisionsの30日経過分の自動削除を実装し、最新データを消さないことを検証する。現状は未実装と案内。
- 本人確認済み削除依頼を安全に処理する手順と、再同期で復活しない案内を整える。ユーザー名・メール差出人だけで削除対象を確定しない。GoogleメールをDBに保存していないため、差出人メールをそのままDBのアカウント検索キーにはできない。
- D1基盤側の復旧バックアップの保持・削除条件、保存先と国外取り扱いを確認する。アプリのDELETEと基盤バックアップの即時消去を同一視しない。
- 原則30日以内のメール対応、問い合わせ記録の整理が実際に運用できるか確認する。
- 運用整備後に「確認用案」を外し、正式な適用日と確定した保存期間を記載する。Google側のプライバシーポリシーURLは公開後のURLで設定。

参考：Google IDトークン検証仕様 https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
利用目的の明示 https://www.ppc.go.jp/all_faq_index/faq1-q4-17/
