'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Service {
  _id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  priceLabel: string;
  priceDisplay: string;
  isVisible: boolean;
  sortOrder: number;
}

function ServiceCard({ s, onUpdate, onDelete }: { s: Service; onUpdate: (id: string, body: Partial<Service>) => void; onDelete: (id: string) => void }) {
  const [edit, setEdit] = useState({ number: s.number, title: s.title, description: s.description, features: s.features.join('\n'), priceLabel: s.priceLabel, priceDisplay: s.priceDisplay });
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setEdit({ number: s.number, title: s.title, description: s.description, features: s.features.join('\n'), priceLabel: s.priceLabel, priceDisplay: s.priceDisplay });
    setDirty(false);
  }, [s._id, s.number, s.title, s.description, s.features, s.priceLabel, s.priceDisplay]);

  const handleBlur = () => {
    if (dirty) {
      onUpdate(s._id, { ...s, number: edit.number, title: edit.title, description: edit.description, features: edit.features.split('\n'), priceLabel: edit.priceLabel, priceDisplay: edit.priceDisplay });
      setDirty(false);
    }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEdit((f) => ({ ...f, [field]: e.target.value }));
    setDirty(true);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="text-xs text-[#7a7568]">Number</label>
          <input value={edit.number} onChange={set('number')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
        </div>
        <div>
          <label className="text-xs text-[#7a7568]">Title</label>
          <input value={edit.title} onChange={set('title')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="text-xs text-[#7a7568]">Price Display</label>
            <input value={edit.priceDisplay} onChange={set('priceDisplay')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
          </div>
          <button onClick={() => onDelete(s._id)} className="text-[#c97b6e] hover:text-red-400 pb-2"><Trash2 className="h-4 w-4" /></button>
        </div>
      </div>
      <div>
        <label className="text-xs text-[#7a7568]">Description</label>
        <textarea value={edit.description} onChange={set('description')} onBlur={handleBlur} rows={2} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
      </div>
      <div>
        <label className="text-xs text-[#7a7568]">Features (one per line)</label>
        <textarea
          value={edit.features}
          onChange={set('features')}
          onBlur={handleBlur}
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
        />
      </div>
      <label className="flex items-center gap-2 text-xs text-[#7a7568]">
        <input type="checkbox" checked={s.isVisible} onChange={(e) => onUpdate(s._id, { ...s, isVisible: e.target.checked })} className="accent-[#c9a84c]" />
        Visible
      </label>
    </div>
  );
}

export default function ServicesPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['services'], queryFn: () => adminApi.get<Service[]>('/admin/services') });
  const services = data?.data || [];

  const saveMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<Service> }) => adminApi.put(`/admin/services/${id}`, body),
    onSuccess: () => { toast.success('Saved'); qc.invalidateQueries({ queryKey: ['services'] }); },
    onError: () => toast.error('Failed'),
  });

  const createMutation = useMutation({
    mutationFn: (body: Partial<Service>) => adminApi.post('/admin/services', body),
    onSuccess: () => { toast.success('Created'); qc.invalidateQueries({ queryKey: ['services'] }); },
    onError: () => toast.error('Failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.delete(`/admin/services/${id}`),
    onSuccess: () => { toast.success('Deleted'); qc.invalidateQueries({ queryKey: ['services'] }); },
    onError: () => toast.error('Failed'),
  });

  if (isLoading) return <AdminLayout><div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-24 animate-pulse rounded-lg bg-white/5" />)}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>Services</h1>
          <button
            onClick={() => createMutation.mutate({ number: String(services.length + 1).padStart(2, '0'), title: 'New Service', description: '', features: [], priceLabel: 'Starting from', priceDisplay: '₹0', sortOrder: services.length + 1, isVisible: true })}
            className="inline-flex items-center gap-1 rounded-lg bg-[#c9a84c] px-3 py-2 text-xs font-semibold text-[#0d0d0d] hover:bg-[#e8c97a]"
          >
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>

        <div className="space-y-4">
          {services.map((s) => (
            <ServiceCard key={s._id} s={s} onUpdate={(id, body) => saveMutation.mutate({ id, body })} onDelete={(id) => deleteMutation.mutate(id)} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
