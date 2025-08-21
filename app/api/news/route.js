// app/api/news/route.js
import { getLatestNews } from "@/app/lib/news";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const data = await getLatestNews(20);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
