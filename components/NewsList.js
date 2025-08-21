// components/NewsList.js
import NewsItem from "./NewsItem";

export default function NewsList({ items = [] }) {
  if (!items.length) {
    return <div className="text-sm text-gray-500">Sin noticias por el momento.</div>;
  }
  return (
    <div className="space-y-3">
      {items.map((n, i) => (
        <NewsItem key={`${n.url}-${i}`} item={n} />
      ))}
    </div>
  );
}
