'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AboutData {
  sectionLabel: string;
  headline: string;
  storyParagraphs: string[];
  profileImageUrl: string;
  communityCount: string;
  valuesCards: { iconName: string; title: string; desc: string }[];
}

export default function AboutPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['about'], queryFn: () => adminApi.get<AboutData>('/admin/about') });
  const [form, setForm] = useState<AboutData | null>(null);

  useEffect(() => {
    if (data?.data) setForm(data.data);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (body: AboutData) => adminApi.put('/admin/about', body),
    onSuccess: () => { toast.success('About saved'); qc.invalidateQueries({ queryKey: ['about'] }); },
    onError: () => toast.error('Failed'),
  });

  if (isLoading || !form) return <AdminLayout><div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-12 animate-pulse rounded-lg bg-white/5" />)}</div></AdminLayout>;

  const update = (key: keyof AboutData, value: unknown) => setForm((f) => (f ? { ...f, [key]: value } : f));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>About</h1>
          <button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending} className="inline-flex items-center gap-2 rounded-lg bg-[#c9a84c] px-4 py-2 text-sm font-semibold text-[#0d0d0d] hover:bg-[#e8c97a] disabled:opacity-50">
            {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold text-[#c9a84c]">Text</h2>
            {[
              { label: 'Section Label', key: 'sectionLabel' as const },
              { label: 'Headline', key: 'headline' as const },
              { label: 'Profile Image URL', key: 'profileImageUrl' as const },
              { label: 'Community Count', key: 'communityCount' as const },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="mb-1 block text-xs text-[#7a7568]">{label}</label>
                <input value={(form[key] as string) || ''} onChange={(e) => update(key, e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
              </div>
            ))}
            <div>
              <label className="mb-1 block text-xs text-[#7a7568]">Story Paragraphs</label>
              {form.storyParagraphs.map((p, i) => (
                <textarea key={i} value={p} onChange={(e) => { const arr = [...form.storyParagraphs]; arr[i] = e.target.value; update('storyParagraphs', arr); }} rows={3} className="mb-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
              ))}
              <button onClick={() => update('storyParagraphs', [...form.storyParagraphs, ''])} className="text-xs text-[#c9a84c] hover:underline">+ Add paragraph</button>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold text-[#c9a84c]">Values Cards</h2>
            {form.valuesCards.map((vc, i) => (
              <div key={i} className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="grid gap-2 sm:grid-cols-3">
                  <input value={vc.iconName} onChange={(e) => { const arr = [...form.valuesCards]; arr[i] = { ...arr[i], iconName: e.target.value }; update('valuesCards', arr); }} placeholder="Icon name" className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
                  <input value={vc.title} onChange={(e) => { const arr = [...form.valuesCards]; arr[i] = { ...arr[i], title: e.target.value }; update('valuesCards', arr); }} placeholder="Title" className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
                  <input value={vc.desc} onChange={(e) => { const arr = [...form.valuesCards]; arr[i] = { ...arr[i], desc: e.target.value }; update('valuesCards', arr); }} placeholder="Description" className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
                </div>
              </div>
            ))}
            <button onClick={() => update('valuesCards', [...form.valuesCards, { iconName: '', title: '', desc: '' }])} className="text-xs text-[#c9a84c] hover:underline">+ Add value card</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
