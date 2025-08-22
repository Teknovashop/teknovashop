import Parser from 'rss-parser';
const parser = new Parser();

export async function fetchNews() {
  const feed = await parser.parseURL('https://www.theverge.com/rss/index.xml');
  return feed.items.slice(0, 10);
}