import { NavLink } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Utensils,
  Bed,
  LayoutDashboard,
  ChevronLeft
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Məkanlar', path: '/places', icon: MapPin },
  { name: 'Otellər', path: '/hotels', icon: Building2 },
  { name: 'Hostellər', path: '/hostels', icon: Bed },
  { name: 'Restoranlar', path: '/restaurants', icon: Utensils },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-100">
          <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Panel
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-zinc-500 hover:text-zinc-700"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
