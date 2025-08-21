// components/NewsItem.js
export default function NewsItem({ item }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener nofollow"
      className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition"
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-32 h-24 object-cover rounded-xl flex-shrink-0"
        />
      ) : (
        <div className="w-32 h-24 bg-gray-100 rounded-xl flex-shrink-0" />
      )}
      <div className="min-w-0">
        <h3 className="font-semibold leading-snug line-clamp-2">{item.title}</h3>
        <p className="mt-1 text-xs text-gray-500">
          {new Date(item.date).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" })} · {item.source}
        </p>
      </div>
    </a>
  );
}
