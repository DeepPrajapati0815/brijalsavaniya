'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/admin-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Inquiry {
  _id: string;
  brandName: string;
  contactName: string;
  email: string;
  phone: string;
  campaignType: string;
  budgetRange: string;
  timelineText: string;
  message: string;
  status: string;
  priority: string;
  source: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  read: 'bg-yellow-500/20 text-yellow-400',
  replied: 'bg-green-500/20 text-green-400',
  negotiating: 'bg-purple-500/20 text-purple-400',
  accepted: 'bg-emerald-500/20 text-emerald-400',
  rejected: 'bg-red-500/20 text-red-400',
  archived: 'bg-zinc-500/20 text-zinc-400',
};

const priorityColors: Record<string, string> = {
  low: 'text-zinc-400',
  medium: 'text-yellow-400',
  high: 'text-orange-400',
  urgent: 'text-red-400',
};

function DetailRow({ label, value }: { label: string; value: string | undefined | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <span className="text-xs text-[#7a7568] min-w-[100px]">{label}</span>
      <span className="text-xs text-[#f5f0e8]">{value}</span>
    </div>
  );
}

function InquiryCard({ inq, onStatusChange }: { inq: Inquiry; onStatusChange: (id: string, status: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="px-4 py-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#f5f0e8]">{inq.brandName}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[inq.status] || 'bg-zinc-500/20 text-zinc-400'}`}>
                {inq.status}
              </span>
              {inq.priority && inq.priority !== 'low' && (
                <span className={`text-[10px] font-semibold uppercase ${priorityColors[inq.priority] || 'text-zinc-400'}`}>
                  {inq.priority}
                </span>
              )}
            </div>
            <div className="text-xs text-[#7a7568] mt-0.5">
              {inq.contactName} · {inq.email} {inq.phone ? `· ${inq.phone}` : ''}
            </div>
          </div>
          <span className="text-xs text-[#7a7568] whitespace-nowrap">{new Date(inq.createdAt).toLocaleDateString()}</span>
          {expanded ? <ChevronUp className="h-4 w-4 text-[#7a7568]" /> : <ChevronDown className="h-4 w-4 text-[#7a7568]" />}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-white/5 px-4 py-3 space-y-2">
          <DetailRow label="Campaign Type" value={inq.campaignType} />
          <DetailRow label="Budget Range" value={inq.budgetRange} />
          <DetailRow label="Timeline" value={inq.timelineText} />
          <DetailRow label="Source" value={inq.source} />
          {inq.message && (
            <div className="mt-2">
              <span className="text-xs text-[#7a7568]">Message</span>
              <p className="mt-1 text-xs text-[#f5f0e8] leading-relaxed whitespace-pre-wrap rounded-lg bg-white/5 p-3 border border-white/5">
                {inq.message}
              </p>
            </div>
          )}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-[#7a7568]">Update status:</span>
            <select
              value={inq.status}
              onChange={(e) => onStatusChange(inq._id, e.target.value)}
              className="rounded border border-white/10 bg-[#1a1a1a] px-2 py-1 text-xs text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
              style={{ colorScheme: 'dark' }}
            >
              {['new', 'read', 'replied', 'negotiating', 'accepted', 'rejected', 'archived'].map((s) => (
                <option key={s} value={s} className="bg-[#1a1a1a] text-[#f5f0e8]">{s}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InquiriesPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['inquiries'], queryFn: () => adminApi.get<{ items: Inquiry[]; total: number }>('/admin/inquiries') });
  const items = data?.data?.items || [];

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => adminApi.patch(`/admin/inquiries/${id}/status`, { status }),
    onSuccess: () => { toast.success('Status updated'); qc.invalidateQueries({ queryKey: ['inquiries'] }); },
    onError: () => toast.error('Failed'),
  });

  if (isLoading) return <AdminLayout><div className="space-y-3">{[1,2,3,4,5].map(i => <div key={i} className="h-16 animate-pulse rounded-lg bg-white/5" />)}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-serif)' }}>Inquiries</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <Mail className="mx-auto mb-3 h-8 w-8 text-[#7a7568]" />
            <p className="text-sm text-[#7a7568]">No inquiries yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((inq) => (
              <InquiryCard key={inq._id} inq={inq} onStatusChange={(id, status) => statusMutation.mutate({ id, status })} />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
