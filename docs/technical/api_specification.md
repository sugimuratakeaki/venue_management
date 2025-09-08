# 防災士研修センター会場管理システム API仕様書

## 1. 概要

### 1.1 API基本情報
- **ベースURL**: `https://api.venue-management.replit.app/api/v1`
- **プロトコル**: HTTPS
- **データ形式**: JSON
- **文字コード**: UTF-8
- **認証方式**: Bearer Token (JWT)

### 1.2 共通仕様

#### リクエストヘッダー
```http
Content-Type: application/json
Authorization: Bearer {token}
Accept: application/json
Accept-Language: ja
```

#### レスポンスフォーマット
```json
{
  "success": true,
  "data": {},
  "message": "処理成功",
  "timestamp": "2025-09-07T10:00:00Z"
}
```

#### エラーレスポンス
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ",
    "details": {}
  },
  "timestamp": "2025-09-07T10:00:00Z"
}
```

## 2. 認証API

### 2.1 ログイン
**POST** `/auth/login`

#### リクエスト
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### レスポンス
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "山田太郎",
      "role": "admin"
    }
  }
}
```

### 2.2 トークンリフレッシュ
**POST** `/auth/refresh`

#### リクエスト
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### レスポンス
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 3600
  }
}
```

### 2.3 ログアウト
**POST** `/auth/logout`

#### リクエスト
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### レスポンス
```json
{
  "success": true,
  "message": "ログアウトしました"
}
```

## 3. 会場API

### 3.1 会場一覧取得
**GET** `/venues`

#### クエリパラメータ
| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| page | integer | No | ページ番号（デフォルト: 1） |
| limit | integer | No | 件数（デフォルト: 20、最大: 100） |
| prefecture_id | integer | No | 都道府県ID |
| capacity_min | integer | No | 最小収容人数 |
| capacity_max | integer | No | 最大収容人数 |
| keyword | string | No | キーワード検索 |
| sort | string | No | ソート項目（name, capacity, created_at） |
| order | string | No | ソート順（asc, desc） |

#### レスポンス
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "venue_no": "V001",
        "venue_name": "東京国際フォーラム",
        "prefecture": {
          "id": 13,
          "name": "東京都"
        },
        "address": "東京都千代田区丸の内3-5-1",
        "capacity": 5000,
        "thumbnail_url": "https://...",
        "is_earthquake_resistant": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "total_pages": 8
    }
  }
}
```

### 3.2 会場詳細取得
**GET** `/venues/{id}`

#### パスパラメータ
- `id`: 会場ID

#### レスポンス
```json
{
  "success": true,
  "data": {
    "id": 1,
    "venue_no": "V001",
    "venue_name": "東京国際フォーラム",
    "prefecture": {
      "id": 13,
      "name": "東京都"
    },
    "address": "東京都千代田区丸の内3-5-1",
    "postal_code": "100-0005",
    "phone_number": "03-5221-9000",
    "email": "info@t-i-forum.co.jp",
    "contact_person": "予約担当",
    "official_url": "https://www.t-i-forum.co.jp/",
    "reservation_url": "https://www.t-i-forum.co.jp/reserve/",
    "google_map_url": "https://maps.google.com/?q=...",
    "can_eat_drink": true,
    "can_wear_shoes": false,
    "is_earthquake_resistant": true,
    "operating_hours": "9:00-21:00",
    "can_receive_package": true,
    "package_receiver": "管理事務所",
    "notes": "備考情報",
    "rooms": [
      {
        "id": 1,
        "room_name": "ホールA",
        "ceiling_height": 7.5,
        "floor_area": 5000,
        "capacity": 5000,
        "has_control_room": true
      }
    ],
    "stations": [
      {
        "id": 1,
        "station_name": "有楽町駅",
        "line_name": "JR山手線",
        "transport_method": "徒歩",
        "time_minutes": 1
      }
    ],
    "facilities": {
      "has_podium": true,
      "has_whiteboard": true,
      "has_screen": true,
      "has_wireless_mic": true,
      "has_projector_stand": true
    },
    "fees": {
      "main_venue_fee": 500000,
      "control_room_fee": 50000,
      "equipment_fee": 100000,
      "estimated_total": 650000
    },
    "parking": {
      "has_parking": true,
      "capacity": 450,
      "fee_per_hour": 600
    },
    "created_at": "2025-09-01T10:00:00Z",
    "updated_at": "2025-09-07T10:00:00Z"
  }
}
```

### 3.3 会場登録
**POST** `/venues`

#### リクエスト
```json
{
  "venue_name": "新規会場名",
  "prefecture_id": 13,
  "address": "東京都千代田区...",
  "postal_code": "100-0001",
  "phone_number": "03-1234-5678",
  "email": "info@example.com",
  "contact_person": "担当者名",
  "official_url": "https://example.com",
  "can_eat_drink": true,
  "can_wear_shoes": false,
  "is_earthquake_resistant": true,
  "operating_hours": "9:00-21:00",
  "notes": "備考"
}
```

#### レスポンス
```json
{
  "success": true,
  "data": {
    "id": 123,
    "venue_no": "V123",
    "message": "会場を登録しました"
  }
}
```

### 3.4 会場更新
**PUT** `/venues/{id}`

#### パスパラメータ
- `id`: 会場ID

#### リクエスト
会場登録と同じ形式（更新したい項目のみ送信可）

#### レスポンス
```json
{
  "success": true,
  "message": "会場情報を更新しました"
}
```

### 3.5 会場削除
**DELETE** `/venues/{id}`

#### パスパラメータ
- `id`: 会場ID

#### リクエスト
```json
{
  "reason": "削除理由"
}
```

#### レスポンス
```json
{
  "success": true,
  "message": "会場を削除しました"
}
```

## 4. 部屋API

### 4.1 部屋一覧取得
**GET** `/venues/{venue_id}/rooms`

#### パスパラメータ
- `venue_id`: 会場ID

#### レスポンス
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "room_name": "メインホール",
      "ceiling_height": 7.5,
      "floor_area": 500,
      "desk_count": 100,
      "chair_count": 300,
      "capacity": 300,
      "has_control_room": true,
      "control_room_name": "控室A",
      "is_main_room": true
    }
  ]
}
```

### 4.2 部屋登録
**POST** `/venues/{venue_id}/rooms`

#### パスパラメータ
- `venue_id`: 会場ID

#### リクエスト
```json
{
  "room_name": "会議室A",
  "ceiling_height": 3.0,
  "floor_area": 50,
  "desk_count": 20,
  "chair_count": 40,
  "capacity": 40,
  "has_control_room": false,
  "is_main_room": false
}
```

### 4.3 部屋更新
**PUT** `/rooms/{id}`

### 4.4 部屋削除
**DELETE** `/rooms/{id}`

## 5. 最寄り駅API

### 5.1 最寄り駅一覧取得
**GET** `/venues/{venue_id}/stations`

### 5.2 最寄り駅登録
**POST** `/venues/{venue_id}/stations`

#### リクエスト
```json
{
  "station_name": "東京駅",
  "line_name": "JR山手線",
  "transport_method": "徒歩",
  "time_minutes": 10
}
```

## 6. AI解析API

### 6.1 テキスト解析
**POST** `/ai/analyze`

#### リクエスト
```json
{
  "text": "会場情報のテキスト...",
  "type": "venue_info"
}
```

#### レスポンス
```json
{
  "success": true,
  "data": {
    "extracted_data": {
      "venue_name": "抽出された会場名",
      "address": "抽出された住所",
      "phone_number": "抽出された電話番号",
      "rooms": [],
      "stations": []
    },
    "confidence_score": 0.95
  }
}
```

## 7. ユーザー管理API

### 7.1 ユーザー一覧取得
**GET** `/users`

### 7.2 ユーザー登録
**POST** `/users`

#### リクエスト
```json
{
  "email": "newuser@example.com",
  "password": "securePassword123",
  "name": "新規ユーザー",
  "role": "viewer",
  "department": "営業部"
}
```

### 7.3 ユーザー更新
**PUT** `/users/{id}`

### 7.4 ユーザー削除
**DELETE** `/users/{id}`

### 7.5 パスワードリセット
**POST** `/users/reset-password`

#### リクエスト
```json
{
  "email": "user@example.com"
}
```

## 8. イベント履歴API

### 8.1 イベント履歴一覧
**GET** `/events`

### 8.2 イベント登録
**POST** `/events`

#### リクエスト
```json
{
  "event_name": "防災士研修2025",
  "venue_id": 1,
  "room_id": 1,
  "event_date": "2025-10-01",
  "participants": 150,
  "notes": "備考"
}
```

## 9. マスターデータAPI

### 9.1 都道府県一覧
**GET** `/master/prefectures`

#### レスポンス
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "北海道",
      "region": "北海道"
    },
    {
      "id": 13,
      "name": "東京都",
      "region": "関東"
    }
  ]
}
```

### 9.2 設備タイプ一覧
**GET** `/master/facility-types`

## 10. 統計API

### 10.1 利用統計
**GET** `/statistics/usage`

#### クエリパラメータ
- `from`: 開始日（YYYY-MM-DD）
- `to`: 終了日（YYYY-MM-DD）
- `group_by`: 集計単位（day, month, year）

### 10.2 会場ランキング
**GET** `/statistics/ranking`

## 11. エクスポートAPI

### 11.1 CSV出力
**GET** `/export/csv`

#### クエリパラメータ
- `type`: エクスポート種別（venues, events, users）
- `format`: フォーマット（csv, excel）

## 12. ステータスコード

| コード | 説明 |
|--------|------|
| 200 | 成功 |
| 201 | 作成成功 |
| 204 | 削除成功 |
| 400 | リクエストエラー |
| 401 | 認証エラー |
| 403 | 権限エラー |
| 404 | リソースが見つからない |
| 409 | 競合エラー |
| 422 | バリデーションエラー |
| 429 | レート制限超過 |
| 500 | サーバーエラー |
| 503 | メンテナンス中 |

## 13. エラーコード一覧

| コード | 説明 |
|--------|------|
| AUTH001 | 認証失敗 |
| AUTH002 | トークン期限切れ |
| AUTH003 | 無効なトークン |
| VAL001 | 必須項目不足 |
| VAL002 | 形式エラー |
| VAL003 | 値の範囲エラー |
| BIZ001 | ビジネスロジックエラー |
| SYS001 | システムエラー |

## 14. レート制限

### 14.1 制限値
- **通常API**: 1000リクエスト/時
- **AI API**: 100リクエスト/時
- **エクスポート**: 10リクエスト/時

### 14.2 レスポンスヘッダー
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1693584000
```

## 15. ページネーション

### 15.1 リクエスト
```
GET /venues?page=2&limit=20
```

### 15.2 レスポンス
```json
{
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "total_pages": 8,
    "has_next": true,
    "has_previous": true
  }
}
```

## 16. フィルタリング

### 16.1 単一条件
```
GET /venues?prefecture_id=13
```

### 16.2 複数条件
```
GET /venues?prefecture_id=13&capacity_min=100&capacity_max=500
```

### 16.3 検索
```
GET /venues?keyword=国際フォーラム
```

## 17. ソート

### 17.1 昇順
```
GET /venues?sort=capacity&order=asc
```

### 17.2 降順
```
GET /venues?sort=created_at&order=desc
```

## 18. バージョニング

### 18.1 URL方式
```
/api/v1/venues
/api/v2/venues
```

### 18.2 ヘッダー方式
```http
API-Version: 1.0
```

## 19. CORS設定

### 19.1 許可オリジン
```
https://venue-management.replit.app
http://localhost:3000 (開発環境)
```

### 19.2 許可メソッド
```
GET, POST, PUT, DELETE, OPTIONS
```

## 20. セキュリティ

### 20.1 HTTPS必須
全ての通信はHTTPS経由で行う

### 20.2 認証トークン
JWTトークンをAuthorizationヘッダーに含める

### 20.3 入力検証
全ての入力値をサーバー側で検証

## 21. 改訂履歴

| 版 | 日付 | 作成者 | 改訂内容 |
|----|------|--------|----------|
| 1.0 | 2025-09-07 | システム設計チーム | 初版作成 |