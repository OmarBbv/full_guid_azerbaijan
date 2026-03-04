import { useQuery } from '@tanstack/react-query';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import type { Hostel } from '../../types';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

export default function HostelsList() {
  const { data: hostels = [], isLoading } = useQuery<Hostel[]>({
    queryKey: ['hostels'],
    queryFn: async () => {
      const response = await api.get('/hostels');
      return response.data;
    },
  });

  const columns = [
    {
      header: 'Başlıq',
      accessor: (hostel: Hostel) => (
        <div className="flex items-center gap-3">
          {hostel.place.thumbnail ? (
            <img src={hostel.place.thumbnail} className="w-10 h-10 rounded-lg object-cover" alt="" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400">
              B
            </div>
          )}
          <span className="font-semibold text-zinc-900">{hostel.place.title}</span>
        </div>
      )
    },
    { header: 'Şəhər', accessor: (hostel: Hostel) => hostel.place.city || '-' },
    { header: 'Növ', accessor: 'hostel_type' as keyof Hostel },
    {
      header: 'Status',
      accessor: (hostel: Hostel) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${hostel.place.status === 'ACTIVE'
            ? 'bg-green-100 text-green-800'
            : 'bg-zinc-100 text-zinc-800'
          }`}>
          {hostel.place.status}
        </span>
      )
    },
    {
      header: 'Əməliyyatlar',
      accessor: (hostel: Hostel) => (
        <div className="flex items-center gap-2">
          <Link to={`/hostels/${hostel.id}/edit`}>
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
          <h1 className="text-2xl font-bold text-zinc-900">Hostellər</h1>
          <p className="text-sm text-zinc-500 mt-1">Sistemdəki bütün hostellərin siyahısı</p>
        </div>
        <Link to="/hostels/add">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Yeni Hostel Əlavə Et
          </Button>
        </Link>
      </div>

      <Table columns={columns} data={hostels} isLoading={isLoading} />
    </div>
  );
}
