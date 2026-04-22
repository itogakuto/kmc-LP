# Design: 神山まるごと高専 紹介LP

## 1. 設計意図
ビルド工程ゼロのプレーン静的サイトに `sorce-design.md` のデザイントークンをそのままCSS変数として注入し、Lusionトークンに対する忠実度・アクセシビリティ・保守性を最大化する。

## 2. 信頼度評価（Confidence Score）
- **Score: 92% (High Confidence)**
- 理由: 要件は明確、既知の静的サイトパターン、トークン定義が完備、デプロイ方式（GitHub Actions + Pages）も標準手順。
- 戦略: フル実装に直接進む。PoC不要。

## 3. アーキテクチャ

### 3.1 全体構成
```
ブラウザ ──HTTPS──> GitHub Pages CDN
                        ↑
                        │ deploy
                        │
              GitHub Actions (deploy-pages.yml)
                        ↑
                        │ push to main
                        │
                    開発者リポジトリ
```

### 3.2 ファイルツリー
```
/
├── index.html                          # 単一ページ
├── .nojekyll                           # Jekyll処理無効化（空ファイル）
├── README.md                           # 公開URL追記
├── assets/
│   ├── css/
│   │   └── styles.css                  # トークン定義+全スタイル
│   ├── js/
│   │   └── main.js                     # ナビトグル + IO
│   └── img/
│       ├── logo.svg
│       ├── favicon.svg
│       ├── og.svg                      # OGPプレースホルダー
│       ├── hero.svg
│       ├── feature-tech.svg
│       ├── feature-design.svg
│       └── feature-entrepreneur.svg
├── .github/
│   ├── sorce/sorce-design.md           # 既存（変更なし）
│   └── workflows/
│       └── deploy-pages.yml            # 新規
└── .spec/
    ├── requirements.md
    ├── design.md
    └── tasks.md
```

## 4. データフロー

### 4.1 ユーザー閲覧フロー
```
ユーザー → index.html → CSS適用 → 初回FCP
                ↓
            JS実行 → IntersectionObserver監視
                ↓
        スクロール → セクション可視化 → .is-visible クラス付与 → CSS transition
```

### 4.2 デプロイフロー
```
push to main
   ↓
[build job]
  - actions/checkout@v4
  - actions/configure-pages@v5
  - actions/upload-pages-artifact@v3 (path: '.')
   ↓
[deploy job]
  - actions/deploy-pages@v4 (environment: github-pages)
   ↓
公開URL: https://itogakuto.github.io/kmc-LP/
```

## 5. インターフェース定義

### 5.1 CSS変数命名規則
`sorce-design.md` のドット記法トークン名 → CSS変数（ドットをハイフンに変換、`--` プレフィックス）。

| トークン | CSS変数 |
|---|---|
| `color.text.primary` | `--color-text-primary` |
| `color.surface.muted` | `--color-surface-muted` |
| `color.surface.raised` | `--color-surface-raised` |
| `color.surface.strong` | `--color-surface-strong` |
| `color.text.tertiary` | `--color-text-tertiary` |
| `font.family.primary` | `--font-family-primary` |
| `font.size.xs ... 4xl` | `--font-size-xs ... --font-size-4xl` |
| `font.weight.base` | `--font-weight-base` |
| `font.lineHeight.base` | `--font-line-height-base` |
| `space.1 ... 8` | `--space-1 ... --space-8` |
| `radius.xs ... xl` | `--radius-xs ... --radius-xl` |
| `shadow.1` | `--shadow-1` |
| `motion.duration.instant/fast/normal/slow` | `--motion-duration-instant/fast/normal/slow` |

### 5.2 セマンティック別名（実用層）
```css
:root {
  --bg-page: var(--color-surface-muted);          /* #ffffff */
  --bg-section-alt: var(--color-text-tertiary);   /* #f0f1fa 淡い背景 */
  --bg-inverse: var(--color-surface-raised);      /* #2b2e3a ヘッダー/CTA帯 */
  --bg-card: var(--color-surface-strong);         /* #e4e6ef カード */
  --fg-default: var(--color-text-primary);        /* #000000 */
  --fg-inverse: var(--color-surface-muted);       /* #ffffff (on dark) */
  --focus-ring: 2px solid #005fcc;                /* AA対応リング色 */
}
```

### 5.3 JS API（main.js）
```js
// 単一ファイル、IIFE、依存ゼロ
(function() {
  initMobileNav();        // ハンバーガー開閉、aria-expanded制御、Esc閉
  initScrollReveal();     // IntersectionObserverで.is-visible付与
  initSmoothScroll();     // ナビアンカークリック時のスムーススクロール
})();
```

## 6. データモデル
データ永続化なし。ページ内コンテンツは静的HTMLにハードコード。

### 6.1 コンテンツモデル（HTML構造）
| セクション | 主要ノード | 主要トークン |
|---|---|---|
| ヘッダー | `<header role="banner">` + `<nav>` + `<button aria-controls>` | `--bg-inverse`, `--fg-inverse`, `--space-6` |
| ヒーロー | `<section id="hero">` + `<h1>` + 2 CTA | `--font-size-4xl`, `--space-8`, `--radius-xl` |
| 学校概要 | `<section id="about">` + 3 cards | `--bg-card`, `--radius-sm`, `--shadow-1` |
| カリキュラム | `<section id="curriculum">` + 4 step cards | `--space-7`, `--radius-sm` |
| 入試 | `<section id="admission">` + CTA banner | `--bg-inverse`, `--radius-md` |
| 連絡先 | `<section id="contact">` + mailto + SNS | `--space-6` |
| フッター | `<footer>` | `--bg-inverse`, `--font-size-xs` |

## 7. コンポーネント詳細

### 7.1 共通: ボタン
- **アンadmin**: `<a class="btn btn--primary">` または `<button class="btn">`
- **バリアント**: `btn--primary`（背景 `--bg-inverse`、文字 `--fg-inverse`）、`btn--secondary`（背景透明、ボーダー `--bg-inverse`、文字 `--fg-default`）
- **状態**:
  - default: `padding: var(--space-4) var(--space-7); border-radius: var(--radius-xl);`
  - hover: `transform: translateY(-1px); transition: transform var(--motion-duration-fast)`
  - focus-visible: `outline: 2px solid #005fcc; outline-offset: 2px;`
  - active: `transform: translateY(0);`
  - disabled: `opacity: 0.5; cursor: not-allowed;`

### 7.2 ヘッダー
- レイアウト: `position: sticky; top: 0; z-index: 100;` 背景 `--bg-inverse`、`backdrop-filter: blur(8px);`
- モバイル: `<button class="nav-toggle" aria-controls="primary-nav" aria-expanded="false">`
- `<nav id="primary-nav">` モバイル時 `display: none → flex`、JSで `[hidden]` 属性をトグル

### 7.3 ヒーロー
- 2カラム（デスクトップ）/ 1カラム（モバイル）
- 左: `<h1>` + サブ + CTA、右: `<img src="./assets/img/hero.svg" alt="">`（装飾なら `alt=""`、内容を伝えるなら適切な代替テキスト）

### 7.4 カードグリッド（特色・カリキュラム）
- `display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--space-7);`
- カード: `padding: var(--space-7); border-radius: var(--radius-sm); background: var(--bg-card); box-shadow: var(--shadow-1);`

## 8. レスポンシブ戦略
- モバイルファースト。ベース = モバイル、`@media (min-width: 768px)` でタブレット、`(min-width: 1024px)` でデスクトップ。
- ヒーロー: モバイル単カラム、デスクトップ2カラム（`grid-template-columns: 1fr 1fr`）
- ナビ: モバイルはハンバーガー、`min-width: 768px` で水平表示
- コンテナ: `max-width: 1200px; margin-inline: auto; padding-inline: var(--space-6);`

## 9. アニメーション設計
| 用途 | duration | timing |
|---|---|---|
| ボタン hover | `--motion-duration-fast` (250ms) | `ease-out` |
| ナビ開閉 | `--motion-duration-instant` (200ms) | `ease-in-out` |
| スクロール出現 | `--motion-duration-normal` (400ms) | `ease-out` |

`@media (prefers-reduced-motion: reduce)`:
```css
* { animation-duration: 0ms !important; transition-duration: 0ms !important; }
.is-visible { opacity: 1 !important; transform: none !important; }
```

## 10. エラーマトリクス

| エラー | 検出 | 対応 |
|---|---|---|
| CSS/JS の 404（base path不正） | DevTools Network | すべて `./assets/...` の相対パスに統一 |
| Jekyll が `_*` ファイルを除外 | デプロイ後の404 | `.nojekyll` 配置 |
| Actions の権限不足 | ワークフロー失敗 | `permissions: pages:write, id-token:write` |
| 同時デプロイ競合 | Actions UI で skip | `concurrency: pages` |
| 装飾SVGがSRに読まれる | axe警告 | `aria-hidden="true"` |
| ハンバーガーがキーボードで開けない | 手動確認 | `<button>` 要素＋`aria-expanded` |
| トークン未適用箇所 | コードレビュー / grep | スタイル内の `#xxxxxx` を grep で検出（`:root` 定義除く） |

## 11. テスト戦略

### 11.1 静的解析
- HTML: 手動 + `validator.w3.org`（任意）
- CSS: 重複/未使用変数の手動レビュー
- a11y: axe DevTools, Lighthouse

### 11.2 マニュアルテスト
1. **ローカル起動**: `python3 -m http.server 8000` → `http://localhost:8000`
2. **ブレークポイント**: 320 / 375 / 768 / 1024 / 1440 / 1920px で表示確認
3. **キーボード**: Tab / Shift+Tab / Enter / Esc のみで全操作
4. **スクリーンリーダー**: VoiceOver か NVDA で見出しジャンプ
5. **reduced motion**: OS設定で有効化して動きが止まることを確認
6. **デプロイ後**: 公開URLで Network タブ、Console エラー0確認

### 11.3 受け入れチェックリスト
- [ ] R-DEP-01〜05 すべて満たす
- [ ] R-PAGE-01〜03 すべて満たす
- [ ] R-NAV-01〜05 / R-HERO / R-ABOUT / R-CURR / R-ADM / R-CONT / R-FOOT すべて満たす
- [ ] R-TOK-01〜03 すべて満たす（grep 検証含む）
- [ ] R-A11Y-01〜07 すべて満たす
- [ ] R-RES-01〜02 すべて満たす
- [ ] NFR-PERF/SEC/MAINT すべて満たす

## 12. 決定記録

### Decision - Plain HTML over framework
- **Decision**: フレームワークやビルドツールを使わずプレーンHTML/CSS/JSを採用
- **Context**: 単一ページのLP、依存最小化が要望
- **Options**: (a) Plain (b) Vite+VanillaJS (c) Astro
- **Rationale**: ビルドステップなし → デバッグ容易・サプライチェーンリスク0・Pages配信が単純
- **Impact**: 将来的に複雑化する場合は Astro への移行容易性を維持（コンポーネント分離をHTMLコメントで明示）
- **Review**: コンテンツが10ページ超になるか、動的機能が必要になった時点

### Decision - GitHub Actions over Branch deploy
- **Decision**: ビルド不要だが `actions/deploy-pages` を採用
- **Context**: ユーザー要望
- **Options**: (a) Branch deploy (b) Actions deploy
- **Rationale**: 将来ビルドが必要になった際の拡張容易性、デプロイ履歴の可視性
- **Impact**: ワークフロー定義が必要だが、テンプレ流用で軽微
- **Review**: 不要

### Decision - Aeonik フォントフォールバック
- **Decision**: Aeonik 実フォントを配信せず、CSS の `font-family` 宣言のみ含める
- **Context**: Aeonik は商用ライセンス、Web配信不可
- **Options**: (a) Web配信（不可） (b) フォールバックのみ (c) 別フォント代替
- **Rationale**: トークン値（`font.family.primary=Aeonik`）を変えずに、フォールバック群で日本語＋ラテン両対応
- **Impact**: Aeonik 環境では正規表示、未インストール環境ではシステムフォント表示
- **Review**: 公式フォントが許諾された場合
