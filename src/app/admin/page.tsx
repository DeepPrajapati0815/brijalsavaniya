'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAuth } from '@/lib/admin-auth';
import Link from 'next/link';
import { BarChart3, Mail, Image, Users } from 'lucide-react';

const quickLinks = [
  { label: 'Edit Hero', href: '/admin/hero', icon: Image, color: 'text-[#c9a84c]' },
  { label: 'View Inquiries', href: '/admin/inquiries', icon: Mail, color: 'text-[#c97b6e]' },
  { label: 'Manage Content', href: '/admin/content/items', icon: Users, color: 'text-[#4caf50]' },
  { label: 'Update Metrics', href: '/admin/metrics', icon: BarChart3, color: 'text-[#5c9ded]' },
];

export default function AdminDashboardPage() {
  const { admin } = useAuth();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>
            Welcome back, {admin?.name || 'Admin'}
          </h1>
          <p className="mt-1 text-sm text-[#7a7568]">Manage your site content and inquiries from here.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#c9a84c]/30 hover:bg-white/[0.06]"
            >
              <link.icon className={`h-6 w-6 ${link.color} mb-3`} />
              <div className="text-sm font-medium text-[#f5f0e8]">{link.label}</div>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-sm font-semibold text-[#f5f0e8]">Getting Started</h2>
          <p className="mt-2 text-sm text-[#7a7568] leading-relaxed">
            Use the sidebar to navigate between content sections. All changes are saved immediately to the backend.
            The public website reads from the same data — updates here will reflect on the live site.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
