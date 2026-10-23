# Gracie Barra Domžale — redesign prototype

Static site built with [Astro](https://astro.build), edited through [Sveltia CMS](https://github.com/sveltia/sveltia-cms), deployed by GitHub Actions on every push to `main` (including CMS saves) to both GitHub Pages and Cloudflare Pages.

Live: https://gbdomzale.pages.dev/ (Cloudflare, booking form works) · https://chrassy.github.io/gbdomzale-redesign/ (GitHub Pages) · Editor: https://chrassy.github.io/gbdomzale-redesign/admin/

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

`public/video/hero-1280.mp4` (desktop) and `hero-854.mp4` (mobile) are a 13.8 s cut-to-cut loop (39.80–53.58 s) from the *Gracie Barra Institucional* film by Lucas Ferraz. H.264, no audio, fast-start. `hero-poster.jpg` is the first frame; it shows until the video loads and stays as the only image for visitors with reduced motion or data saver on.

## Booking form

`functions/api/prijava.js` is a Cloudflare Pages Function: it validates the submission, drops honeypot hits, and emails the school through [Resend](https://resend.com). It only runs on Cloudflare Pages — on GitHub Pages the form reports the failure and offers a mailto fallback.

Configure on the Pages project (`npx wrangler pages secret put <NAME> --project-name gbdomzale`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | required; without it the endpoint answers 503 |
| `MAIL_TO` | recipient, defaults to info@gbdomzale.si |
| `MAIL_FROM` | sender; use `onboarding@resend.dev` until the domain is verified at Resend |
| `MAIL_CONFIRM` | `on` also sends a confirmation to the applicant (only once the domain is verified) |

## Cloudflare Pages deploy

`.github/workflows/cloudflare.yml` builds with `BASE_PATH=/` and runs `wrangler pages deploy` into the `gbdomzale` project. It needs:

| Where | Name | Value |
| --- | --- | --- |
| Repository secret | `CLOUDFLARE_API_TOKEN` | API token with **Account · Cloudflare Pages · Edit** |
| Repository variable | `CLOUDFLARE_ACCOUNT_ID` | the Cloudflare account ID |

To redeploy without a new commit, run the workflow manually from the Actions tab.

## Moving to the real domain

Set repository variables `BASE_PATH=/` and `SITE_URL=https://gbdomzale.si`, then redeploy. The booking form is still a demo and needs a backend before launch.
