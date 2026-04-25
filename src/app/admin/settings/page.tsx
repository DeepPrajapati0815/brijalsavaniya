'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['settings'], queryFn: () => adminApi.get<Record<string, string>>('/admin/settings') });
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    if (data?.data) setForm(data.data);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: () => {
      const settings = Object.entries(form).map(([key, value]) => ({ key, value, type: typeof value === 'object' ? 'json' : 'string' }));
      return adminApi.put('/admin/settings/bulk', { settings });
    },
    onSuccess: () => { toast.success('Settings saved'); qc.invalidateQueries({ queryKey: ['settings'] }); },
    onError: () => toast.error('Failed'),
  });

  if (isLoading) return <AdminLayout><div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-12 animate-pulse rounded-lg bg-white/5" />)}</div></AdminLayout>;

  const fields = [
    { key: 'creator_name', label: 'Creator Name' },
    { key: 'creator_handle', label: 'Handle' },
    { key: 'creator_location', label: 'Location' },
    { key: 'primary_email', label: 'Primary Email' },
    { key: 'whatsapp_number', label: 'WhatsApp Number' },
    { key: 'instagram_url', label: 'Instagram URL' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>Settings</h1>
          <button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="inline-flex items-center gap-2 rounded-lg bg-[#c9a84c] px-4 py-2 text-sm font-semibold text-[#0d0d0d] hover:bg-[#e8c97a] disabled:opacity-50">
            {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save All
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label className="mb-1 block text-xs text-[#7a7568]">{label}</label>
              <input
                value={form[key] || ''}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
              />
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
