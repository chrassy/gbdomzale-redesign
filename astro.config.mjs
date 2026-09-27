import { defineConfig } from 'astro/config';

// BASE_PATH je '/gbdomzale-redesign' na GitHub Pages in '/' na lastni domeni.
export default defineConfig({
  site: process.env.SITE_URL || 'https://chrassy.github.io',
  base: process.env.BASE_PATH || '/gbdomzale-redesign',
  trailingSlash: 'ignore',
  build: { assets: 'assets' },
});
