export function MediaKitPreview() {
  return (
    <section id="media-kit">
      <div className="max-w">
        <div className="reveal">
          <div className="section-label">Media Kit</div>
          <h2 className="section-title">
            Audience Analytics
            <br />
            <em className="serif-italic" style={{ color: 'var(--gold)' }}>
              &amp; Performance
            </em>
          </h2>
          <p className="section-sub">
            Real data. Real engagement. Here's exactly who I reach and how deeply my content resonates.
          </p>
        </div>

        <div className="stats-grid reveal">
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div className="stat-value">
              <span className="counter" data-target="50" data-suffix=".2K">
                0
              </span>
            </div>
            <div className="stat-label">Total Followers</div>
            <div style={{ fontSize: '0.72rem', color: '#4caf50', marginTop: '0.25rem' }}>
              ↑ +2,400 this month
            </div>
            <div className="stat-bar">
              <div className="stat-bar-fill" data-width="82" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div className="stat-value">
              <span className="counter" data-target="7" data-suffix=".8%">
                0
              </span>
            </div>
            <div className="stat-label">Engagement Rate</div>
            <div style={{ fontSize: '0.72rem', color: '#4caf50', marginTop: '0.25rem' }}>
              ↑ 3× industry avg
            </div>
            <div className="stat-bar">
              <div className="stat-bar-fill" data-width="78" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <div className="stat-value">
              <span className="counter" data-target="82" data-suffix="K">
                0
              </span>
            </div>
            <div className="stat-label">Avg Reel Views</div>
            <div style={{ fontSize: '0.72rem', color: '#4caf50', marginTop: '0.25rem' }}>
              ↑ Peaked at 340K
            </div>
            <div className="stat-bar">
              <div className="stat-bar-fill" data-width="68" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="stat-value">
              <span className="counter" data-target="18" data-suffix="K">
                0
              </span>
            </div>
            <div className="stat-label">Story Views / Day</div>
            <div style={{ fontSize: '0.72rem', color: '#4caf50', marginTop: '0.25rem' }}>
              ↑ 72% story reach rate
            </div>
            <div className="stat-bar">
              <div className="stat-bar-fill" data-width="72" />
            </div>
          </div>
        </div>

        <div className="analytics-row reveal">
          <div className="analytics-card">
            <h4>Age Demographics</h4>
            <div className="demo-bars">
              <div className="demo-row">
                <span className="demo-label">18–24</span>
                <div className="demo-track">
                  <div className="demo-fill" data-width="42" />
                </div>
                <span className="demo-pct">42%</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">25–34</span>
                <div className="demo-track">
                  <div className="demo-fill" data-width="35" />
                </div>
                <span className="demo-pct">35%</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">35–44</span>
                <div className="demo-track">
                  <div className="demo-fill" data-width="15" />
                </div>
                <span className="demo-pct">15%</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">45+</span>
                <div className="demo-track">
                  <div className="demo-fill" data-width="8" />
                </div>
                <span className="demo-pct">8%</span>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h4>Gender Split</h4>
            <div className="donut-wrap">
              <svg className="donut" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.91"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="3.5"
                  strokeDasharray="72 28"
                  strokeDashoffset="25"
                  strokeLinecap="round"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.91"
                  fill="none"
                  stroke="#c97b6e"
                  strokeWidth="3.5"
                  strokeDasharray="28 72"
                  strokeDashoffset="-47"
                  strokeLinecap="round"
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
                  Core audience: fashion-forward young women aged 18–34 in metro cities
                </div>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h4>Top Cities</h4>
            <div className="cities-list">
              <div className="city-row">
                <span className="city-name">Mumbai</span>
                <div className="city-bar">
                  <div className="city-bar-fill" data-width="80" />
                </div>
                <span className="city-pct">28%</span>
              </div>
              <div className="city-row">
                <span className="city-name">Delhi</span>
                <div className="city-bar">
                  <div className="city-bar-fill" data-width="55" />
                </div>
                <span className="city-pct">19%</span>
              </div>
              <div className="city-row">
                <span className="city-name">Bangalore</span>
                <div className="city-bar">
                  <div className="city-bar-fill" data-width="40" />
                </div>
                <span className="city-pct">14%</span>
              </div>
              <div className="city-row">
                <span className="city-name">Ahmedabad</span>
                <div className="city-bar">
                  <div className="city-bar-fill" data-width="32" />
                </div>
                <span className="city-pct">11%</span>
              </div>
              <div className="city-row">
                <span className="city-name">Others</span>
                <div className="city-bar">
                  <div className="city-bar-fill" data-width="22" />
                </div>
                <span className="city-pct">28%</span>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h4>Content Performance</h4>
            <div className="demo-bars">
              <div className="demo-row">
                <span className="demo-label">Reels</span>
                <div className="demo-track">
                  <div className="demo-fill" data-width="85" />
                </div>
                <span className="demo-pct">9.2%</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Carousels</span>
                <div className="demo-track">
                  <div className="demo-fill" data-width="65" />
                </div>
                <span className="demo-pct">7.1%</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Stories</span>
                <div className="demo-track">
                  <div className="demo-fill" data-width="55" />
                </div>
                <span className="demo-pct">6.0%</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Static Posts</span>
                <div className="demo-track">
                  <div className="demo-fill" data-width="40" />
                </div>
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
