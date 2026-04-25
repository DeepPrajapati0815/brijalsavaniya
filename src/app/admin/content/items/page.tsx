'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ContentItem {
  _id: string;
  title: string;
  type: string;
  categoryKeys: string[];
  instagramUrl: string;
  placeholderBgClass: string;
  placeholderEmoji: string;
  displayTypeLabel: string;
  displayMetric: string;
  displayMetricLabel: string;
  badgeText: string;
  viewsCount: number;
  reachCount: number;
  likesCount: number;
  commentsCount: number;
  savesCount: number;
  isTrending: boolean;
  isFeatured: boolean;
  isVisible: boolean;
  sortOrder: number;
}

function ContentCard({ item, categories, onUpdate, onDelete }: { item: ContentItem; categories: { key: string; label: string }[]; onUpdate: (id: string, body: Partial<ContentItem>) => void; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState({ title: item.title, instagramUrl: item.instagramUrl, displayMetric: item.displayMetric, displayMetricLabel: item.displayMetricLabel, viewsCount: item.viewsCount, reachCount: item.reachCount, likesCount: item.likesCount, commentsCount: item.commentsCount, savesCount: item.savesCount });
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setEdit({ title: item.title, instagramUrl: item.instagramUrl, displayMetric: item.displayMetric, displayMetricLabel: item.displayMetricLabel, viewsCount: item.viewsCount, reachCount: item.reachCount, likesCount: item.likesCount, commentsCount: item.commentsCount, savesCount: item.savesCount });
    setDirty(false);
  }, [item._id, item.title, item.instagramUrl, item.displayMetric, item.displayMetricLabel, item.viewsCount, item.reachCount, item.likesCount, item.commentsCount, item.savesCount]);

  const handleBlur = () => {
    if (dirty) {
      onUpdate(item._id, { ...item, ...edit });
      setDirty(false);
    }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setEdit((f) => ({ ...f, [field]: val }));
    setDirty(true);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="px-4 py-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-lg">{item.placeholderEmoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#f5f0e8] truncate">{item.title || item.displayTypeLabel}</span>
              <span className="rounded bg-[#c9a84c]/10 px-1.5 py-0.5 text-[10px] text-[#c9a84c]">{item.type}</span>
              {item.isTrending && <span className="rounded bg-[#c9a84c]/20 px-1.5 py-0.5 text-[10px] text-[#c9a84c]">TRENDING</span>}
              {item.isFeatured && <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] text-purple-400">Featured</span>}
            </div>
            <div className="text-xs text-[#7a7568] truncate">{item.instagramUrl} · {item.displayMetric} {item.displayMetricLabel}</div>
          </div>
          <label className="flex items-center gap-1 text-xs text-[#7a7568]">
            <input type="checkbox" checked={item.isVisible} onChange={(e) => { e.stopPropagation(); onUpdate(item._id, { isVisible: e.target.checked }); }} className="accent-[#c9a84c]" />
          </label>
          <button onClick={(e) => { e.stopPropagation(); onDelete(item._id); }} className="text-[#c97b6e] hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
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
              <label className="text-xs text-[#7a7568]">Instagram URL</label>
              <input value={edit.instagramUrl} onChange={set('instagramUrl')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs text-[#7a7568]">Type</label>
              <select value={item.type} onChange={(e) => onUpdate(item._id, { ...item, type: e.target.value })} className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" style={{ colorScheme: 'dark' }}>
                <option value="reel" className="bg-[#1a1a1a] text-[#f5f0e8]">Reel</option>
                <option value="post" className="bg-[#1a1a1a] text-[#f5f0e8]">Post</option>
                <option value="carousel" className="bg-[#1a1a1a] text-[#f5f0e8]">Carousel</option>
                <option value="story" className="bg-[#1a1a1a] text-[#f5f0e8]">Story</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">Display Metric</label>
              <input value={edit.displayMetric} onChange={set('displayMetric')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">Metric Label</label>
              <input value={edit.displayMetricLabel} onChange={set('displayMetricLabel')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-5">
            <div>
              <label className="text-xs text-[#7a7568]">Views</label>
              <input type="number" value={edit.viewsCount} onChange={set('viewsCount')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">Reach</label>
              <input type="number" value={edit.reachCount} onChange={set('reachCount')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">Likes</label>
              <input type="number" value={edit.likesCount} onChange={set('likesCount')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">Comments</label>
              <input type="number" value={edit.commentsCount} onChange={set('commentsCount')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div>
              <label className="text-xs text-[#7a7568]">Saves</label>
              <input type="number" value={edit.savesCount} onChange={set('savesCount')} onBlur={handleBlur} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
          </div>
          <div>
            <label className="text-xs text-[#7a7568]">Categories</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {categories.map((cat) => (
                <label key={cat.key} className="flex items-center gap-1.5 text-xs text-[#f5f0e8] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.categoryKeys?.includes(cat.key) || false}
                    onChange={(e) => {
                      const keys = e.target.checked
                        ? [...(item.categoryKeys || []), cat.key]
                        : (item.categoryKeys || []).filter((k) => k !== cat.key);
                      onUpdate(item._id, { ...item, categoryKeys: keys });
                    }}
                    className="accent-[#c9a84c]"
                  />
                  {cat.label}
                </label>
              ))}
              {categories.length === 0 && <span className="text-xs text-[#7a7568]">No categories yet</span>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-[#7a7568]">
              <input type="checkbox" checked={item.isTrending} onChange={(e) => onUpdate(item._id, { ...item, isTrending: e.target.checked })} className="accent-[#c9a84c]" />
              Trending
            </label>
            <label className="flex items-center gap-2 text-xs text-[#7a7568]">
              <input type="checkbox" checked={item.isFeatured} onChange={(e) => onUpdate(item._id, { ...item, isFeatured: e.target.checked })} className="accent-[#c9a84c]" />
              Featured
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContentItemsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['content-items'], queryFn: () => adminApi.get<{ items: ContentItem[]; total: number }>('/admin/content/items') });
  const items = data?.data?.items || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<ContentItem> }) => adminApi.put(`/admin/content/items/${id}`, body),
    onSuccess: () => { toast.success('Updated'); qc.invalidateQueries({ queryKey: ['content-items'] }); },
    onError: () => toast.error('Failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.delete(`/admin/content/items/${id}`),
    onSuccess: () => { toast.success('Deleted'); qc.invalidateQueries({ queryKey: ['content-items'] }); },
    onError: () => toast.error('Failed'),
  });

  const createMutation = useMutation({
    mutationFn: (body: Partial<ContentItem>) => adminApi.post('/admin/content/items', body),
    onSuccess: () => { toast.success('Created'); qc.invalidateQueries({ queryKey: ['content-items'] }); setShowAdd(false); },
    onError: () => toast.error('Failed'),
  });

  const { data: catsData } = useQuery({ queryKey: ['content-categories'], queryFn: () => adminApi.get<{ _id: string; key: string; label: string }[]>('/admin/content/categories') });
  const categories = catsData?.data || [];

  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<Partial<ContentItem>>({
    type: 'reel',
    categoryKeys: [],
    placeholderBgClass: 'g1',
    placeholderEmoji: '🎬',
    viewsCount: 0,
    reachCount: 0,
    likesCount: 0,
    commentsCount: 0,
    savesCount: 0,
    sortOrder: 0,
    isVisible: true,
  });

  if (isLoading) return <AdminLayout><div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-16 animate-pulse rounded-lg bg-white/5" />)}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>Content Items</h1>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="inline-flex items-center gap-1 rounded-lg bg-[#c9a84c] px-3 py-2 text-xs font-semibold text-[#0d0d0d] hover:bg-[#e8c97a]"
          >
            <Plus className="h-3 w-3" /> Add Item
          </button>
        </div>

        {showAdd && (
          <div className="rounded-2xl border border-[#c9a84c]/30 bg-white/[0.03] p-6 space-y-3">
            <h2 className="text-sm font-semibold text-[#c9a84c]">New Content Item</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <input placeholder="Title" value={addForm.title || ''} onChange={(e) => setAddForm((f) => ({ ...f, title: e.target.value }))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
              <input placeholder="Instagram URL" value={addForm.instagramUrl || ''} onChange={(e) => setAddForm((f) => ({ ...f, instagramUrl: e.target.value }))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
              <select value={addForm.type || 'reel'} onChange={(e) => setAddForm((f) => ({ ...f, type: e.target.value }))} className="rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" style={{ colorScheme: 'dark' }}>
                <option value="reel" className="bg-[#1a1a1a] text-[#f5f0e8]">Reel</option><option value="post" className="bg-[#1a1a1a] text-[#f5f0e8]">Post</option><option value="carousel" className="bg-[#1a1a1a] text-[#f5f0e8]">Carousel</option><option value="story" className="bg-[#1a1a1a] text-[#f5f0e8]">Story</option>
              </select>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <label className="text-xs text-[#7a7568] mb-1 block">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <label key={cat.key} className="flex items-center gap-1.5 text-xs text-[#f5f0e8] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addForm.categoryKeys?.includes(cat.key) || false}
                        onChange={(e) => {
                          const keys = e.target.checked
                            ? [...(addForm.categoryKeys || []), cat.key]
                            : (addForm.categoryKeys || []).filter((k) => k !== cat.key);
                          setAddForm((f) => ({ ...f, categoryKeys: keys }));
                        }}
                        className="accent-[#c9a84c]"
                      />
                      {cat.label}
                    </label>
                  ))}
                  {categories.length === 0 && <span className="text-xs text-[#7a7568]">No categories yet</span>}
                </div>
              </div>
              <input placeholder="Display Metric (e.g. 340K)" value={addForm.displayMetric || ''} onChange={(e) => setAddForm((f) => ({ ...f, displayMetric: e.target.value }))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
              <input placeholder="Metric Label (views/reach)" value={addForm.displayMetricLabel || ''} onChange={(e) => setAddForm((f) => ({ ...f, displayMetricLabel: e.target.value }))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => createMutation.mutate(addForm)} disabled={createMutation.isPending || !addForm.instagramUrl} className="rounded-lg bg-[#c9a84c] px-4 py-2 text-xs font-semibold text-[#0d0d0d] hover:bg-[#e8c97a] disabled:opacity-50">Create</button>
              <button onClick={() => setShowAdd(false)} className="rounded-lg border border-white/10 px-4 py-2 text-xs text-[#7a7568] hover:text-[#f5f0e8]">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {items.map((item) => (
            <ContentCard key={item._id} item={item} categories={categories} onUpdate={(id, body) => updateMutation.mutate({ id, body })} onDelete={(id) => deleteMutation.mutate(id)} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
