# 防災士研修センター会場管理システム テーブル設計書

## 1. データベース概要

### 1.1 データベース構成

#### フェーズ1：JSONファイル
- **形式**: JSONファイル
- **ファイル名**: `venues.json`, `users.json` 等
- **格納場所**: `/data/json/`
- **目的**: プロトタイプ開発、高速動作確認

#### フェーズ2：SQLite
- **データベース名**: `venue_management.db`
- **形式**: SQLite3
- **文字コード**: UTF-8
- **目的**: 開発環境でのデータベース実装

#### フェーズ3：PostgreSQL
- **データベース名**: `venue_management_db`
- **文字コード**: UTF-8
- **照合順序**: ja_JP.UTF-8
- **目的**: 本番環境（Replit対応）

## 2. テーブル一覧

| No | テーブル名 | 論理名 | 説明 |
|----|-----------|--------|------|
| 1 | venues | 会場マスタ | 会場の基本情報を管理 |
| 2 | venues_rooms | 会場部屋情報 | 会場の複数部屋詳細情報を管理 |
| 3 | venues_stations | 会場最寄り駅情報 | 会場の複数最寄り駅情報を管理 |
| 4 | venue_facilities | 会場設備情報 | 会場の設備・備品情報を管理 |
| 5 | venue_fees | 会場料金情報 | 会場の各種料金情報を管理 |
| 6 | venue_parking | 会場駐車場情報 | 会場の駐車場情報を管理 |
| 7 | venue_conditions | 会場利用条件 | 会場の予約・キャンセル条件を管理 |
| 8 | event_history | イベント履歴 | 過去のイベント開催履歴を管理 |
| 9 | users | ユーザーマスタ | システム利用者情報を管理 |
| 10 | user_roles | ユーザー権限 | ユーザーの権限情報を管理 |
| 11 | roles | 権限マスタ | システムの権限定義を管理 |
| 12 | audit_logs | 監査ログ | データ更新履歴を管理 |
| 13 | prefectures | 都道府県マスタ | 都道府県情報を管理 |
| 14 | facility_types | 設備タイプマスタ | 設備の種類を管理 |

## 3. テーブル定義詳細

### 3.1 venues（会場マスタ）

**テーブル説明**: 会場の基本情報を管理するマスタテーブル

#### SQLite/PostgreSQL対応

| カラム名 | SQLite型 | PostgreSQL型 | NULL | キー | デフォルト | 説明 |
|---------|----------|--------------|------|------|-----------|------|
| id | INTEGER | BIGSERIAL | NO | PK | AUTO | 会場ID |
| venue_no | TEXT | VARCHAR(20) | YES | UNI | NULL | 会場管理番号 |
| venue_name | TEXT | VARCHAR(200) | NO | IDX | | 施設名 |
| prefecture_id | INTEGER | INT | NO | FK,IDX | | 都道府県ID |
| address | TEXT | VARCHAR(500) | NO | | | 住所 |
| postal_code | TEXT | VARCHAR(10) | YES | | NULL | 郵便番号 |
| phone_number | VARCHAR(20) | NO | | | 電話番号 |
| email | VARCHAR(100) | YES | | NULL | メールアドレス |
| contact_person | VARCHAR(100) | YES | | NULL | 担当者名 |
| official_url | VARCHAR(500) | YES | | NULL | 公式サイトURL |
| reservation_url | VARCHAR(500) | YES | | NULL | 予約申込みURL |
| google_map_url | VARCHAR(500) | YES | | NULL | GoogleマップURL |
| can_eat_drink | BOOLEAN | YES | | NULL | 飲食可否 |
| can_wear_shoes | BOOLEAN | YES | | NULL | 土足可否 |
| is_earthquake_resistant | BOOLEAN | YES | | NULL | 耐震基準適合（1981年以降） |
| operating_hours | VARCHAR(200) | YES | | NULL | 利用可能時間 |
| can_receive_package | BOOLEAN | YES | | NULL | 設営日荷物受取可否 |
| package_receiver | VARCHAR(100) | YES | | NULL | 荷物受取者/保管場所 |
| notes | TEXT | YES | | NULL | 適用・備考 |
| is_active | BOOLEAN | NO | IDX | TRUE | 有効フラグ |
| created_by | BIGINT | NO | FK | | 作成者ID |
| created_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 作成日時 |
| updated_by | BIGINT | YES | FK | NULL | 更新者ID |
| updated_at | TIMESTAMP | YES | | NULL ON UPDATE CURRENT_TIMESTAMP | 更新日時 |
| deleted_at | TIMESTAMP | YES | | NULL | 削除日時（論理削除） |

**インデックス**:
- PRIMARY KEY (id)
- UNIQUE KEY idx_venue_no (venue_no)
- INDEX idx_venue_name (venue_name)
- INDEX idx_prefecture (prefecture_id)
- INDEX idx_active (is_active, deleted_at)

---

### 3.2 venues_rooms（会場部屋情報）

**テーブル説明**: 会場の複数部屋に関する詳細情報を管理

#### SQLite/PostgreSQL対応

| カラム名 | SQLite型 | PostgreSQL型 | NULL | キー | デフォルト | 説明 |
|---------|----------|--------------|------|------|-----------|------|
| id | INTEGER | BIGSERIAL | NO | PK | AUTO | 部屋情報ID |
| venue_id | INTEGER | BIGINT | NO | FK,IDX | | 会場ID |
| room_name | TEXT | VARCHAR(100) | NO | | | 部屋名 |
| ceiling_height | REAL | DECIMAL(4,2) | YES | | NULL | 天井高（メートル） |
| floor_area | REAL | DECIMAL(8,2) | YES | | NULL | 広さ（平方メートル） |
| desk_count | INT | YES | | NULL | 机の数 |
| chair_count | INT | YES | | NULL | 椅子の数 |
| capacity | INT | NO | IDX | | 収容人数 |
| is_main_room | BOOLEAN | NO | | TRUE | メイン会場フラグ |
| created_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | YES | | NULL ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス**:
- PRIMARY KEY (id)
- INDEX idx_venue_room (venue_id)
- INDEX idx_capacity (capacity)

---

### 3.3 room_control_rooms（部屋控室情報）

**テーブル説明**: 各部屋に付属する複数の控室情報を管理

#### SQLite/PostgreSQL対応

| カラム名 | SQLite型 | PostgreSQL型 | NULL | キー | デフォルト | 説明 |
|---------|----------|--------------|------|------|-----------|------|
| id | INTEGER | BIGSERIAL | NO | PK | AUTO | 控室ID |
| room_id | INTEGER | BIGINT | NO | FK,IDX | | 部屋ID |
| control_room_name | TEXT | VARCHAR(100) | NO | | | 控室名 |
| control_room_area | REAL | DECIMAL(6,2) | YES | | NULL | 控室広さ（平方メートル） |
| desk_count | INTEGER | INT | YES | | NULL | 机の数 |
| chair_count | INTEGER | INT | YES | | NULL | 椅子の数 |
| capacity | INTEGER | INT | YES | | NULL | 収容人数 |
| notes | TEXT | TEXT | YES | | NULL | 備考 |
| display_order | INTEGER | INT | NO | | 1 | 表示順 |
| created_at | TIMESTAMP | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | TIMESTAMP | YES | | NULL ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス**:
- PRIMARY KEY (id)
- INDEX idx_room_control (room_id, display_order)

---

### 3.4 venues_stations（会場最寄り駅情報）

**テーブル説明**: 会場の複数最寄り駅情報を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | BIGINT | NO | PK | AUTO_INCREMENT | 最寄り駅情報ID |
| venue_id | BIGINT | NO | FK,IDX | | 会場ID |
| station_name | VARCHAR(100) | NO | | | 駅名 |
| line_name | VARCHAR(100) | NO | | | 路線名（必須） |
| transport_method | VARCHAR(50) | YES | | NULL | 移動手段（徒歩/バス/車等） |
| travel_time | INT | YES | | NULL | 所要時間（分） |
| notes | VARCHAR(500) | YES | | NULL | 備考 |
| display_order | INT | NO | | 1 | 表示順 |
| created_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | YES | | NULL ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス**:
- PRIMARY KEY (id)
- INDEX idx_venue_station (venue_id, display_order)

---

### 3.5 venue_facilities（会場設備情報）

**テーブル説明**: 会場の設備・備品情報を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | BIGINT | NO | PK | AUTO_INCREMENT | 設備情報ID |
| venue_id | BIGINT | NO | FK,IDX | | 会場ID |
| facility_type_id | INT | NO | FK,IDX | | 設備タイプID |
| quantity | INT | NO | | 1 | 数量 |
| screen_size | VARCHAR(50) | YES | | NULL | スクリーンサイズ |
| is_wireless | BOOLEAN | YES | | NULL | ワイヤレス対応（マイク用） |
| notes | VARCHAR(500) | YES | | NULL | 備考 |
| created_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | YES | | NULL ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス**:
- PRIMARY KEY (id)
- INDEX idx_venue_facility (venue_id, facility_type_id)
- UNIQUE KEY uk_venue_facility (venue_id, facility_type_id)

---

### 3.5 venue_fees（会場料金情報）

**テーブル説明**: 会場の各種料金情報を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | BIGINT | NO | PK | AUTO_INCREMENT | 料金情報ID |
| venue_id | BIGINT | NO | FK,IDX | | 会場ID |
| main_venue_fee | DECIMAL(10,0) | YES | | NULL | メイン会場費用（2.5-3日） |
| control_room_fee | DECIMAL(10,0) | YES | | NULL | 控室費用（2.5-3日） |
| equipment_fee | DECIMAL(10,0) | YES | | NULL | 備品費用（2.5-3日） |
| electricity_fee | DECIMAL(10,0) | YES | | NULL | 電気代 |
| air_conditioner_fee | DECIMAL(10,0) | YES | | NULL | エアコン代 |
| garbage_fee | DECIMAL(10,0) | YES | | NULL | ゴミ処理代 |
| meal_持込_fee | DECIMAL(10,0) | YES | | NULL | 食事持込代 |
| estimated_total_fee | DECIMAL(10,0) | YES | IDX | NULL | 概算料金（2.5日/控室・備品含む） |
| fee_notes | TEXT | YES | | NULL | 料金備考 |
| created_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | YES | | NULL ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス**:
- PRIMARY KEY (id)
- INDEX idx_venue_fee (venue_id)
- INDEX idx_estimated_fee (estimated_total_fee)

---

### 3.6 venue_parking（会場駐車場情報）

**テーブル説明**: 会場の駐車場情報を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | BIGINT | NO | PK | AUTO_INCREMENT | 駐車場情報ID |
| venue_id | BIGINT | NO | FK,IDX | | 会場ID |
| parking_capacity | INT | YES | | NULL | 駐車台数 |
| parking_fee | VARCHAR(200) | YES | | NULL | 駐車料金 |
| is_free | BOOLEAN | NO | | FALSE | 無料フラグ |
| nearby_parking_info | TEXT | YES | | NULL | 周辺駐車場情報 |
| created_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | YES | | NULL ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス**:
- PRIMARY KEY (id)
- INDEX idx_venue_parking (venue_id)

---

### 3.7 venue_conditions（会場利用条件）

**テーブル説明**: 会場の予約・キャンセル条件を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | BIGINT | NO | PK | AUTO_INCREMENT | 利用条件ID |
| venue_id | BIGINT | NO | FK,IDX | | 会場ID |
| reservation_conditions | TEXT | YES | | NULL | 予約条件/仮予約条件 |
| cancellation_policy | TEXT | YES | | NULL | キャンセル料（発生条件/金額） |
| payment_terms | TEXT | YES | | NULL | 支払条件 |
| advance_reservation_days | INT | YES | | NULL | 予約可能日数（何日前から） |
| cancellation_deadline_days | INT | YES | | NULL | キャンセル期限（何日前まで） |
| created_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | YES | | NULL ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス**:
- PRIMARY KEY (id)
- INDEX idx_venue_condition (venue_id)

---

### 3.8 event_history（イベント履歴）

**テーブル説明**: 過去のイベント開催履歴を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | BIGINT | NO | PK | AUTO_INCREMENT | 履歴ID |
| venue_id | BIGINT | NO | FK,IDX | | 会場ID |
| event_name | VARCHAR(200) | NO | | | イベント名 |
| event_date | DATE | NO | IDX | | イベント開催日 |
| room_used | VARCHAR(200) | YES | | NULL | 使用部屋 |
| participant_count | INT | YES | | NULL | 参加人数 |
| notes | TEXT | YES | | NULL | 備考 |
| created_by | BIGINT | NO | FK | | 登録者ID |
| created_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | YES | | NULL ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス**:
- PRIMARY KEY (id)
- INDEX idx_venue_event (venue_id, event_date)
- INDEX idx_event_date (event_date)

---

### 3.9 users（ユーザーマスタ）

**テーブル説明**: システム利用者情報を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | BIGINT | NO | PK | AUTO_INCREMENT | ユーザーID |
| email | VARCHAR(100) | NO | UNI | | メールアドレス |
| password_hash | VARCHAR(255) | NO | | | パスワードハッシュ |
| name | VARCHAR(100) | NO | | | 氏名 |
| department | VARCHAR(100) | YES | | NULL | 所属部署 |
| phone_number | VARCHAR(20) | YES | | NULL | 電話番号 |
| is_active | BOOLEAN | NO | | TRUE | 有効フラグ |
| last_login_at | TIMESTAMP | YES | | NULL | 最終ログイン日時 |
| password_reset_token | VARCHAR(100) | YES | | NULL | パスワードリセットトークン |
| password_reset_expires | TIMESTAMP | YES | | NULL | パスワードリセット有効期限 |
| created_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | YES | | NULL ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス**:
- PRIMARY KEY (id)
- UNIQUE KEY uk_email (email)
- INDEX idx_active (is_active)

---

### 3.10 user_roles（ユーザー権限）

**テーブル説明**: ユーザーと権限の関連を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | BIGINT | NO | PK | AUTO_INCREMENT | ユーザー権限ID |
| user_id | BIGINT | NO | FK,IDX | | ユーザーID |
| role_id | INT | NO | FK,IDX | | 権限ID |
| assigned_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 割当日時 |
| assigned_by | BIGINT | NO | FK | | 割当者ID |

**インデックス**:
- PRIMARY KEY (id)
- UNIQUE KEY uk_user_role (user_id, role_id)
- INDEX idx_user (user_id)
- INDEX idx_role (role_id)

---

### 3.11 roles（権限マスタ）

**テーブル説明**: システムの権限定義を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | INT | NO | PK | AUTO_INCREMENT | 権限ID |
| role_code | VARCHAR(50) | NO | UNI | | 権限コード |
| role_name | VARCHAR(100) | NO | | | 権限名 |
| description | VARCHAR(500) | YES | | NULL | 説明 |
| permissions | JSON | YES | | NULL | 権限詳細（JSON形式） |
| is_active | BOOLEAN | NO | | TRUE | 有効フラグ |
| created_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | YES | | NULL ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス**:
- PRIMARY KEY (id)
- UNIQUE KEY uk_role_code (role_code)

---

### 3.12 audit_logs（監査ログ）

**テーブル説明**: データ更新履歴を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | BIGINT | NO | PK | AUTO_INCREMENT | ログID |
| table_name | VARCHAR(100) | NO | IDX | | テーブル名 |
| record_id | BIGINT | NO | IDX | | レコードID |
| action | ENUM('INSERT','UPDATE','DELETE') | NO | IDX | | 操作種別 |
| user_id | BIGINT | NO | FK,IDX | | 操作ユーザーID |
| ip_address | VARCHAR(45) | YES | | NULL | IPアドレス |
| user_agent | VARCHAR(500) | YES | | NULL | ユーザーエージェント |
| old_values | JSON | YES | | NULL | 変更前の値（JSON形式） |
| new_values | JSON | YES | | NULL | 変更後の値（JSON形式） |
| change_reason | VARCHAR(500) | YES | | NULL | 変更理由 |
| created_at | TIMESTAMP | NO | IDX | CURRENT_TIMESTAMP | 操作日時 |

**インデックス**:
- PRIMARY KEY (id)
- INDEX idx_table_record (table_name, record_id)
- INDEX idx_user (user_id)
- INDEX idx_action (action)
- INDEX idx_created (created_at)

---

### 3.13 prefectures（都道府県マスタ）

**テーブル説明**: 都道府県情報を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | INT | NO | PK | | 都道府県ID |
| prefecture_code | VARCHAR(2) | NO | UNI | | 都道府県コード |
| prefecture_name | VARCHAR(10) | NO | | | 都道府県名 |
| region | VARCHAR(20) | NO | IDX | | 地方区分 |
| display_order | INT | NO | | | 表示順 |

**インデックス**:
- PRIMARY KEY (id)
- UNIQUE KEY uk_prefecture_code (prefecture_code)
- INDEX idx_region (region)

---

### 3.14 facility_types（設備タイプマスタ）

**テーブル説明**: 設備の種類を管理

| カラム名 | データ型 | NULL | キー | デフォルト | 説明 |
|---------|----------|------|------|-----------|------|
| id | INT | NO | PK | AUTO_INCREMENT | 設備タイプID |
| facility_code | VARCHAR(50) | NO | UNI | | 設備コード |
| facility_name | VARCHAR(100) | NO | | | 設備名 |
| category | VARCHAR(50) | NO | IDX | | カテゴリ |
| display_order | INT | NO | | | 表示順 |
| is_active | BOOLEAN | NO | | TRUE | 有効フラグ |

**インデックス**:
- PRIMARY KEY (id)
- UNIQUE KEY uk_facility_code (facility_code)
- INDEX idx_category (category)

---


## 4. リレーションシップ

### 4.1 外部キー制約

```sql
-- venues_rooms
ALTER TABLE venues_rooms 
  ADD CONSTRAINT fk_room_venue 
  FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE;

-- venues_stations
ALTER TABLE venues_stations 
  ADD CONSTRAINT fk_station_venue 
  FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE;

-- venue_facilities
ALTER TABLE venue_facilities 
  ADD CONSTRAINT fk_facility_venue 
  FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE;
  
ALTER TABLE venue_facilities 
  ADD CONSTRAINT fk_facility_type 
  FOREIGN KEY (facility_type_id) REFERENCES facility_types(id);

-- venue_fees
ALTER TABLE venue_fees 
  ADD CONSTRAINT fk_fee_venue 
  FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE;

-- venue_parking
ALTER TABLE venue_parking 
  ADD CONSTRAINT fk_parking_venue 
  FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE;

-- venue_conditions
ALTER TABLE venue_conditions 
  ADD CONSTRAINT fk_condition_venue 
  FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE;

-- venues
ALTER TABLE venues 
  ADD CONSTRAINT fk_venue_prefecture 
  FOREIGN KEY (prefecture_id) REFERENCES prefectures(id);
  
ALTER TABLE venues 
  ADD CONSTRAINT fk_venue_created_by 
  FOREIGN KEY (created_by) REFERENCES users(id);
  
ALTER TABLE venues 
  ADD CONSTRAINT fk_venue_updated_by 
  FOREIGN KEY (updated_by) REFERENCES users(id);

-- event_history
ALTER TABLE event_history 
  ADD CONSTRAINT fk_event_venue 
  FOREIGN KEY (venue_id) REFERENCES venues(id);
  
ALTER TABLE event_history 
  ADD CONSTRAINT fk_event_user 
  FOREIGN KEY (created_by) REFERENCES users(id);

-- user_roles
ALTER TABLE user_roles 
  ADD CONSTRAINT fk_user_role_user 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  
ALTER TABLE user_roles 
  ADD CONSTRAINT fk_user_role_role 
  FOREIGN KEY (role_id) REFERENCES roles(id);
  
ALTER TABLE user_roles 
  ADD CONSTRAINT fk_user_role_assigned_by 
  FOREIGN KEY (assigned_by) REFERENCES users(id);

-- audit_logs
ALTER TABLE audit_logs 
  ADD CONSTRAINT fk_audit_user 
  FOREIGN KEY (user_id) REFERENCES users(id);
```

### 4.2 ER図概要

```
venues (1) ---- (0..n) venues_rooms
venues (1) ---- (0..n) venues_stations
venues (1) ---- (0..n) venue_facilities
venues (1) ---- (0..1) venue_fees
venues (1) ---- (0..1) venue_parking
venues (1) ---- (0..1) venue_conditions
venues (1) ---- (0..n) event_history
users (1) ---- (0..n) user_roles
roles (1) ---- (0..n) user_roles
users (1) ---- (0..n) event_history
users (1) ---- (0..n) audit_logs
prefectures (1) ---- (0..n) venues
facility_types (1) ---- (0..n) venue_facilities
```

## 5. インデックス設計方針

### 5.1 インデックス設計の基本方針
- 主キーには自動的にクラスタインデックスを作成
- 外部キーには非クラスタインデックスを作成
- 検索条件によく使用されるカラムにインデックスを作成
- 複合インデックスは使用頻度の高い順に配置

### 5.2 パフォーマンス考慮事項
- 会場名、地域、収容人数での検索が多いため、これらにインデックスを設定
- 論理削除を考慮し、is_activeとdeleted_atの複合インデックスを設定
- 監査ログは時系列での検索が多いため、created_atにインデックスを設定

## 6. データ型選定理由

### 6.1 ID系
- BIGINT: 将来的なデータ増加を考慮
- AUTO_INCREMENT: 自動採番により一意性を保証

### 6.2 文字列系
- VARCHAR: 可変長文字列で効率的なストレージ使用
- TEXT: 長文データ（備考、説明等）に使用

### 6.3 数値系
- DECIMAL: 金額、面積等の正確な数値表現が必要な項目
- INT: 整数値の項目

### 6.4 日時系
- TIMESTAMP: 作成日時、更新日時の自動記録
- DATE: 日付のみ必要な項目

### 6.5 その他
- JSON: 柔軟なデータ構造が必要な項目（権限詳細、変更履歴）
- BOOLEAN: フラグ系の項目
- ENUM: 限定された選択肢の項目

## 7. セキュリティ考慮事項

### 7.1 パスワード管理
- パスワードはハッシュ化して保存（bcrypt等を使用）
- パスワードリセットトークンには有効期限を設定

### 7.2 監査ログ
- 全ての更新操作を記録
- IPアドレス、ユーザーエージェントも記録

### 7.3 論理削除
- 物理削除ではなく論理削除を採用
- deleted_atカラムで削除状態を管理

## 8. マスタデータ初期値

### 8.1 都道府県マスタ（prefectures）
- 47都道府県のデータを事前登録

### 8.2 設備タイプマスタ（facility_types）
```sql
INSERT INTO facility_types (facility_code, facility_name, category) VALUES
('PODIUM', '演台', '基本設備'),
('WHITEBOARD', 'ホワイトボード', '基本設備'),
('SCREEN', 'スクリーン', '映像設備'),
('MIC_WIRELESS', 'ワイヤレスマイク', '音響設備'),
('MIC_WIRED', '有線マイク', '音響設備'),
('PROJECTOR_STAND', 'プロジェクター台', '映像設備'),
('PROJECTOR', 'プロジェクター', '映像設備');
```

### 8.3 権限マスタ（roles）
```sql
INSERT INTO roles (role_code, role_name, description) VALUES
('ADMIN', 'システム管理者', '全機能利用可能'),
('MANAGER', '運営管理者', '会場情報の編集可能'),
('USER', '一般利用者', '閲覧のみ可能');
```

## 9. バックアップ・リカバリ設計

### 9.1 バックアップ方針
- 日次でフルバックアップ
- 1時間ごとに差分バックアップ
- トランザクションログの定期バックアップ

### 9.2 リカバリ方針
- RPO（目標復旧時点）: 1時間以内
- RTO（目標復旧時間）: 4時間以内

## 10. 改訂履歴

| 版 | 日付 | 作成者 | 改訂内容 |
|----|------|--------|----------|
| 1.0 | 2025-09-07 | システム設計チーム | 初版作成 |