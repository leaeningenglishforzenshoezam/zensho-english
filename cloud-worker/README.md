# GOIMON Cloud Worker

実装・設定・安全性・未完了事項は [../docs/cloud-save.md](../docs/cloud-save.md) を参照。

`npm ci && npm test` でJWT検証、入力検証、ローカルD1の同時更新を確認。
`npx wrangler deploy --dry-run` でビルド確認。
実環境の設定前にdeployしない。main / GitHub Pagesはこの操作では変更しない。
