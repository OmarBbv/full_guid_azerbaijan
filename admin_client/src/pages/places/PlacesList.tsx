import { useQuery } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import type { Place } from '../../types';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

export default function PlacesList() {
  const { data: places = [], isLoading } = useQuery<Place[]>({
    queryKey: ['places'],
    queryFn: async () => {
      const response = await api.get('/places');
      return response.data;
    },
  });

  const columns = [
    {
      header: 'Başlıq',
      accessor: (place: Place) => (
        <div className="flex items-center gap-3">
          {place.thumbnail ? (
            <img src={place.thumbnail} className="w-10 h-10 rounded-lg object-cover" alt="" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400">
              <MapPin size={18} />
            </div>
          )}
          <span className="font-semibold text-zinc-900">{place.title}</span>
        </div>
      )
    },
    { header: 'Növ', accessor: 'type' as keyof Place },
    { header: 'Şəhər', accessor: 'city' as keyof Place },
    {
      header: 'Status',
      accessor: (place: Place) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${place.status === 'ACTIVE'
          ? 'bg-green-100 text-green-800'
          : 'bg-zinc-100 text-zinc-800'
          }`}>
          {place.status}
        </span>
      )
    },
    {
      header: 'Əməliyyatlar',
      accessor: (place: Place) => (
        <div className="flex items-center gap-2">
          <Link to={`/places/${place.id}/edit`}>
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
          <h1 className="text-2xl font-bold text-zinc-900">Məkanlar</h1>
          <p className="text-sm text-zinc-500 mt-1">Bütün ümumi məkanların siyahısı</p>
        </div>
        <Link to="/places/add">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Yeni Məkan Əlavə Et
          </Button>
        </Link>
      </div>

      <Table columns={columns} data={places} isLoading={isLoading} />
    </div>
  );
}
