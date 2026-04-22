# Requirements: 神山まるごと高専 紹介LP

## 1. 背景・目的
神山まるごと高専を紹介する1ページ構成のランディングページ（LP）を、GitHub Pages 上で公開する。`'.github/sorce/sorce-design.md'` で定義された Lusion デザイントークンを忠実に適用し、アクセシブルで保守容易な静的サイトを提供する。

## 2. ステークホルダー
- **オーナー**: itogakuto（リポジトリ所有者）
- **想定読者**: 中学生・保護者・教育関係者・志望者
- **公開URL**: `https://itogakuto.github.io/kmc-LP/`

## 3. スコープ
### In Scope
- 単一HTMLページ（プレーンHTML/CSS/JS、ビルドなし）
- ヘッダー / ヒーロー / 学校概要 / カリキュラム / 入試リンク / お問い合わせ・SNS / フッター
- レスポンシブ対応（モバイル・タブレット・デスクトップ）
- WCAG 2.2 AA 準拠
- GitHub Actions による自動デプロイ
- AI生成のダミーテキストとSVGプレースホルダー画像

### Out of Scope
- 英語版（多言語対応）
- 公式サイト（kamiyama.ac.jp）からの実コンテンツ転載
- 問い合わせフォームのバックエンド（`mailto:` のみ）
- カスタムドメイン設定
- Aeonikフォントの実配信（ライセンス上不可、フォールバックのみ）

## 4. 機能要件（EARS Notation）

### 4.1 配信・デプロイ
- **R-DEP-01**: WHEN `main` ブランチに `push` された場合、THE SYSTEM SHALL GitHub Actions ワークフローを起動して GitHub Pages にデプロイする。
- **R-DEP-02**: THE SYSTEM SHALL `https://itogakuto.github.io/kmc-LP/` でサイトを配信する。
- **R-DEP-03**: THE SYSTEM SHALL すべてのアセット参照に相対パス（`./assets/...`）を使用し、プロジェクトページ配信パス `/kmc-LP/` で 404 が発生しない構成にする。
- **R-DEP-04**: THE SYSTEM SHALL リポジトリルートに `.nojekyll` を配置し、Jekyll 処理を無効化する。
- **R-DEP-05**: WHERE GitHub Actions ワークフローが定義される場合、THE SYSTEM SHALL `permissions: contents:read, pages:write, id-token:write` および `concurrency: { group: pages, cancel-in-progress: false }` を設定する。

### 4.2 ページ構成
- **R-PAGE-01**: THE SYSTEM SHALL 1つの `index.html` で以下の7セクションを順に表示する: ヘッダー / ヒーロー / 学校概要 / カリキュラム / 入試リンク / お問い合わせ・SNS / フッター。
- **R-PAGE-02**: THE SYSTEM SHALL ページ全体で `<html lang="ja">` を宣言する。
- **R-PAGE-03**: THE SYSTEM SHALL `meta viewport`、OGP（og:title, og:description, og:image, og:url, og:type）、favicon を `<head>` 内に含める。

### 4.3 ヘッダー / ナビゲーション
- **R-NAV-01**: THE SYSTEM SHALL 固定ヘッダーにロゴと4項目（概要・カリキュラム・入試・お問い合わせ）のナビ、CTAボタンを表示する。
- **R-NAV-02**: WHEN ビューポート幅が 768px 未満の場合、THE SYSTEM SHALL ナビをハンバーガーメニューに切り替える。
- **R-NAV-03**: WHEN ハンバーガーボタンが押された場合、THE SYSTEM SHALL メニューの開閉を行い、`aria-expanded` を `true`/`false` に切り替える。
- **R-NAV-04**: WHILE モバイルメニューが開いている場合、IF `Esc` キーが押されたら THE SYSTEM SHALL メニューを閉じてフォーカスをハンバーガーボタンに戻す。
- **R-NAV-05**: WHEN ナビ内のアンカーリンクがクリックされた場合、THE SYSTEM SHALL 該当セクションへスムーススクロールし、フォーカスを移す。

### 4.4 ヒーロー
- **R-HERO-01**: THE SYSTEM SHALL `font.size.4xl` の大見出し（`<h1>`）、サブコピー、CTA を2つ（プライマリ・セカンダリ）、メインビジュアルSVGを配置する。
- **R-HERO-02**: THE SYSTEM SHALL ヒーロービジュアルは `assets/img/hero.svg` から読み込む。

### 4.5 学校概要
- **R-ABOUT-01**: THE SYSTEM SHALL ミッションステートメント1段落と、3つの特色カードのグリッドを表示する。
- **R-ABOUT-02**: 各特色カードは見出し（`<h3>`）・本文・アイコンSVGを含む。

### 4.6 カリキュラム
- **R-CURR-01**: THE SYSTEM SHALL 4年間の学びを4枚のステップカードで表示する（1年:基礎 / 2年:専門 / 3年:応用 / 4年:実践）。

### 4.7 入試リンク
- **R-ADM-01**: THE SYSTEM SHALL 入試・募集要項への大型CTAバナーを設置する。
- **R-ADM-02**: WHERE 外部リンクを使用する場合、THE SYSTEM SHALL `target="_blank" rel="noopener noreferrer"` を付与する。

### 4.8 お問い合わせ・SNS / フッター
- **R-CONT-01**: THE SYSTEM SHALL `mailto:` リンクと SNS アイコン（インラインSVG）を表示する。
- **R-FOOT-01**: THE SYSTEM SHALL コピーライト表記とサイトマップ（セクション内アンカー一覧）をフッターに表示する。

### 4.9 デザイントークン適用
- **R-TOK-01**: THE SYSTEM SHALL `'.github/sorce/sorce-design.md'` で定義された全トークンを `:root` の CSS カスタムプロパティとして定義する（命名規則: `color.text.primary` → `--color-text-primary`）。
- **R-TOK-02**: THE SYSTEM SHALL コンポーネントのスタイル指定でハードコードされたカラー/スペース/半径値を使用せず、必ず CSS 変数を参照する。
- **R-TOK-03**: THE SYSTEM SHALL `font-family: Aeonik, "Helvetica Neue", "Hiragino Sans", "Yu Gothic", sans-serif` をフォールバックとして指定する。

### 4.10 アクセシビリティ
- **R-A11Y-01**: THE SYSTEM SHALL WCAG 2.2 AA を満たす。
- **R-A11Y-02**: THE SYSTEM SHALL すべてのインタラクティブ要素に `:focus-visible` の可視フォーカスリングを表示する（コントラスト比 ≥ 3:1）。
- **R-A11Y-03**: THE SYSTEM SHALL 本文テキスト（`color.text.primary` on `color.surface.muted`）と CTA テキスト（白 on `color.surface.raised`）でコントラスト比 ≥ 4.5:1 を満たす。
- **R-A11Y-04**: THE SYSTEM SHALL Tab キーのみで全インタラクティブ要素に到達可能とする。
- **R-A11Y-05**: THE SYSTEM SHALL 見出し階層を `h1` → `h2` → `h3` の順で論理的に構築する（`h1` はページ内に1つ）。
- **R-A11Y-06**: THE SYSTEM SHALL 情報を持つ画像に `alt` 属性を、装飾SVGに `aria-hidden="true"` を付与する。
- **R-A11Y-07**: WHERE `prefers-reduced-motion: reduce` がユーザー設定で有効な場合、THE SYSTEM SHALL アニメーションとトランジションを無効化または最小化する。

### 4.11 レスポンシブ
- **R-RES-01**: THE SYSTEM SHALL ビューポート幅 320px 〜 1920px の範囲で横スクロールを発生させずに表示する。
- **R-RES-02**: ブレークポイント: モバイル `< 768px`、タブレット `768px–1023px`、デスクトップ `≥ 1024px`。

## 5. 非機能要件
- **NFR-PERF-01**: 初回読み込みのアセット合計サイズは 500 KB 未満（ダミー画像はSVGのみ）。
- **NFR-PERF-02**: Lighthouse Performance スコア ≥ 90、Accessibility ≥ 95、Best Practices ≥ 95。
- **NFR-SEC-01**: 外部リンクには `rel="noopener noreferrer"` を付与する（タブナビゲーション攻撃防止）。
- **NFR-SEC-02**: 外部スクリプト・外部CDNへの依存をゼロにする（サプライチェーン攻撃面の最小化）。
- **NFR-MAINT-01**: トーン: 簡潔・断定的・実装志向（`sorce-design.md` の Writing Tone に準拠）。

## 6. 受け入れ基準（要約）
1. `https://itogakuto.github.io/kmc-LP/` で全7セクションが表示される。
2. 公開後の DevTools Network タブで CSS/JS/画像の 404 が発生しない。
3. Lighthouse Accessibility スコア ≥ 95、axe DevTools の Critical 違反 0。
4. キーボードのみで全リンク・ボタンに到達でき、フォーカスリングが常に可視。
5. 320px 〜 1920px で横スクロールなし。
6. すべての CSS スタイルが `:root` の CSS 変数を参照（grep で生のカラーコード `#[0-9a-f]{3,6}` がスタイルファイルにヒットしない、ただし `:root` 定義部分を除く）。
