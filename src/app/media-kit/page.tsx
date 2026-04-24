import type { Metadata } from 'next';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { creator, audience, stats, services, brands } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

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

export default function MediaKitPage() {
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
                  {creator.name}
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
                    <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">Followers</div>
                      <div className="mt-1 text-2xl font-semibold">
                        {formatNumber(stats.followers)}+
                      </div>
                      <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        Instagram
                      </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">Engagement rate</div>
                      <div className="mt-1 text-2xl font-semibold">
                        {(stats.engagementRate * 100).toFixed(1)}%
                      </div>
                      <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        Avg last 30 days
                      </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">Average Reel views</div>
                      <div className="mt-1 text-2xl font-semibold">
                        {formatNumber(stats.avgReelViews)}
                      </div>
                      <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        Reach-focused content
                      </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">Average Story views</div>
                      <div className="mt-1 text-2xl font-semibold">
                        {formatNumber(stats.avgStoryViews)}
                      </div>
                      <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        Great for launches
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-zinc-200/60 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-softDark">
                  <div className="text-sm font-semibold">Services</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {services.map((s) => (
                      <div
                        key={s.title}
                        className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                      >
                        <div className="text-sm font-semibold">{s.title}</div>
                        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                          {s.description}
                        </div>
                        <div className="mt-3 grid gap-2">
                          {s.deliverables.map((d) => (
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
                    {brands.map((b) => (
                      <div
                        key={b.name}
                        className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                      >
                        <div className="text-sm font-semibold">{b.name}</div>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                          <div className="rounded-xl border border-zinc-200/60 bg-white/70 p-2 text-xs dark:border-white/10 dark:bg-white/5">
                            <div className="text-zinc-500 dark:text-zinc-400">Views</div>
                            <div className="mt-1 font-semibold">{b.result.views}</div>
                          </div>
                          <div className="rounded-xl border border-zinc-200/60 bg-white/70 p-2 text-xs dark:border-white/10 dark:bg-white/5">
                            <div className="text-zinc-500 dark:text-zinc-400">Reach</div>
                            <div className="mt-1 font-semibold">{b.result.reach}</div>
                          </div>
                          <div className="rounded-xl border border-zinc-200/60 bg-white/70 p-2 text-xs dark:border-white/10 dark:bg-white/5">
                            <div className="text-zinc-500 dark:text-zinc-400">Saves</div>
                            <div className="mt-1 font-semibold">{b.result.saves}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-zinc-200/60 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/5 to-rose-400/10 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:from-indigo-500/15 dark:via-fuchsia-500/10 dark:to-rose-400/15 dark:shadow-softDark">
                  <div className="text-sm font-semibold">Booking notes</div>
                  <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                    To keep campaigns smooth, I confirm a timeline, creative angle, and do’s/don’ts in writing.
                    For ad usage rights, I’ll share a clear add-on.
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
