// app/lib/news.js
// Helper para traer noticias tecnológicas desde varias fuentes RSS con caché simple en memoria.
import Parser from "rss-parser";

// Fuentes RSS (puedes cambiar/añadir)
export const DEFAULT_SOURCES = [
  "https://www.theverge.com/rss/index.xml",
  "https://techcrunch.com/feed/",
  "https://www.xataka.com/feed"
];

// Caché en memoria (15 minutos)
const CACHE_TTL_MS = 15 * 60 * 1000;
globalThis.__NEWS_CACHE = globalThis.__NEWS_CACHE || { t: 0, items: [] };

function extractImage(entry) {
  const enc = entry?.enclosure?.url;
  const media = entry?.["media:content"]?.url || entry?.["media:thumbnail"]?.url;
  const html = entry?.["content:encoded"] || entry?.content || "";
  const m = /<img[^>]+src="([^"]+)"/i.exec(html);
  return enc || media || (m ? m[1] : null);
}

export async function getLatestNews(limit = 20, sources = DEFAULT_SOURCES) {
  const now = Date.now();
  if (now - __NEWS_CACHE.t < CACHE_TTL_MS && __NEWS_CACHE.items.length) {
    return __NEWS_CACHE.items.slice(0, limit);
  }

  const parser = new Parser({
    headers: { "User-Agent": "TeknovaShopBot/1.0 (+https://teknovashop.com)" }
  });

  let all = [];
  for (const src of sources) {
    try {
      const feed = await parser.parseURL(src);
      const items = (feed.items || []).map((it) => ({
        title: (it.title || "").trim(),
        url: it.link,
        date: it.isoDate || it.pubDate || new Date().toISOString(),
        source: feed.title?.replace(/ - RSS.*/i, "") || new URL(src).hostname,
        image: extractImage(it),
      }));
      all.push(...items);
    } catch (e) {
      // swallow errors per source to be resilient
      // console.error("RSS error", src, e);
    }
  }

  // Ordenar por fecha y eliminar duplicados por URL
  const seen = new Set();
  const unique = [];
  for (const n of all.sort((a, b) => new Date(b.date) - new Date(a.date))) {
    if (!n.url || seen.has(n.url)) continue;
    seen.add(n.url);
    unique.push(n);
  }

  __NEWS_CACHE = { t: Date.now(), items: unique };
  return unique.slice(0, limit);
}

export function clearNewsCache() {
  __NEWS_CACHE = { t: 0, items: [] };
}
