'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Image,
  BarChart3,
  MapPin,
  Grid3X3,
  Tags,
  Building2,
  Handshake,
  MessageSquareQuote,
  Briefcase,
  User,
  Mail,
  Settings,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useState } from 'react';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Site Content',
    items: [
      { label: 'Hero', href: '/admin/hero', icon: Image },
      { label: 'About', href: '/admin/about', icon: User },
      { label: 'Services', href: '/admin/services', icon: Briefcase },
    ],
  },
  {
    label: 'Media Kit',
    items: [
      { label: 'Metrics', href: '/admin/metrics', icon: BarChart3 },
      { label: 'Cities', href: '/admin/demographics', icon: MapPin },
    ],
  },
  {
    label: 'Showcase',
    items: [
      { label: 'Content Items', href: '/admin/content/items', icon: Grid3X3 },
      { label: 'Categories', href: '/admin/content/categories', icon: Tags },
    ],
  },
  {
    label: 'Brand Proof',
    items: [
      { label: 'Brands', href: '/admin/brands', icon: Building2 },
      { label: 'Collaborations', href: '/admin/collaborations', icon: Handshake },
      { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
    ],
  },
  {
    label: 'CRM',
    items: [
      { label: 'Inquiries', href: '/admin/inquiries', icon: Mail },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export function AdminSidebar({
  collapsed: collapsedProp,
  onCollapsedChange,
}: {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}) {
  const pathname = usePathname();
  const [collapsedState, setCollapsedState] = useState(false);
  const collapsed = collapsedProp ?? collapsedState;

  const setCollapsed = (value: boolean) => {
    onCollapsedChange?.(value);
    if (collapsedProp === undefined) setCollapsedState(value);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/10 bg-[#0d0d0d] transition-all duration-200',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <Link href="/admin" className="text-lg font-semibold text-[#f5f0e8]">
            Brijal<span className="text-[#c9a84c]">.</span> CMS
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1 text-[#7a7568] hover:text-[#c9a84c] transition-colors"
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <div className="mb-1 px-4 text-[10px] font-semibold uppercase tracking-widest text-[#7a7568]">
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-[#c9a84c]/10 text-[#c9a84c] font-medium'
                      : 'text-[#7a7568] hover:bg-white/5 hover:text-[#f5f0e8]'
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
