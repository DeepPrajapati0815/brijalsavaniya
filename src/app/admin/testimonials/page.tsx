'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Trash2, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Testimonial {
  _id: string;
  authorName: string;
  authorTitle: string;
  quoteText: string;
  rating: number;
  isFeatured: boolean;
  isVisible: boolean;
}

function EditCard({ t, onUpdate, onDelete }: { t: Testimonial; onUpdate: (id: string, body: Partial<Testimonial>) => void; onDelete: (id: string) => void }) {
  const [edit, setEdit] = useState({ authorName: t.authorName, authorTitle: t.authorTitle, quoteText: t.quoteText, isVisible: t.isVisible });
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setEdit({ authorName: t.authorName, authorTitle: t.authorTitle, quoteText: t.quoteText, isVisible: t.isVisible });
    setDirty(false);
  }, [t._id, t.authorName, t.authorTitle, t.quoteText, t.isVisible]);

  const handleBlur = () => {
    if (dirty) {
      onUpdate(t._id, edit);
      setDirty(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-2">
          <input
            value={edit.authorName}
            onChange={(e) => { setEdit((f) => ({ ...f, authorName: e.target.value })); setDirty(true); }}
            onBlur={handleBlur}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
            placeholder="Author name"
          />
          <input
            value={edit.authorTitle}
            onChange={(e) => { setEdit((f) => ({ ...f, authorTitle: e.target.value })); setDirty(true); }}
            onBlur={handleBlur}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-[#7a7568] outline-none focus:border-[#c9a84c]/50"
            placeholder="Author title"
          />
          <textarea
            value={edit.quoteText}
            onChange={(e) => { setEdit((f) => ({ ...f, quoteText: e.target.value })); setDirty(true); }}
            onBlur={handleBlur}
            rows={3}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
            placeholder="Quote text"
          />
        </div>
        <div className="flex flex-col items-center gap-2 pt-1">
          <label className="flex items-center gap-1 text-xs text-[#7a7568]">
            <input type="checkbox" checked={edit.isVisible} onChange={(e) => { setEdit((f) => ({ ...f, isVisible: e.target.checked })); setDirty(true); onUpdate(t._id, { ...edit, isVisible: e.target.checked }); }} className="accent-[#c9a84c]" />
          </label>
          <button onClick={() => onDelete(t._id)} className="text-[#c97b6e] hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
        </div>
      </div>
      {dirty && <div className="mt-2 text-[10px] text-[#c9a84c]">Unsaved — click outside field to save</div>}
    </div>
  );
}

export default function TestimonialsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['testimonials'], queryFn: () => adminApi.get<Testimonial[]>('/admin/testimonials') });
  const items = data?.data || [];

  const createMutation = useMutation({
    mutationFn: (body: Partial<Testimonial>) => adminApi.post('/admin/testimonials', body),
    onSuccess: () => { toast.success('Created'); qc.invalidateQueries({ queryKey: ['testimonials'] }); },
    onError: () => toast.error('Failed'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<Testimonial> }) => adminApi.put(`/admin/testimonials/${id}`, body),
    onSuccess: () => { toast.success('Updated'); qc.invalidateQueries({ queryKey: ['testimonials'] }); },
    onError: () => toast.error('Failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.delete(`/admin/testimonials/${id}`),
    onSuccess: () => { toast.success('Deleted'); qc.invalidateQueries({ queryKey: ['testimonials'] }); },
    onError: () => toast.error('Failed'),
  });

  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ authorName: '', authorTitle: '', quoteText: '' });

  if (isLoading) return <AdminLayout><div className="space-y-3">{[1,2].map(i => <div key={i} className="h-20 animate-pulse rounded-lg bg-white/5" />)}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>Testimonials</h1>
          <button onClick={() => setShowAdd(!showAdd)} className="inline-flex items-center gap-1 rounded-lg bg-[#c9a84c] px-3 py-2 text-xs font-semibold text-[#0d0d0d] hover:bg-[#e8c97a]">
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>

        {showAdd && (
          <div className="rounded-2xl border border-[#c9a84c]/30 bg-white/[0.03] p-4 space-y-3">
            <input placeholder="Author name" value={addForm.authorName} onChange={(e) => setAddForm((f) => ({ ...f, authorName: e.target.value }))} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            <input placeholder="Author title" value={addForm.authorTitle} onChange={(e) => setAddForm((f) => ({ ...f, authorTitle: e.target.value }))} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            <textarea placeholder="Quote text" value={addForm.quoteText} onChange={(e) => setAddForm((f) => ({ ...f, quoteText: e.target.value }))} rows={3} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            <div className="flex gap-2">
              <button onClick={() => createMutation.mutate({ ...addForm, rating: 5, isVisible: true })} disabled={!addForm.authorName || !addForm.quoteText} className="rounded-lg bg-[#c9a84c] px-4 py-2 text-xs font-semibold text-[#0d0d0d] hover:bg-[#e8c97a] disabled:opacity-50">Create</button>
              <button onClick={() => setShowAdd(false)} className="rounded-lg border border-white/10 px-4 py-2 text-xs text-[#7a7568]">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {items.map((t) => (
            <EditCard key={t._id} t={t} onUpdate={(id, body) => updateMutation.mutate({ id, body })} onDelete={(id) => deleteMutation.mutate(id)} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
