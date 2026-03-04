import { useQuery } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import type { Restaurant } from '../../types';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

export default function RestaurantsList() {
  const { data: restaurants = [], isLoading } = useQuery<Restaurant[]>({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const response = await api.get('/restaurants');
      return response.data;
    },
  });

  const columns = [
    {
      header: 'Başlıq',
      accessor: (res: Restaurant) => (
        <div className="flex items-center gap-3">
          {res.place.thumbnail ? (
            <img src={res.place.thumbnail} className="w-10 h-10 rounded-lg object-cover" alt="" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400">
              <Utensils size={18} />
            </div>
          )}
          <span className="font-semibold text-zinc-900">{res.place.title}</span>
        </div>
      )
    },
    { header: 'Şəhər', accessor: (res: Restaurant) => res.place.city || '-' },
    { header: 'Mətbəx', accessor: 'cuisine_type' as keyof Restaurant },
    {
      header: 'Status',
      accessor: (res: Restaurant) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${res.place.status === 'ACTIVE'
            ? 'bg-green-100 text-green-800'
            : 'bg-zinc-100 text-zinc-800'
          }`}>
          {res.place.status}
        </span>
      )
    },
    {
      header: 'Əməliyyatlar',
      accessor: (res: Restaurant) => (
        <div className="flex items-center gap-2">
          <Link to={`/restaurants/${res.id}/edit`}>
            <button className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Edit2 size={18} />
            </button>
          </Link>
          <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Restoranlar</h1>
          <p className="text-sm text-zinc-500 mt-1">Sistemdəki bütün restoranların siyahısı</p>
        </div>
        <Link to="/restaurants/add">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Yeni Restoran Əlavə Et
          </Button>
        </Link>
      </div>

      <Table columns={columns} data={restaurants} isLoading={isLoading} />
    </div>
  );
}
