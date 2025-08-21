// app/sitemap.xml/route.js
export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const paths = ['', '/legal/aviso-legal', '/legal/privacidad', '/legal/cookies'];
  const urls = paths.map((p) => `<url><loc>${base}${p}</loc></url>`).join('');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls +
    `</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
