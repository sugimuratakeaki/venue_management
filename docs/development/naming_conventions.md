# 防災士研修センター会場管理システム システム名称・用語定義書

## 1. 文書概要

### 1.1 文書の目的
本文書は、防災士研修センター会場管理システムで使用される全ての名称・用語について統一的な定義を行い、
開発チーム内での認識統一とシステム全体の一貫性を確保することを目的とする。

### 1.2 適用範囲
- システム内で使用される全ての名称・用語
- データベース項目名
- API エンドポイント名
- UI上の表示項目名
- ドキュメント記述

### 1.3 関連文書
- 要件定義書（requirement_definition.md）
- 機能要件定義書（functional_requirements.md）
- データベース設計書（table_design.md）

## 2. システム基本名称

### 2.1 システム名称
| 項目 | 名称 | 英語名 | 略称 | 備考 |
|------|------|--------|------|------|
| システム正式名称 | 防災士研修センター会場管理システム | Venue Management System | VMS | - |
| プロジェクト名 | venue_management | venue_management | - | ディレクトリ・リポジトリ名 |
| データベース名 | venue_management_db | venue_management_db | - | - |
| アプリケーション名 | VenueMS | VenueMS | - | 画面表示用 |

### 2.2 組織・関連名称
| 項目 | 名称 | 英語名 | 備考 |
|------|------|--------|------|
| 運営組織 | 防災士研修センター | Disaster Prevention Training Center | - |
| ユーザー組織 | 防災士研修センタースタッフ | Training Center Staff | - |
| 対象研修 | 防災士研修 | Disaster Prevention Training | - |
| 対象資格 | 防災士 | Disaster Prevention Specialist | - |

## 3. ドメイン用語定義

### 3.1 会場関連用語

#### 3.1.1 基本概念
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 会場 | Venue | 防災士研修を実施する施設全体 | 建物または施設単位 |
| 施設 | Facility | 会場と同義（UI表示で使用） | - |
| 部屋 | Room | 同一会場内の個別の部屋・スペース | 1会場に複数存在可能 |
| 控室 | Staff Room | 講師・スタッフ用の待機・準備室 | - |
| メイン会場 | Main Hall | 研修の主たる実施場所 | - |
| サブ会場 | Sub Hall | メイン会場以外の実施場所 | - |

#### 3.1.2 会場属性
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 施設名 | Venue Name | 会場・施設の正式名称 | - |
| 住所 | Address | 会場の所在地 | - |
| 郵便番号 | Postal Code | 住所に対応する郵便番号 | 形式：123-4567 |
| 都道府県 | Prefecture | 住所の都道府県部分 | - |
| 市区町村 | City | 住所の市区町村部分 | - |
| 最寄り駅 | Nearest Station | 会場への最寄りの鉄道駅 | 複数登録可能 |
| アクセス方法 | Access Method | 最寄り駅から会場への移動手段 | 徒歩、バス、タクシー等 |
| 所要時間 | Travel Time | 最寄り駅から会場までの移動時間 | 分単位 |

#### 3.1.3 設備・条件
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 収容人数 | Capacity | 会場・部屋に収容可能な最大人数 | 人単位 |
| 天井高 | Ceiling Height | 部屋の天井までの高さ | メートル単位 |
| 広さ | Area Size | 部屋の面積 | 平方メートル単位 |
| 机の数 | Number of Desks | 利用可能な机の数 | 台単位 |
| 椅子の数 | Number of Chairs | 利用可能な椅子の数 | 脚単位 |
| 演台 | Podium | 講師用の演台・講壇 | 有無・台数 |
| ホワイトボード | Whiteboard | 板書用のホワイトボード | 有無・枚数 |
| スクリーン | Screen | プロジェクター投影用スクリーン | 有無・枚数 |
| プロジェクター台 | Projector Stand | プロジェクター設置台 | 有無・台数 |
| ワイヤレスマイク | Wireless Microphone | 無線マイクロフォン | 有無・本数 |
| 音響設備 | Audio Equipment | 音響システム一式 | 有無・詳細 |
| 照明設備 | Lighting Equipment | 照明システム | 調光可能性等 |
| 空調設備 | Air Conditioning | 冷暖房・換気システム | 個別調整可能性等 |

#### 3.1.4 利用条件
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 飲食可否 | Food and Drink Policy | 会場内での飲食許可状況 | 可・不可・条件付き |
| 土足可否 | Shoes Policy | 会場内での靴着用許可状況 | 可・不可・スリッパ等 |
| 耐震基準適合 | Seismic Compliance | 耐震基準への適合状況 | 1981年新耐震基準等 |
| 利用可能時間 | Available Hours | 会場の利用可能時間帯 | 開始時刻〜終了時刻 |
| 荷物受取 | Package Reception | 事前荷物送付・受取の可否 | 可・不可・条件 |
| 設営日利用 | Setup Day Usage | 研修前日の設営利用可否 | 可・不可・追加料金 |

#### 3.1.5 料金・費用
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| メイン会場費用 | Main Hall Fee | 主会場の利用料金 | 円単位・時間単位等 |
| 控室費用 | Staff Room Fee | 控室の利用料金 | 円単位・時間単位等 |
| 備品費用 | Equipment Fee | 設備・備品の利用料金 | 項目別・円単位 |
| 概算料金 | Estimated Total Fee | 2.5日間利用の想定総額 | 研修標準期間での概算 |
| 基本料金 | Base Fee | 基本的な利用料金 | - |
| 追加料金 | Additional Fee | オプション・延長等の追加料金 | - |

#### 3.1.6 契約・手続き
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 予約方法 | Booking Method | 会場予約の申込み方法・手順 | 電話・メール・Web等 |
| キャンセル規定 | Cancellation Policy | 予約取消しに関する規定 | 期限・料金等 |
| 支払条件 | Payment Terms | 料金支払いの条件・方法 | 前払い・後払い等 |
| 予約申込みURL | Booking URL | オンライン予約システムのURL | - |
| 担当者 | Contact Person | 会場側の担当者・責任者 | - |
| 連絡先 | Contact Information | 電話番号・メールアドレス | - |

### 3.2 地理・交通関連用語

#### 3.2.1 位置情報
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 地域 | Region | 地理的な区分（地方・都道府県等） | - |
| エリア | Area | 特定の地理的範囲 | - |
| 所在地 | Location | 具体的な場所・位置 | - |
| 緯度経度 | Coordinates | GPS座標（緯度・経度） | - |
| GoogleマップURL | Google Maps URL | Googleマップでの位置表示URL | 自動生成 |

#### 3.2.2 交通・アクセス
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 路線 | Railway Line | 鉄道の路線名 | JR・私鉄等 |
| 駅名 | Station Name | 鉄道駅の名称 | - |
| 乗換 | Transfer | 電車・バス等の乗り継ぎ | - |
| 徒歩 | Walking | 歩行による移動 | - |
| バス | Bus | バス利用による移動 | - |
| タクシー | Taxi | タクシー利用による移動 | - |
| 自家用車 | Private Car | 個人車両での移動 | - |

#### 3.2.3 駐車場関連
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 駐車場 | Parking | 車両駐車スペース | - |
| 施設内駐車場 | On-site Parking | 会場敷地内の駐車場 | - |
| 周辺駐車場 | Nearby Parking | 会場周辺の駐車場 | コインパーキング等 |
| 駐車台数 | Parking Spaces | 駐車可能台数 | 台単位 |
| 駐車料金 | Parking Fee | 駐車場利用料金 | 時間単位・円単位 |

### 3.3 システム・技術用語

#### 3.3.1 システム機能
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 会場管理 | Venue Management | 会場情報の登録・更新・削除機能 | - |
| 会場検索 | Venue Search | 条件による会場の検索・絞り込み | - |
| 情報抽出 | Information Extraction | テキストからの自動情報抽出 | AI機能 |
| フィルタリング | Filtering | 検索結果の絞り込み | - |
| ソート | Sorting | 検索結果の並び替え | - |
| エクスポート | Export | データの外部出力 | CSV・Excel等 |
| インポート | Import | 外部データの取り込み | CSV・Excel等 |
| バックアップ | Backup | データの保存・退避 | - |
| リストア | Restore | バックアップからの復元 | - |

#### 3.3.2 ユーザー・権限
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| ユーザー | User | システム利用者 | - |
| システム管理者 | System Administrator | 全機能利用可能な管理者 | - |
| 運営管理者 | Operations Manager | 会場情報編集可能な管理者 | - |
| 一般利用者 | General User | 閲覧のみ可能な利用者 | - |
| 権限 | Permission | システム機能へのアクセス権 | - |
| 役割 | Role | ユーザーの役割・権限レベル | - |
| 認証 | Authentication | ユーザー身元確認 | - |
| 認可 | Authorization | 機能・データアクセス許可 | - |

#### 3.3.3 データ・履歴
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| データ | Data | システムで管理する情報 | - |
| レコード | Record | データベースの1件のデータ | - |
| フィールド | Field | データの項目・属性 | - |
| 履歴 | History | データ変更の記録 | - |
| 更新履歴 | Update History | データ更新の履歴記録 | - |
| 操作履歴 | Operation History | ユーザー操作の履歴記録 | - |
| ログ | Log | システム動作の記録 | - |
| 監査証跡 | Audit Trail | 操作・変更の追跡可能な記録 | - |

### 3.4 業務・運用用語

#### 3.4.1 研修・イベント
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 研修 | Training | 防災士資格取得のための講習 | - |
| セミナー | Seminar | 防災関連の講演・学習会 | - |
| イベント | Event | 研修・セミナー等の総称 | - |
| 開催日 | Event Date | イベント実施日 | - |
| 開催期間 | Event Period | イベント実施期間 | 開始日〜終了日 |
| 参加者 | Participant | 研修・セミナー参加者 | - |
| 参加人数 | Number of Participants | イベント参加者数 | 人単位 |
| 定員 | Capacity Limit | イベントの参加定員 | - |
| 講師 | Instructor | 研修・セミナーの指導者 | - |
| スタッフ | Staff | 運営担当者・補助者 | - |

#### 3.4.2 準備・設営
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 設営 | Setup | 会場準備・機材設置作業 | - |
| 撤収 | Teardown | 会場片付け・機材撤去作業 | - |
| 設営日 | Setup Day | 研修前日の準備日 | - |
| 撤収日 | Teardown Day | 研修後の片付け日 | - |
| 準備 | Preparation | 研修実施のための事前準備 | - |
| 片付け | Cleanup | 研修後の清掃・整理作業 | - |

#### 3.4.3 品質・状態
| 用語 | 英語名 | 定義 | 備考 |
|------|--------|------|------|
| 状態 | Status | 会場・データの現在の状況 | - |
| 有効 | Active | 利用可能・表示対象の状態 | - |
| 無効 | Inactive | 利用不可・非表示の状態 | - |
| 削除済み | Deleted | 論理削除された状態 | - |
| 承認 | Approved | 内容確認・承認済みの状態 | - |
| 承認待ち | Pending Approval | 承認待ちの状態 | - |
| 確認済み | Verified | 内容確認済みの状態 | - |
| 未確認 | Unverified | 内容未確認の状態 | - |

## 4. データベース命名規則

### 4.1 テーブル名
```sql
-- 基本ルール：複数形のsnake_case
venues              -- 会場
rooms               -- 部屋
venue_stations      -- 会場最寄り駅
venue_facilities    -- 会場設備
users               -- ユーザー
user_sessions       -- ユーザーセッション
audit_logs          -- 監査ログ
```

### 4.2 カラム名
```sql
-- 基本ルール：snake_case、意味が明確な名称
-- 主キー
id                  -- プライマリキー（UUID）

-- 基本情報
name                -- 名称
description         -- 説明
address             -- 住所
phone_number        -- 電話番号
email_address       -- メールアドレス

-- 位置情報
prefecture          -- 都道府県
city               -- 市区町村
postal_code        -- 郵便番号
latitude           -- 緯度
longitude          -- 経度

-- 数値・容量
capacity           -- 収容人数
area_size          -- 面積
ceiling_height     -- 天井高

-- フラグ・真偽値
is_active          -- 有効フラグ
is_deleted         -- 削除フラグ
food_allowed       -- 飲食可否
shoes_allowed      -- 土足可否
earthquake_resistant -- 耐震基準適合

-- 日時
created_at         -- 作成日時
updated_at         -- 更新日時
deleted_at         -- 削除日時

-- 外部キー
venue_id           -- 会場ID
user_id            -- ユーザーID
created_by         -- 作成者ID
updated_by         -- 更新者ID
```

### 4.3 インデックス名
```sql
-- ルール：idx_テーブル名_カラム名
idx_venues_name                    -- 会場名インデックス
idx_venues_prefecture_city         -- 都道府県・市区町村複合インデックス
idx_users_email                    -- ユーザーメールアドレスインデックス
idx_audit_logs_created_at          -- 監査ログ作成日時インデックス

-- ユニークインデックス：uq_テーブル名_カラム名
uq_users_email                     -- ユーザーメール一意インデックス
uq_venues_name_address             -- 会場名・住所複合一意インデックス

-- 外部キー制約：fk_子テーブル名_親テーブル名_カラム名
fk_rooms_venues_venue_id           -- 部屋テーブルの会場ID外部キー
fk_venue_stations_venues_venue_id  -- 会場最寄り駅テーブルの外部キー
```

## 5. API 命名規則

### 5.1 エンドポイント名
```
-- RESTful APIパターン：複数形名詞 + HTTP動詞
GET    /api/v1/venues              -- 会場一覧取得
GET    /api/v1/venues/{id}         -- 会場詳細取得
POST   /api/v1/venues              -- 会場作成
PUT    /api/v1/venues/{id}         -- 会場更新
DELETE /api/v1/venues/{id}         -- 会場削除

-- ネストしたリソース
GET    /api/v1/venues/{id}/rooms           -- 指定会場の部屋一覧
POST   /api/v1/venues/{id}/rooms           -- 指定会場の部屋作成
GET    /api/v1/venues/{id}/rooms/{room_id} -- 指定会場の指定部屋詳細

-- 検索・フィルタ
GET    /api/v1/venues/search               -- 会場検索
GET    /api/v1/venues?prefecture=東京都    -- クエリパラメータによる絞り込み

-- アクション（動詞が必要な場合）
POST   /api/v1/venues/{id}/activate        -- 会場有効化
POST   /api/v1/venues/{id}/deactivate      -- 会場無効化
POST   /api/v1/venues/bulk-import          -- 会場一括取り込み
```

### 5.2 リクエスト・レスポンス項目名
```json
// ルール：camelCase（JavaScript慣習）
{
  "id": "uuid",
  "name": "会場名",
  "address": "住所",
  "phoneNumber": "電話番号",
  "emailAddress": "メールアドレス",
  "prefecture": "都道府県",
  "capacity": 100,
  "foodAllowed": true,
  "shoesAllowed": false,
  "earthquakeResistant": true,
  "createdAt": "2025-09-07T10:30:00Z",
  "updatedAt": "2025-09-07T15:45:00Z"
}

// ネストした構造
{
  "venue": {
    "id": "uuid",
    "name": "会場名",
    "rooms": [
      {
        "id": "uuid",
        "name": "部屋名",
        "capacity": 50,
        "facilities": ["プロジェクター", "ホワイトボード"]
      }
    ],
    "nearestStations": [
      {
        "stationName": "駅名",
        "railwayLine": "路線名",
        "travelTime": 5
      }
    ]
  }
}
```

## 6. フロントエンド命名規則

### 6.1 コンポーネント名
```typescript
// Reactコンポーネント：PascalCase
VenueCard              // 会場カードコンポーネント
VenueList              // 会場一覧コンポーネント
VenueSearchForm        // 会場検索フォーム
VenueDetailModal       // 会場詳細モーダル
LoadingSpinner         // ローディング表示
ErrorMessage           // エラーメッセージ

// Atomic Design階層
atoms/Button           // ボタンAtom
atoms/Input            // 入力フィールドAtom
molecules/SearchBox    // 検索ボックスMolecule
organisms/Header       // ヘッダーOrganism
templates/MainLayout   // メインレイアウトTemplate
```

### 6.2 CSS クラス名
```css
/* BEM記法：block__element--modifier */
.venue-card                    /* ブロック */
.venue-card__header            /* エレメント */
.venue-card__title             /* エレメント */
.venue-card__content           /* エレメント */
.venue-card--highlighted      /* モディファイア */

.search-form                   /* ブロック */
.search-form__input            /* エレメント */
.search-form__button           /* エレメント */
.search-form__results          /* エレメント */
.search-form--compact          /* モディファイア */

/* ユーティリティクラス：prefix付き */
.u-text-center                 /* テキスト中央揃え */
.u-margin-bottom-lg            /* 大きい下マージン */
.u-hidden-mobile               /* モバイル非表示 */
```

### 6.3 JavaScript変数・関数名
```typescript
// camelCase
const venueList = [];                    // 会場一覧配列
const searchFilters = {};                // 検索フィルタオブジェクト
const selectedVenue = null;              // 選択された会場

// 関数：動詞 + 名詞
function getVenues() {}                  // 会場取得
function createVenue() {}                // 会場作成
function updateVenue() {}                // 会場更新
function deleteVenue() {}                // 会場削除
function searchVenues() {}               // 会場検索
function handleVenueSelect() {}          // 会場選択処理
function onVenueChange() {}              // 会場変更イベント

// Boolean値：is/has/can等のprefix
const isLoading = false;                 // ローディング状態
const hasError = false;                  // エラー有無
const canEdit = true;                    // 編集可否
const shouldUpdate = false;              // 更新要否

// 定数：UPPER_SNAKE_CASE
const VENUE_STATUS_ACTIVE = 'active';
const MAX_SEARCH_RESULTS = 100;
const DEFAULT_PAGE_SIZE = 20;
```

## 7. 表示・UI用語統一

### 7.1 ボタン・アクション
| 日本語 | 英語 | 使用場面 | 備考 |
|--------|------|----------|------|
| 登録 | Register | 新規データ作成 | Create/Addも可 |
| 更新 | Update | データ修正・変更 | - |
| 削除 | Delete | データ削除 | - |
| 検索 | Search | データ検索・絞り込み | - |
| 絞り込み | Filter | 検索結果の絞り込み | - |
| クリア | Clear | 入力内容・選択の初期化 | Reset も可 |
| 保存 | Save | データ保存・登録 | - |
| キャンセル | Cancel | 操作の取り消し | - |
| 戻る | Back | 前画面への遷移 | - |
| 詳細 | Details | 詳細情報表示 | - |
| 編集 | Edit | データ編集画面へ | - |
| コピー | Copy | データ複製 | - |
| エクスポート | Export | データ出力 | - |
| インポート | Import | データ取り込み | - |

### 7.2 状態・メッセージ
| 日本語 | 英語 | 使用場面 | 備考 |
|--------|------|----------|------|
| 読み込み中 | Loading | データ取得・処理中 | - |
| 保存中 | Saving | データ保存処理中 | - |
| 完了 | Complete | 処理正常終了 | - |
| エラー | Error | 処理異常終了 | - |
| 警告 | Warning | 注意が必要な状況 | - |
| 情報 | Information | 補足情報・お知らせ | - |
| 確認 | Confirmation | ユーザー確認が必要 | - |
| 必須 | Required | 入力必須項目 | - |
| 任意 | Optional | 入力任意項目 | - |
| 有効 | Active | 利用可能状態 | - |
| 無効 | Inactive | 利用不可状態 | - |

### 7.3 単位・表記
| 項目 | 単位 | 表記例 | 備考 |
|------|------|--------|------|
| 人数 | 人 | 100人 | - |
| 時間 | 分/時間 | 5分、2時間 | - |
| 面積 | ㎡/平米 | 100㎡ | - |
| 高さ | m/メートル | 3.5m | - |
| 料金 | 円 | 10,000円 | カンマ区切り |
| 日時 | - | 2025年9月7日 10:30 | 年月日 時:分 |
| 電話番号 | - | 03-1234-5678 | ハイフン区切り |
| 郵便番号 | - | 123-4567 | ハイフン区切り |

## 8. 省略・短縮形規則

### 8.1 システム内略語
| 正式名称 | 略語 | 使用場面 | 備考 |
|----------|------|----------|------|
| Venue Management System | VMS | システム名略称 | - |
| User Interface | UI | 画面・インターフェース | - |
| Application Programming Interface | API | システム間連携 | - |
| Uniform Resource Locator | URL | Webアドレス | - |
| Identifier | ID | 識別子 | - |
| Database | DB | データベース | - |
| Maximum | Max | 最大値 | - |
| Minimum | Min | 最小値 | - |
| Number | Num/No | 数・番号 | - |
| Information | Info | 情報 | - |

### 8.2 業務略語
| 正式名称 | 略語 | 使用場面 | 備考 |
|----------|------|----------|------|
| 防災士研修センター | 防災センター | 略称表示 | - |
| メイン会場 | M会場 | 画面表示・帳票 | スペース制約時 |
| 控室 | 控 | 画面表示・帳票 | スペース制約時 |
| 収容人数 | 定員 | 画面表示 | - |
| 最寄り駅 | 最寄駅 | 画面表示 | - |
| 電話番号 | TEL | 帳票・画面表示 | - |
| メールアドレス | Email | 画面表示 | - |
| 郵便番号 | 〒 | 帳票表示 | - |

## 9. エラーメッセージ・通知メッセージ

### 9.1 バリデーションエラー
| 項目 | メッセージテンプレート | 例 |
|------|----------------------|-----|
| 必須入力 | {項目名}は必須です | 会場名は必須です |
| 文字数超過 | {項目名}は{最大文字数}文字以内で入力してください | 会場名は255文字以内で入力してください |
| 形式不正 | {項目名}の形式が正しくありません | 電話番号の形式が正しくありません |
| 数値範囲 | {項目名}は{最小値}以上{最大値}以下で入力してください | 収容人数は1以上1000以下で入力してください |
| 重複エラー | 同じ{項目名}が既に存在します | 同じ会場名が既に存在します |

### 9.2 システムメッセージ
| 分類 | メッセージテンプレート | 例 |
|------|----------------------|-----|
| 処理成功 | {操作}が完了しました | 会場の登録が完了しました |
| 処理エラー | {操作}に失敗しました | 会場の更新に失敗しました |
| 確認メッセージ | {操作}してもよろしいですか？ | この会場を削除してもよろしいですか？ |
| データなし | {項目}が見つかりません | 指定された会場が見つかりません |
| 権限エラー | この操作を実行する権限がありません | - |

## 10. 改訂履歴

| 版 | 日付 | 作成者 | 改訂内容 |
|----|------|--------|----------|
| 1.0 | 2025-09-07 | システム設計チーム | 初版作成 |