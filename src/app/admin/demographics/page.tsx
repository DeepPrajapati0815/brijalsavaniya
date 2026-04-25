'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DemoItem {
  _id: string;
  type: string;
  label: string;
  percentage: number;
  sortOrder: number;
  isVisible: boolean;
}

function DemoRow({ item, onUpdate, onDelete }: { item: DemoItem; onUpdate: (id: string, body: Partial<DemoItem>) => void; onDelete: (id: string) => void }) {
  const [label, setLabel] = useState(item.label);
  const [pct, setPct] = useState(item.percentage);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setLabel(item.label);
    setPct(item.percentage);
    setDirty(false);
  }, [item._id, item.label, item.percentage]);

  const handleBlur = () => {
    if (dirty) {
      onUpdate(item._id, { ...item, label, percentage: pct });
      setDirty(false);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <input
        value={label}
        onChange={(e) => { setLabel(e.target.value); setDirty(true); }}
        onBlur={handleBlur}
        className="flex-1 bg-transparent text-sm text-[#f5f0e8] outline-none"
      />
      <input
        type="number"
        value={pct}
        onChange={(e) => { setPct(Number(e.target.value)); setDirty(true); }}
        onBlur={handleBlur}
        className="w-16 rounded bg-white/5 px-2 py-1 text-sm text-[#f5f0e8] outline-none"
        min={0} max={100}
      />
      <span className="text-xs text-[#7a7568]">%</span>
      <label className="flex items-center gap-1 text-xs text-[#7a7568]">
        <input
          type="checkbox"
          checked={item.isVisible}
          onChange={(e) => onUpdate(item._id, { ...item, isVisible: e.target.checked })}
          className="accent-[#c9a84c]"
        />
      </label>
      <button onClick={() => onDelete(item._id)} className="text-[#c97b6e] hover:text-red-400">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function DemographicsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['demographics'], queryFn: () => adminApi.get<DemoItem[]>('/admin/demographics') });
  const items = data?.data || [];

  const createMutation = useMutation({
    mutationFn: (body: Partial<DemoItem>) => adminApi.post('/admin/demographics', body),
    onSuccess: () => { toast.success('Created'); qc.invalidateQueries({ queryKey: ['demographics'] }); },
    onError: () => toast.error('Failed'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<DemoItem> }) => adminApi.put(`/admin/demographics/${id}`, body),
    onSuccess: () => { toast.success('Updated'); qc.invalidateQueries({ queryKey: ['demographics'] }); },
    onError: () => toast.error('Failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.delete(`/admin/demographics/${id}`),
    onSuccess: () => { toast.success('Deleted'); qc.invalidateQueries({ queryKey: ['demographics'] }); },
    onError: () => toast.error('Failed'),
  });

  const [newLabel, setNewLabel] = useState('');
  const [newPct, setNewPct] = useState(0);

  if (isLoading) return <AdminLayout><div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-12 animate-pulse rounded-lg bg-white/5" />)}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>Cities (Demographics)</h1>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="mb-3 text-sm font-semibold text-[#c9a84c]">Add City</h2>
          <div className="flex gap-3">
            <input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="City name"
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
            />
            <input
              type="number"
              value={newPct}
              onChange={(e) => setNewPct(Number(e.target.value))}
              min={0} max={100}
              placeholder="%"
              className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
            />
            <button
              onClick={() => createMutation.mutate({ type: 'city', label: newLabel, percentage: newPct, sortOrder: items.length + 1, isVisible: true })}
              disabled={createMutation.isPending || !newLabel}
              className="inline-flex items-center gap-1 rounded-lg bg-[#c9a84c] px-3 py-2 text-xs font-semibold text-[#0d0d0d] hover:bg-[#e8c97a] disabled:opacity-50"
            >
              <Plus className="h-3 w-3" /> Add
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <DemoRow key={item._id} item={item} onUpdate={(id, body) => updateMutation.mutate({ id, body })} onDelete={(id) => deleteMutation.mutate(id)} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
