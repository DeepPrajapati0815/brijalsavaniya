export function Brands() {
  return (
    <section id="brands">
      <div className="max-w">
        <div className="reveal">
          <div className="section-label">Brand Collaborations</div>
          <h2 className="section-title">
            Trusted By
            <br />
            <em className="serif-italic" style={{ color: 'var(--gold)' }}>
              Top Brands
            </em>
          </h2>
          <p className="section-sub">
            Delivering measurable results for brands across fashion, wellness, beauty, and lifestyle industries.
          </p>
        </div>

        <div className="brands-row reveal" style={{ marginTop: '3.5rem' }}>
          <div className="brand-card">
            <div className="brand-logo-area">
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(201,168,76,0.15)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                🌸
              </div>
            </div>
            <div className="brand-name">Nykaa Fashion</div>
            <div className="brand-type">Fashion &amp; Beauty</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              3-reel campaign for festive collection launch. Full creative direction by Brijal.
            </div>
            <div className="campaign-stat">
              <div className="cs-item">
                <div className="cs-val">340K</div>
                <div className="cs-label">Reel Views</div>
              </div>
              <div className="cs-item">
                <div className="cs-val">4.2K</div>
                <div className="cs-label">Link Clicks</div>
              </div>
              <div className="cs-item">
                <div className="cs-val">8.4%</div>
                <div className="cs-label">CTR</div>
              </div>
            </div>
          </div>

          <div className="brand-card">
            <div className="brand-logo-area">
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(201,168,76,0.15)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                💊
              </div>
            </div>
            <div className="brand-name">WellBeing Nutrition</div>
            <div className="brand-type">Health &amp; Fitness</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              Month-long ambassador campaign featuring product reviews and daily fitness routines.
            </div>
            <div className="campaign-stat">
              <div className="cs-item">
                <div className="cs-val">215K</div>
                <div className="cs-label">Total Reach</div>
              </div>
              <div className="cs-item">
                <div className="cs-val">1,280</div>
                <div className="cs-label">Conversions</div>
              </div>
              <div className="cs-item">
                <div className="cs-val">₹18L</div>
                <div className="cs-label">GMV</div>
              </div>
            </div>
          </div>

          <div className="brand-card">
            <div className="brand-logo-area">
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(201,168,76,0.15)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                👜
              </div>
            </div>
            <div className="brand-name">Aldo India</div>
            <div className="brand-type">Accessories &amp; Footwear</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              Seasonal lookbook collab — Reel + Stories + Swipe-up for new collection.
            </div>
            <div className="campaign-stat">
              <div className="cs-item">
                <div className="cs-val">178K</div>
                <div className="cs-label">Video Views</div>
              </div>
              <div className="cs-item">
                <div className="cs-val">3.1K</div>
                <div className="cs-label">Saves</div>
              </div>
              <div className="cs-item">
                <div className="cs-val">9.1%</div>
                <div className="cs-label">Eng. Rate</div>
              </div>
            </div>
          </div>

          <div className="brand-card">
            <div className="brand-logo-area">
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(201,168,76,0.15)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                🧴
              </div>
            </div>
            <div className="brand-name">Minimalist</div>
            <div className="brand-type">Skincare</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              2-week skincare routine campaign with before/after storytelling format.
            </div>
            <div className="campaign-stat">
              <div className="cs-item">
                <div className="cs-val">143K</div>
                <div className="cs-label">Video Views</div>
              </div>
              <div className="cs-item">
                <div className="cs-val">2.8K</div>
                <div className="cs-label">Link Clicks</div>
              </div>
              <div className="cs-item">
                <div className="cs-val">11%</div>
                <div className="cs-label">Save Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="collab-quote reveal">
          <p className="quote-text">
            Brijal's content exceeded every expectation. Our festive reel went viral overnight. The ROI was unlike anything we'd seen
            from micro-influencer campaigns — her audience is genuinely engaged and trusts her recommendations implicitly.
          </p>
          <div className="quote-author">
            <div className="qa-avatar">NF</div>
            <div>
              <div className="qa-name">Priya Mehta</div>
              <div className="qa-title">Influencer Marketing Manager, Nykaa Fashion</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
