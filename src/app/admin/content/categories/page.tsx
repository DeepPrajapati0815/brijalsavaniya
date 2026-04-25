'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Category {
  _id: string;
  key: string;
  label: string;
  sortOrder: number;
  isVisible: boolean;
}

function CategoryRow({ cat, onUpdate, onDelete }: { cat: Category; onUpdate: (key: string, body: Partial<Category>) => void; onDelete: (key: string) => void }) {
  const [label, setLabel] = useState(cat.label);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setLabel(cat.label);
    setDirty(false);
  }, [cat.key, cat.label]);

  const handleBlur = () => {
    if (dirty) {
      onUpdate(cat.key, { ...cat, label });
      setDirty(false);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="font-mono text-xs text-[#c9a84c]">{cat.key}</span>
      <input
        value={label}
        onChange={(e) => { setLabel(e.target.value); setDirty(true); }}
        onBlur={handleBlur}
        className="flex-1 bg-transparent text-sm text-[#f5f0e8] outline-none"
      />
      <label className="flex items-center gap-1 text-xs text-[#7a7568]">
        <input type="checkbox" checked={cat.isVisible} onChange={(e) => onUpdate(cat.key, { ...cat, isVisible: e.target.checked })} className="accent-[#c9a84c]" />
      </label>
      <button onClick={() => onDelete(cat.key)} className="text-[#c97b6e] hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
    </div>
  );
}

export default function CategoriesPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['content-categories'], queryFn: () => adminApi.get<Category[]>('/admin/content/categories') });
  const items = data?.data || [];

  const [newLabel, setNewLabel] = useState('');

  const createMutation = useMutation({
    mutationFn: (body: Partial<Category>) => adminApi.post('/admin/content/categories', body),
    onSuccess: () => { toast.success('Created'); qc.invalidateQueries({ queryKey: ['content-categories'] }); setNewLabel(''); },
    onError: () => toast.error('Failed'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ key, body }: { key: string; body: Partial<Category> }) => adminApi.put(`/admin/content/categories/${key}`, body),
    onSuccess: () => { toast.success('Updated'); qc.invalidateQueries({ queryKey: ['content-categories'] }); },
    onError: () => toast.error('Failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: (key: string) => adminApi.delete(`/admin/content/categories/${key}`),
    onSuccess: () => { toast.success('Deleted'); qc.invalidateQueries({ queryKey: ['content-categories'] }); },
    onError: () => toast.error('Failed'),
  });

  if (isLoading) return <AdminLayout><div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-12 animate-pulse rounded-lg bg-white/5" />)}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>Content Categories</h1>

        <div className="flex gap-3">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Category label (e.g. Wellness)"
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
          />
          <button
            onClick={() => {
              const key = newLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
              createMutation.mutate({ key, label: newLabel.trim(), sortOrder: items.length + 1, isVisible: true });
            }}
            disabled={createMutation.isPending || !newLabel.trim()}
            className="inline-flex items-center gap-1 rounded-lg bg-[#c9a84c] px-3 py-2 text-xs font-semibold text-[#0d0d0d] hover:bg-[#e8c97a] disabled:opacity-50"
          >
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>

        <div className="space-y-2">
          {items.map((cat) => (
            <CategoryRow key={cat._id} cat={cat} onUpdate={(key, body) => updateMutation.mutate({ key, body })} onDelete={(key) => deleteMutation.mutate(key)} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
