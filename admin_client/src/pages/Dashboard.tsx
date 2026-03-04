import { Users, MapPin, Building2, TrendingUp } from 'lucide-react';

const stats = [
  { title: 'Ümumi Məkanlar', value: '1,248', trend: '+12%', icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-100' },
  { title: 'Otellər ve Hostellər', value: '456', trend: '+5%', icon: Building2, color: 'text-indigo-500', bg: 'bg-indigo-100' },
  { title: 'Aylıq Səfərlər', value: '45.2K', trend: '+18.2%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-100' },
  { title: 'Aktiv İstifadəçilər', value: '8.4K', trend: '+2.4%', icon: Users, color: 'text-orange-500', bg: 'bg-orange-100' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-zinc-900">{stat.value}</h3>
              <p className="text-sm text-green-500 font-medium mt-1 inline-flex items-center gap-1">
                {stat.trend} bu ay
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 min-h-[400px]">
          <h2 className="text-lg font-bold text-zinc-900 mb-4">Statistika Grfiki (Tezliklə)</h2>
          <div className="w-full h-full border-2 border-dashed border-zinc-200 rounded-xl flex items-center justify-center text-zinc-400">
            Diaqram Qrafiki Burada Olacaq
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-4">Son Əlavələr</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-zinc-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-zinc-100">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 text-sm">Yeni Restoran Əlavə Edildi</h4>
                  <p className="text-xs text-zinc-500">2 saat əvvəl</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
