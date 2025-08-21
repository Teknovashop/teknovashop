// app/page.js
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

function getBaseUrl() {
  // 1) Dominio público definido (cuando ya conectes el dominio)
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  // 2) Vercel expone VERCEL_URL (sin protocolo)
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // 3) Construir desde cabeceras (host/proto) – útil en SSR
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") || h.get("host");
    const proto = h.get("x-forwarded-proto") || "https";
    if (host) return `${proto}://${host}`;
  } catch {
    // headers() puede no estar disponible en algunos contextos
  }

  // 4) Fallback para dev local
  return "http://localhost:3000";
}

async function fetchDeals() {
  const base = getBaseUrl();
  const url = `${base}/api/products`;

  const res = await fetch(url, {
    cache: "no-store", // evitar cachés raras en SSR
  });

  if (!res.ok) {
    throw new Error(`Fetch failed ${res.status} ${res.statusText} at ${url}`);
  }
  return res.json();
}

export default async function HomePage() {
  const deals = await fetchDeals();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <section className="text-center py-10 bg-white rounded-3xl shadow-sm">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand">Ofertas del día</h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Selección curada de gadgets y electrónica que rinde en comisión. Actualizado diariamente.
        </p>
      </section>

      <section id="ofertas" className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Selección de hoy</h2>
          <a href="/api/refresh?token=demo" className="text-sm text-gray-500 hover:text-brand">
            Forzar refresco
          </a>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((p) => (
            <article key={p.id} className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition">
              <img
                src={p.image || "/placeholder.jpg"}
                alt={p.name}
                className="w-full h-44 object-cover rounded-xl"
              />
              <h3 className="mt-3 font-semibold text-lg leading-snug">{p.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{p.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-brand font-bold">{p.priceText || "Ver precio"}</span>
                <a
                  href={p.affiliateUrl || "#"}
                  rel="nofollow sponsored"
                  target="_blank"
                  className="inline-flex items-center px-3 py-2 rounded-xl bg-brand text-white hover:bg-brand-dark"
                >
                  Ver oferta
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="categorias" className="mt-14">
        <h2 className="text-xl font-bold mb-4">Categorías populares</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Auriculares", "Smartwatch", "Accesorios PC", "Hogar inteligente", "Audio", "Gaming"].map((c) => (
            <div key={c} className="rounded-xl bg-white p-4 border hover:border-brand/60 transition text-center">
              {c}
            </div>
          ))}
        </div>
      </section>

      <section id="contacto" className="mt-14 text-center text-sm text-gray-600">
        ¿Dudas? Escríbenos a{" "}
        <a href="mailto:contacto@teknovashop.com" className="text-brand">
          contacto@teknovashop.com
        </a>
      </section>
    </div>
  );
}
