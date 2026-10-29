# GOIMON 公開準備（2026-10-29）

まだ main へのマージはしない。GitHub Pages と Cloudflare Worker は別の配備であり、フロントだけ先に公開すると新しいクエスト保存キーを旧 API が拒否する可能性がある。

## 今回確認したこと

- 公開 API の /health は HTTP 200。応答は旧形式の `{"ok":true}` であり、新しい保存形式への対応は確認できない。
- 開発版 Worker のビルド（deploy --dry-run）は成功。本番配備は行っていない。
- 新しい /health で保存形式対応、教員機能フラグ、未接続の正式報酬機能を識別できるようにした。
- `node scripts/check-deployed-api.cjs` は読み取り専用。既存の生徒データ・アカウントに触れない。

## 自分の Mac で行う準備

古い GOIMON フォルダを上書きせず、新しい作業フォルダへ開発ブランチを取得する。

```bash
git clone --branch integration/release-safety-20261027 --single-branch https://github.com/leaeningenglishforzenshoezam/zensho-english.git goimon-release-oct29
cd goimon-release-oct29
git log -1 --oneline
node --test tests/*.test.cjs
cd cloud-worker
npm ci --include=dev --ignore-scripts
npm test
node --test tests/learning_classes.mjs
npx --no-install wrangler deploy --dry-run --config wrangler.public.jsonc
npx --no-install wrangler login
npx --no-install wrangler whoami
npx --no-install wrangler d1 migrations list goimon-cloud --remote --config wrangler.public.jsonc
```

この段階は認証と状態確認まで。未適用マイグレーション一覧と git のコミット ID を確認する。トークン、ログイン URL、データベースの内容はチャットへ貼らない。

## 認証後の配備順序（現時点では未実施）

1. 本番 D1 を自分のPCへバックアップする。バックアップは個人情報を含むため、公開リポジトリや Site に入れない。
2. 未適用のマイグレーションと対象 DB を確認してから適用する。試作用の経済データ SQL を勝手に本番へ流さない。
3. 新しい Worker を先に配備する。既存の GitHub Pages の保存形式も受け付けることを確認する。
4. `node scripts/check-deployed-api.cjs` で保存形式対応を確認する。PASS は保存形式の互換性だけであり、公開全体の合格ではない。
5. テスト用アカウントで、既存育成・学習・苦手・章進行の保存／ログアウト／別端末復元、通信失敗と競合を検証する。生徒の実データで試さない。
6. ほしのかけら・所持品・受領済み報酬のサーバー接続と二重付与防止を完成・検証する。現状はブラウザ内処理であり、本番用同期が完成していない。
7. 教師向けクラス・課題配信は承認教員、機能フラグ、DB マイグレーション、実接続の順に確認する。
8. 全条件を満たしてから main を更新し、公開 URL で動作確認する。

Cloudflare の認証は所有者のPCで行う。接続を代行するためにパスワードやトークンを渡す必要はない。
