# 防災士研修センター会場管理システム 技術スタック詳細

## 1. 概要
本書は、防災士研修センター会場管理システムで使用する技術スタックの詳細仕様と選定理由を記載する。

## 2. フロントエンド技術スタック

### 2.1 コア技術

#### React 18.x
- **選定理由**
  - コンポーネントベース開発による再利用性
  - 大規模なエコシステムとコミュニティ
  - Virtual DOMによる高速レンダリング
  - Atomic Designとの相性
- **バージョン**: 18.2.0以上
- **ライセンス**: MIT

#### TypeScript (オプション)
- **選定理由**
  - 型安全性の確保
  - IDE支援の向上
  - バグの早期発見
- **バージョン**: 5.0以上
- **導入時期**: フェーズ2以降

### 2.2 UIフレームワーク

#### Atomic Design
- **選定理由**
  - コンポーネントの階層的管理
  - デザインシステムの確立
  - 100%カスタムコンポーネント
- **構成要素**
  ```
  Atoms → Molecules → Organisms → Templates → Pages
  ```

### 2.3 スタイリング

#### CSS Modules
- **選定理由**
  - スコープの分離
  - クラス名の衝突回避
  - 学習コストの低さ
- **ファイル命名**: `Component.module.css`

#### Styled Components (部分採用)
- **選定理由**
  - 動的スタイリング
  - テーマ管理
  - プロップスベースのスタイル
- **バージョン**: 6.0以上

### 2.4 状態管理

#### React Context API
- **選定理由**
  - React標準機能
  - 小規模アプリに最適
  - 追加ライブラリ不要
- **用途**: グローバル状態管理

#### Redux Toolkit (オプション)
- **選定理由**
  - 予測可能な状態管理
  - デバッグツール充実
  - 大規模化対応
- **導入時期**: 必要に応じて

### 2.5 ルーティング

#### React Router v6
- **選定理由**
  - React標準のルーティング
  - ネストルーティング対応
  - 型安全性（TypeScript使用時）
- **バージョン**: 6.10以上

### 2.6 ビルドツール

#### Vite
- **選定理由**
  - 高速な開発サーバー
  - HMR（Hot Module Replacement）
  - ESModules対応
  - 設定の簡潔さ
- **バージョン**: 4.0以上

### 2.7 HTTPクライアント

#### Axios
- **選定理由**
  - Promise ベース
  - インターセプター機能
  - リクエスト/レスポンス変換
  - エラーハンドリング
- **バージョン**: 1.4以上

### 2.8 フォーム管理

#### React Hook Form
- **選定理由**
  - パフォーマンス最適化
  - 簡潔なAPI
  - バリデーション統合
- **バージョン**: 7.40以上

### 2.9 テストツール

#### Jest + React Testing Library
- **選定理由**
  - React公式推奨
  - ユーザー視点のテスト
  - スナップショットテスト
- **バージョン**: Jest 29以上

## 3. バックエンド技術スタック

### 3.1 コア技術

#### Python 3.9+
- **選定理由**
  - 豊富なライブラリ
  - AI/ML統合の容易さ
  - 高い生産性
  - 型ヒント対応
- **バージョン**: 3.9.0以上

#### FastAPI
- **選定理由**
  - 高速な非同期処理
  - 自動APIドキュメント生成
  - Pydanticによる型検証
  - OpenAPI準拠
- **バージョン**: 0.100以上

### 3.2 ASGIサーバー

#### Uvicorn
- **選定理由**
  - FastAPI推奨
  - 高速な非同期サーバー
  - WebSocket対応
- **バージョン**: 0.23以上

### 3.3 ORM

#### SQLAlchemy
- **選定理由**
  - Python標準的ORM
  - 複数DB対応
  - 強力なクエリビルダー
- **バージョン**: 2.0以上

### 3.4 データベースマイグレーション

#### Alembic
- **選定理由**
  - SQLAlchemy統合
  - バージョン管理
  - ロールバック対応
- **バージョン**: 1.11以上

### 3.5 バリデーション

#### Pydantic
- **選定理由**
  - FastAPI統合
  - 型ベースバリデーション
  - JSONスキーマ生成
- **バージョン**: 2.0以上

### 3.6 認証・セキュリティ

#### python-jose
- **選定理由**
  - JWT実装
  - 暗号化対応
  - FastAPI統合
- **バージョン**: 3.3以上

#### passlib
- **選定理由**
  - パスワードハッシュ化
  - bcrypt対応
  - セキュアな実装
- **バージョン**: 1.7以上

### 3.7 非同期処理

#### asyncio
- **選定理由**
  - Python標準ライブラリ
  - FastAPI完全対応
  - 高速な非同期処理

#### httpx
- **選定理由**
  - 非同期HTTPクライアント
  - requests互換API
  - HTTP/2対応
- **バージョン**: 0.24以上

### 3.8 テストツール

#### pytest
- **選定理由**
  - Python標準テストツール
  - 豊富なプラグイン
  - FastAPI統合
- **バージョン**: 7.3以上

#### pytest-asyncio
- **選定理由**
  - 非同期テスト対応
  - FastAPIテスト必須
- **バージョン**: 0.21以上

## 4. データベース技術

### 4.1 フェーズ1: JSON

#### 構成
```json
{
  "format": "JSON",
  "encoding": "UTF-8",
  "structure": "階層型"
}
```

### 4.2 フェーズ2: SQLite

#### SQLite 3.35+
- **選定理由**
  - ゼロコンフィグレーション
  - ファイルベースDB
  - 高速動作
  - 開発環境最適
- **ファイル**: `venue_management.db`

### 4.3 フェーズ3: PostgreSQL

#### PostgreSQL 13+
- **選定理由**
  - 本番環境標準
  - ACID準拠
  - JSON対応
  - Replit Database対応
- **接続**: Replit Database URL

## 5. AI/ML技術

### 5.1 OpenAI API

#### GPT-4
- **選定理由**
  - 高精度テキスト解析
  - 多言語対応
  - 構造化データ抽出
- **用途**
  - 会場情報の自動抽出
  - テキスト分類
  - 情報整理

#### 実装例
```python
from openai import OpenAI

client = OpenAI(api_key="...")
response = client.chat.completions.create(
    model="gpt-4",
    messages=[...],
    temperature=0.3
)
```

## 6. 外部サービス

### 6.1 地図サービス

#### Google Maps API
- **選定理由**
  - 高精度地図データ
  - 豊富なAPI機能
  - 日本国内対応充実
- **利用API**
  - Geocoding API
  - Maps JavaScript API
  - Places API

### 6.2 メール送信

#### SendGrid
- **選定理由**
  - 高い到達率
  - 詳細な分析
  - API対応
- **用途**
  - 通知メール
  - パスワードリセット

### 6.3 郵便番号

#### 日本郵便 郵便番号API
- **選定理由**
  - 公式データ
  - 無料利用
  - 定期更新

## 7. 開発ツール

### 7.1 コードエディタ
- **VS Code**: 推奨エディタ
- **拡張機能**
  - Python
  - ESLint
  - Prettier
  - React snippets

### 7.2 バージョン管理
- **Git**: バージョン管理
- **GitHub**: リポジトリホスティング

### 7.3 API開発
- **Postman**: APIテスト
- **Swagger UI**: APIドキュメント

### 7.4 データベース管理
- **DBeaver**: GUI管理ツール
- **pgAdmin**: PostgreSQL管理

## 8. デプロイメント

### 8.1 Replit

#### 構成
```yaml
platform: Replit
plan: Hacker
database: PostgreSQL
storage: 10GB
memory: 2GB
```

### 8.2 将来: AWS

#### 構成案
```yaml
compute: EC2 t3.medium
database: RDS PostgreSQL
storage: S3
cdn: CloudFront
dns: Route53
```

## 9. パッケージ管理

### 9.1 フロントエンド
```json
{
  "packageManager": "npm",
  "lockFile": "package-lock.json",
  "nodeVersion": "18.x"
}
```

### 9.2 バックエンド
```toml
[tool.poetry]
python = "^3.9"
# または
requirements.txt + pip
```

## 10. カラーパレット

### 10.1 プライマリカラー（防災グリーン）
```css
:root {
  --color-primary-100: #E8F5E9;
  --color-primary-200: #C8E6C9;
  --color-primary-300: #A5D6A7;
  --color-primary-400: #81C784;
  --color-primary-500: #4CAF50;
  --color-primary-600: #43A047;
  --color-primary-700: #388E3C;
  --color-primary-800: #2E7D32;
  --color-primary-900: #1B5E20;
}
```

### 10.2 セカンダリカラー（信頼ブルー）
```css
:root {
  --color-secondary-100: #E3F2FD;
  --color-secondary-200: #BBDEFB;
  --color-secondary-300: #90CAF9;
  --color-secondary-400: #64B5F6;
  --color-secondary-500: #2196F3;
  --color-secondary-600: #1E88E5;
  --color-secondary-700: #1976D2;
  --color-secondary-800: #1565C0;
  --color-secondary-900: #0D47A1;
}
```

## 11. 技術選定の基準

### 11.1 評価項目
1. **学習コスト**: チームの習熟度
2. **コミュニティ**: サポート体制
3. **パフォーマンス**: 処理速度
4. **保守性**: 長期メンテナンス
5. **拡張性**: 将来の機能追加
6. **コスト**: ライセンス費用

### 11.2 選定プロセス
1. 要件分析
2. 技術調査
3. プロトタイプ検証
4. 最終決定

## 12. ライセンス情報

### 12.1 オープンソース
- **React**: MIT License
- **FastAPI**: MIT License
- **PostgreSQL**: PostgreSQL License

### 12.2 商用サービス
- **OpenAI API**: 従量課金
- **Google Maps**: 従量課金
- **SendGrid**: 従量課金

## 13. アップデート方針

### 13.1 セキュリティアップデート
- **頻度**: 即時対応
- **対象**: セキュリティパッチ

### 13.2 機能アップデート
- **頻度**: 四半期ごと
- **対象**: メジャーバージョン

### 13.3 依存関係管理
- **ツール**: Dependabot
- **自動化**: GitHub Actions

## 14. 参考資料
- [React Documentation](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 15. 改訂履歴

| 版 | 日付 | 作成者 | 改訂内容 |
|----|------|--------|----------|
| 1.0 | 2025-09-07 | システム設計チーム | 初版作成 |