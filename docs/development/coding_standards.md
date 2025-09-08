# 防災士研修センター会場管理システム コーディング規約書

## 1. 文書概要

### 1.1 文書の目的
本文書は、防災士研修センター会場管理システムの開発におけるコーディング規約を定義する。
React（フロントエンド）とPython FastAPI（バックエンド）における統一されたコーディング標準を確立し、
保守性・可読性・品質の向上を図る。

### 1.2 適用範囲
- React フロントエンドコード（TypeScript/JavaScript、CSS、HTML）
- Python バックエンドコード（FastAPI、SQLAlchemy、Pydantic）
- 設定ファイル（JSON、YAML、環境変数）
- ドキュメント（README、API仕様書）

### 1.3 関連文書
- デザインシステム・CSS設計書（style_guide.md）
- Atomicデザイン設計（atomic_design.md）
- システムアーキテクチャ（architecture.md）

## 2. 全般的なルール

### 2.1 基本原則
1. **可読性優先**: コードは書くより読まれる回数の方が多い
2. **一貫性**: プロジェクト全体で統一されたスタイル
3. **明確性**: 曖昧さを避け、意図が明確なコード
4. **シンプルさ**: 複雑さより単純さを重視
5. **保守性**: 将来の変更・拡張を考慮

### 2.2 文字エンコーディング・改行
```
文字エンコーディング: UTF-8
改行コード: LF (Unix形式)
インデント: スペース（2スペース）
行末の空白: 削除
ファイル末尾: 改行で終了
```

### 2.3 ファイル・ディレクトリ命名規則
```bash
# ディレクトリ: kebab-case
src/components/venue-form/
src/utils/date-helpers/

# Reactコンポーネントファイル: PascalCase
VenueCard.tsx
SearchForm.tsx

# その他のファイル: kebab-case
api-client.ts
user-service.ts
venue-types.ts

# Python: snake_case
venue_repository.py
user_service.py
database_models.py
```

### 2.4 コメント基本ルール
```javascript
// ✅ Good: 何をしているかではなく、なぜしているかを説明
// 検索結果が空の場合、初期状態にリセットして再検索を促す
if (searchResults.length === 0) {
  resetSearchForm();
}

// ❌ Bad: コードを繰り返しているだけ
// searchResultsの長さが0の場合
if (searchResults.length === 0) {
  resetSearchForm();
}
```

## 3. React/TypeScript コーディング規約

### 3.1 プロジェクト構成
```
src/
├── components/           # コンポーネント（Atomic Design）
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── pages/               # ページコンポーネント
├── hooks/               # カスタムフック
├── services/            # API呼び出し・ビジネスロジック
├── types/               # TypeScript型定義
├── utils/               # ユーティリティ関数
├── constants/           # 定数
├── styles/              # スタイル定義
└── __tests__/           # テストファイル
```

### 3.2 TypeScript設定

#### 3.2.1 型定義の基本
```typescript
// ✅ 明確な型定義
interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number;
  rooms: Room[];
  facilities: Facility[];
  contact: ContactInfo;
  createdAt: Date;
  updatedAt: Date;
}

interface VenueFormData {
  name: string;
  address: string;
  phone: string;
  email?: string; // オプショナル
}

// ✅ Unionタイプの活用
type VenueStatus = 'active' | 'inactive' | 'pending';
type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

// ❌ Bad: any型の使用
interface BadVenue {
  id: string;
  data: any; // 避ける
}
```

#### 3.2.2 ジェネリクスの活用
```typescript
// ✅ 再利用可能なジェネリック型
interface ApiResult<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

interface ListResponse<T> {
  items: T[];
  totalCount: number;
}

// 使用例
const venues: ApiResult<Venue[]> = await fetchVenues();
const users: ListResponse<User> = await fetchUsers();
```

### 3.3 Reactコンポーネント設計

#### 3.3.1 コンポーネント定義
```typescript
// ✅ 関数コンポーネント（推奨）
interface VenueCardProps {
  venue: Venue;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export const VenueCard: React.FC<VenueCardProps> = ({ 
  venue, 
  onEdit, 
  onDelete, 
  className 
}) => {
  return (
    <div className={`venue-card ${className || ''}`}>
      <h3>{venue.name}</h3>
      <p>{venue.address}</p>
      <div className="venue-card__actions">
        {onEdit && (
          <button onClick={() => onEdit(venue.id)}>
            編集
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(venue.id)}>
            削除
          </button>
        )}
      </div>
    </div>
  );
};

// ✅ デフォルトプロパティ
VenueCard.defaultProps = {
  className: '',
};
```

#### 3.3.2 Hooksの使用
```typescript
// ✅ カスタムフック
export const useVenueSearch = (initialFilters?: SearchFilters) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(
    initialFilters || defaultFilters
  );

  const searchVenues = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await venueService.search(filters);
      setVenues(results.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '検索エラー');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    searchVenues();
  }, [searchVenues]);

  return {
    venues,
    loading,
    error,
    filters,
    setFilters,
    searchVenues,
  };
};

// ✅ カスタムフックの使用
export const VenueSearchPage: React.FC = () => {
  const { 
    venues, 
    loading, 
    error, 
    filters, 
    setFilters 
  } = useVenueSearch();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <SearchForm 
        filters={filters} 
        onFiltersChange={setFilters} 
      />
      <VenueList venues={venues} />
    </div>
  );
};
```

#### 3.3.3 状態管理
```typescript
// ✅ useState（ローカル状態）
const [formData, setFormData] = useState<VenueFormData>({
  name: '',
  address: '',
  phone: '',
});

// ✅ useReducer（複雑な状態）
interface VenueState {
  venues: Venue[];
  selectedVenue: Venue | null;
  filters: SearchFilters;
  loading: boolean;
  error: string | null;
}

type VenueAction = 
  | { type: 'SET_VENUES'; payload: Venue[] }
  | { type: 'SELECT_VENUE'; payload: Venue }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const venueReducer = (state: VenueState, action: VenueAction): VenueState => {
  switch (action.type) {
    case 'SET_VENUES':
      return { ...state, venues: action.payload, loading: false };
    case 'SELECT_VENUE':
      return { ...state, selectedVenue: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
```

### 3.4 イベントハンドリング

#### 3.4.1 フォームハンドリング
```typescript
// ✅ React Hook Form推奨
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const venueSchema = yup.object({
  name: yup.string().required('会場名は必須です'),
  address: yup.string().required('住所は必須です'),
  phone: yup.string().matches(/^[0-9-]+$/, '正しい電話番号を入力してください'),
  capacity: yup.number().min(1, '収容人数は1以上で入力してください'),
});

export const VenueForm: React.FC<VenueFormProps> = ({ 
  onSubmit, 
  defaultValues 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<VenueFormData>({
    resolver: yupResolver(venueSchema),
    defaultValues,
  });

  const onSubmitForm = async (data: VenueFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('保存エラー:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="form-field">
        <label htmlFor="name">会場名 *</label>
        <input 
          id="name"
          type="text" 
          {...register('name')} 
          className={errors.name ? 'error' : ''}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '保存中...' : '保存'}
      </button>
    </form>
  );
};
```

### 3.5 エラーハンドリング
```typescript
// ✅ エラーバウンダリ
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // エラー報告サービスに送信
    // reportError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>申し訳ございません。エラーが発生しました。</h2>
          <details>
            <summary>エラー詳細</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            リトライ
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 3.6 APIクライアント
```typescript
// ✅ APIクライアントの実装
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API request failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // GET
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint);
  }

  // POST
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT
  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// APIサービス
export class VenueService {
  constructor(private apiClient: ApiClient) {}

  async getVenues(filters?: SearchFilters): Promise<Venue[]> {
    const queryParams = filters ? new URLSearchParams(filters).toString() : '';
    const endpoint = `/venues${queryParams ? `?${queryParams}` : ''}`;
    
    const response = await this.apiClient.get<Venue[]>(endpoint);
    if (!response.success) {
      throw new Error(response.error);
    }
    
    return response.data;
  }

  async getVenue(id: string): Promise<Venue> {
    const response = await this.apiClient.get<Venue>(`/venues/${id}`);
    if (!response.success) {
      throw new Error(response.error);
    }
    
    return response.data;
  }

  async createVenue(venue: CreateVenueRequest): Promise<Venue> {
    const response = await this.apiClient.post<Venue>('/venues', venue);
    if (!response.success) {
      throw new Error(response.error);
    }
    
    return response.data;
  }
}
```

## 4. Python/FastAPI コーディング規約

### 4.1 プロジェクト構成
```
backend/
├── app/
│   ├── api/                 # API エンドポイント
│   │   └── endpoints/
│   ├── core/                # 核となる設定・機能
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   ├── models/              # SQLAlchemy モデル
│   ├── schemas/             # Pydantic スキーマ
│   ├── services/            # ビジネスロジック
│   ├── repositories/        # データアクセス層
│   ├── utils/               # ユーティリティ
│   └── main.py             # アプリケーション エントリーポイント
├── tests/                   # テスト
├── migrations/              # DB マイグレーション
└── requirements.txt         # 依存関係
```

### 4.2 Python基本規約

#### 4.2.1 PEP 8 準拠
```python
# ✅ 命名規約
class VenueService:  # PascalCase
    pass

def get_venue_by_id(venue_id: str) -> Venue:  # snake_case
    pass

VENUE_STATUS_ACTIVE = "active"  # UPPER_CASE（定数）

# ✅ インデント・行の長さ
def create_venue(
    venue_data: VenueCreate,
    current_user: User,
    db: Session = Depends(get_db)
) -> Venue:
    """
    新しい会場を作成する
    
    Args:
        venue_data: 会場作成データ
        current_user: 現在のユーザー
        db: データベースセッション
        
    Returns:
        作成された会場情報
        
    Raises:
        VenueAlreadyExistsError: 同名の会場が既に存在する場合
    """
    # 実装
    pass
```

#### 4.2.2 型ヒント
```python
from typing import Optional, List, Dict, Union, Any
from datetime import datetime
from uuid import UUID

# ✅ 関数の型ヒント
def get_venues(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    filters: Optional[VenueFilters] = None
) -> List[Venue]:
    """会場一覧を取得"""
    pass

def search_venues(
    query: str,
    filters: Dict[str, Any]
) -> List[Dict[str, Union[str, int, float]]]:
    """会場検索"""
    pass

# ✅ クラスの型ヒント
class VenueRepository:
    def __init__(self, db: Session) -> None:
        self.db = db
    
    def find_by_id(self, venue_id: UUID) -> Optional[Venue]:
        """IDで会場を検索"""
        return self.db.query(Venue).filter(Venue.id == venue_id).first()
    
    def find_all(
        self, 
        filters: Optional[VenueFilters] = None
    ) -> List[Venue]:
        """条件に一致する会場を全て取得"""
        query = self.db.query(Venue)
        
        if filters:
            if filters.name:
                query = query.filter(Venue.name.contains(filters.name))
            if filters.prefecture:
                query = query.filter(Venue.prefecture == filters.prefecture)
                
        return query.all()
```

### 4.3 FastAPI アプリケーション構造

#### 4.3.1 メイン アプリケーション
```python
# app/main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.security import HTTPBearer

from app.core.config import settings
from app.core.database import engine
from app.api.api_v1.api import api_router
from app.models.base import Base

# データベーステーブル作成
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="防災士研修センター会場管理システム API",
    description="会場情報管理のためのREST API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# セキュリティ設定
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS
)

# API ルーター
app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    """ヘルスチェック"""
    return {"status": "healthy"}
```

#### 4.3.2 API エンドポイント
```python
# app/api/endpoints/venues.py
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.venue_service import VenueService
from app.schemas.venue import (
    Venue as VenueSchema,
    VenueCreate,
    VenueUpdate,
    VenueSearchFilters
)
from app.models.user import User
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[VenueSchema])
async def get_venues(
    skip: int = Query(0, ge=0, description="スキップ件数"),
    limit: int = Query(100, ge=1, le=1000, description="取得件数上限"),
    name: Optional[str] = Query(None, description="会場名での絞り込み"),
    prefecture: Optional[str] = Query(None, description="都道府県での絞り込み"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    会場一覧を取得
    
    - **skip**: スキップする件数（ページネーション）
    - **limit**: 取得する件数の上限
    - **name**: 会場名での部分一致検索
    - **prefecture**: 都道府県での完全一致検索
    """
    service = VenueService(db)
    filters = VenueSearchFilters(
        name=name,
        prefecture=prefecture
    )
    
    venues = service.get_venues(
        skip=skip,
        limit=limit,
        filters=filters
    )
    
    return venues

@router.get("/{venue_id}", response_model=VenueSchema)
async def get_venue(
    venue_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """指定IDの会場詳細を取得"""
    service = VenueService(db)
    venue = service.get_venue_by_id(venue_id)
    
    if not venue:
        raise HTTPException(
            status_code=404,
            detail="指定された会場が見つかりません"
        )
    
    return venue

@router.post("/", response_model=VenueSchema)
async def create_venue(
    venue_data: VenueCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """新しい会場を作成"""
    service = VenueService(db)
    
    try:
        venue = service.create_venue(venue_data, current_user.id)
        return venue
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{venue_id}", response_model=VenueSchema)
async def update_venue(
    venue_id: str,
    venue_data: VenueUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """会場情報を更新"""
    service = VenueService(db)
    
    venue = service.update_venue(venue_id, venue_data, current_user.id)
    if not venue:
        raise HTTPException(
            status_code=404,
            detail="指定された会場が見つかりません"
        )
    
    return venue

@router.delete("/{venue_id}")
async def delete_venue(
    venue_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """会場を削除（論理削除）"""
    service = VenueService(db)
    
    success = service.delete_venue(venue_id, current_user.id)
    if not success:
        raise HTTPException(
            status_code=404,
            detail="指定された会場が見つかりません"
        )
    
    return {"message": "会場を削除しました"}
```

### 4.4 データモデル

#### 4.4.1 SQLAlchemy モデル
```python
# app/models/venue.py
from sqlalchemy import Column, String, Integer, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.models.base import Base

class Venue(Base):
    __tablename__ = "venues"
    
    # 基本情報
    id = Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4,
        comment="会場ID"
    )
    name = Column(
        String(255), 
        nullable=False, 
        index=True,
        comment="会場名"
    )
    address = Column(
        Text, 
        nullable=False,
        comment="住所"
    )
    phone = Column(
        String(20),
        comment="電話番号"
    )
    email = Column(
        String(255),
        comment="メールアドレス"
    )
    
    # 位置情報
    prefecture = Column(
        String(10), 
        nullable=False, 
        index=True,
        comment="都道府県"
    )
    city = Column(
        String(50),
        comment="市区町村"
    )
    postal_code = Column(
        String(10),
        comment="郵便番号"
    )
    
    # 設備・条件
    capacity = Column(
        Integer,
        comment="収容人数"
    )
    food_allowed = Column(
        Boolean, 
        default=False,
        comment="飲食可否"
    )
    shoes_allowed = Column(
        Boolean, 
        default=True,
        comment="土足可否"
    )
    earthquake_resistant = Column(
        Boolean, 
        default=False,
        comment="耐震基準適合"
    )
    
    # システム情報
    is_active = Column(
        Boolean, 
        default=True,
        comment="有効フラグ"
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        comment="作成日時"
    )
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now(),
        comment="更新日時"
    )
    created_by = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        comment="作成者"
    )
    updated_by = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        comment="更新者"
    )
    
    # リレーションシップ
    rooms = relationship("Room", back_populates="venue", cascade="all, delete-orphan")
    stations = relationship("VenueStation", back_populates="venue", cascade="all, delete-orphan")
    creator = relationship("User", foreign_keys=[created_by])
    updater = relationship("User", foreign_keys=[updated_by])
    
    def __repr__(self) -> str:
        return f"<Venue(id={self.id}, name='{self.name}')>"
```

#### 4.4.2 Pydantic スキーマ
```python
# app/schemas/venue.py
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field, validator
import re

class VenueBase(BaseModel):
    """会場の基本情報"""
    name: str = Field(..., min_length=1, max_length=255, description="会場名")
    address: str = Field(..., min_length=1, description="住所")
    phone: Optional[str] = Field(None, max_length=20, description="電話番号")
    email: Optional[str] = Field(None, max_length=255, description="メールアドレス")
    prefecture: str = Field(..., max_length=10, description="都道府県")
    city: Optional[str] = Field(None, max_length=50, description="市区町村")
    postal_code: Optional[str] = Field(None, max_length=10, description="郵便番号")
    capacity: Optional[int] = Field(None, ge=1, description="収容人数")
    food_allowed: bool = Field(False, description="飲食可否")
    shoes_allowed: bool = Field(True, description="土足可否")
    earthquake_resistant: bool = Field(False, description="耐震基準適合")

    @validator('phone')
    def validate_phone(cls, v):
        if v and not re.match(r'^[0-9\-\(\)\+\s]+$', v):
            raise ValueError('正しい電話番号の形式で入力してください')
        return v

    @validator('email')
    def validate_email(cls, v):
        if v and not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', v):
            raise ValueError('正しいメールアドレスの形式で入力してください')
        return v

    @validator('postal_code')
    def validate_postal_code(cls, v):
        if v and not re.match(r'^\d{3}-?\d{4}$', v):
            raise ValueError('正しい郵便番号の形式で入力してください（例：123-4567）')
        return v

class VenueCreate(VenueBase):
    """会場作成用スキーマ"""
    pass

class VenueUpdate(BaseModel):
    """会場更新用スキーマ（部分更新対応）"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    address: Optional[str] = Field(None, min_length=1)
    phone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=255)
    prefecture: Optional[str] = Field(None, max_length=10)
    city: Optional[str] = Field(None, max_length=50)
    postal_code: Optional[str] = Field(None, max_length=10)
    capacity: Optional[int] = Field(None, ge=1)
    food_allowed: Optional[bool] = None
    shoes_allowed: Optional[bool] = None
    earthquake_resistant: Optional[bool] = None

class Venue(VenueBase):
    """会場情報レスポンス用スキーマ"""
    id: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        orm_mode = True

class VenueSearchFilters(BaseModel):
    """会場検索フィルター"""
    name: Optional[str] = None
    prefecture: Optional[str] = None
    city: Optional[str] = None
    min_capacity: Optional[int] = Field(None, ge=1)
    max_capacity: Optional[int] = Field(None, ge=1)
    food_allowed: Optional[bool] = None
    earthquake_resistant: Optional[bool] = None
    
    @validator('max_capacity')
    def validate_capacity_range(cls, v, values):
        if v and 'min_capacity' in values and values['min_capacity']:
            if v < values['min_capacity']:
                raise ValueError('最大収容人数は最小収容人数以上で指定してください')
        return v
```

### 4.5 サービス層
```python
# app/services/venue_service.py
from typing import List, Optional
from sqlalchemy.orm import Session
from uuid import UUID

from app.repositories.venue_repository import VenueRepository
from app.schemas.venue import VenueCreate, VenueUpdate, VenueSearchFilters
from app.models.venue import Venue
from app.core.exceptions import VenueNotFoundError, VenueAlreadyExistsError

class VenueService:
    """会場関連のビジネスロジック"""
    
    def __init__(self, db: Session):
        self.db = db
        self.venue_repo = VenueRepository(db)
    
    def get_venues(
        self,
        skip: int = 0,
        limit: int = 100,
        filters: Optional[VenueSearchFilters] = None
    ) -> List[Venue]:
        """会場一覧を取得"""
        return self.venue_repo.find_all(
            skip=skip,
            limit=limit,
            filters=filters
        )
    
    def get_venue_by_id(self, venue_id: str) -> Optional[Venue]:
        """IDで会場を取得"""
        try:
            venue_uuid = UUID(venue_id)
            return self.venue_repo.find_by_id(venue_uuid)
        except ValueError:
            return None
    
    def create_venue(self, venue_data: VenueCreate, user_id: UUID) -> Venue:
        """新しい会場を作成"""
        # 重複チェック
        existing = self.venue_repo.find_by_name_and_address(
            venue_data.name,
            venue_data.address
        )
        if existing:
            raise VenueAlreadyExistsError("同じ名前と住所の会場が既に存在します")
        
        # 会場作成
        venue = Venue(
            **venue_data.dict(),
            created_by=user_id
        )
        
        return self.venue_repo.create(venue)
    
    def update_venue(
        self,
        venue_id: str,
        venue_data: VenueUpdate,
        user_id: UUID
    ) -> Optional[Venue]:
        """会場情報を更新"""
        venue = self.get_venue_by_id(venue_id)
        if not venue:
            return None
        
        # 更新データの適用
        update_data = venue_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(venue, field, value)
        
        venue.updated_by = user_id
        
        return self.venue_repo.update(venue)
    
    def delete_venue(self, venue_id: str, user_id: UUID) -> bool:
        """会場を削除（論理削除）"""
        venue = self.get_venue_by_id(venue_id)
        if not venue:
            return False
        
        venue.is_active = False
        venue.updated_by = user_id
        
        self.venue_repo.update(venue)
        return True
    
    def search_venues(self, query: str) -> List[Venue]:
        """全文検索で会場を検索"""
        return self.venue_repo.search_by_text(query)
```

### 4.6 エラーハンドリング
```python
# app/core/exceptions.py
class VenueManagementError(Exception):
    """ベース例外クラス"""
    pass

class VenueNotFoundError(VenueManagementError):
    """会場が見つからない場合の例外"""
    pass

class VenueAlreadyExistsError(VenueManagementError):
    """会場が既に存在する場合の例外"""
    pass

class ValidationError(VenueManagementError):
    """バリデーションエラー"""
    pass

# app/core/error_handlers.py
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from app.core.exceptions import (
    VenueNotFoundError,
    VenueAlreadyExistsError,
    ValidationError
)

async def venue_not_found_handler(request: Request, exc: VenueNotFoundError):
    return JSONResponse(
        status_code=404,
        content={
            "error": "venue_not_found",
            "message": str(exc),
            "detail": "指定された会場が見つかりません"
        }
    )

async def venue_already_exists_handler(request: Request, exc: VenueAlreadyExistsError):
    return JSONResponse(
        status_code=409,
        content={
            "error": "venue_already_exists",
            "message": str(exc),
            "detail": "同じ情報の会場が既に存在します"
        }
    )
```

## 5. テスト規約

### 5.1 フロントエンドテスト（Jest + Testing Library）
```typescript
// components/__tests__/VenueCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VenueCard } from '../VenueCard';
import { mockVenue } from '../../__mocks__/venue';

describe('VenueCard', () => {
  const defaultProps = {
    venue: mockVenue,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('会場情報を正しく表示する', () => {
    render(<VenueCard {...defaultProps} />);
    
    expect(screen.getByText(mockVenue.name)).toBeInTheDocument();
    expect(screen.getByText(mockVenue.address)).toBeInTheDocument();
  });

  it('編集ボタンクリック時にonEditが呼ばれる', () => {
    render(<VenueCard {...defaultProps} />);
    
    const editButton = screen.getByText('編集');
    fireEvent.click(editButton);
    
    expect(defaultProps.onEdit).toHaveBeenCalledWith(mockVenue.id);
  });

  it('削除ボタンクリック時にonDeleteが呼ばれる', () => {
    render(<VenueCard {...defaultProps} />);
    
    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);
    
    expect(defaultProps.onDelete).toHaveBeenCalledWith(mockVenue.id);
  });
});
```

### 5.2 バックエンドテスト（pytest）
```python
# tests/test_venue_service.py
import pytest
from sqlalchemy.orm import Session
from uuid import uuid4

from app.services.venue_service import VenueService
from app.schemas.venue import VenueCreate
from app.core.exceptions import VenueAlreadyExistsError
from tests.fixtures import create_test_user, create_test_venue

class TestVenueService:
    """VenueService のテスト"""

    def test_create_venue_success(self, db: Session):
        """会場作成の正常ケース"""
        user = create_test_user(db)
        service = VenueService(db)
        
        venue_data = VenueCreate(
            name="テスト会場",
            address="東京都渋谷区テスト1-1-1",
            prefecture="東京都",
            capacity=100
        )
        
        venue = service.create_venue(venue_data, user.id)
        
        assert venue.name == venue_data.name
        assert venue.address == venue_data.address
        assert venue.created_by == user.id

    def test_create_venue_duplicate_error(self, db: Session):
        """重複会場作成のエラーケース"""
        user = create_test_user(db)
        service = VenueService(db)
        
        # 既存会場作成
        existing_venue = create_test_venue(db, user.id)
        
        # 同じ情報で作成を試行
        venue_data = VenueCreate(
            name=existing_venue.name,
            address=existing_venue.address,
            prefecture="東京都"
        )
        
        with pytest.raises(VenueAlreadyExistsError):
            service.create_venue(venue_data, user.id)

    def test_get_venues_with_filters(self, db: Session):
        """フィルタ付き会場取得"""
        user = create_test_user(db)
        service = VenueService(db)
        
        # テストデータ作成
        venue1 = create_test_venue(db, user.id, name="東京会場", prefecture="東京都")
        venue2 = create_test_venue(db, user.id, name="大阪会場", prefecture="大阪府")
        
        # 東京都でフィルタ
        filters = VenueSearchFilters(prefecture="東京都")
        venues = service.get_venues(filters=filters)
        
        assert len(venues) == 1
        assert venues[0].id == venue1.id

@pytest.fixture
def db():
    """テスト用データベースセッション"""
    # テスト用DB設定
    pass
```

## 6. 品質管理

### 6.1 コード品質ツール

#### 6.1.1 フロントエンド
```json
// package.json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}

// .eslintrc.js
module.exports = {
  extends: [
    '@typescript-eslint/recommended',
    'react-hooks/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'react-hooks/exhaustive-deps': 'error'
  }
};
```

#### 6.1.2 バックエンド
```toml
# pyproject.toml
[tool.black]
line-length = 88
target-version = ['py39']

[tool.isort]
profile = "black"
multi_line_output = 3

[tool.mypy]
python_version = "3.9"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py", "*_test.py"]
addopts = "-v --tb=short --strict-markers"
markers = [
    "slow: marks tests as slow",
    "integration: marks tests as integration tests"
]
```

### 6.2 CI/CD 設定
```yaml
# .github/workflows/test.yml
name: Test and Quality Check

on: [push, pull_request]

jobs:
  frontend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test:coverage

  backend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - run: pip install -r requirements-dev.txt
      - run: black --check .
      - run: isort --check-only .
      - run: mypy .
      - run: pytest --cov=app
```

## 7. 改訂履歴

| 版 | 日付 | 作成者 | 改訂内容 |
|----|------|--------|----------|
| 1.0 | 2025-09-07 | 開発チーム | 初版作成 |