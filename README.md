# Profile — portfolio site

[![CI](https://github.com/OrithmicSoftware/profile/actions/workflows/ci.yml/badge.svg)](https://github.com/OrithmicSoftware/profile/actions/workflows/ci.yml)
[![Pages](https://github.com/OrithmicSoftware/profile/actions/workflows/deploy-github-pages.yml/badge.svg)](https://github.com/OrithmicSoftware/profile/actions/workflows/deploy-github-pages.yml)
[![Labels](https://github.com/OrithmicSoftware/profile/actions/workflows/sync-labels.yml/badge.svg)](https://github.com/OrithmicSoftware/profile/actions/workflows/sync-labels.yml)

Single-page résumé and portfolio for **Vladislav Sokolov** (software architect & technical lead), built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

**Repository:** [github.com/OrithmicSoftware/profile](https://github.com/OrithmicSoftware/profile) (under org [OrithmicSoftware](https://github.com/OrithmicSoftware)).

**Live site:** [https://orithmicsoftware.github.io/profile/](https://orithmicsoftware.github.io/profile/) after GitHub Pages is enabled on the repo (typically **`gh-pages`** branch from the deploy workflow).

### Move an existing repo into the org

1. On GitHub: **Settings → General → Danger zone → Transfer ownership** (transfer `pun4drunk/profile` to **OrithmicSoftware**), *or* create an empty **`profile`** repo under the org and push `main` from this clone.
2. Locally: `git remote set-url origin git@github.com:OrithmicSoftware/profile.git` then `git push -u origin main`.
3. In the **org** or **repo**: allow **Actions** and set **Workflow permissions** to **Read and write** if deploy/label workflows need it.
4. **Pages:** repo **Settings → Pages** — source **`gh-pages`** / root (match your deploy workflow). The site URL will be **`https://orithmicsoftware.github.io/profile/`** while the repo is named `profile`.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Typecheck + production build (`/profile/` base for Pages) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint (warnings fail) |
| `npm run lint:fix` | ESLint with `--fix` |
| `npm run typecheck` | `tsc -b --noEmit` |
| `npm run check` | Lint → typecheck → build |

## GitHub Pages

- **Source:** deploy from branch **`gh-pages`** (root).
- **Workflow:** [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) — runs lint, typecheck, build, then pushes `dist/` via [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages).
- **Base path:** production builds use `base: '/profile/'` in [`vite.config.ts`](vite.config.ts). If you rename the repository, update `base` to match.

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on pushes and pull requests to `main` / `master`: install, lint, typecheck, build.

## Issue labels

Label definitions live in [`.github/labels.yml`](.github/labels.yml). Sync them to the repo: **Actions → Sync labels → Run workflow**.

If the workflow fails with **403** or **Resource not accessible by integration**, the repository (or organization) default is probably **read-only** for `GITHUB_TOKEN`. Fix it under **Settings → Actions → General → Workflow permissions**: choose **Read and write permissions** and save, then re-run **Sync labels**. Issues do not need to be enabled for the Labels API to work.

## Requirements

- Node.js **22** (recommended; CI uses 22)

## License

Private / all rights reserved unless you add a license file.
