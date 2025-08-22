import { clearNewsCache } from '@/app/lib/news';

export async function GET() {
  clearNewsCache();
  return new Response(JSON.stringify({ message: "News cache cleared" }), {
    headers: { "Content-Type": "application/json" },
  });
}
