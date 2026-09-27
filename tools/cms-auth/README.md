# Posrednik za prijavo v urejevalnik

Cloudflare Worker, ki omogoči gumb **Sign In with GitHub** v `/admin`.
`src/index.js` je kopija [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) (MIT).

## Namestitev

```bash
npx wrangler login                 # enkratna prijava v Cloudflare
npx wrangler deploy                # izpiše naslov workerja
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

GitHub OAuth aplikacija: GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.

- Homepage URL: `https://chrassy.github.io/gbdomzale-redesign/`
- Authorization callback URL: `https://gbdomzale-cms-auth.aljaz-klanecek.workers.dev/callback`

Naslov workerja je že vpisan v `public/admin/config.yml` kot `base_url`.
