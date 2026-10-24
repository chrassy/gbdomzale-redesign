import programi from '../data/programi.json';

const POTI = ['/', '/cenik/', '/pogoji-poslovanja/', ...programi.seznam.filter((p) => p.pot).map((p) => `/${p.pot}/`)];

export function GET({ site }) {
  const osnova = (site ?? new URL('https://gbdomzale.si')).origin;
  const danes = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${POTI.map((p) => `  <url><loc>${osnova}${p}</loc><lastmod>${danes}</lastmod></url>`).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
