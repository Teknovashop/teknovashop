// app/page.js
import { getLatestNews } from "./lib/news";
import { getDailySelection } from "./lib/deals";
import NewsList from "@/components/NewsList";
import SidebarProducts from "@/components/SidebarProducts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [news, products] = await Promise.all([
    getLatestNews(20),
    Promise.resolve(getDailySelection(6)),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <section className="text-center py-10 bg-white rounded-3xl shadow-sm mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand">Actualidad Tech & Ofertas</h1>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
          Noticias tecnológicas punteras, y en paralelo ofertas seleccionadas que convierten.
          Actualizado automáticamente.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <main>
          <h2 className="text-xl font-bold mb-3">Últimas noticias</h2>
          <NewsList items={news} />
        </main>

        <SidebarProducts products={products} />
      </div>
    </div>
  );
}
