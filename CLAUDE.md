# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StackPicks (stackpicks.jp) is a Japanese SaaS / AI tool comparison media site targeting small and mid-sized businesses (中小企業). The site is built as a fully static Astro site, deployed to Cloudflare Pages from `main` via `.github/workflows/deploy.yml` (the workflow runs `npm ci && npm run build`, then `pages deploy dist --project-name stackpicks`).

All user-facing copy is in Japanese. When writing or editing content (articles, UI strings, meta descriptions), keep the tone, vocabulary, and target audience consistent with the existing Japanese content.

## Commands

```bash
npm install
npm run dev      # Local dev server (localhost:4321)
npm run build    # Static build → dist/
npm run preview  # Preview the built site
```

There is no test runner, linter, or formatter configured. TypeScript strictness comes from `astro/tsconfigs/strict` via `tsconfig.json`; the only type checking happens during `astro build` (and in the editor).

## Architecture

### Content-driven, two-page site

The site has effectively two route templates, both in `src/pages/`:

- `index.astro` — homepage. Loads all non-draft articles from the `articles` collection and renders them as `ArticleCard`s, sorted by `publishDate` descending.
- `articles/[slug].astro` — per-article page. Uses `getStaticPaths` over the `articles` collection; the URL slug is the article's `id` (its filename without `.md`).

Everything else (`/category/*` links in the Header) is currently a dead link — those routes don't exist yet. If asked to add a category page, follow the same pattern: a new file under `src/pages/` that filters `getCollection('articles')`.

### Content collection schema

`src/content.config.ts` defines a single collection, `articles`, loaded via `glob` from `src/content/articles/**/*.md`. The Zod schema is the source of truth for article frontmatter; any new field (e.g., `author`, `relatedSlugs`) must be added here first or `astro build` will fail with a schema error.

Required fields: `title`, `description`, `category`, `tags[]`, `publishDate`.
Optional: `updateDate`, `heroImage`, `affiliate[]` (each item: `name`, `url`, optional `cta`), `draft` (defaults to `false`).

`publishDate` and `updateDate` are coerced from the YAML date — write them as `2026-05-15`, not as strings.

### Layouts and components

Two layouts wrap every page:

- `BaseLayout.astro` — `<html>`, `<head>` (via `SEOHead`), Google Analytics (gtag `G-WRFZQMRZDT`), Header, `<slot />`, Footer. Used directly by `index.astro`.
- `ArticleLayout.astro` — wraps `BaseLayout`, renders the article header (category, title, dates), `AffiliateCTA` (rendered twice — above and below the body), `<slot />` for the markdown content, tag list, and `ArticleDisclaimer`. Used by `articles/[slug].astro`.

Components in `src/components/` are presentation-only `.astro` files with typed `Props` interfaces. No client-side JS framework — no React, Vue, etc. If interactivity is needed, prefer vanilla `<script>` tags or Astro's `client:*` directives.

### Styling

A single global stylesheet, `src/styles/global.css`, is imported once in `BaseLayout.astro`. Design tokens live in `:root` CSS variables (`--c-*` for colors, `--fs-*` for font sizes, `--sp-*` for spacing). When adding new styles, reuse these variables instead of hard-coding values.

Article markdown can use these scoped utility classes (defined under `.article-body` in `global.css`) inline with raw HTML:

- `box-point`, `box-warning`, `box-info`, `box-success` — colored callout boxes
- `comparison-table` — styled comparison `<table>`
- `checklist` — `<ul>` with custom checkmark bullets
- `author-note` — author signature block
- `vs-label` — small pill label
- `hero-img`, `article-img` — image sizing for in-article images

These are not components; they're plain CSS classes applied via the inline HTML that markdown allows.

## Authoring articles

Articles are pure Markdown files in `src/content/articles/<slug>.md`. The filename (without `.md`) becomes the URL slug at `/articles/<slug>/`. Look at any existing file (e.g., `notion-vs-obsidian-2026.md`) before authoring — they follow a consistent house style:

- YAML frontmatter matches the Zod schema (`src/content.config.ts`).
- Hero image path is `/images/articles/hero-<topic>.jpg`, stored in `public/images/articles/`.
- Body mixes Markdown with the inline HTML utility classes listed above.
- Affiliate links are surfaced both via the `affiliate:` frontmatter (rendered as CTAs by `AffiliateCTA`) and inline; outbound affiliate `<a>` tags should carry `rel="noopener noreferrer sponsored"` and `target="_blank"` to match `AffiliateCTA.astro`.
- Disclaimer text (`ArticleDisclaimer.astro`) is appended automatically — don't duplicate it inside the markdown.

Set `draft: true` to keep an article out of the homepage listing while still building locally; `getCollection` filtering on `index.astro` excludes drafts but `[slug].astro` does **not**, so drafts are still accessible by direct URL during preview.

`src/content/topic-backlog.md` is the editorial pipeline — not a build artifact and not rendered. Update it when starting/shipping articles so the team can see what's in flight.

## Conventions worth preserving

- Site `site:` in `astro.config.mjs` is `https://stackpicks.jp` — canonical URLs and the sitemap (`@astrojs/sitemap`) depend on this; don't change it unless the production domain changes.
- Article URLs end with a trailing slash (`/articles/<slug>/`) in links throughout the codebase — keep this consistent.
- Code blocks in markdown use Shiki with the `github-dark` theme (configured in `astro.config.mjs`).
- Language attribute is `lang="ja"` (set in `BaseLayout.astro`); date formatting uses `toLocaleDateString('ja-JP', ...)`.
