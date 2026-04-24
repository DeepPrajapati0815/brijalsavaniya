import type { Metadata } from 'next';

import { creator, audience, stats, services, brands } from '@/data/site';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Media Kit PDF',
  description: 'Print-friendly media kit view for Brijal Savaniya.',
  robots: { index: false, follow: false },
};

function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

export default function MediaKitPrintPage() {
  return (
    <div className="bg-white text-zinc-950">
      <div className="border-b border-zinc-200 py-8">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-semibold text-zinc-500">MEDIA KIT</div>
              <div className="mt-2 text-3xl font-semibold">{creator.name}</div>
              <div className="mt-2 text-sm text-zinc-600">
                Instagram Creator • Lifestyle • Fashion • Fitness
              </div>
            </div>
            <div className="text-right text-sm text-zinc-600">
              <div>{creator.primaryEmail}</div>
              <div>{creator.whatsappNumber}</div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 p-4">
              <div className="text-xs text-zinc-500">Followers</div>
              <div className="mt-1 text-2xl font-semibold">{formatNumber(stats.followers)}+</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-4">
              <div className="text-xs text-zinc-500">Engagement rate</div>
              <div className="mt-1 text-2xl font-semibold">{(stats.engagementRate * 100).toFixed(1)}%</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-4">
              <div className="text-xs text-zinc-500">Average Reel views</div>
              <div className="mt-1 text-2xl font-semibold">{formatNumber(stats.avgReelViews)}</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-4">
              <div className="text-xs text-zinc-500">Average Story views</div>
              <div className="mt-1 text-2xl font-semibold">{formatNumber(stats.avgStoryViews)}</div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 p-4">
              <div className="text-sm font-semibold">Audience (top countries)</div>
              <div className="mt-3 grid gap-2">
                {audience.topCountries.map((c) => (
                  <div key={c.label} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-700">{c.label}</span>
                    <span className="font-semibold">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 p-4">
              <div className="text-sm font-semibold">Audience (gender & age)</div>
              <div className="mt-3 grid gap-4">
                <div>
                  <div className="text-xs font-semibold text-zinc-500">Gender</div>
                  <div className="mt-2 grid gap-1">
                    {audience.gender.map((g) => (
                      <div key={g.label} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-700">{g.label}</span>
                        <span className="font-semibold">{g.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-500">Age</div>
                  <div className="mt-2 grid gap-1">
                    {audience.age.map((a) => (
                      <div key={a.label} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-700">{a.label}</span>
                        <span className="font-semibold">{a.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-200 p-4">
            <div className="text-sm font-semibold">Services</div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <div key={s.title} className="rounded-xl border border-zinc-200 p-3">
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="mt-2 text-sm text-zinc-600">{s.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-200 p-4">
            <div className="text-sm font-semibold">Selected results</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {brands.map((b) => (
                <div key={b.name} className="rounded-xl border border-zinc-200 p-3">
                  <div className="text-sm font-semibold">{b.name}</div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-lg border border-zinc-200 p-2">
                      <div className="text-zinc-500">Views</div>
                      <div className="mt-1 font-semibold">{b.result.views}</div>
                    </div>
                    <div className="rounded-lg border border-zinc-200 p-2">
                      <div className="text-zinc-500">Reach</div>
                      <div className="mt-1 font-semibold">{b.result.reach}</div>
                    </div>
                    <div className="rounded-lg border border-zinc-200 p-2">
                      <div className="text-zinc-500">Saves</div>
                      <div className="mt-1 font-semibold">{b.result.saves}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-xs text-zinc-500">
            Tip: Use your browser print dialog to save as PDF.
          </div>
        </div>
      </Container>
    </div>
  );
}
