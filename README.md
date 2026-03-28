# Portfolio site

[![CI](https://github.com/Pun4drunk/sample-project/actions/workflows/ci.yml/badge.svg)](https://github.com/Pun4drunk/sample-project/actions/workflows/ci.yml)
[![Pages](https://github.com/Pun4drunk/sample-project/actions/workflows/deploy-github-pages.yml/badge.svg)](https://github.com/Pun4drunk/sample-project/actions/workflows/deploy-github-pages.yml)
[![Labels](https://github.com/Pun4drunk/sample-project/actions/workflows/sync-labels.yml/badge.svg)](https://github.com/Pun4drunk/sample-project/actions/workflows/sync-labels.yml)

Single-page résumé and portfolio for **Vladislav Sokolov** (software architect & technical lead), built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

**Repository:** [github.com/Pun4drunk/sample-project](https://github.com/Pun4drunk/sample-project) ([Pun4drunk](https://github.com/Pun4drunk) on GitHub).

**Live site (project Pages):** **[https://pun4drunk.github.io/sample-project/](https://pun4drunk.github.io/sample-project/)**

### Turn on the correct Pages URL

Your app is built with **`base: '/sample-project/'`** so it only works at that path under the account’s GitHub Pages host (repo name = `sample-project`).

1. **Actions (if deploy fails):** [sample-project → Settings → Actions](https://github.com/Pun4drunk/sample-project/settings/actions) → **General** → allow **Actions**, and set **Workflow permissions** to **Read and write** (needed to push the `gh-pages` branch).
2. **Run deploy:** push to `main` or open **Actions → Deploy to GitHub Pages → Run workflow**. Wait until it finishes and the `gh-pages` branch exists.
3. **Point Pages at `gh-pages`:** In [sample-project → Settings → Pages](https://github.com/Pun4drunk/sample-project/settings/pages):
   - **Build and deployment** → **Source:** *Deploy from a branch*
   - **Branch:** `gh-pages` / **/(root)** → Save  
4. After a short wait, the site should load at **`https://pun4drunk.github.io/sample-project/`**.

**Preview like production Pages:** `npm run preview:pages`

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Typecheck + production build (default `/sample-project/` base; CI uses repo name) |
| `npm run preview` | Preview production build locally (`/` base) |
| `npm run preview:pages` | Build + preview with **`/sample-project/`** base (same as GitHub Pages) |
| `npm run lint` | ESLint (warnings fail) |
| `npm run lint:fix` | ESLint with `--fix` |
| `npm run typecheck` | `tsc -b --noEmit` |
| `npm run check` | Lint → typecheck → build |

## GitHub Pages

- **Public URL:** `https://pun4drunk.github.io/sample-project/`
- **Source:** branch **`gh-pages`**, folder **`/` (root)** — content is published by [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) (lint, typecheck, `npm run build`, then [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) pushes `dist/`).
- **Base path:** [`vite.config.ts`](vite.config.ts) uses `/<repository-name>/` in CI (via `VITE_BASE_PATH`). Local `npm run build` defaults to `/sample-project/`; override with `VITE_BASE_PATH=/profile/ npm run build` if your clone’s repo name differs.

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on pushes and pull requests to `main` / `master`: install, lint, typecheck, build.

## Issue labels

Label definitions live in [`.github/labels.yml`](.github/labels.yml). Sync them to the repo: **Actions → Sync labels → Run workflow**.

**Issues must be enabled** on the repository (Settings → General → Features → Issues) or the Labels API returns **403**; the workflow is skipped when Issues are off so the status badge stays green, but labels are not updated until you turn Issues on and run the workflow again.

If Issues are on and the workflow still fails with **403** or **Resource not accessible by integration**, set **Settings → Actions → General → Workflow permissions** to **Read and write permissions**, save, then re-run **Sync labels**.

## Requirements

- Node.js **22** (recommended; CI uses 22)

## License

Private / all rights reserved unless you add a license file.
