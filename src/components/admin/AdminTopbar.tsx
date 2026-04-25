'use client';

import { useAuth } from '@/lib/admin-auth';
import { LogOut, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminTopbar() {
  const { admin, logout } = useAuth();
  const router = useRouter();
  const [dark, setDark] = useState(true);

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-[#0d0d0d]/95 px-6 backdrop-blur">
      <div className="text-sm text-[#7a7568]">
        CMS Admin
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setDark(!dark)}
          className="rounded-md p-1.5 text-[#7a7568] hover:text-[#c9a84c] transition-colors"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <div className="flex items-center gap-2 text-sm">
          <div className="h-7 w-7 rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c] text-xs font-semibold">
            {admin?.name?.charAt(0) || 'A'}
          </div>
          <span className="text-[#f5f0e8]">{admin?.name || 'Admin'}</span>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-md p-1.5 text-[#7a7568] hover:text-[#c97b6e] transition-colors"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
