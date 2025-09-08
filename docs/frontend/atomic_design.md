# 防災士研修センター会場管理システム Atomic Design設計書

## 1. 概要

### 1.1 Atomic Designとは
Atomic Designは、UIを原子（Atoms）から段階的に組み立てていく設計手法です。本システムでは100% Atomic Designを採用し、再利用可能で保守性の高いコンポーネント設計を実現します。

### 1.2 階層構造
```
Atoms（原子）
  ↓
Molecules（分子）
  ↓
Organisms（有機体）
  ↓
Templates（テンプレート）
  ↓
Pages（ページ）
```

### 1.3 設計原則
- **単一責任の原則**: 各コンポーネントは1つの責任のみを持つ
- **再利用性**: 汎用的なコンポーネント設計
- **独立性**: 他のコンポーネントに依存しない
- **テスタビリティ**: 単体テスト可能な設計

## 2. Atoms（原子）

### 2.1 定義
最小単位のUI要素。それ以上分解できない基本的なHTML要素。

### 2.2 コンポーネント一覧

#### Button
```jsx
// atoms/Button.jsx
import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

#### Input
```jsx
// atoms/Input.jsx
import styles from './Input.module.css';

const Input = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  ...props 
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        className={`${styles.input} ${error ? styles.error : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
```

#### Label
```jsx
// atoms/Label.jsx
const Label = ({ children, htmlFor, required }) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
};
```

#### Icon
```jsx
// atoms/Icon.jsx
const Icon = ({ name, size = 24, color = 'currentColor' }) => {
  return (
    <svg
      width={size}
      height={size}
      fill={color}
      className={styles.icon}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
};
```

#### Text
```jsx
// atoms/Text.jsx
const Text = ({ 
  children, 
  variant = 'body', 
  color = 'default',
  align = 'left' 
}) => {
  return (
    <p className={`${styles.text} ${styles[variant]} ${styles[color]}`}>
      {children}
    </p>
  );
};
```

### 2.3 Atomsのスタイリング

#### Button.module.css
```css
.button {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Variants */
.primary {
  background-color: var(--color-primary-500);
  color: white;
}

.primary:hover {
  background-color: var(--color-primary-600);
}

.secondary {
  background-color: var(--color-secondary-500);
  color: white;
}

/* Sizes */
.small {
  padding: 8px 16px;
  font-size: 14px;
}

.medium {
  padding: 12px 24px;
  font-size: 16px;
}

.large {
  padding: 16px 32px;
  font-size: 18px;
}
```

## 3. Molecules（分子）

### 3.1 定義
複数のAtomsを組み合わせた、シンプルなUI要素のグループ。

### 3.2 コンポーネント一覧

#### FormField
```jsx
// molecules/FormField.jsx
import Label from '../atoms/Label';
import Input from '../atoms/Input';

const FormField = ({ 
  label,
  name,
  type = 'text',
  value,
  onChange,
  required,
  error,
  placeholder
}) => {
  return (
    <div className={styles.formField}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
      />
    </div>
  );
};
```

#### SearchBox
```jsx
// molecules/SearchBox.jsx
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

const SearchBox = ({ onSearch, placeholder = '検索...' }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className={styles.searchBox}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <Button onClick={handleSearch} variant="primary">
        <Icon name="search" size={20} />
        検索
      </Button>
    </div>
  );
};
```

#### Card
```jsx
// molecules/Card.jsx
const Card = ({ title, children, actions }) => {
  return (
    <div className={styles.card}>
      {title && (
        <div className={styles.cardHeader}>
          <Text variant="h3">{title}</Text>
        </div>
      )}
      <div className={styles.cardBody}>
        {children}
      </div>
      {actions && (
        <div className={styles.cardFooter}>
          {actions}
        </div>
      )}
    </div>
  );
};
```

#### Pagination
```jsx
// molecules/Pagination.jsx
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        size="small"
      >
        前へ
      </Button>
      
      <Text>{currentPage} / {totalPages}</Text>
      
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        size="small"
      >
        次へ
      </Button>
    </div>
  );
};
```

## 4. Organisms（有機体）

### 4.1 定義
AtomsやMoleculesを組み合わせた、より複雑なUIコンポーネント。

### 4.2 コンポーネント一覧

#### Header
```jsx
// organisms/Header.jsx
import Logo from '../atoms/Logo';
import Navigation from '../molecules/Navigation';
import UserMenu from '../molecules/UserMenu';

const Header = ({ user, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Logo />
        <Navigation />
        <UserMenu user={user} onLogout={onLogout} />
      </div>
    </header>
  );
};
```

#### VenueForm
```jsx
// organisms/VenueForm.jsx
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const VenueForm = ({ venue, onSubmit, errors = {} }) => {
  const [formData, setFormData] = useState(venue || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className={styles.venueForm} onSubmit={onSubmit}>
      <FormField
        label="施設名"
        name="venue_name"
        value={formData.venue_name}
        onChange={handleChange}
        required
        error={errors.venue_name}
      />
      
      <FormField
        label="住所"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
        error={errors.address}
      />
      
      <FormField
        label="電話番号"
        name="phone_number"
        type="tel"
        value={formData.phone_number}
        onChange={handleChange}
        required
        error={errors.phone_number}
      />
      
      <div className={styles.formActions}>
        <Button type="submit" variant="primary">
          保存
        </Button>
        <Button type="button" variant="secondary">
          キャンセル
        </Button>
      </div>
    </form>
  );
};
```

#### VenueList
```jsx
// organisms/VenueList.jsx
import VenueCard from '../molecules/VenueCard';
import Pagination from '../molecules/Pagination';
import EmptyState from '../molecules/EmptyState';

const VenueList = ({ venues, pagination, onPageChange, onVenueClick }) => {
  if (venues.length === 0) {
    return <EmptyState message="会場が見つかりません" />;
  }

  return (
    <div className={styles.venueList}>
      <div className={styles.venueGrid}>
        {venues.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            onClick={() => onVenueClick(venue.id)}
          />
        ))}
      </div>
      
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
```

#### Sidebar
```jsx
// organisms/Sidebar.jsx
const Sidebar = ({ filters, onFilterChange }) => {
  return (
    <aside className={styles.sidebar}>
      <FilterSection
        title="都道府県"
        options={prefectures}
        selected={filters.prefecture}
        onChange={(value) => onFilterChange('prefecture', value)}
      />
      
      <FilterSection
        title="収容人数"
        type="range"
        min={0}
        max={1000}
        value={filters.capacity}
        onChange={(value) => onFilterChange('capacity', value)}
      />
      
      <FilterSection
        title="設備"
        type="checkbox"
        options={facilities}
        selected={filters.facilities}
        onChange={(value) => onFilterChange('facilities', value)}
      />
    </aside>
  );
};
```

## 5. Templates（テンプレート）

### 5.1 定義
ページの構造を定義するコンポーネント。実際のコンテンツは含まない。

### 5.2 コンポーネント一覧

#### MainLayout
```jsx
// templates/MainLayout.jsx
const MainLayout = ({ header, sidebar, main, footer }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        {header}
      </div>
      
      <div className={styles.body}>
        {sidebar && (
          <div className={styles.sidebar}>
            {sidebar}
          </div>
        )}
        
        <main className={styles.main}>
          {main}
        </main>
      </div>
      
      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </div>
  );
};
```

#### AuthLayout
```jsx
// templates/AuthLayout.jsx
const AuthLayout = ({ children }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authContainer}>
        <Logo size="large" />
        <div className={styles.authContent}>
          {children}
        </div>
      </div>
    </div>
  );
};
```

#### DetailLayout
```jsx
// templates/DetailLayout.jsx
const DetailLayout = ({ breadcrumb, header, tabs, content, actions }) => {
  return (
    <div className={styles.detailLayout}>
      {breadcrumb && (
        <div className={styles.breadcrumb}>
          {breadcrumb}
        </div>
      )}
      
      <div className={styles.detailHeader}>
        {header}
        {actions && (
          <div className={styles.headerActions}>
            {actions}
          </div>
        )}
      </div>
      
      {tabs && (
        <div className={styles.tabs}>
          {tabs}
        </div>
      )}
      
      <div className={styles.detailContent}>
        {content}
      </div>
    </div>
  );
};
```

## 6. Pages（ページ）

### 6.1 定義
Templatesにデータを流し込んだ、実際のページコンポーネント。

### 6.2 コンポーネント一覧

#### VenueListPage
```jsx
// pages/VenueListPage.jsx
import { useState, useEffect } from 'react';
import MainLayout from '../templates/MainLayout';
import Header from '../organisms/Header';
import Sidebar from '../organisms/Sidebar';
import VenueList from '../organisms/VenueList';
import SearchBox from '../molecules/SearchBox';

const VenueListPage = () => {
  const [venues, setVenues] = useState([]);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ page: 1 });

  useEffect(() => {
    fetchVenues();
  }, [filters, pagination.page]);

  const fetchVenues = async () => {
    // API呼び出し
  };

  return (
    <MainLayout
      header={<Header />}
      sidebar={
        <Sidebar
          filters={filters}
          onFilterChange={setFilters}
        />
      }
      main={
        <>
          <SearchBox onSearch={handleSearch} />
          <VenueList
            venues={venues}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </>
      }
    />
  );
};
```

## 7. ディレクトリ構成

```
src/components/
├── atoms/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   └── index.js
│   ├── Input/
│   ├── Label/
│   ├── Icon/
│   └── Text/
├── molecules/
│   ├── FormField/
│   ├── SearchBox/
│   ├── Card/
│   └── Pagination/
├── organisms/
│   ├── Header/
│   ├── VenueForm/
│   ├── VenueList/
│   └── Sidebar/
├── templates/
│   ├── MainLayout/
│   ├── AuthLayout/
│   └── DetailLayout/
└── pages/
    ├── VenueListPage/
    ├── VenueDetailPage/
    ├── LoginPage/
    └── DashboardPage/
```

## 8. カラーシステム

### 8.1 CSS変数定義
```css
/* styles/colors.css */
:root {
  /* Primary - 防災グリーン */
  --color-primary-100: #E8F5E9;
  --color-primary-200: #C8E6C9;
  --color-primary-300: #A5D6A7;
  --color-primary-400: #81C784;
  --color-primary-500: #4CAF50;
  --color-primary-600: #43A047;
  --color-primary-700: #388E3C;
  --color-primary-800: #2E7D32;
  --color-primary-900: #1B5E20;
  
  /* Secondary - 信頼ブルー */
  --color-secondary-100: #E3F2FD;
  --color-secondary-200: #BBDEFB;
  --color-secondary-300: #90CAF9;
  --color-secondary-400: #64B5F6;
  --color-secondary-500: #2196F3;
  --color-secondary-600: #1E88E5;
  --color-secondary-700: #1976D2;
  --color-secondary-800: #1565C0;
  --color-secondary-900: #0D47A1;
  
  /* Neutral */
  --color-gray-100: #F5F5F5;
  --color-gray-200: #EEEEEE;
  --color-gray-300: #E0E0E0;
  --color-gray-400: #BDBDBD;
  --color-gray-500: #9E9E9E;
  --color-gray-600: #757575;
  --color-gray-700: #616161;
  --color-gray-800: #424242;
  --color-gray-900: #212121;
  
  /* Semantic */
  --color-success: #4CAF50;
  --color-warning: #FF9800;
  --color-error: #F44336;
  --color-info: #2196F3;
}
```

## 9. 命名規則

### 9.1 コンポーネント命名
- PascalCase使用
- 機能を表す名前
- 階層を含めない

### 9.2 Props命名
- camelCase使用
- boolean型は`is`、`has`、`can`で始める
- イベントハンドラは`on`で始める

### 9.3 CSS命名
- CSS Modules使用
- camelCase使用
- BEM風の命名も可

## 10. ベストプラクティス

### 10.1 コンポーネント設計
1. 単一責任の原則を守る
2. Props Drillingを避ける
3. 適切なデフォルト値を設定
4. PropTypesまたはTypeScriptで型定義

### 10.2 状態管理
1. 状態は必要最小限に
2. 派生状態は計算で求める
3. グローバル状態は慎重に使用

### 10.3 パフォーマンス
1. React.memoで不要な再レンダリング防止
2. useCallbackとuseMemoの適切な使用
3. 大きなリストは仮想化

## 11. テスト戦略

### 11.1 Atomsのテスト
```javascript
// Button.test.jsx
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

test('クリックイベントが発火する', () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button onClick={handleClick}>Click me</Button>
  );
  
  fireEvent.click(getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 11.2 統合テスト
各階層のコンポーネントを組み合わせた統合テストを実施

## 12. 改訂履歴

| 版 | 日付 | 作成者 | 改訂内容 |
|----|------|--------|----------|
| 1.0 | 2025-09-07 | システム設計チーム | 初版作成 |