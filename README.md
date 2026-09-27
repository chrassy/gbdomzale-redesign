# Gracie Barra Domžale — redesign prototype

Static site built with [Astro](https://astro.build), edited through [Sveltia CMS](https://github.com/sveltia/sveltia-cms), deployed to GitHub Pages by GitHub Actions on every push to `main`.

Live: https://chrassy.github.io/gbdomzale-redesign/ · Editor: https://chrassy.github.io/gbdomzale-redesign/admin/

## Editing content

Open `/admin`, sign in with GitHub (or with a fine-grained personal access token that has **Contents: read and write** on this repo), and edit. Saving commits to `main`; the site rebuilds in about a minute.

| Editor section | File |
| --- | --- |
| Urnik | `src/data/urnik.json` |
| Stran (promo banner, hero, facts, steps, why, quote, contact) | `src/data/nastavitve.json` |
| Programi | `src/data/programi.json` |
| Inštruktorji | `src/data/instruktorji.json` |
| Galerija | `src/data/galerija.json` |

Images upload to `public/img`, videos live in `public/video`. The schedule is rendered at build time, so search engines see it; the browser only handles filtering, day tabs, the "today" marker and the booking dialog.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/gbdomzale-redesign/
npm run build
```

## Hero video

`public/video/hero-1280.mp4` (desktop) and `hero-854.mp4` (mobile) are a 13.8 s cut-to-cut loop (39.80–53.58 s) from the *Gracie Barra Institucional* film by Lucas Ferraz. H.264, no audio, fast-start. `hero-poster.jpg` is the first frame; it shows until the video loads and stays as the only image for visitors with reduced motion or data saver on.

## Moving to the real domain

Set repository variables `BASE_PATH=/` and `SITE_URL=https://gbdomzale.si`, then redeploy. The booking form is still a demo and needs a backend before launch.
