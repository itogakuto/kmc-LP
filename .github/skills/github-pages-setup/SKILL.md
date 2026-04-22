---
name: github-pages-setup
description: 'Set up, configure, deploy, or troubleshoot GitHub Pages for this repository. Use when: publishing a static site, enabling GitHub Pages, choosing between branch deploy vs GitHub Actions deploy, configuring a custom domain, enforcing HTTPS, setting up Jekyll, fixing 404s or broken asset paths on Pages, building an SPA/landing page deployment workflow.'
---

# GitHub Pages Setup

A repeatable workflow for publishing a static site (HTML/CSS/JS, Jekyll, or a built SPA) to GitHub Pages. Prefer the **GitHub Actions** publishing source for any project that has a build step; use **Branch deploy** only for plain static files.

## When to Use

- Publishing a landing page or static site from this repo
- Switching publishing source (branch ⇄ Actions)
- Adding a custom domain or fixing HTTPS / DNS issues
- Diagnosing a Pages build failure, 404, or broken relative asset path
- Setting `base` / `basePath` for project pages served from `/<repo>/`

## Decision: Publishing Source

| Situation | Source | Notes |
|---|---|---|
| Plain HTML/CSS/JS, no build | Branch (`main` / `/` or `/docs`) | Simplest. Commit files directly. |
| Jekyll site | Branch | GitHub builds Jekyll automatically. |
| Has a build step (Vite/Next/Astro/etc.) | **GitHub Actions** | Required for non-Jekyll builds. |
| Need preview deploys, env secrets, or custom build | **GitHub Actions** | Use `actions/deploy-pages`. |

## Procedure

### 1. Confirm prerequisites
- Repo is public, **or** the account has Pages enabled for private repos.
- Decide URL: `https://<owner>.github.io/<repo>/` (project) vs `https://<owner>.github.io/` (user/org site, repo named `<owner>.github.io`).
- Identify the publish directory (e.g. `./`, `./docs`, `./dist`, `./build`, `./_site`, `./out`).

### 2. Enable Pages
Repository → **Settings → Pages**:
- Set **Source** to either `Deploy from a branch` or `GitHub Actions`.
- For branch deploy, choose branch + folder (`/` or `/docs`).

### 3a. Branch deploy (no build)
- Place `index.html` at the chosen folder root.
- Commit and push. Wait for the green check on **Settings → Pages**.
- If using Jekyll and you want to skip processing, add an empty `.nojekyll` file at the publish root.

### 3b. GitHub Actions deploy (with build)
Create `.github/workflows/deploy-pages.yml`. Use the official actions: `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`. See [workflow template](./assets/deploy-pages.yml) and adapt the build step to the project's tooling.

Key requirements in the workflow:
- `permissions: { contents: read, pages: write, id-token: write }`
- `concurrency: { group: "pages", cancel-in-progress: false }`
- One job builds and uploads the artifact from the publish directory; a second job runs `actions/deploy-pages`.

### 4. Fix base path for project pages
Project sites are served under `/<repo>/`. Configure the build tool so asset URLs are correct:
- **Vite**: `base: '/<repo>/'` in `vite.config.*`
- **Next.js (static export)**: `basePath: '/<repo>'`, `assetPrefix: '/<repo>/'`, `output: 'export'`
- **Astro**: `base: '/<repo>'`, `site: 'https://<owner>.github.io'`
- **SvelteKit**: adapter-static + `paths.base = '/<repo>'`
- Plain HTML: use **relative** paths (`./assets/...`), not absolute (`/assets/...`).

### 5. Custom domain (optional)
1. Add the domain in **Settings → Pages → Custom domain** (creates a `CNAME` file on the publish branch — keep it committed).
2. DNS:
   - **Apex** (`example.com`): A records to GitHub Pages IPs (185.199.108.153, .109.153, .110.153, .111.153) **or** ALIAS/ANAME.
   - **Subdomain** (`www.example.com`): CNAME to `<owner>.github.io`.
3. Wait for DNS check to pass, then enable **Enforce HTTPS**.

### 6. Verify
- Open the Pages URL shown in **Settings → Pages**.
- Hard reload (cache) and check DevTools Network tab for any 404s — these almost always indicate a wrong base path or absolute URL.
- For Actions deploys, check the workflow run summary for the deployment URL.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| 404 on whole site | Pages not enabled, wrong source/branch/folder | Re-check Settings → Pages |
| CSS/JS 404, blank page | Absolute paths on a project site | Set base path (step 4) or use relative URLs |
| Jekyll ignores `_files` or files starting with `_` | Jekyll processing enabled | Add `.nojekyll` at publish root |
| Workflow fails on `deploy-pages` with permissions error | Missing `pages: write` / `id-token: write` | Add `permissions:` block |
| Custom domain shows "not properly configured" | DNS not propagated / wrong record | Re-check A/CNAME, wait, retry |
| HTTPS toggle disabled | Cert not yet issued | Wait after DNS verification (can take up to 24h) |
| Multiple deploys racing | No concurrency group | Add `concurrency: { group: "pages" }` |

## References

- [Workflow template](./assets/deploy-pages.yml)
- Official docs:
  - GitHub Pages top: https://docs.github.com/ja/pages
  - Quickstart: https://docs.github.com/ja/pages/quickstart
  - Configuring publishing source: https://docs.github.com/ja/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
  - Custom workflows (Actions): https://docs.github.com/ja/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
  - Custom domain: https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site
  - HTTPS: https://docs.github.com/ja/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
  - Jekyll: https://docs.github.com/ja/pages/setting-up-a-github-pages-site-with-jekyll
- `actions/deploy-pages`: https://github.com/actions/deploy-pages
- Pages starter workflows: https://github.com/actions/starter-workflows/tree/main/pages
