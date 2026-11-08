#!/bin/bash
set -e
cd -- "$(dirname -- "$0")/cloud-worker"
if ! command -v node >/dev/null 2>&1; then
  echo 'Node.js 24をインストールしてから起動してください。'
  read -r -p 'Enterで終了します。'
  exit 1
fi
if [ ! -d node_modules/jose ]; then npm install --omit=dev --ignore-scripts; fi
printf '\nブラウザに入力: http://127.0.0.1:8878/index.html\n停止: Control+C\n\n'
npm run dev:release-local
