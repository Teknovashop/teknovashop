import { fetchNews } from '@/app/lib/news';

export async function GET() {
  const news = await fetchNews();
  return Response.json(news);
}