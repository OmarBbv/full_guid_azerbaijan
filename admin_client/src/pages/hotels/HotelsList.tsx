import { useQuery } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import type { Hotel } from '../../types';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

export default function HotelsList() {
  const { data: hotels = [], isLoading } = useQuery<Hotel[]>({
    queryKey: ['hotels'],
    queryFn: async () => {
      const response = await api.get('/hotels');
      return response.data;
    },
  });

  const columns = [
    {
      header: 'Başlıq',
      accessor: (hotel: Hotel) => (
        <div className="flex items-center gap-3">
          {hotel.place.thumbnail ? (
            <img src={hotel.place.thumbnail} className="w-10 h-10 rounded-lg object-cover" alt="" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400">
              H
            </div>
          )}
          <span className="font-semibold text-zinc-900">{hotel.place.title}</span>
        </div>
      )
    },
    { header: 'Şəhər', accessor: (hotel: Hotel) => hotel.place.city || '-' },
    {
      header: 'Ulduz',
      accessor: (hotel: Hotel) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          {hotel.star_rating} ⭐
        </span>
      )
    },
    {
      header: 'Status',
      accessor: (hotel: Hotel) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${hotel.place.status === 'ACTIVE'
          ? 'bg-green-100 text-green-800'
          : 'bg-zinc-100 text-zinc-800'
          }`}>
          {hotel.place.status}
        </span>
      )
    },
    {
      header: 'Əməliyyatlar',
      accessor: (hotel: Hotel) => (
        <div className="flex items-center gap-2">
          <Link to={`/hotels/${hotel.id}/edit`}>
            <button className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Edit2 size={18} />
            </button>
          </Link>
          <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 size={18} />
          </button>
          <a href={`/hotels/slug/${hotel.place.slug}`} target="_blank" rel="noreferrer">
            <button className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
              <ExternalLink size={18} />
            </button>
          </a>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Otellər</h1>
          <p className="text-sm text-zinc-500 mt-1">Sistemdəki bütün otellərin siyahısı</p>
        </div>
        <Link to="/hotels/add">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Yeni Otel Əlavə Et
          </Button>
        </Link>
      </div>

      <Table columns={columns} data={hotels} isLoading={isLoading} />
    </div>
  );
}
