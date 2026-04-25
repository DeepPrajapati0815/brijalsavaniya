'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';

interface HeroData {
  headline: string;
  subheadline: string;
  typedNiches: string[];
  nichePills: { label: string; sortOrder: number; isVisible: boolean }[];
  tagline: string;
  badgeText: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  heroImageUrl: string;
}

export default function HeroPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['hero'], queryFn: () => adminApi.get<HeroData>('/admin/hero') });
  const [form, setForm] = useState<HeroData | null>(null);

  useEffect(() => {
    if (data?.data) setForm(data.data);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (body: HeroData) => adminApi.put('/admin/hero', body),
    onSuccess: () => {
      toast.success('Hero saved');
      qc.invalidateQueries({ queryKey: ['hero'] });
    },
    onError: () => toast.error('Failed to save'),
  });

  if (isLoading || !form) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-white/5" />
          ))}
        </div>
      </AdminLayout>
    );
  }

  const update = (key: keyof HeroData, value: unknown) => setForm((f) => (f ? { ...f, [key]: value } : f));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>Hero</h1>
          <button
            onClick={() => saveMutation.mutate(form)}
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-[#c9a84c] px-4 py-2 text-sm font-semibold text-[#0d0d0d] transition hover:bg-[#e8c97a] disabled:opacity-50"
          >
            {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold text-[#c9a84c]">Text Content</h2>
            {[
              { label: 'Headline', key: 'headline' as const },
              { label: 'Subheadline', key: 'subheadline' as const },
              { label: 'Tagline', key: 'tagline' as const },
              { label: 'Badge Text', key: 'badgeText' as const },
              { label: 'Hero Image URL', key: 'heroImageUrl' as const },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="mb-1 block text-xs text-[#7a7568]">{label}</label>
                <input
                  value={(form[key] as string) || ''}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
                />
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold text-[#c9a84c]">CTAs</h2>
            {[
              { label: 'Primary Text', key: 'ctaPrimaryText' as const },
              { label: 'Primary Href', key: 'ctaPrimaryHref' as const },
              { label: 'Secondary Text', key: 'ctaSecondaryText' as const },
              { label: 'Secondary Href', key: 'ctaSecondaryHref' as const },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="mb-1 block text-xs text-[#7a7568]">{label}</label>
                <input
                  value={(form[key] as string) || ''}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
                />
              </div>
            ))}

            <h2 className="pt-2 text-sm font-semibold text-[#c9a84c]">Typed Niches</h2>
            <div className="space-y-2">
              {form.typedNiches.map((n, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={n}
                    onChange={(e) => {
                      const arr = [...form.typedNiches];
                      arr[i] = e.target.value;
                      update('typedNiches', arr);
                    }}
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
                  />
                  <button
                    onClick={() => update('typedNiches', form.typedNiches.filter((_, idx) => idx !== i))}
                    className="text-xs text-[#c97b6e] hover:underline"
                  >Remove</button>
                </div>
              ))}
              <button
                onClick={() => update('typedNiches', [...form.typedNiches, ''])}
                className="text-xs text-[#c9a84c] hover:underline"
              >+ Add niche</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
