# Tasks: 神山まるごと高専 紹介LP

凡例: `[ ]` = 未着手 / `[~]` = 進行中 / `[x]` = 完了

各タスクは `requirements.md` の要件ID（R-xxx）と紐付け。

---

## Phase 1: 雛形セットアップ

### T-01. リポジトリ基盤ファイル
- [ ] `.nojekyll` を空ファイルでリポジトリ直下に作成
- [ ] `assets/css/`, `assets/js/`, `assets/img/` ディレクトリ作成
- **依存**: なし
- **要件**: R-DEP-04
- **検証**: `ls -la .nojekyll assets/{css,js,img}` で存在確認

### T-02. CSS基盤（トークン+リセット）
- [ ] `assets/css/styles.css` を作成
- [ ] `:root` に全Lusionトークンを CSS 変数として定義（design.md §5.1 のマッピングに従う）
- [ ] セマンティック別名定義（design.md §5.2）
- [ ] CSSリセット（box-sizing: border-box、margin/padding: 0、リスト記号除去）
- [ ] ベースタイポグラフィ（`html { font: var(--font-weight-base) var(--font-size-base)/var(--font-line-height-base) var(--font-family-primary); }`）
- [ ] フォーカスリング基底スタイル `:focus-visible { outline: var(--focus-ring); outline-offset: 2px; }`
- [ ] `prefers-reduced-motion` メディアクエリ
- **依存**: T-01
- **要件**: R-TOK-01, R-TOK-02, R-TOK-03, R-A11Y-02, R-A11Y-07

### T-03. JS雛形
- [ ] `assets/js/main.js` を作成（IIFE、空の `initMobileNav`/`initScrollReveal`/`initSmoothScroll` をスタブで定義）
- **依存**: T-01
- **要件**: R-NAV-03, R-NAV-04, R-NAV-05

### T-04. HTML雛形
- [ ] `index.html` を作成
  - `<!DOCTYPE html>`, `<html lang="ja">`
  - `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`
  - `<title>` `<meta name="description">`
  - OGP一式（`og:title`, `og:description`, `og:image=./assets/img/og.svg`, `og:url`, `og:type=website`）
  - `<link rel="icon" href="./assets/img/favicon.svg" type="image/svg+xml">`
  - `<link rel="stylesheet" href="./assets/css/styles.css">`
  - `<script src="./assets/js/main.js" defer></script>`
- **依存**: T-02, T-03
- **要件**: R-PAGE-02, R-PAGE-03, R-DEP-03

---

## Phase 2: セクション実装

### T-05. SVGアセット作成
- [ ] `assets/img/logo.svg`（テキストロゴ "神山まるごと高専"、横長）
- [ ] `assets/img/favicon.svg`（モノグラム、32x32 viewBox）
- [ ] `assets/img/og.svg`（1200x630、ヒーロー風）
- [ ] `assets/img/hero.svg`（抽象的なキャンパス・テクノロジーモチーフ）
- [ ] `assets/img/feature-tech.svg`, `feature-design.svg`, `feature-entrepreneur.svg`（各64x64アイコン）
- **依存**: T-01
- **要件**: R-HERO-02, R-ABOUT-02, R-PAGE-03

### T-06. ヘッダー実装
- [ ] HTML: `<header class="site-header">` + `<a class="logo">` + `<nav id="primary-nav">` + `<button class="nav-toggle" aria-controls="primary-nav" aria-expanded="false" aria-label="メニューを開く">`
- [ ] CSS: 固定ヘッダー、`--bg-inverse`、モバイルブレークポイントでハンバーガー切替
- [ ] JS: `initMobileNav()` 実装（クリックで開閉、`aria-expanded` 更新、Esc閉、フォーカス制御）
- **依存**: T-04
- **要件**: R-NAV-01, R-NAV-02, R-NAV-03, R-NAV-04

### T-07. ヒーロー実装
- [ ] HTML: `<section id="hero">` + `<h1>` + `<p class="lead">` + 2 CTA + ヒーローSVG
- [ ] CSS: 2カラム→1カラム、`--font-size-4xl`、`--space-8`
- **依存**: T-04, T-05
- **要件**: R-HERO-01, R-HERO-02

### T-08. 学校概要セクション
- [ ] HTML: `<section id="about">` + ミッション段落 + `.feature-grid` + 3 cards
- [ ] CSS: グリッドレイアウト、カードスタイル（`--bg-card`, `--radius-sm`, `--shadow-1`）
- [ ] ダミーテキスト3つ：テクノロジー / デザイン / 起業家精神
- **依存**: T-04, T-05
- **要件**: R-ABOUT-01, R-ABOUT-02

### T-09. カリキュラムセクション
- [ ] HTML: `<section id="curriculum">` + 4 step cards（1年〜4年）
- [ ] CSS: ステップ番号バッジ（`--radius-xl`、`--bg-inverse`）
- **依存**: T-04
- **要件**: R-CURR-01

### T-10. 入試リンクセクション
- [ ] HTML: `<section id="admission">` + 大型CTAバナー + 外部リンク（`https://kamiyama.ac.jp/admissions/` を仮設置、`target="_blank" rel="noopener noreferrer"`）
- [ ] CSS: フルワイド帯、`--bg-inverse`、`--radius-md`
- **依存**: T-04
- **要件**: R-ADM-01, R-ADM-02, NFR-SEC-01

### T-11. お問い合わせ・SNS + フッター
- [ ] HTML: `<section id="contact">` + `mailto:` リンク + SNSアイコン（X/Instagram/YouTubeのインラインSVG、`#` プレースホルダー、`aria-label` 必須）
- [ ] HTML: `<footer>` + コピーライト + サイトマップ
- [ ] CSS: `--bg-inverse`、`--font-size-xs`
- **依存**: T-04
- **要件**: R-CONT-01, R-FOOT-01

### T-12. JS - スクロール演出 & スムーススクロール
- [ ] `initScrollReveal()`: `IntersectionObserver` で `<section>` を監視し `.is-visible` 付与
- [ ] CSS: `.reveal { opacity: 0; transform: translateY(16px); transition: opacity var(--motion-duration-normal), transform var(--motion-duration-normal); } .reveal.is-visible { opacity: 1; transform: none; }`
- [ ] `initSmoothScroll()`: ナビアンカークリックで `scrollIntoView({ behavior: 'smooth' })` + 該当セクションに `tabindex="-1"` を付与してフォーカス
- **依存**: T-06, T-07, T-08, T-09, T-10, T-11
- **要件**: R-NAV-05, R-A11Y-07

---

## Phase 3: アクセシビリティ仕上げ

### T-13. a11y 監査と修正
- [ ] Lighthouse Accessibility 実行 → スコア ≥ 95
- [ ] axe DevTools 実行 → Critical/Serious 0
- [ ] キーボード手動テスト（Tab/Shift+Tab/Enter/Esc）
- [ ] 見出し階層チェック（h1=1個、h2セクションごと、h3=カード見出し）
- [ ] コントラスト計測（黒on白 = 21:1、白on#2b2e3a ≈ 12.6:1 → AA合格）
- [ ] フォーカスリング全要素で可視
- **依存**: Phase 2 完了
- **要件**: R-A11Y-01〜07

### T-14. レスポンシブ検証
- [ ] DevTools で 320 / 375 / 768 / 1024 / 1440 / 1920px を順に確認
- [ ] 横スクロール発生なし
- [ ] レイアウト崩れ修正
- **依存**: Phase 2 完了
- **要件**: R-RES-01, R-RES-02

---

## Phase 4: デプロイ

### T-15. GitHub Actions ワークフロー
- [ ] `.github/workflows/deploy-pages.yml` を作成
  - トリガ: `push: branches: [main]` + `workflow_dispatch`
  - `permissions: { contents: read, pages: write, id-token: write }`
  - `concurrency: { group: pages, cancel-in-progress: false }`
  - build job: `actions/checkout@v4` → `actions/configure-pages@v5` → `actions/upload-pages-artifact@v3` (path: `.`)
  - deploy job: `environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }` → `actions/deploy-pages@v4`
- **依存**: T-04 以降
- **要件**: R-DEP-01, R-DEP-02, R-DEP-05

### T-16. README更新
- [ ] `README.md` に公開URL `https://itogakuto.github.io/kmc-LP/` と簡単な概要を追記
- **依存**: なし
- **要件**: なし（運用整備）

### T-17. 手動デプロイ確認（ユーザー作業）
- [ ] GitHub リポジトリ Settings → Pages → Source を「GitHub Actions」に設定
- [ ] `main` に push → Actions 実行成功を確認
- [ ] 公開URLにアクセスし全7セクション表示
- [ ] DevTools Network タブで 404 なし
- **依存**: T-15
- **要件**: R-DEP-01, R-DEP-02

---

## Phase 5: REFLECT

### T-18. 最終レビュー
- [ ] grep で `styles.css` 内のハードコードされたカラーコード検出（`:root` 定義部分以外で `#[0-9a-fA-F]{3,6}` がヒットしないこと）
- [ ] スコープ外項目が混入していないか確認
- [ ] 受け入れチェックリスト（design.md §11.3）すべて ✓
- **依存**: 全Phase完了
- **要件**: R-TOK-02 検証

---

## 進捗トラッキング
| Phase | タスク数 | 完了 |
|---|---|---|
| Phase 1 | T-01 〜 T-04 (4) | 0 |
| Phase 2 | T-05 〜 T-12 (8) | 0 |
| Phase 3 | T-13 〜 T-14 (2) | 0 |
| Phase 4 | T-15 〜 T-17 (3) | 0 |
| Phase 5 | T-18 (1) | 0 |
| **合計** | **18** | **0** |
