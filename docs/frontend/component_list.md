# 防災士研修センター会場管理システム コンポーネント一覧

## 1. Atoms（原子）

### 基本要素
| コンポーネント名 | 説明 | Props | 使用例 |
|-----------------|------|-------|--------|
| Button | ボタン | variant, size, disabled, onClick | `<Button variant="primary">保存</Button>` |
| Input | 入力フィールド | type, placeholder, value, onChange, error | `<Input type="text" />` |
| Label | ラベル | htmlFor, required | `<Label htmlFor="name">名前</Label>` |
| Icon | アイコン | name, size, color | `<Icon name="search" />` |
| Text | テキスト | variant, color, align | `<Text variant="h1">タイトル</Text>` |
| Link | リンク | href, external | `<Link href="/venues">会場一覧</Link>` |
| Badge | バッジ | variant, count | `<Badge variant="success">新着</Badge>` |
| Spinner | ローディング | size, color | `<Spinner size="large" />` |
| Avatar | アバター | src, alt, size | `<Avatar src="/user.jpg" />` |
| Checkbox | チェックボックス | checked, onChange | `<Checkbox checked={true} />` |
| Radio | ラジオボタン | checked, onChange, name | `<Radio name="option" />` |
| Select | セレクトボックス | options, value, onChange | `<Select options={[]} />` |
| TextArea | テキストエリア | rows, value, onChange | `<TextArea rows={5} />` |
| Toggle | トグルスイッチ | checked, onChange | `<Toggle checked={true} />` |
| Divider | 区切り線 | orientation, variant | `<Divider />` |

## 2. Molecules（分子）

### 複合要素
| コンポーネント名 | 説明 | 構成Atoms | 使用例 |
|-----------------|------|-----------|--------|
| FormField | フォームフィールド | Label + Input | 入力フォーム |
| SearchBox | 検索ボックス | Input + Button + Icon | ヘッダー検索 |
| Card | カード | Text + Divider | 情報表示 |
| Pagination | ページネーション | Button + Text | リスト下部 |
| Breadcrumb | パンくずリスト | Link + Icon | ページ上部 |
| Alert | アラート | Icon + Text + Button | 通知表示 |
| Modal | モーダル | Card + Button | ダイアログ |
| Dropdown | ドロップダウン | Button + List | メニュー |
| Tab | タブ | Button + Text | タブ切替 |
| Tooltip | ツールチップ | Text | ヘルプ表示 |
| Tag | タグ | Text + Icon | カテゴリ表示 |
| Rating | 評価 | Icon + Text | 5つ星評価 |
| DatePicker | 日付選択 | Input + Calendar | 日付入力 |
| FileUpload | ファイルアップロード | Input + Button | ファイル選択 |
| ProgressBar | プログレスバー | Divider + Text | 進捗表示 |

## 3. Organisms（有機体）

### 複雑な構成要素
| コンポーネント名 | 説明 | 主な機能 | 使用箇所 |
|-----------------|------|----------|----------|
| Header | ヘッダー | ナビゲーション、ユーザーメニュー | 全ページ |
| Footer | フッター | リンク、著作権表示 | 全ページ |
| Sidebar | サイドバー | フィルター、メニュー | 一覧画面 |
| VenueForm | 会場フォーム | 会場情報入力 | 登録・編集画面 |
| VenueList | 会場リスト | 会場一覧表示 | 一覧画面 |
| VenueCard | 会場カード | 会場概要表示 | 一覧・詳細画面 |
| VenueDetail | 会場詳細 | 詳細情報表示 | 詳細画面 |
| RoomList | 部屋リスト | 部屋一覧表示 | 会場詳細画面 |
| StationList | 駅リスト | 最寄り駅表示 | 会場詳細画面 |
| UserTable | ユーザーテーブル | ユーザー一覧 | 管理画面 |
| LoginForm | ログインフォーム | 認証 | ログイン画面 |
| DashboardStats | ダッシュボード統計 | 統計表示 | ダッシュボード |
| FilterPanel | フィルターパネル | 検索条件設定 | 一覧画面 |
| DataTable | データテーブル | 表形式データ表示 | 各種一覧 |
| EventCalendar | イベントカレンダー | カレンダー表示 | イベント管理 |

## 4. Templates（テンプレート）

### レイアウト
| テンプレート名 | 説明 | 構成 | 使用ページ |
|---------------|------|------|------------|
| MainLayout | メインレイアウト | Header + Sidebar + Main + Footer | 通常ページ |
| AuthLayout | 認証レイアウト | Logo + Form | ログイン・登録 |
| DetailLayout | 詳細レイアウト | Breadcrumb + Header + Content | 詳細ページ |
| ListLayout | 一覧レイアウト | Filters + List + Pagination | 一覧ページ |
| FormLayout | フォームレイアウト | Header + Form + Actions | 登録・編集 |
| DashboardLayout | ダッシュボードレイアウト | Stats + Charts + Tables | ダッシュボード |
| ErrorLayout | エラーレイアウト | Error Message + Actions | エラーページ |
| PrintLayout | 印刷レイアウト | Simplified Content | 印刷用 |

## 5. Pages（ページ）

### 画面一覧
| ページ名 | パス | テンプレート | 主要機能 |
|---------|------|-------------|----------|
| LoginPage | /login | AuthLayout | ログイン |
| DashboardPage | / | DashboardLayout | ダッシュボード表示 |
| VenueListPage | /venues | ListLayout | 会場一覧・検索 |
| VenueDetailPage | /venues/:id | DetailLayout | 会場詳細表示 |
| VenueCreatePage | /venues/new | FormLayout | 会場新規登録 |
| VenueEditPage | /venues/:id/edit | FormLayout | 会場編集 |
| EventListPage | /events | ListLayout | イベント一覧 |
| EventDetailPage | /events/:id | DetailLayout | イベント詳細 |
| UserListPage | /users | ListLayout | ユーザー管理 |
| UserProfilePage | /profile | DetailLayout | プロフィール |
| SettingsPage | /settings | FormLayout | 設定 |
| NotFoundPage | /404 | ErrorLayout | 404エラー |
| ServerErrorPage | /500 | ErrorLayout | サーバーエラー |

## 6. 共通コンポーネント

### ユーティリティ
| コンポーネント名 | 説明 | 使用例 |
|-----------------|------|--------|
| ErrorBoundary | エラー境界 | アプリ全体をラップ |
| PrivateRoute | 認証ルート | 認証が必要なページ |
| LazyLoad | 遅延読み込み | 画像・コンポーネント |
| InfiniteScroll | 無限スクロール | 長いリスト |
| Portal | ポータル | モーダル・ツールチップ |
| ThemeProvider | テーマプロバイダー | カラーテーマ管理 |
| I18nProvider | 国際化プロバイダー | 多言語対応 |

## 7. カスタムフック

### Hooks一覧
| フック名 | 説明 | 使用例 |
|---------|------|--------|
| useAuth | 認証状態管理 | `const { user, login } = useAuth()` |
| useApi | API通信 | `const { data, loading } = useApi('/venues')` |
| useForm | フォーム管理 | `const { values, handleChange } = useForm()` |
| useDebounce | デバウンス | `const debouncedValue = useDebounce(value, 500)` |
| useLocalStorage | ローカルストレージ | `const [value, setValue] = useLocalStorage('key')` |
| usePagination | ページネーション | `const { page, setPage } = usePagination()` |
| useFilter | フィルター管理 | `const { filters, setFilter } = useFilter()` |
| useModal | モーダル管理 | `const { isOpen, open, close } = useModal()` |
| useNotification | 通知管理 | `const { notify } = useNotification()` |
| useBreakpoint | ブレークポイント | `const isMobile = useBreakpoint('sm')` |

## 8. スタイル定義

### グローバルスタイル
```css
/* Typography */
--font-family-base: 'Noto Sans JP', sans-serif;
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;
--font-size-3xl: 30px;

/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;

/* Border Radius */
--radius-sm: 2px;
--radius-md: 4px;
--radius-lg: 8px;
--radius-xl: 16px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.1);

/* Z-index */
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

## 9. アイコンセット

### 使用アイコン
- Material Icons
- Feather Icons
- カスタムSVGアイコン

### 主要アイコン一覧
| アイコン名 | 用途 |
|-----------|------|
| search | 検索 |
| filter | フィルター |
| add | 追加 |
| edit | 編集 |
| delete | 削除 |
| save | 保存 |
| cancel | キャンセル |
| menu | メニュー |
| close | 閉じる |
| arrow-left | 戻る |
| arrow-right | 進む |
| calendar | カレンダー |
| location | 場所 |
| phone | 電話 |
| email | メール |
| user | ユーザー |
| settings | 設定 |
| logout | ログアウト |
| info | 情報 |
| warning | 警告 |
| error | エラー |
| success | 成功 |

## 10. アニメーション

### トランジション
```css
/* Fade */
.fade-enter { opacity: 0; }
.fade-enter-active { opacity: 1; transition: opacity 300ms; }
.fade-exit { opacity: 1; }
.fade-exit-active { opacity: 0; transition: opacity 300ms; }

/* Slide */
.slide-enter { transform: translateX(-100%); }
.slide-enter-active { transform: translateX(0); transition: transform 300ms; }
.slide-exit { transform: translateX(0); }
.slide-exit-active { transform: translateX(-100%); transition: transform 300ms; }

/* Scale */
.scale-enter { transform: scale(0); }
.scale-enter-active { transform: scale(1); transition: transform 300ms; }
.scale-exit { transform: scale(1); }
.scale-exit-active { transform: scale(0); transition: transform 300ms; }
```

## 11. 改訂履歴

| 版 | 日付 | 作成者 | 改訂内容 |
|----|------|--------|----------|
| 1.0 | 2025-09-07 | システム設計チーム | 初版作成 |