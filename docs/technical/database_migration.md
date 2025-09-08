# 防災士研修センター会場管理システム データベース移行計画書

## 1. 概要

### 1.1 目的
本書は、防災士研修センター会場管理システムのデータベースを段階的に移行する計画と手順を定義する。

### 1.2 移行フェーズ
1. **フェーズ1**: Excel → JSON
2. **フェーズ2**: JSON → SQLite
3. **フェーズ3**: SQLite → PostgreSQL

### 1.3 移行スケジュール
- フェーズ1: 1週間（プロトタイプ開発）
- フェーズ2: 2週間（開発環境構築）
- フェーズ3: 1週間（本番環境移行）

## 2. フェーズ1: Excel → JSON

### 2.1 現状分析

#### 既存Excelファイル構成
```
venue_data/
├── 会場一覧.xlsx
├── 部屋情報.xlsx
├── 料金表.xlsx
└── 利用履歴.xlsx
```

#### データ量
- 会場数: 約200件
- 部屋数: 約500件
- 履歴: 約1000件

### 2.2 JSON構造設計

#### venues.json
```json
{
  "venues": [
    {
      "id": 1,
      "venue_no": "V001",
      "venue_name": "東京国際フォーラム",
      "prefecture_id": 13,
      "address": "東京都千代田区丸の内3-5-1",
      "postal_code": "100-0005",
      "phone_number": "03-5221-9000",
      "email": "info@t-i-forum.co.jp",
      "rooms": [
        {
          "room_name": "ホールA",
          "capacity": 5000,
          "ceiling_height": 7.5
        }
      ],
      "stations": [
        {
          "station_name": "有楽町駅",
          "line_name": "JR山手線",
          "time_minutes": 1
        }
      ]
    }
  ]
}
```

### 2.3 変換スクリプト

#### Python実装例
```python
import pandas as pd
import json
from datetime import datetime

def excel_to_json():
    # Excelファイル読み込み
    df_venues = pd.read_excel('会場一覧.xlsx')
    df_rooms = pd.read_excel('部屋情報.xlsx')
    
    # データ整形
    venues = []
    for idx, row in df_venues.iterrows():
        venue = {
            'id': idx + 1,
            'venue_no': row['会場番号'],
            'venue_name': row['施設名'],
            'address': row['住所'],
            'rooms': []
        }
        
        # 関連する部屋情報を追加
        room_data = df_rooms[df_rooms['会場番号'] == row['会場番号']]
        for _, room in room_data.iterrows():
            venue['rooms'].append({
                'room_name': room['部屋名'],
                'capacity': int(room['収容人数'])
            })
        
        venues.append(venue)
    
    # JSON出力
    with open('venues.json', 'w', encoding='utf-8') as f:
        json.dump({'venues': venues}, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    excel_to_json()
```

### 2.4 データ検証

#### 検証項目
- [ ] データ件数の一致
- [ ] 必須項目の存在
- [ ] データ型の正確性
- [ ] 文字化けの確認
- [ ] 関連データの整合性

## 3. フェーズ2: JSON → SQLite

### 3.1 SQLiteデータベース設計

#### データベースファイル
```
data/venue_management.db
```

#### テーブル作成SQL
```sql
-- 会場テーブル
CREATE TABLE venues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    venue_no TEXT UNIQUE,
    venue_name TEXT NOT NULL,
    prefecture_id INTEGER,
    address TEXT NOT NULL,
    postal_code TEXT,
    phone_number TEXT NOT NULL,
    email TEXT,
    contact_person TEXT,
    official_url TEXT,
    reservation_url TEXT,
    google_map_url TEXT,
    can_eat_drink INTEGER,
    can_wear_shoes INTEGER,
    is_earthquake_resistant INTEGER,
    operating_hours TEXT,
    can_receive_package INTEGER,
    package_receiver TEXT,
    notes TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- 部屋テーブル
CREATE TABLE venues_rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    venue_id INTEGER NOT NULL,
    room_name TEXT NOT NULL,
    ceiling_height REAL,
    floor_area REAL,
    desk_count INTEGER,
    chair_count INTEGER,
    capacity INTEGER NOT NULL,
    has_control_room INTEGER DEFAULT 0,
    control_room_name TEXT,
    is_main_room INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (venue_id) REFERENCES venues(id)
);

-- 最寄り駅テーブル
CREATE TABLE venues_stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    venue_id INTEGER NOT NULL,
    station_name TEXT NOT NULL,
    line_name TEXT,
    transport_method TEXT,
    time_minutes INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (venue_id) REFERENCES venues(id)
);

-- インデックス作成
CREATE INDEX idx_venues_name ON venues(venue_name);
CREATE INDEX idx_venues_prefecture ON venues(prefecture_id);
CREATE INDEX idx_rooms_venue ON venues_rooms(venue_id);
CREATE INDEX idx_stations_venue ON venues_stations(venue_id);
```

### 3.2 移行スクリプト

#### Python実装（SQLAlchemy使用）
```python
import json
import sqlite3
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

Base = declarative_base()

class Venue(Base):
    __tablename__ = 'venues'
    
    id = Column(Integer, primary_key=True)
    venue_no = Column(String, unique=True)
    venue_name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    # ... その他のカラム
    
    rooms = relationship("VenueRoom", back_populates="venue")
    stations = relationship("VenueStation", back_populates="venue")

class VenueRoom(Base):
    __tablename__ = 'venues_rooms'
    
    id = Column(Integer, primary_key=True)
    venue_id = Column(Integer, ForeignKey('venues.id'))
    room_name = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)
    
    venue = relationship("Venue", back_populates="rooms")

def json_to_sqlite():
    # データベース接続
    engine = create_engine('sqlite:///venue_management.db')
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    
    # JSONファイル読み込み
    with open('venues.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # データ投入
    for venue_data in data['venues']:
        venue = Venue(
            venue_no=venue_data.get('venue_no'),
            venue_name=venue_data['venue_name'],
            address=venue_data['address']
        )
        
        # 部屋情報追加
        for room_data in venue_data.get('rooms', []):
            room = VenueRoom(
                room_name=room_data['room_name'],
                capacity=room_data['capacity']
            )
            venue.rooms.append(room)
        
        session.add(venue)
    
    session.commit()
    session.close()

if __name__ == '__main__':
    json_to_sqlite()
```

### 3.3 データ検証

#### 検証スクリプト
```python
def verify_migration():
    conn = sqlite3.connect('venue_management.db')
    cursor = conn.cursor()
    
    # 件数確認
    cursor.execute("SELECT COUNT(*) FROM venues")
    venue_count = cursor.fetchone()[0]
    print(f"会場数: {venue_count}")
    
    cursor.execute("SELECT COUNT(*) FROM venues_rooms")
    room_count = cursor.fetchone()[0]
    print(f"部屋数: {room_count}")
    
    # データサンプル確認
    cursor.execute("SELECT * FROM venues LIMIT 5")
    for row in cursor.fetchall():
        print(row)
    
    conn.close()
```

## 4. フェーズ3: SQLite → PostgreSQL

### 4.1 PostgreSQL環境準備

#### Replit設定
```python
# .env
DATABASE_URL=postgresql://user:password@host:5432/venue_management_db
```

#### データベース作成
```sql
CREATE DATABASE venue_management_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'ja_JP.UTF-8'
    LC_CTYPE = 'ja_JP.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```

### 4.2 スキーマ変換

#### SQLite → PostgreSQL型変換
| SQLite | PostgreSQL |
|--------|------------|
| INTEGER | BIGINT/INTEGER |
| TEXT | VARCHAR/TEXT |
| REAL | DECIMAL/FLOAT |
| BLOB | BYTEA |
| TIMESTAMP | TIMESTAMP WITH TIME ZONE |

#### PostgreSQL用DDL
```sql
-- 会場テーブル
CREATE TABLE venues (
    id BIGSERIAL PRIMARY KEY,
    venue_no VARCHAR(20) UNIQUE,
    venue_name VARCHAR(200) NOT NULL,
    prefecture_id INTEGER,
    address VARCHAR(500) NOT NULL,
    postal_code VARCHAR(10),
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    contact_person VARCHAR(100),
    official_url VARCHAR(500),
    reservation_url VARCHAR(500),
    google_map_url VARCHAR(500),
    can_eat_drink BOOLEAN,
    can_wear_shoes BOOLEAN,
    is_earthquake_resistant BOOLEAN,
    operating_hours VARCHAR(200),
    can_receive_package BOOLEAN,
    package_receiver VARCHAR(100),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- シーケンス設定
ALTER SEQUENCE venues_id_seq RESTART WITH 1000;
```

### 4.3 データ移行スクリプト

#### pg_dump/pg_restore方式
```bash
# SQLiteからCSVエクスポート
sqlite3 venue_management.db <<EOF
.headers on
.mode csv
.output venues.csv
SELECT * FROM venues;
.output rooms.csv
SELECT * FROM venues_rooms;
EOF

# PostgreSQLへインポート
psql -d venue_management_db <<EOF
\copy venues FROM 'venues.csv' WITH CSV HEADER;
\copy venues_rooms FROM 'rooms.csv' WITH CSV HEADER;
EOF
```

#### Python実装（SQLAlchemy使用）
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

def sqlite_to_postgresql():
    # 接続設定
    sqlite_engine = create_engine('sqlite:///venue_management.db')
    pg_engine = create_engine(os.environ['DATABASE_URL'])
    
    # セッション作成
    SqliteSession = sessionmaker(bind=sqlite_engine)
    PgSession = sessionmaker(bind=pg_engine)
    
    sqlite_session = SqliteSession()
    pg_session = PgSession()
    
    # データ移行
    venues = sqlite_session.query(Venue).all()
    for venue in venues:
        # 新しいインスタンス作成
        new_venue = Venue()
        for column in venue.__table__.columns:
            setattr(new_venue, column.name, getattr(venue, column.name))
        
        pg_session.add(new_venue)
    
    pg_session.commit()
    
    # セッション終了
    sqlite_session.close()
    pg_session.close()

if __name__ == '__main__':
    sqlite_to_postgresql()
```

### 4.4 移行後の検証

#### 検証チェックリスト
```python
def verify_postgresql_migration():
    import psycopg2
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = conn.cursor()
    
    checks = []
    
    # 1. テーブル存在確認
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
    """)
    tables = cursor.fetchall()
    checks.append(('テーブル数', len(tables)))
    
    # 2. レコード数確認
    for table in ['venues', 'venues_rooms', 'venues_stations']:
        cursor.execute(f"SELECT COUNT(*) FROM {table}")
        count = cursor.fetchone()[0]
        checks.append((f'{table}レコード数', count))
    
    # 3. 制約確認
    cursor.execute("""
        SELECT constraint_name, constraint_type
        FROM information_schema.table_constraints
        WHERE table_schema = 'public'
    """)
    constraints = cursor.fetchall()
    checks.append(('制約数', len(constraints)))
    
    # 結果出力
    for check_name, result in checks:
        print(f"✓ {check_name}: {result}")
    
    conn.close()
```

## 5. ロールバック計画

### 5.1 バックアップ戦略

#### 各フェーズのバックアップ
```bash
# JSON バックアップ
cp venues.json venues_backup_$(date +%Y%m%d).json

# SQLite バックアップ
sqlite3 venue_management.db ".backup venue_backup_$(date +%Y%m%d).db"

# PostgreSQL バックアップ
pg_dump venue_management_db > venue_backup_$(date +%Y%m%d).sql
```

### 5.2 ロールバック手順

#### PostgreSQL → SQLite
```bash
# バックアップからリストア
sqlite3 venue_management.db < venue_backup.sql
```

#### SQLite → JSON
```python
def sqlite_to_json_rollback():
    conn = sqlite3.connect('venue_management.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM venues")
    venues = []
    for row in cursor.fetchall():
        venue = {
            'id': row[0],
            'venue_name': row[2],
            'address': row[4]
        }
        venues.append(venue)
    
    with open('venues_rollback.json', 'w') as f:
        json.dump({'venues': venues}, f, ensure_ascii=False, indent=2)
```

## 6. パフォーマンス最適化

### 6.1 インデックス戦略

#### 推奨インデックス
```sql
-- 検索用インデックス
CREATE INDEX idx_venues_name_gin ON venues USING gin(to_tsvector('japanese', venue_name));
CREATE INDEX idx_venues_address ON venues(address);
CREATE INDEX idx_venues_prefecture ON venues(prefecture_id);

-- 結合用インデックス
CREATE INDEX idx_rooms_venue_id ON venues_rooms(venue_id);
CREATE INDEX idx_stations_venue_id ON venues_stations(venue_id);

-- 複合インデックス
CREATE INDEX idx_venues_active_prefecture ON venues(is_active, prefecture_id);
```

### 6.2 クエリ最適化

#### EXPLAIN ANALYZE使用
```sql
EXPLAIN ANALYZE
SELECT v.*, r.room_name, r.capacity
FROM venues v
LEFT JOIN venues_rooms r ON v.id = r.venue_id
WHERE v.prefecture_id = 13
  AND v.is_active = true
ORDER BY v.venue_name;
```

## 7. データ整合性確保

### 7.1 制約定義

#### 外部キー制約
```sql
ALTER TABLE venues_rooms
ADD CONSTRAINT fk_room_venue
FOREIGN KEY (venue_id) REFERENCES venues(id)
ON DELETE CASCADE;
```

#### チェック制約
```sql
ALTER TABLE venues
ADD CONSTRAINT chk_capacity CHECK (capacity > 0);

ALTER TABLE venues_rooms
ADD CONSTRAINT chk_ceiling_height CHECK (ceiling_height > 0);
```

### 7.2 トリガー設定

#### 更新日時自動設定
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER venues_updated_at
BEFORE UPDATE ON venues
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
```

## 8. 移行テスト計画

### 8.1 単体テスト
- データ型変換テスト
- NULL値処理テスト
- 文字エンコーディングテスト

### 8.2 統合テスト
- API経由のCRUDテスト
- トランザクションテスト
- 同時アクセステスト

### 8.3 性能テスト
- 大量データ投入テスト
- クエリ性能テスト
- インデックス効果測定

## 9. 運用切り替え

### 9.1 切り替えスケジュール
1. メンテナンス告知（3日前）
2. データ最終バックアップ
3. 移行実施（深夜）
4. 動作確認
5. サービス再開

### 9.2 切り替えチェックリスト
- [ ] バックアップ完了
- [ ] 移行スクリプト準備
- [ ] 接続設定更新
- [ ] アプリケーション設定変更
- [ ] 動作確認完了
- [ ] ロールバック準備

## 10. トラブルシューティング

### 10.1 よくある問題と対処

#### 文字化け
```python
# UTF-8エンコーディング指定
conn = psycopg2.connect(
    database="venue_management_db",
    options="-c client_encoding=UTF8"
)
```

#### 接続エラー
```python
# リトライロジック
import time

def connect_with_retry(max_retries=3):
    for i in range(max_retries):
        try:
            return psycopg2.connect(DATABASE_URL)
        except Exception as e:
            if i == max_retries - 1:
                raise
            time.sleep(2 ** i)
```

## 11. 監視項目

### 11.1 移行中の監視
- CPU使用率
- メモリ使用量
- ディスクI/O
- ネットワークトラフィック

### 11.2 移行後の監視
- クエリ実行時間
- エラー発生率
- データ整合性
- バックアップ状況

## 12. ドキュメント更新

### 12.1 更新対象
- [ ] API仕様書
- [ ] データベース設計書
- [ ] 運用手順書
- [ ] 環境構築手順書

## 13. 改訂履歴

| 版 | 日付 | 作成者 | 改訂内容 |
|----|------|--------|----------|
| 1.0 | 2025-09-07 | システム設計チーム | 初版作成 |