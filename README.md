# joaopaulo.dev

Interactive CV / portfolio of **João Paulo da Silva** · Senior Full-Stack Engineer.

Built with the same stack I work in daily: **Vue 3 + TypeScript + Vite**, with **GSAP**
ScrollTrigger for scroll choreography and a hand-written canvas particle network in the hero.
Dark-first design with a light theme, fully responsive, accessible, and `prefers-reduced-motion`
aware.

## Stack

- Vue 3 (`<script setup>`) + TypeScript
- Vite 6 build
- GSAP + ScrollTrigger (timeline progress + reveals)
- Self-hosted Geist / Geist Mono (`@fontsource-variable`)
- Zero runtime UI dependencies beyond Vue + GSAP

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

All CV content lives in a single typed source of truth: [`src/data/cv.ts`](src/data/cv.ts).

## Deploy

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. The custom domain is pinned via [`public/CNAME`](public/CNAME).

### Custom domain DNS

Point `joaopaulo.dev` at GitHub Pages with these records at your DNS provider:

| Type  | Host | Value                |
| ----- | ---- | -------------------- |
| A     | @    | 185.199.108.153      |
| A     | @    | 185.199.109.153      |
| A     | @    | 185.199.110.153      |
| A     | @    | 185.199.111.153      |
| CNAME | www  | jpaulodev.github.io. |

Then enable **Settings → Pages → Source: GitHub Actions** and set the custom domain to
`joaopaulo.dev` (Enforce HTTPS).
