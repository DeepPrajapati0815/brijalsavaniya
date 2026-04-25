'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Collaboration {
  _id: string;
  brandId: string;
  title: string;
  description: string;
  campaignType: string;
  viewsCount: number;
  clicksCount: number;
  ctrPercent: number;
  isFeatured: boolean;
  isVisible: boolean;
  sortOrder: number;
}

function CollabCard({ c, brandName, onUpdate, onDelete }: { c: Collaboration; brandName: string; onUpdate: (id: string, body: Partial<Collaboration>) => void; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState({ title: c.title, description: c.description, viewsCount: c.viewsCount, clicksCount: c.clicksCount, ctrPercent: c.ctrPercent });
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setEdit({ title: c.title, description: c.description, viewsCount: c.viewsCount, clicksCount: c.clicksCount, ctrPercent: c.ctrPercent });
    setDirty(false);
  }, [c._id, c.title, c.description, c.viewsCount, c.clicksCount, c.ctrPercent]);

  const handleBlur = () => {
    if (dirty) {
      onUpdate(c._id, { ...c, ...edit });
      setDirty(false);
    }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setEdit((f) => ({ ...f, [field]: val }));
    setDirty(true);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="px-4 py-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#f5f0e8]">{c.title}</span>
              <span className="rounded bg-[#c9a84c]/10 px-1.5 py-0.5 text-[10px] text-[#c9a84c]">{c.campaignType}</span>
              {c.isFeatured && <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] text-purple-400">Featured</span>}
            </div>
            <div className="text-xs text-[#7a7568] mt-0.5">{brandName} · {c.viewsCount || 0} views · {c.clicksCount || 0} clicks</div>
          </div>
          <label className="flex items-center gap-1 text-xs text-[#7a7568]">
            <input type="checkbox" checked={c.isVisible} onChange={(e) => { e.stopPropagation(); onUpdate(c._id, { ...c, isVisible: e.target.checked }); }} className="accent-[#c9a84c]" />
          </label>
          <button onClick={(e) => { e.stopPropagation(); onDelete(c._id); }} className="text-[#c97b6e] hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          {expanded ? <ChevronUp className="h-4 w-4 text-[#7a7568]" /> : <ChevronDown className="h-4 w-4 text-[#7a7568]" />}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-white/5 px-4 py-3 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs text-[#7a7568]">Title</label>
              <input value={edit.title} onChange={set('title')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">Campaign Type</label>
              <select value={c.campaignType} onChange={(e) => onUpdate(c._id, { ...c, campaignType: e.target.value })} className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" style={{ colorScheme: 'dark' }}>
                <option value="reel" className="bg-[#1a1a1a] text-[#f5f0e8]">Reel</option>
                <option value="story" className="bg-[#1a1a1a] text-[#f5f0e8]">Story</option>
                <option value="ambassador" className="bg-[#1a1a1a] text-[#f5f0e8]">Ambassador</option>
                <option value="ugc" className="bg-[#1a1a1a] text-[#f5f0e8]">UGC</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-[#7a7568]">Description</label>
            <textarea value={edit.description} onChange={set('description')} onBlur={handleBlur} rows={2} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs text-[#7a7568]">Views Count</label>
              <input type="number" value={edit.viewsCount} onChange={set('viewsCount')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">Clicks Count</label>
              <input type="number" value={edit.clicksCount} onChange={set('clicksCount')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">CTR %</label>
              <input type="number" step="0.1" value={edit.ctrPercent} onChange={set('ctrPercent')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs text-[#7a7568]">
            <input type="checkbox" checked={c.isFeatured} onChange={(e) => onUpdate(c._id, { ...c, isFeatured: e.target.checked })} className="accent-[#c9a84c]" />
            Featured
          </label>
        </div>
      )}
    </div>
  );
}

export default function CollaborationsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['collaborations'], queryFn: () => adminApi.get<Collaboration[]>('/admin/collaborations') });
  const collabs = data?.data || [];
  const { data: brandsData } = useQuery({ queryKey: ['brands'], queryFn: () => adminApi.get<{ _id: string; name: string }[]>('/admin/brands') });
  const brands = brandsData?.data || [];

  const brandMap = Object.fromEntries(brands.map((b) => [b._id, b.name]));

  const createMutation = useMutation({
    mutationFn: (body: Partial<Collaboration>) => adminApi.post('/admin/collaborations', body),
    onSuccess: () => { toast.success('Created'); qc.invalidateQueries({ queryKey: ['collaborations'] }); },
    onError: () => toast.error('Failed'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<Collaboration> }) => adminApi.put(`/admin/collaborations/${id}`, body),
    onSuccess: () => { toast.success('Updated'); qc.invalidateQueries({ queryKey: ['collaborations'] }); },
    onError: () => toast.error('Failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.delete(`/admin/collaborations/${id}`),
    onSuccess: () => { toast.success('Deleted'); qc.invalidateQueries({ queryKey: ['collaborations'] }); },
    onError: () => toast.error('Failed'),
  });

  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ brandId: '', title: '', description: '', campaignType: 'reel' });

  if (isLoading) return <AdminLayout><div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 animate-pulse rounded-lg bg-white/5" />)}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>Collaborations</h1>
          <button onClick={() => setShowAdd(!showAdd)} className="inline-flex items-center gap-1 rounded-lg bg-[#c9a84c] px-3 py-2 text-xs font-semibold text-[#0d0d0d] hover:bg-[#e8c97a]">
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>

        {showAdd && (
          <div className="rounded-2xl border border-[#c9a84c]/30 bg-white/[0.03] p-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <select value={addForm.brandId} onChange={(e) => setAddForm((f) => ({ ...f, brandId: e.target.value }))} className="rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" style={{ colorScheme: 'dark' }}>
                <option value="" className="bg-[#1a1a1a] text-[#7a7568]">Select brand</option>
                {brands.map((b) => <option key={b._id} value={b._id} className="bg-[#1a1a1a] text-[#f5f0e8]">{b.name}</option>)}
              </select>
              <input placeholder="Title" value={addForm.title} onChange={(e) => setAddForm((f) => ({ ...f, title: e.target.value }))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
              <input placeholder="Description" value={addForm.description} onChange={(e) => setAddForm((f) => ({ ...f, description: e.target.value }))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
              <select value={addForm.campaignType} onChange={(e) => setAddForm((f) => ({ ...f, campaignType: e.target.value }))} className="rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" style={{ colorScheme: 'dark' }}>
                <option value="reel" className="bg-[#1a1a1a] text-[#f5f0e8]">Reel</option><option value="story" className="bg-[#1a1a1a] text-[#f5f0e8]">Story</option><option value="ambassador" className="bg-[#1a1a1a] text-[#f5f0e8]">Ambassador</option><option value="ugc" className="bg-[#1a1a1a] text-[#f5f0e8]">UGC</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={() => createMutation.mutate({ ...addForm, isVisible: true })} disabled={!addForm.brandId || !addForm.title} className="rounded-lg bg-[#c9a84c] px-4 py-2 text-xs font-semibold text-[#0d0d0d] hover:bg-[#e8c97a] disabled:opacity-50">Create</button>
              <button onClick={() => setShowAdd(false)} className="rounded-lg border border-white/10 px-4 py-2 text-xs text-[#7a7568]">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {collabs.map((c) => (
            <CollabCard key={c._id} c={c} brandName={brandMap[c.brandId] || 'Unknown'} onUpdate={(id, body) => updateMutation.mutate({ id, body })} onDelete={(id) => deleteMutation.mutate(id)} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
