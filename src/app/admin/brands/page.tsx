'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Brand {
  _id: string;
  name: string;
  slug: string;
  type: string;
  logoEmoji: string;
  isFeatured: boolean;
  isVisible: boolean;
  sortOrder: number;
}

function BrandCard({ b, onUpdate, onDelete }: { b: Brand; onUpdate: (id: string, body: Partial<Brand>) => void; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState({ name: b.name, type: b.type, logoEmoji: b.logoEmoji });
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setEdit({ name: b.name, type: b.type, logoEmoji: b.logoEmoji });
    setDirty(false);
  }, [b._id, b.name, b.type, b.logoEmoji]);

  const handleBlur = () => {
    if (dirty) {
      onUpdate(b._id, { ...b, ...edit });
      setDirty(false);
    }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit((f) => ({ ...f, [field]: e.target.value }));
    setDirty(true);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="px-4 py-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <span className="text-lg">{b.logoEmoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#f5f0e8]">{b.name}</span>
              <span className="font-mono text-[10px] text-[#c9a84c]">{b.slug}</span>
              {b.isFeatured && <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] text-purple-400">Featured</span>}
            </div>
            <div className="text-xs text-[#7a7568]">{b.type} · Sort: {b.sortOrder}</div>
          </div>
          <label className="flex items-center gap-1 text-xs text-[#7a7568]">
            <input type="checkbox" checked={b.isVisible} onChange={(e) => { e.stopPropagation(); onUpdate(b._id, { ...b, isVisible: e.target.checked }); }} className="accent-[#c9a84c]" />
          </label>
          <button onClick={(e) => { e.stopPropagation(); onDelete(b._id); }} className="text-[#c97b6e] hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          {expanded ? <ChevronUp className="h-4 w-4 text-[#7a7568]" /> : <ChevronDown className="h-4 w-4 text-[#7a7568]" />}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-white/5 px-4 py-3 space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs text-[#7a7568]">Brand Name</label>
              <input value={edit.name} onChange={set('name')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">Type</label>
              <input value={edit.type} onChange={set('type')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">Logo Emoji</label>
              <input value={edit.logoEmoji} onChange={set('logoEmoji')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs text-[#7a7568]">Slug</label>
              <div className="text-sm text-[#c9a84c] font-mono">{b.slug}</div>
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">Sort Order</label>
              <input type="number" value={b.sortOrder} onChange={(e) => onUpdate(b._id, { ...b, sortOrder: Number(e.target.value) })} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs text-[#7a7568]">
            <input type="checkbox" checked={b.isFeatured} onChange={(e) => onUpdate(b._id, { ...b, isFeatured: e.target.checked })} className="accent-[#c9a84c]" />
            Featured
          </label>
        </div>
      )}
    </div>
  );
}

export default function BrandsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['brands'], queryFn: () => adminApi.get<Brand[]>('/admin/brands') });
  const brands = data?.data || [];

  const createMutation = useMutation({
    mutationFn: (body: Partial<Brand>) => adminApi.post('/admin/brands', body),
    onSuccess: () => { toast.success('Created'); qc.invalidateQueries({ queryKey: ['brands'] }); },
    onError: () => toast.error('Failed'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<Brand> }) => adminApi.put(`/admin/brands/${id}`, body),
    onSuccess: () => { toast.success('Updated'); qc.invalidateQueries({ queryKey: ['brands'] }); },
    onError: () => toast.error('Failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.delete(`/admin/brands/${id}`),
    onSuccess: () => { toast.success('Deleted'); qc.invalidateQueries({ queryKey: ['brands'] }); },
    onError: () => toast.error('Failed'),
  });

  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', type: '', logoEmoji: '🏢' });

  if (isLoading) return <AdminLayout><div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-16 animate-pulse rounded-lg bg-white/5" />)}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>Brands</h1>
          <button onClick={() => setShowAdd(!showAdd)} className="inline-flex items-center gap-1 rounded-lg bg-[#c9a84c] px-3 py-2 text-xs font-semibold text-[#0d0d0d] hover:bg-[#e8c97a]">
            <Plus className="h-3 w-3" /> Add Brand
          </button>
        </div>

        {showAdd && (
          <div className="rounded-2xl border border-[#c9a84c]/30 bg-white/[0.03] p-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-3">
              <input placeholder="Brand name" value={addForm.name} onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
              <input placeholder="Type (e.g. Fashion & Beauty)" value={addForm.type} onChange={(e) => setAddForm((f) => ({ ...f, type: e.target.value }))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
              <input placeholder="Emoji" value={addForm.logoEmoji} onChange={(e) => setAddForm((f) => ({ ...f, logoEmoji: e.target.value }))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => { const slug = addForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'); createMutation.mutate({ ...addForm, slug, sortOrder: brands.length + 1, isVisible: true }); }} disabled={!addForm.name} className="rounded-lg bg-[#c9a84c] px-4 py-2 text-xs font-semibold text-[#0d0d0d] hover:bg-[#e8c97a] disabled:opacity-50">Create</button>
              <button onClick={() => setShowAdd(false)} className="rounded-lg border border-white/10 px-4 py-2 text-xs text-[#7a7568]">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {brands.map((b) => (
            <BrandCard key={b._id} b={b} onUpdate={(id, body) => updateMutation.mutate({ id, body })} onDelete={(id) => deleteMutation.mutate(id)} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
