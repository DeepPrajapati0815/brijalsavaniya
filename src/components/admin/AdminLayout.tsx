'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/admin-auth';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { Toaster } from 'sonner';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d0d0d]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c9a84c] border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') window.location.href = '/admin/login';
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f0e8] overflow-x-hidden">
      <AdminSidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />
      <div className={sidebarCollapsed ? 'ml-16 flex min-h-screen flex-col' : 'ml-60 flex min-h-screen flex-col'}>
        <AdminTopbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            border: '1px solid rgba(201,168,76,0.18)',
            color: '#f5f0e8',
          },
        }}
      />
    </div>
  );
}
