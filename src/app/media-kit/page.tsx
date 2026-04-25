import type { Metadata } from 'next';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { creator, audience, stats, services, brands } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { getMediaKit, getServices as getApiServices, getBrandsData, getSettings } from '@/lib/api';
import type { MetricData, ServiceData, BrandData, CollaborationData, SettingsData } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Media Kit',
  description:
    'Media kit for Brijal Savaniya — audience demographics, performance stats, services, and campaign results for brand collaborations.',
  alternates: {
    canonical: '/media-kit',
  },
};

function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

export default async function MediaKitPage() {
  const [mediaKit, apiServices, brandsData, settings] = await Promise.all([
    getMediaKit(),
    getApiServices(),
    getBrandsData(),
    getSettings(),
  ]);

  const metrics: MetricData[] = mediaKit.metrics.length > 0 ? mediaKit.metrics : [
    { key: 'followers', label: 'Total Followers', value: '50.2K', rawValue: 50200, suffix: 'K', growthNote: '', growthPositive: true, barPercent: 82, sortOrder: 1, isVisible: true },
    { key: 'engagement', label: 'Engagement Rate', value: '7.8%', rawValue: 7.8, suffix: '%', growthNote: '', growthPositive: true, barPercent: 78, sortOrder: 2, isVisible: true },
    { key: 'avgReelViews', label: 'Avg Reel Views', value: '82K', rawValue: 82000, suffix: 'K', growthNote: '', growthPositive: true, barPercent: 68, sortOrder: 3, isVisible: true },
    { key: 'avgStoryViews', label: 'Avg Story Views', value: '18K', rawValue: 18000, suffix: 'K', growthNote: '', growthPositive: true, barPercent: 72, sortOrder: 4, isVisible: true },
  ];

  const svcList: ServiceData[] = apiServices.length > 0 ? apiServices : services.map((s, i) => ({
    _id: String(i + 1), number: String(i + 1).padStart(2, '0'), title: s.title, description: s.description,
    features: [...s.deliverables], priceLabel: 'Starting from', priceDisplay: ['₹15,000', '₹6,000', '₹8,000', 'Custom'][i],
    isVisible: true, sortOrder: i + 1,
  }));

  const brandList: BrandData[] = brandsData.brands.length > 0 ? brandsData.brands : brands.map((b, i) => ({
    _id: String(i + 1), name: b.name, slug: b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    type: '', logoEmoji: ['🌸', '💊', '👜', '🧴'][i] || '🏢', isFeatured: i === 0, isVisible: true, sortOrder: i + 1,
  }));

  const collabList: CollaborationData[] = brandsData.collaborations;

  const creatorName = settings?.creator_name || creator.name;

  return (
    <div>
      <Navbar />
      <main>
        <Section className="pb-10">
          <Container>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  Media Kit
                </div>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                  {creatorName}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Built for brand managers who need clarity fast: performance stats, audience fit,
                  collaboration options, and sample campaign results.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/#contact">Work With Me</Button>
                <Button
                  variant="secondary"
                  href="/media-kit/print"
                >
                  Download PDF (UI)
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-zinc-200/60 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-softDark">
                  <div className="text-sm font-semibold">Performance overview</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {metrics.map((m) => (
                      <div key={m.key} className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">{m.label}</div>
                        <div className="mt-1 text-2xl font-semibold">{m.value}</div>
                        {m.growthNote && <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{m.growthNote}</div>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-zinc-200/60 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-softDark">
                  <div className="text-sm font-semibold">Services</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {svcList.map((s) => (
                      <div
                        key={s._id}
                        className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                      >
                        <div className="text-sm font-semibold">{s.title}</div>
                        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                          {s.description}
                        </div>
                        <div className="mt-3 grid gap-2">
                          {s.features.map((d) => (
                            <div
                              key={d}
                              className="rounded-xl border border-zinc-200/60 bg-white/70 px-3 py-2 text-xs font-semibold text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                            >
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-zinc-200/60 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-softDark">
                  <div className="text-sm font-semibold">Audience demographics</div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Percentage distribution
                  </div>

                  <div className="mt-5">
                    <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Top countries</div>
                    <div className="mt-3 grid gap-2">
                      {audience.topCountries.map((c) => (
                        <div
                          key={c.label}
                          className="flex items-center justify-between rounded-2xl border border-zinc-200/60 bg-white/70 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                        >
                          <span className="text-zinc-700 dark:text-zinc-200">{c.label}</span>
                          <span className="font-semibold">{c.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Gender</div>
                      <div className="mt-3 grid gap-2">
                        {audience.gender.map((g) => (
                          <div
                            key={g.label}
                            className="flex items-center justify-between rounded-2xl border border-zinc-200/60 bg-white/70 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                          >
                            <span className="text-zinc-700 dark:text-zinc-200">{g.label}</span>
                            <span className="font-semibold">{g.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Age</div>
                      <div className="mt-3 grid gap-2">
                        {audience.age.map((a) => (
                          <div
                            key={a.label}
                            className="flex items-center justify-between rounded-2xl border border-zinc-200/60 bg-white/70 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                          >
                            <span className="text-zinc-700 dark:text-zinc-200">{a.label}</span>
                            <span className="font-semibold">{a.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-zinc-200/60 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-softDark">
                  <div className="text-sm font-semibold">Case study-style results</div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Examples of how campaigns have performed
                  </div>
                  <div className="mt-4 grid gap-3">
                    {brandList.map((b) => {
                      const collab = collabList.find(c => c.brandId === b._id || c.brandId === b.slug);
                      const resultViews = collab?.viewsCount ? `${(collab.viewsCount/1000).toFixed(0)}K` : (brands.find(sb => sb.name === b.name)?.result.views || '—');
                      const resultReach = collab?.clicksCount ? `${(collab.clicksCount/1000).toFixed(1)}K` : (brands.find(sb => sb.name === b.name)?.result.reach || '—');
                      const resultSaves = collab?.ctrPercent ? `${collab.ctrPercent}%` : (brands.find(sb => sb.name === b.name)?.result.saves || '—');
                      return (
                        <div
                          key={b._id}
                          className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                        >
                          <div className="text-sm font-semibold">{b.name}</div>
                          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                            <div className="rounded-xl border border-zinc-200/60 bg-white/70 p-2 text-xs dark:border-white/10 dark:bg-white/5">
                              <div className="text-zinc-500 dark:text-zinc-400">Views</div>
                              <div className="mt-1 font-semibold">{resultViews}</div>
                            </div>
                            <div className="rounded-xl border border-zinc-200/60 bg-white/70 p-2 text-xs dark:border-white/10 dark:bg-white/5">
                              <div className="text-zinc-500 dark:text-zinc-400">Reach</div>
                              <div className="mt-1 font-semibold">{resultReach}</div>
                            </div>
                            <div className="rounded-xl border border-zinc-200/60 bg-white/70 p-2 text-xs dark:border-white/10 dark:bg-white/5">
                              <div className="text-zinc-500 dark:text-zinc-400">Saves</div>
                              <div className="mt-1 font-semibold">{resultSaves}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-zinc-200/60 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/5 to-rose-400/10 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:from-indigo-500/15 dark:via-fuchsia-500/10 dark:to-rose-400/15 dark:shadow-softDark">
                  <div className="text-sm font-semibold">Booking notes</div>
                  <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                    To keep campaigns smooth, I confirm a timeline, creative angle, and do&apos;s/don&apos;ts in writing.
                    For ad usage rights, I&apos;ll share a clear add-on.
                  </div>
                  <Button href="/#contact" className="mt-5 w-full">
                    Request pricing
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
