# 防災士研修センター会場管理システム レスポンシブデザイン仕様書

## 1. 文書概要

### 1.1 文書の目的
本文書は、防災士研修センター会場管理システムのレスポンシブデザインの設計仕様について定義する。
モバイルとデスクトップの両環境で最適なユーザー体験を提供するための具体的な実装指針を示す。

### 1.2 対象デバイス・環境
- **デスクトップ**：1920×1080以上（主要対象）
- **ラップトップ**：1366×768以上
- **モバイル**：375×667以上（iPhone SE以上）
- **タブレット**：対象外（要件から除外）

### 1.3 関連文書
- デザインシステム・CSS設計書（style_guide.md）
- 非機能要件定義書（non_functional_requirements.md）
- Atomicデザイン設計（atomic_design.md）

## 2. レスポンシブデザイン戦略

### 2.1 Mobile-First アプローチ
基本方針としてMobile-Firstを採用し、小さい画面から大きい画面へと段階的に拡張する設計とする。

```css
/* ベース：モバイル（375px〜） */
.container {
  padding: 1rem;
  max-width: 100%;
}

/* デスクトップ（768px〜） */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### 2.2 ブレイクポイント戦略

#### 2.2.1 主要ブレイクポイント
```css
/* CSS Custom Properties */
:root {
  --breakpoint-mobile: 375px;   /* モバイル最小 */
  --breakpoint-desktop: 768px;  /* デスクトップ開始 */
  --breakpoint-large: 1024px;   /* 大画面デスクトップ */
  --breakpoint-xlarge: 1280px;  /* 特大画面 */
}

/* Media Queries */
@media (max-width: 767px) {
  /* モバイルスタイル */
}

@media (min-width: 768px) {
  /* デスクトップスタイル */
}

@media (min-width: 1024px) {
  /* 大画面デスクトップ */
}

@media (min-width: 1280px) {
  /* 特大画面対応 */
}
```

## 3. レイアウト設計

### 3.1 グリッドシステム

#### 3.1.1 フレキシブルグリッド
```css
/* ベースグリッド */
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr; /* モバイル：1カラム */
}

@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .grid-cols-auto {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

/* アスペクト比対応 */
.grid-item-aspect {
  aspect-ratio: 1 / 1; /* 正方形 */
}

@media (max-width: 767px) {
  .grid-item-aspect {
    aspect-ratio: 16 / 9; /* モバイルは横長 */
  }
}
```

#### 3.1.2 コンテナ設計
```css
/* メインコンテナ */
.container {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
    max-width: 1200px;
  }
}

/* セクションコンテナ */
.section {
  padding: 2rem 0;
}

@media (min-width: 768px) {
  .section {
    padding: 4rem 0;
  }
}
```

### 3.2 レイアウトパターン

#### 3.2.1 サイドバーレイアウト
```css
/* モバイル：縦積み */
.layout-sidebar {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sidebar {
  order: 2; /* モバイルではメインコンテンツの後 */
  background: #f8f9fa;
  padding: 1rem;
}

.main-content {
  order: 1;
  flex: 1;
  padding: 1rem;
}

/* デスクトップ：横並び */
@media (min-width: 768px) {
  .layout-sidebar {
    flex-direction: row;
  }
  
  .sidebar {
    order: 1; /* デスクトップでは左側 */
    width: 280px;
    flex-shrink: 0;
    padding: 2rem;
  }
  
  .main-content {
    order: 2;
    padding: 2rem;
  }
}
```

#### 3.2.2 カードレイアウト
```css
/* カードグリッド */
.card-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr; /* モバイル：1カラム */
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

/* カード内要素 */
.card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-body {
  padding: 1rem;
}

@media (min-width: 768px) {
  .card-body {
    padding: 1.5rem;
  }
}
```

## 4. コンポーネント別レスポンシブ設計

### 4.1 ナビゲーション

#### 4.1.1 ヘッダーナビゲーション
```css
/* ヘッダー */
.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  min-height: 64px;
}

@media (min-width: 768px) {
  .header-container {
    padding: 0 2rem;
  }
}

/* ロゴ */
.header-logo {
  font-size: 1.125rem;
  font-weight: 700;
  color: #059669;
}

@media (min-width: 768px) {
  .header-logo {
    font-size: 1.25rem;
  }
}
```

#### 4.1.2 モバイルメニュー
```css
/* ハンバーガーボタン（モバイルのみ） */
.mobile-menu-button {
  display: block;
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
}

@media (min-width: 768px) {
  .mobile-menu-button {
    display: none;
  }
}

/* モバイルメニュー */
.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mobile-menu.open {
  display: block;
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none !important;
  }
}

/* デスクトップナビゲーション */
.desktop-nav {
  display: none;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}

.nav-link {
  padding: 0.5rem;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  min-height: 44px; /* タッチターゲット */
  display: flex;
  align-items: center;
}

@media (max-width: 767px) {
  .nav-link {
    display: block;
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
}
```

### 4.2 フォーム要素

#### 4.2.1 入力フィールド
```css
/* フォームフィールド */
.form-field {
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .form-field {
    margin-bottom: 1.5rem;
  }
}

/* 入力要素 */
.input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  min-height: 44px; /* タッチターゲット */
}

@media (min-width: 768px) {
  .input {
    padding: 0.75rem 1rem;
  }
}

/* 複数カラムフォーム */
.form-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .form-grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### 4.2.2 ボタン
```css
/* ベースボタン */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  min-height: 44px; /* タッチターゲット */
  text-decoration: none;
}

/* モバイルでフルワイド */
@media (max-width: 767px) {
  .btn-mobile-full {
    width: 100%;
    margin-bottom: 0.75rem;
  }
  
  .btn-group .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .btn-group .btn:last-child {
    margin-bottom: 0;
  }
}

/* デスクトップでの横並び */
@media (min-width: 768px) {
  .btn-group {
    display: flex;
    gap: 0.75rem;
  }
}
```

### 4.3 テーブル・リスト

#### 4.3.1 データテーブル
```css
/* テーブルコンテナ */
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.data-table {
  width: 100%;
  min-width: 600px; /* 最小幅確保 */
  border-collapse: collapse;
  background: white;
}

@media (min-width: 768px) {
  .data-table {
    min-width: auto;
  }
}

.data-table th {
  background: #f9fafb;
  padding: 0.75rem 0.5rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  white-space: nowrap;
}

.data-table td {
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .data-table th,
  .data-table td {
    padding: 1rem;
    font-size: 1rem;
  }
}
```

#### 4.3.2 カード形式リスト（モバイル代替）
```css
/* モバイル用カードリスト */
.mobile-card-list {
  display: block;
}

@media (min-width: 768px) {
  .mobile-card-list {
    display: none;
  }
}

.list-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.list-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.list-card-title {
  font-weight: 600;
  color: #1f2937;
  font-size: 1.125rem;
}

.list-card-meta {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.list-card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}
```

### 4.4 モーダル・ダイアログ

#### 4.4.1 モーダル
```css
/* モーダルオーバーレイ */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

/* モーダルコンテンツ */
.modal-content {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 500px;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
}

@media (max-width: 767px) {
  .modal-content {
    max-width: 100%;
    margin: 0;
    border-radius: 0.75rem 0.75rem 0 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  .modal-overlay {
    align-items: flex-end;
    padding: 0;
  }
}

.modal-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.75rem;
}

@media (max-width: 767px) {
  .modal-footer {
    flex-direction: column-reverse;
  }
  
  .modal-footer .btn {
    width: 100%;
  }
}
```

## 5. タイポグラフィ・間隔のレスポンシブ対応

### 5.1 フォントサイズ

#### 5.1.1 見出しのスケーリング
```css
.heading-1 {
  font-size: 1.875rem; /* モバイル：30px */
  line-height: 1.2;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .heading-1 {
    font-size: 2.25rem; /* デスクトップ：36px */
    margin-bottom: 1.5rem;
  }
}

.heading-2 {
  font-size: 1.5rem; /* モバイル：24px */
  line-height: 1.3;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

@media (min-width: 768px) {
  .heading-2 {
    font-size: 1.875rem; /* デスクトップ：30px */
    margin-bottom: 1rem;
  }
}

.heading-3 {
  font-size: 1.25rem; /* モバイル：20px */
  line-height: 1.4;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .heading-3 {
    font-size: 1.5rem; /* デスクトップ：24px */
    margin-bottom: 0.75rem;
  }
}
```

#### 5.1.2 本文テキスト
```css
.text-body {
  font-size: 0.875rem; /* モバイル：14px */
  line-height: 1.6;
  color: #4b5563;
}

@media (min-width: 768px) {
  .text-body {
    font-size: 1rem; /* デスクトップ：16px */
    line-height: 1.5;
  }
}

.text-small {
  font-size: 0.75rem; /* モバイル：12px */
  line-height: 1.5;
  color: #6b7280;
}

@media (min-width: 768px) {
  .text-small {
    font-size: 0.875rem; /* デスクトップ：14px */
  }
}
```

### 5.2 スペーシング

#### 5.2.1 マージン・パディング
```css
/* セクション間隔 */
.section-spacing {
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .section-spacing {
    margin-bottom: 4rem;
  }
}

/* カード内部の間隔 */
.card-padding {
  padding: 1rem;
}

@media (min-width: 768px) {
  .card-padding {
    padding: 1.5rem;
  }
}

/* フォーム要素間隔 */
.form-spacing {
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .form-spacing {
    margin-bottom: 1.5rem;
  }
}
```

## 6. パフォーマンス最適化

### 6.1 画像のレスポンシブ対応

#### 6.1.1 レスポンシブ画像
```css
/* 基本レスポンシブ画像 */
.responsive-image {
  max-width: 100%;
  height: auto;
  display: block;
}

/* アスペクト比維持 */
.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
}

.image-16-9 {
  aspect-ratio: 16 / 9;
}

.image-4-3 {
  aspect-ratio: 4 / 3;
}

.image-square {
  aspect-ratio: 1 / 1;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

#### 6.1.2 遅延読み込み
```html
<!-- 遅延読み込み対応画像 -->
<img 
  src="placeholder.jpg" 
  data-src="actual-image.jpg"
  loading="lazy"
  class="responsive-image"
  alt="画像の説明"
/>
```

### 6.2 CSS最適化

#### 6.2.1 Critical CSS
```css
/* Critical CSS: Above-the-fold content */
/* ヘッダー、ナビゲーション、ファーストビューのみ */
.header { /* ... */ }
.main-nav { /* ... */ }
.hero-section { /* ... */ }
```

#### 6.2.2 メディアクエリの最適化
```css
/* 効率的なメディアクエリ */
@media (max-width: 767px) {
  /* モバイル専用スタイルをまとめる */
  .mobile-hidden { display: none; }
  .mobile-full { width: 100%; }
  .mobile-stack { flex-direction: column; }
}

@media (min-width: 768px) {
  /* デスクトップ専用スタイルをまとめる */
  .desktop-flex { display: flex; }
  .desktop-grid { display: grid; }
  .desktop-inline { display: inline-block; }
}
```

## 7. タッチ・ジェスチャー対応

### 7.1 タッチターゲット

#### 7.1.1 最小タッチサイズ
```css
/* 最小44px×44pxのタッチターゲット */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* インタラクティブ要素 */
.btn,
.form-control,
.nav-link,
.clickable {
  min-height: 44px;
}

@media (min-width: 768px) {
  /* デスクトップでは小さくてもOK */
  .btn-sm {
    min-height: 36px;
  }
}
```

#### 7.1.2 タッチフィードバック
```css
/* タッチ時のフィードバック */
.btn:active {
  transform: scale(0.98);
}

.card:active {
  background-color: #f9fafb;
}

/* iOS Safari対応 */
.touch-element {
  -webkit-tap-highlight-color: rgba(59, 130, 246, 0.1);
}
```

### 7.2 スワイプ・スクロール

#### 7.2.1 横スクロール対応
```css
/* 横スクロールコンテナ */
.horizontal-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
}

.horizontal-scroll > * {
  flex: 0 0 auto;
  scroll-snap-align: start;
}

/* スクロールバー非表示（webkit） */
.horizontal-scroll::-webkit-scrollbar {
  display: none;
}
```

## 8. アクセシビリティ

### 8.1 キーボードナビゲーション

#### 8.1.1 フォーカス管理
```css
/* フォーカス表示 */
.focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* スキップリンク */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

### 8.2 スクリーンリーダー対応

#### 8.2.1 視覚的に隠す
```css
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

## 9. テスト・検証

### 9.1 レスポンシブテスト

#### 9.1.1 テスト対象デバイス
| デバイス | 画面サイズ | 備考 |
|----------|------------|------|
| iPhone SE | 375×667 | 最小モバイル |
| iPhone 12 Pro | 390×844 | 標準モバイル |
| iPad Air | 820×1180 | 参考（タブレット除外） |
| MacBook Air | 1440×900 | 標準ラップトップ |
| Desktop FHD | 1920×1080 | 標準デスクトップ |

#### 9.1.2 チェック項目
- [ ] 全ての要素が適切に表示される
- [ ] タッチターゲットが44px以上
- [ ] 横スクロールが発生しない
- [ ] フォントサイズが読みやすい
- [ ] フォームが使いやすい
- [ ] ナビゲーションが機能する

### 9.2 パフォーマンステスト

#### 9.2.1 測定項目
- First Contentful Paint (FCP): 1.8秒以内
- Largest Contentful Paint (LCP): 2.5秒以内
- Cumulative Layout Shift (CLS): 0.1以内
- First Input Delay (FID): 100ms以内

## 10. 実装ガイドライン

### 10.1 開発時の注意点

#### 10.1.1 CSS設計
- モバイルファーストでCSS記述
- メディアクエリは機能単位でまとめる
- タッチターゲットサイズを必ず確保
- パフォーマンスを意識したセレクター使用

#### 10.1.2 テストフロー
1. Chrome DevToolsでモバイル表示確認
2. 実機での動作テスト
3. 各ブレイクポイントでのレイアウト確認
4. タッチ操作の検証
5. パフォーマンス測定

## 11. 改訂履歴

| 版 | 日付 | 作成者 | 改訂内容 |
|----|------|--------|----------|
| 1.0 | 2025-09-07 | フロントエンド設計チーム | 初版作成 |