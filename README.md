# StackPicks

中小企業のためのSaaS・AIツール比較メディア。

## 開発

```bash
npm install
npm run dev      # ローカル開発サーバー (localhost:4321)
npm run build    # 静的サイト生成 (dist/)
npm run preview  # ビルド結果のプレビュー
```

## 記事の追加

`src/content/articles/` にMarkdownファイルを追加するだけで記事ページが自動生成されます。

## デプロイ

Cloudflare Pages にGitHubリポジトリを接続。
- ビルドコマンド: `npm run build`
- 出力ディレクトリ: `dist`
