# 第2章「ふたつの声」画像素材マニフェスト

対象ブランチ: `feature/chapter2-story-20261022`。画像データがアップロードされた時点で実在ファイルを監査する。これは登録先・正式名・用途を固定するための仕様書であり、画像がアップロード済みという意味ではない。

## 管理原則
- 第2章の専用素材はすべて `images/chapter2/` 以下へ追加し、第1章画像や `images/goimon/` を移動・上書きしない。
- サブフォルダは `backgrounds/`, `details/`, `characters/`, `enemies/`, `events/`。
- ファイル名は小文字英数字＋アンダースコア、拡張子 `.png`。透過が必要なのは人物・敵・イベント。背景／壁画近景は非透過。
- 元の画像は改変せず、ZIPの原本を保持する。破壊的な上書きをしない。
- 原本の実寸を尊重し、無理な引き伸ばしをしない。背景はシナリオ画面で `object-fit:cover` を使うため左右端の安全領域に注意する。画面は16:9を目安。キャラクターは正方形キャンバス目安で、表情差分は同一サイズ・同一位置。
- 再利用する自分の相棒は `images/goimon/` をゲームの図鑑／育成データ経由で参照し、第2章専用素材としてアップロードしない。
- GIF／動画や追加効果画像は現時点で必須としない。C（前景用霧）・旧みずち・撃破崩壊素材は採用対象外。

## 1. backgrounds （11枚）
| 正式パス | 対応シーン |
|---|---|
| `images/chapter2/backgrounds/ch2_hills.png` | ch2.01, ch2.02, ch2.03, ch2.23 |
| `images/chapter2/backgrounds/ch2_town.png` | ch2.04 |
| `images/chapter2/backgrounds/ch2_dry_canal.png` | ch2.05, ch2.13 |
| `images/chapter2/backgrounds/ch2_water_office.png` | ch2.06, ch2.12, ch2.22 |
| `images/chapter2/backgrounds/ch2_underground.png` | ch2.07, ch2.08 |
| `images/chapter2/backgrounds/ch2_foam_pool.png` | ch2.09 |
| `images/chapter2/backgrounds/ch2_reservoir.png` | ch2.10, ch2.14 |
| `images/chapter2/backgrounds/ch2_stone_gate.png` | ch2.11 |
| `images/chapter2/backgrounds/ch2_deep_pool.png` | ch2.15, ch2.16 |
| `images/chapter2/backgrounds/ch2_control_room.png` | ch2.17–ch2.20 |
| `images/chapter2/backgrounds/ch2_restored_canal.png` | ch2.21 |

注意: シナリオ `battle-prototype/chapter2_data.js` には旧 `road` 背景IDと `ch2_road.png` が残存。ストーリー表示接続時に `hills` に置換する。既存コードの直接変更は未実施。

## 2. details （2枚）
- `images/chapter2/details/ch2_founders_relief.png` — 古い共同建設の壁画、シーン17
- `images/chapter2/details/ch2_work_log.png` — 人間の名前／ゴイモン番号の作業台帳、シーン17

## 3. characters （サーヤ7枚・トヨヨ5枚）
- `images/chapter2/characters/ch2_saya_full.png` — 全身（既存）
- `images/chapter2/characters/ch2_saya_normal.png` — 上半身通常（既存）
- `images/chapter2/characters/ch2_saya_happy.png` — 喜び
- `images/chapter2/characters/ch2_saya_worried.png` — 心配
- `images/chapter2/characters/ch2_saya_surprised.png` — 驚き
- `images/chapter2/characters/ch2_saya_determined.png` — 決意
- `images/chapter2/characters/ch2_saya_looking_away.png` — 追加の横向きポーズ（元ファイル名 `ch2_saya_lookioverthere.png`）
- `images/chapter2/characters/ch2_toyoyo_happy.png` — 既存の元気な立ち絵（通常と混同しない）
- `images/chapter2/characters/ch2_toyoyo_normal.png` — 通常
- `images/chapter2/characters/ch2_toyoyo_worried.png` — 心配
- `images/chapter2/characters/ch2_toyoyo_surprised.png` — 驚き
- `images/chapter2/characters/ch2_toyoyo_determined.png` — 決意

注意: 元のトヨヨ立ち絵を happy として扱う。差分はすべて同じ斜め向き／同サイズで統一する。

## 4. enemies （全9戦9枚）
| Battle | 対応シーン | 正式パス | 敵 |
|---|---|---|---|
| 1 | 02 | `images/chapter2/enemies/ch2_enemy_blackfog_chaser.png` | 黒霧の追跡体 |
| 2 | 05 | `images/chapter2/enemies/ch2_enemy_hasugame.png` | ハスガメ |
| 3 | 08 | `images/chapter2/enemies/ch2_enemy_gengoron.png` | ゲンゴロン |
| 4 | 09 | `images/chapter2/enemies/ch2_enemy_awaebi.png` | 大型アワエビ |
| 5 | 11 | `images/chapter2/enemies/ch2_enemy_gate_guardian.png` | 古代水門の守護者 |
| 6 | 15 | `images/chapter2/enemies/ch2_enemy_suiryu_unagi.png` | スイリュウウナギ |
| 7 | 16 | `images/chapter2/enemies/ch2_enemy_oonushi.png` | オオヌシ |
| 8 | 18 | `images/chapter2/enemies/ch2_enemy_blackfog_split.png` | 黒霧の分裂体 |
| 9 | 19 | `images/chapter2/enemies/ch2_boss_beast.png` | 黒霧の共鳴獣（採用した四足魔獣） |

## 5. events （1枚）
- `images/chapter2/events/ch2_boss_captured_saya_toyoyo.png` — 眠るように意識を失い黒霧に拘束された2人。シーン19（最終戦はボスの右奥）、シーン20（救出の遷移）。

## 総数と別管理
- 第2章専用基本画像: **35枚** = backgrounds 11 + details 2 + characters 12 + enemies 9 + events 1。
- 別管理: 既存の相棒 `images/goimon/`。試作に使った白いフェネ型ゴイモン画像は正式追加しない。
- 戦闘ボスは右手前、捕虜2人は敵の背後右奥、選択した相棒は左手前。描画レイヤーを分離し、固定1枚絵に合成しない。
- 背景 `control_room` は最終戦とシーン17〜20共用。戦闘UIは背景・捕虜・ボス・相棒・UIの順に表示する。
- 第2章シナリオの旧「霧の獣本体に囚われる／霧そのものが獣」という説明と、最新の「実体のある四足魔獣＋別位置の捕虜」の差はシーン19・20の実装前に整合させる。
- 第2章は原稿23シーン、戦闘ID1〜9のマーカーが存在するが、ランタイム／戦闘接続は未完成。
- 2026-10-25受領ZIPを照合済み。35枚すべてPNGで読込可能。背景11枚と近景2枚はRGB、人物12枚・敵9枚・イベント1枚はRGBA。画像バイナリのGitHub反映は別工程で、現時点では未登録。
