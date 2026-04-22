# Plan: 神山まるごと高専 紹介LPをGitHub Pagesで公開

プレーンHTML/CSS/JSで1ページ構成のLPを作成し、`sorce-design.md`のトークンをCSS変数として忠実に実装。GitHub Actions（`actions/deploy-pages`）でリポジトリルートをアップロードし、`https://itogakuto.github.io/kmc-LP/` で配信します。文言はAI生成ダミー、画像はSVGプレースホルダー。

## Steps

### Phase 1: 雛形セットアップ
1. リポジトリ直下に `index.html`（`lang="ja"`、viewport、OGP、favicon）を作成
2. `assets/css/styles.css` を作成し、`:root` にデザイントークン全部をCSS変数化（`--color-text-primary`, `--space-6`, `--radius-md` など）。リセット・タイポグラフィベース・ユーティリティを定義
3. `assets/js/main.js` を作成（ナビトグル + `IntersectionObserver` で出現アニメ）
4. `.nojekyll` を空ファイルで配置

### Phase 2: セクション実装（Phase 1完了後）
5. ヘッダー（固定、ロゴ、ナビ4項目、CTA、モバイルはハンバーガー）
6. ヒーロー（`font.size.4xl` 大見出し、CTA×2、`hero.svg`）
7. 学校概要（ミッション + 「3つの特色」カードグリッド）
8. カリキュラム（4年間の学びをステップカードで）
9. 入試・募集要項リンク（大型CTAバナー、外部リンクは `#` プレースホルダー）
10. お問い合わせ・SNS + フッター

### Phase 3: アクセシビリティ仕上げ（Phase 2後）
11. `:focus-visible` 明示、コントラストAA以上
12. キーボード操作完全対応（`aria-expanded`/`aria-controls`、Escでメニュー閉）
13. 見出し階層・alt属性・装飾SVGの`aria-hidden`整備
14. `prefers-reduced-motion` 対応

### Phase 4: デプロイ（Phase 1と並行可）
15. `.github/workflows/deploy-pages.yml`（`configure-pages@v5` → `upload-pages-artifact@v3` (path: `.`) → `deploy-pages@v4`、`permissions: pages:write, id-token:write`、`concurrency: pages`）
16. アセット参照はすべて相対パス `./assets/...`（base path `/kmc-LP/` で動作確実化）
17. **手動作業**: Settings → Pages → Source を「GitHub Actions」に切り替え

## Relevant files
- `.github/sorce/sorce-design.md` — トークン一次情報源
- `index.html` / `assets/css/styles.css` / `assets/js/main.js` — 新規作成
- `.github/workflows/deploy-pages.yml` — 新規作成
- `.nojekyll` — 新規作成
- `README.md` — 公開URLを追記

## Verification
1. ローカル: `python3 -m http.server` で表示確認（PC幅 + モバイル375px）
2. Lighthouse Accessibility ≥ 95、axe DevTools で重大違反0
3. Tabキーのみで全リンク到達・フォーカスリング常時可視
4. デプロイ後 `https://itogakuto.github.io/kmc-LP/` を開き、Network タブで CSS/JS/画像の404が無いこと

## Decisions
- **Aeonikフォント**: 有償フォントのため配信せず、`font-family: Aeonik, "Helvetica Neue", "Hiragino Sans", "Yu Gothic", sans-serif` のフォールバック方針（トークン値自体は変更しない）
- ビルド不要だがユーザー要望に従いActionsデプロイ採用（将来拡張容易）
- 画像はリポジトリ同梱SVG（外部CDN依存なし）

## スコープ外
- 英語版
- 公式サイトからの実コンテンツ転載
- 問い合わせフォームのバックエンド（mailto:のみ）
- カスタムドメイン

## Further Considerations
1. 入試リンク先URLはプレースホルダー `#` のままで良いか、それとも公式サイトへの外部リンク（例: `https://kamiyama.ac.jp/admissions/`）を埋め込んで良いか？ → 推奨: **公式サイトURLを埋め込み**（`target="_blank" rel="noopener"`）
2. ファビコン/OGP画像もSVGプレースホルダーで作って良いか？ → 推奨: **作成**（`assets/img/og.svg` + `favicon.svg`）
