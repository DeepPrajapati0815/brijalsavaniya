'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Metric {
  _id: string;
  key: string;
  label: string;
  value: string;
  rawValue: number;
  suffix: string;
  growthNote: string;
  growthPositive: boolean;
  barPercent: number;
  sortOrder: number;
  isVisible: boolean;
}

export default function MetricsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['metrics'], queryFn: () => adminApi.get<Metric[]>('/admin/metrics') });
  const [editing, setEditing] = useState<Record<string, Partial<Metric>>>({});

  const metrics = data?.data || [];

  const saveMutation = useMutation({
    mutationFn: ({ key, body }: { key: string; body: Partial<Metric> }) => adminApi.put(`/admin/metrics/${key}`, body),
    onSuccess: () => {
      toast.success('Metric saved');
      qc.invalidateQueries({ queryKey: ['metrics'] });
      setEditing({});
    },
    onError: () => toast.error('Failed to save'),
  });

  if (isLoading) {
    return <AdminLayout><div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-16 animate-pulse rounded-lg bg-white/5" />)}</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>Metrics</h1>

        <div className="space-y-3">
          {metrics.map((m) => {
            const ed = editing[m.key] || {};
            return (
              <div key={m.key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="grid gap-3 sm:grid-cols-4">
                  <div>
                    <label className="text-xs text-[#7a7568]">Key</label>
                    <div className="text-sm text-[#c9a84c] font-mono">{m.key}</div>
                  </div>
                  <div>
                    <label className="text-xs text-[#7a7568]">Label</label>
                    <input
                      value={ed.label ?? m.label}
                      onChange={(e) => setEditing((p) => ({ ...p, [m.key]: { ...p[m.key], label: e.target.value } }))}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#7a7568]">Display Value</label>
                    <input
                      value={ed.value ?? m.value}
                      onChange={(e) => setEditing((p) => ({ ...p, [m.key]: { ...p[m.key], value: e.target.value } }))}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#7a7568]">Raw Value</label>
                    <input
                      type="number"
                      value={ed.rawValue ?? m.rawValue}
                      onChange={(e) => setEditing((p) => ({ ...p, [m.key]: { ...p[m.key], rawValue: Number(e.target.value) } }))}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#7a7568]">Growth Note</label>
                    <input
                      value={ed.growthNote ?? m.growthNote ?? ''}
                      onChange={(e) => setEditing((p) => ({ ...p, [m.key]: { ...p[m.key], growthNote: e.target.value } }))}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#7a7568]">Bar %</label>
                    <input
                      type="number"
                      min={0} max={100}
                      value={ed.barPercent ?? m.barPercent ?? 0}
                      onChange={(e) => setEditing((p) => ({ ...p, [m.key]: { ...p[m.key], barPercent: Number(e.target.value) } }))}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <label className="flex items-center gap-2 text-xs text-[#7a7568]">
                      <input
                        type="checkbox"
                        checked={ed.isVisible ?? m.isVisible}
                        onChange={(e) => setEditing((p) => ({ ...p, [m.key]: { ...p[m.key], isVisible: e.target.checked } }))}
                        className="accent-[#c9a84c]"
                      />
                      Visible
                    </label>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => saveMutation.mutate({ key: m.key, body: { ...m, ...editing[m.key] } })}
                      disabled={saveMutation.isPending}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#c9a84c]/20 px-3 py-1.5 text-xs font-semibold text-[#c9a84c] hover:bg-[#c9a84c]/30 disabled:opacity-50"
                    >
                      {saveMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                      Save
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
