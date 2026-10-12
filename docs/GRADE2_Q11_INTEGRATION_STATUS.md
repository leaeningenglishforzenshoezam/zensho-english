# 2級・大問11 統合チェックリスト（開発ブランチのみ）

対象: feature/grade-2 / main 本番不変更

## 完了
- 2級専用カテゴリ q11_grammar を learning_categories.js に追加（1級 paraphrase_quiz は変更しない）
- cloud_schema.js に 2級専用苦手キー zensho_q11_grammar_weak_v1_lv2 を許可
- Worker validation.js は ../../cloud_schema.js を直接 import する構成と確認（本番Workerには未デプロイ）

## 未完了（公開禁止）
- g2q11.html, g2q11.js, g2q11.css, g2q11_questions.js の200問ステージング一式をブランチに登録
- index.html の goParaphrase: 2級は g2q11.html、1級は従来ページ
- 2級大問11の学習ログ・育成加点・苦手保存・別端末同期をブラウザで検証
- 学習カテゴリを追加したことによるおすすめ・進捗表示の確認
- 学習記録保存成功時にのみ加点、再送・複数タブ・同期競合の二重加点防止確認
- 2級を選んだ状態で1級大問11へ誤遷移しないことを確認

## 安全事項
- 1級ファイル paraphrase_quiz.* と1級学習記録を維持する
- main、Workers本番、D1本番への変更を行わない
- 本番切替は手動の最終承認後とする
