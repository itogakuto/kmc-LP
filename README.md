# ghcp-school-intro

神山まるごと高専の紹介ページ（デモ）です。プレーンHTML/CSS/JSで実装し、GitHub Pages で公開します。

公開URL: https://itogakuto.github.io/kmc-LP/

## ローカル確認

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いて確認できます。

## デプロイ

`main` ブランチに push すると `.github/workflows/deploy-pages.yml` により GitHub Pages へデプロイされます。