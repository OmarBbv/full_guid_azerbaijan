import { Menu, LogOut, Search } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="h-16 bg-white shadow-sm border-b border-zinc-100 flex items-center justify-between px-4 lg:px-8 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-lg text-zinc-500 w-64">
          <Search size={18} />
          <input
            type="text"
            placeholder="Axtarış..."
            className="bg-transparent border-none outline-none text-sm w-full text-zinc-900"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-zinc-700">Admin User</p>
            <p className="text-xs text-zinc-500">admin@fullguide.az</p>
          </div>
        </div>
        <div className="h-8 w-px bg-zinc-200 hidden md:block"></div>
        <button className="text-zinc-500 hover:text-red-500 transition-colors p-2 flex items-center gap-2">
          <LogOut size={20} />
          <span className="hidden md:block text-sm font-medium">Çıxış</span>
        </button>
      </div>
    </header>
  );
}
