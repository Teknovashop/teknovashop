// app/api/refresh-news/route.js
import { clearNewsCache } from "@/app/lib/news";
export const runtime = "nodejs";

export async function GET(req) {
  const token = new URL(req.url).searchParams.get("token");
  if (!process.env.REFRESH_TOKEN || token !== process.env.REFRESH_TOKEN) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  clearNewsCache();
  return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
    headers: { "Content-Type": "application/json" },
  });
}
