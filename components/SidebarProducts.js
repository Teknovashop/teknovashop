// components/SidebarProducts.js
export default function SidebarProducts({ products = [] }) {
  return (
    <aside className="space-y-3">
      <h3 className="text-lg font-bold">Top ofertas</h3>
      {products.map((p) => (
        <a
          key={p.id}
          href={p.affiliateUrl || p.url || "#"}
          target="_blank"
          rel="nofollow sponsored"
          className="block bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition"
        >
          <div className="flex gap-3">
            <img
              src={p.image || "/placeholder.jpg"}
              alt={p.name || p.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium line-clamp-2">
                {p.name || p.title}
              </p>
              <p className="text-xs text-brand mt-1">{p.priceText || p.price || "Ver precio"}</p>
            </div>
          </div>
        </a>
      ))}
    </aside>
  );
}
