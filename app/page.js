import NewsList from '@/components/NewsList';
import SidebarProducts from '@/components/SidebarProducts';

export default function HomePage() {
  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Últimas noticias tecnológicas</h1>
        <NewsList />
      </div>
      <div className="w-1/4 p-4 bg-gray-100">
        <SidebarProducts />
      </div>
    </div>
  );
}
