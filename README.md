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
| Galerija | `src/data/galerija.json` |
| Cenik | `src/data/cenik.json` (stran `/cenik/`) |
| Pogoji poslovanja | `src/data/pogoji.md` (stran `/pogoji-poslovanja/`) |

Images upload to `public/img`, videos live in `public/video`. The schedule is rendered at build time, so search engines see it; the browser only handles filtering, day tabs, the "today" marker and the booking dialog.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/gbdomzale-redesign/
npm run build
```

## Hero video

Both loops are the same ~14 s of the club's walkthrough video: the door opening onto the mats, the GB legends on the wall, then training on the mats. It comes in two formats: `hero-desktop.mp4` (≥768 px, 1024×576 landscape, 15.05–28.90 s) and `hero-mobile.mp4` (<768 px, 576×1024 portrait, 15.05–29.00 s). Each has a `-poster.jpg` with its first frame, which shows until the video loads and stays as the only image for visitors with reduced motion or data saver on. H.264, no audio, fast-start.

## Booking form

`functions/api/prijava.js` is a Cloudflare Pages Function: it validates the submission, drops honeypot hits, and emails the school through [Resend](https://resend.com). It only runs on Cloudflare Pages — on GitHub Pages the form reports the failure and offers a mailto fallback.

Configure on the Pages project (`npx wrangler pages secret put <NAME> --project-name gbdomzale`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | required; without it the endpoint answers 503 |
| `MAIL_TO` | recipient, defaults to info@gbdomzale.si |
| `MAIL_FROM` | sender; use `onboarding@resend.dev` until the domain is verified at Resend |
| `MAIL_CONFIRM` | `on` also sends a confirmation to the applicant (only once the domain is verified) |

## Moving to the real domain

Set repository variables `BASE_PATH=/` and `SITE_URL=https://gbdomzale.si`, then redeploy. The booking form is still a demo and needs a backend before launch.
