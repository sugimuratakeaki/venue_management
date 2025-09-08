# 防災士研修センター会場管理システム デザインシステム・CSS設計書

## 1. 文書概要

### 1.1 文書の目的
本文書は、防災士研修センター会場管理システムのデザインシステムとCSS設計について定義する。
100% Atomic Designによる一貫性のあるUI/UXの実現とメンテナンス性を確保する。

### 1.2 適用範囲
- 全フロントエンド画面・コンポーネント
- React Atomic Designコンポーネント
- レスポンシブデザイン対応
- アクセシビリティ対応

### 1.3 関連文書
- レスポンシブデザイン仕様（responsive_design.md）
- Atomicデザイン設計（atomic_design.md）
- 非機能要件定義書（non_functional_requirements.md）

## 2. デザインコンセプト

### 2.1 基本コンセプト
- **信頼性**：防災という重要な業務に相応しい安心感のあるデザイン
- **視認性**：情報の見やすさと操作の分かりやすさを重視
- **効率性**：業務効率化を支援するUI/UX設計
- **一貫性**：システム全体での統一されたデザイン言語

### 2.2 デザイン原則
1. **シンプルさ**：装飾よりも機能性を重視
2. **明確さ**：ユーザーが迷わない明確なUI
3. **予測可能性**：一般的なUIパターンの採用
4. **包括性**：アクセシビリティへの配慮

## 3. カラーシステム

### 3.1 メインカラーパレット

#### 3.1.1 防災グリーン（Primary Color）
```css
/* メインの防災グリーン */
--color-primary-50: #f0fdf4;   /* 最も薄い */
--color-primary-100: #dcfce7;  /* とても薄い */
--color-primary-200: #bbf7d0;  /* 薄い */
--color-primary-300: #86efac;  /* やや薄い */
--color-primary-400: #4ade80;  /* 普通 */
--color-primary-500: #22c55e;  /* メイン（ベース）*/
--color-primary-600: #16a34a;  /* やや濃い */
--color-primary-700: #15803d;  /* 濃い */
--color-primary-800: #166534;  /* とても濃い */
--color-primary-900: #14532d;  /* 最も濃い */
```

#### 3.1.2 信頼ブルー（Secondary Color）
```css
/* サブの信頼ブルー */
--color-secondary-50: #eff6ff;   /* 最も薄い */
--color-secondary-100: #dbeafe;  /* とても薄い */
--color-secondary-200: #bfdbfe;  /* 薄い */
--color-secondary-300: #93c5fd;  /* やや薄い */
--color-secondary-400: #60a5fa;  /* 普通 */
--color-secondary-500: #3b82f6;  /* メイン（ベース）*/
--color-secondary-600: #2563eb;  /* やや濃い */
--color-secondary-700: #1d4ed8;  /* 濃い */
--color-secondary-800: #1e40af;  /* とても濃い */
--color-secondary-900: #1e3a8a;  /* 最も濃い */
```

### 3.2 システムカラー

#### 3.2.1 グレースケール
```css
/* ニュートラルカラー（グレー系） */
--color-gray-50: #f9fafb;    /* 背景色 */
--color-gray-100: #f3f4f6;   /* 薄い背景 */
--color-gray-200: #e5e7eb;   /* ボーダー */
--color-gray-300: #d1d5db;   /* 無効状態 */
--color-gray-400: #9ca3af;   /* プレースホルダー */
--color-gray-500: #6b7280;   /* 補助テキスト */
--color-gray-600: #4b5563;   /* セカンダリテキスト */
--color-gray-700: #374151;   /* プライマリテキスト */
--color-gray-800: #1f2937;   /* 見出し */
--color-gray-900: #111827;   /* 強調テキスト */
```

#### 3.2.2 セマンティックカラー
```css
/* 成功・エラー・警告・情報 */
--color-success-50: #f0fdf4;
--color-success-500: #22c55e;  /* 成功 */
--color-success-700: #15803d;

--color-error-50: #fef2f2;
--color-error-500: #ef4444;    /* エラー */
--color-error-700: #b91c1c;

--color-warning-50: #fffbeb;
--color-warning-500: #f59e0b;  /* 警告 */
--color-warning-700: #a16207;

--color-info-50: #eff6ff;
--color-info-500: #3b82f6;     /* 情報 */
--color-info-700: #1d4ed8;
```

### 3.3 カラー使用ルール

#### 3.3.1 カラー適用パターン
| 要素 | カラー | 備考 |
|------|--------|------|
| メインボタン | primary-500 | アクション促進 |
| セカンダリボタン | secondary-500 | サブアクション |
| リンクテキスト | primary-600 | ホバー時darker |
| 見出し（h1-h2） | gray-800 | 強い階層 |
| 見出し（h3-h6） | gray-700 | 中間階層 |
| 本文テキスト | gray-600 | 読みやすさ重視 |
| 補助テキスト | gray-500 | 補完情報 |
| ボーダー | gray-200 | 区切り線 |
| 背景色 | gray-50 | ページ背景 |

#### 3.3.2 状態別カラー
```css
/* ボタン状態 */
.button-primary {
  background-color: var(--color-primary-500);
}
.button-primary:hover {
  background-color: var(--color-primary-600);
}
.button-primary:active {
  background-color: var(--color-primary-700);
}
.button-primary:disabled {
  background-color: var(--color-gray-300);
  color: var(--color-gray-500);
}
```

## 4. タイポグラフィ

### 4.1 フォントファミリー

#### 4.1.1 基本フォント設定
```css
/* システムフォント（優先） */
--font-family-base: 
  "Hiragino Kaku Gothic ProN", 
  "Hiragino Sans", 
  "Meiryo", 
  system-ui, 
  -apple-system, 
  BlinkMacSystemFont, 
  "Segoe UI", 
  "Roboto", 
  sans-serif;

/* 数値・英語用 */
--font-family-mono: 
  "SF Mono", 
  "Monaco", 
  "Menlo", 
  "Consolas", 
  "Liberation Mono", 
  "Courier New", 
  monospace;
```

### 4.2 フォントサイズとライティング

#### 4.2.1 フォントサイズスケール
```css
/* Type Scale (Major Third 1.25) */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px - ベース */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */

/* Line Height */
--line-height-tight: 1.25;
--line-height-snug: 1.375;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;
--line-height-loose: 2;
```

#### 4.2.2 見出しスタイル
```css
.heading-1 {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  line-height: var(--line-height-tight);
  color: var(--color-gray-800);
  margin-bottom: 1.5rem;
}

.heading-2 {
  font-size: var(--font-size-3xl);
  font-weight: 600;
  line-height: var(--line-height-snug);
  color: var(--color-gray-800);
  margin-bottom: 1rem;
}

.heading-3 {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  line-height: var(--line-height-normal);
  color: var(--color-gray-700);
  margin-bottom: 0.75rem;
}

.heading-4 {
  font-size: var(--font-size-xl);
  font-weight: 500;
  line-height: var(--line-height-normal);
  color: var(--color-gray-700);
  margin-bottom: 0.5rem;
}
```

#### 4.2.3 本文・その他テキストスタイル
```css
.text-body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-gray-600);
}

.text-small {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  color: var(--color-gray-500);
}

.text-caption {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
  color: var(--color-gray-500);
}

.text-monospace {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
}
```

### 4.3 フォントウェイト
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

## 5. スペーシングシステム

### 5.1 スペーシングスケール
```css
/* Spacing Scale (4px base) */
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
```

### 5.2 コンポーネント別スペーシング

#### 5.2.1 レイアウトスペーシング
```css
/* セクション間 */
.section-spacing {
  margin-bottom: var(--spacing-16);
}

/* カード内パディング */
.card-padding {
  padding: var(--spacing-6);
}

/* フォームフィールド間 */
.form-field-spacing {
  margin-bottom: var(--spacing-4);
}

/* ボタン間 */
.button-spacing {
  margin-right: var(--spacing-3);
}
```

## 6. コンポーネント設計

### 6.1 Atomic Design階層

#### 6.1.1 Atoms（原子）
最小単位のUI要素

**Button（ボタン）**
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  text-decoration: none;
  min-height: 44px; /* タッチターゲット */
}

.btn-primary {
  background-color: var(--color-primary-500);
  color: white;
  border-color: var(--color-primary-500);
}

.btn-secondary {
  background-color: var(--color-secondary-500);
  color: white;
  border-color: var(--color-secondary-500);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary-600);
  border-color: var(--color-primary-300);
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-gray-600);
  border-color: transparent;
}

/* サイズバリエーション */
.btn-sm {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  min-height: 36px;
}

.btn-lg {
  padding: var(--spacing-4) var(--spacing-6);
  font-size: var(--font-size-lg);
  min-height: 52px;
}
```

**Input（入力フィールド）**
```css
.input {
  display: block;
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-gray-700);
  background-color: white;
  border: 1px solid var(--color-gray-300);
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out;
  min-height: 44px;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.input::placeholder {
  color: var(--color-gray-400);
}

.input:disabled {
  background-color: var(--color-gray-100);
  color: var(--color-gray-500);
  cursor: not-allowed;
}

.input-error {
  border-color: var(--color-error-500);
}

.input-success {
  border-color: var(--color-success-500);
}
```

**Label（ラベル）**
```css
.label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-2);
}

.label-required::after {
  content: " *";
  color: var(--color-error-500);
}
```

#### 6.1.2 Molecules（分子）
Atomsを組み合わせた機能的な要素

**Form Field（フォームフィールド）**
```css
.form-field {
  margin-bottom: var(--spacing-4);
}

.form-field-error .input {
  border-color: var(--color-error-500);
}

.form-field-error .label {
  color: var(--color-error-700);
}

.form-error-message {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-error-600);
  margin-top: var(--spacing-1);
}

.form-help-text {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  margin-top: var(--spacing-1);
}
```

**Search Box（検索ボックス）**
```css
.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box .input {
  padding-left: var(--spacing-10);
}

.search-box .search-icon {
  position: absolute;
  left: var(--spacing-3);
  color: var(--color-gray-400);
  z-index: 1;
}

.search-box .clear-button {
  position: absolute;
  right: var(--spacing-3);
  padding: var(--spacing-1);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-gray-400);
}
```

#### 6.1.3 Organisms（有機体）
複数のMoleculesで構成された複雑な要素

**Header（ヘッダー）**
```css
.header {
  background-color: white;
  border-bottom: 1px solid var(--color-gray-200);
  padding: var(--spacing-4) var(--spacing-6);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  text-decoration: none;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-6);
}
```

**Data Table（データテーブル）**
```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.data-table th {
  background-color: var(--color-gray-50);
  padding: var(--spacing-4);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-700);
  border-bottom: 1px solid var(--color-gray-200);
}

.data-table td {
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-100);
  color: var(--color-gray-600);
}

.data-table tbody tr:hover {
  background-color: var(--color-gray-50);
}
```

### 6.2 カード・コンテナ

#### 6.2.1 Card（カード）
```css
.card {
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid var(--color-gray-200);
  overflow: hidden;
  transition: box-shadow 0.15s ease-in-out;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.card-header {
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-gray-200);
  background-color: var(--color-gray-50);
}

.card-body {
  padding: var(--spacing-6);
}

.card-footer {
  padding: var(--spacing-6);
  border-top: 1px solid var(--color-gray-200);
  background-color: var(--color-gray-50);
}
```

#### 6.2.2 Modal（モーダル）
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-800);
}

.modal-body {
  padding: var(--spacing-6);
}

.modal-footer {
  padding: var(--spacing-6);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
}
```

## 7. レスポンシブデザイン

### 7.1 ブレイクポイント
```css
/* メディアクエリ */
--breakpoint-sm: 640px;   /* モバイル */
--breakpoint-md: 768px;   /* タブレット */
--breakpoint-lg: 1024px;  /* デスクトップ */
--breakpoint-xl: 1280px;  /* 大画面 */

@media (min-width: 768px) {
  /* デスクトップスタイル */
}

@media (max-width: 767px) {
  /* モバイルスタイル */
}
```

### 7.2 レスポンシブ対応

#### 7.2.1 フレキシブルレイアウト
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--spacing-6);
  }
}

.grid {
  display: grid;
  gap: var(--spacing-6);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### 7.2.2 モバイル対応調整
```css
/* モバイルでのボタン調整 */
@media (max-width: 767px) {
  .btn-mobile-full {
    width: 100%;
    margin-bottom: var(--spacing-3);
  }
  
  .modal-content {
    margin: var(--spacing-4);
    max-width: calc(100vw - 2rem);
  }
  
  .data-table {
    font-size: var(--font-size-sm);
  }
  
  .data-table th,
  .data-table td {
    padding: var(--spacing-3);
  }
}
```

## 8. アニメーション・トランジション

### 8.1 基本トランジション
```css
/* 標準的なイージング */
--transition-base: all 0.15s ease-in-out;
--transition-slow: all 0.3s ease-in-out;
--transition-fast: all 0.1s ease-in-out;

/* 標準的な使用例 */
.btn, .input, .card {
  transition: var(--transition-base);
}

.modal-overlay {
  transition: opacity 0.2s ease-in-out;
}
```

### 8.2 ホバー・フォーカス効果
```css
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.input:focus {
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}
```

## 9. アクセシビリティ

### 9.1 カラーコントラスト
- WCAG 2.1 Level AA準拠
- コントラスト比：4.5:1以上（通常テキスト）
- コントラスト比：3:1以上（大きなテキスト）

### 9.2 フォーカス表示
```css
/* キーボードフォーカス */
.focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* フォーカストラップ用 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 9.3 タッチターゲット
```css
/* 最小タッチターゲットサイズ：44px */
.btn, .input, .clickable {
  min-height: 44px;
  min-width: 44px;
}
```

## 10. CSS命名規則

### 10.1 BEM（Block Element Modifier）の採用
```css
/* Block */
.card {}

/* Element */
.card__header {}
.card__body {}
.card__footer {}

/* Modifier */
.card--elevated {}
.card--compact {}

/* 使用例 */
.search-form {}
.search-form__input {}
.search-form__button {}
.search-form--compact {}
```

### 10.2 ユーティリティクラス
```css
/* スペーシング */
.m-0 { margin: 0; }
.m-4 { margin: var(--spacing-4); }
.p-4 { padding: var(--spacing-4); }
.mx-auto { margin-left: auto; margin-right: auto; }

/* テキスト */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

/* 表示・非表示 */
.hidden { display: none; }
.sr-only { /* スクリーンリーダー用 */ }

/* フレックス */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
```

## 11. CSS Architecture

### 11.1 ファイル構成
```
src/styles/
├── globals.css           # グローバルスタイル
├── variables.css         # CSS変数定義
├── components/
│   ├── atoms/           # Atomコンポーネント
│   │   ├── Button.css
│   │   ├── Input.css
│   │   └── Label.css
│   ├── molecules/       # Moleculeコンポーネント
│   │   ├── FormField.css
│   │   └── SearchBox.css
│   └── organisms/       # Organismコンポーネント
│       ├── Header.css
│       └── DataTable.css
├── layouts/             # レイアウト
│   ├── Container.css
│   └── Grid.css
└── utilities/           # ユーティリティ
    ├── spacing.css
    ├── typography.css
    └── responsive.css
```

### 11.2 CSS読み込み順序
```css
/* 1. CSS変数・グローバル */
@import './variables.css';
@import './globals.css';

/* 2. Atomicデザイン階層順 */
@import './components/atoms/*.css';
@import './components/molecules/*.css';
@import './components/organisms/*.css';

/* 3. レイアウト */
@import './layouts/*.css';

/* 4. ユーティリティ（最優先） */
@import './utilities/*.css';
```

## 12. パフォーマンス考慮

### 12.1 CSS最適化
- Critical CSS の分離
- 不要なCSSの削除
- CSS Minification
- 重複スタイルの統合

### 12.2 レンダリング最適化
```css
/* GPU加速の活用 */
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}

/* レイアウトシフト防止 */
.aspect-ratio {
  aspect-ratio: 16 / 9;
}
```

## 13. 品質管理

### 13.1 CSS検証
- Stylelint による自動チェック
- CSS validation
- ブラウザ互換性チェック

### 13.2 メンテナンス性
- コンポーネント単位でのCSS管理
- CSS変数による統一性確保
- ドキュメント化とコメント記述

## 14. 改訂履歴

| 版 | 日付 | 作成者 | 改訂内容 |
|----|------|--------|----------|
| 1.0 | 2025-09-07 | フロントエンド設計チーム | 初版作成 |