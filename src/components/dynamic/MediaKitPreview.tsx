import type { MetricData, DemographicData } from '@/lib/api';
import { getStaticMetrics, getStaticDemographics } from '@/lib/api';

interface MediaKitPreviewProps {
  metrics?: MetricData[];
  demographics?: DemographicData[];
}

export function MediaKitPreview({ metrics, demographics }: MediaKitPreviewProps) {
  const m = metrics && metrics.length > 0 ? metrics : getStaticMetrics();
  const d = demographics && demographics.length > 0 ? demographics : getStaticDemographics();

  return (
    <section id="media-kit">
      <div className="max-w">
        <div className="reveal">
          <div className="section-label">Media Kit</div>
          <h2 className="section-title">
            UGC Creator Media Kit
            <br />
            <em className="serif-italic" style={{ color: 'var(--gold)' }}>
              &amp; Audience Analytics
            </em>
          </h2>
          <p className="section-sub">
            Real data. Real engagement. Here&apos;s exactly who I reach and how deeply my UGC ad content resonates with India&apos;s fashion-forward audience.
          </p>
        </div>

        <div className="stats-grid reveal">
          {m.map((stat) => (
            <div className="stat-card" key={stat.key}>
              <div className="stat-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div className="stat-value">
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
              {stat.growthNote && (
                <div style={{ fontSize: '0.72rem', color: stat.growthPositive ? '#4caf50' : '#c97b6e', marginTop: '0.25rem' }}>
                  {stat.growthPositive ? '↑' : '↓'} {stat.growthNote}
                </div>
              )}
              <div className="stat-bar">
                <div className="stat-bar-fill" data-width={String(stat.barPercent)} />
              </div>
            </div>
          ))}
        </div>

        <div className="analytics-row reveal">
          <div className="analytics-card">
            <h4>Top Cities</h4>
            <div className="cities-list">
              {d.filter(item => item.type === 'city').map((city) => (
                <div className="city-row" key={city._id}>
                  <span className="city-name">{city.label}</span>
                  <div className="city-bar">
                    <div className="city-bar-fill" data-width={String(city.percentage)} />
                  </div>
                  <span className="city-pct">{city.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card">
            <h4>Gender Split</h4>
            <div className="donut-wrap">
              <svg className="donut" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
                <circle
                  cx="18" cy="18" r="15.91" fill="none" stroke="#c9a84c" strokeWidth="3.5"
                  strokeDasharray="72 28" strokeDashoffset="25" strokeLinecap="round"
                />
                <circle
                  cx="18" cy="18" r="15.91" fill="none" stroke="#c97b6e" strokeWidth="3.5"
                  strokeDasharray="28 72" strokeDashoffset="-47" strokeLinecap="round"
                />
                <text x="18" y="21" textAnchor="middle" fontSize="5.5" fill="#f5f0e8" fontFamily="Cormorant Garamond,serif">
                  72%
                </text>
              </svg>
              <div className="donut-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#c9a84c' }} />
                  Female — 72%
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#c97b6e' }} />
                  Male — 24%
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#7a7568' }} />
                  Other — 4%
                </div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                  Core audience: fashion-forward young women aged 18–34 across Gujarat & India
                </div>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h4>Content Performance</h4>
            <div className="demo-bars">
              <div className="demo-row">
                <span className="demo-label">Reels</span>
                <div className="demo-track"><div className="demo-fill" data-width="85" /></div>
                <span className="demo-pct">9.2%</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Carousels</span>
                <div className="demo-track"><div className="demo-fill" data-width="65" /></div>
                <span className="demo-pct">7.1%</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Stories</span>
                <div className="demo-track"><div className="demo-fill" data-width="55" /></div>
                <span className="demo-pct">6.0%</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Static Posts</span>
                <div className="demo-track"><div className="demo-fill" data-width="40" /></div>
                <span className="demo-pct">4.4%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="media-kit-download reveal">
          <div className="mdk-text">
            <h4>📎 Full Media Kit Available</h4>
            <p>Download the complete PDF media kit with detailed analytics, content samples, and rate card</p>
          </div>
          <a href="#contact" className="btn-primary">
            Request Media Kit
          </a>
        </div>
      </div>
    </section>
  );
}
