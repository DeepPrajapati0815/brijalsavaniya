export function Services() {
  return (
    <section id="services">
      <div className="max-w">
        <div className="reveal">
          <div className="section-label">Services</div>
          <h2 className="section-title">
            What I Offer
            <br />
            <em className="serif-italic" style={{ color: 'var(--gold)' }}>
              Brands
            </em>
          </h2>
          <p className="section-sub">
            Every collaboration is crafted with intention, creativity, and a laser focus on your campaign goals.
          </p>
        </div>

        <div className="services-grid reveal">
          <div className="service-card">
            <div className="service-num">01</div>
            <div className="service-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <div className="service-title">Reel Promotion</div>
            <div className="service-desc">
              High-quality, trend-aware reels crafted to go viral. Hook + value + CTA formula tailored for maximum saves and shares.
            </div>
            <ul className="service-features">
              <li>Full concept &amp; creative direction</li>
              <li>Professional editing &amp; captions</li>
              <li>Hashtag &amp; SEO strategy</li>
              <li>Performance report post-campaign</li>
            </ul>
            <div className="service-price">
              <span className="price-start">Starting from</span>
              <span className="price-val">₹15,000</span>
            </div>
          </div>

          <div className="service-card">
            <div className="service-num">02</div>
            <div className="service-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 8 12 12 14 14" />
              </svg>
            </div>
            <div className="service-title">Story Promotions</div>
            <div className="service-desc">
              Daily Stories with swipe-up links, polls, Q&amp;As, and countdown timers — perfect for product launches and flash sales.
            </div>
            <ul className="service-features">
              <li>5–10 branded story frames</li>
              <li>Link sticker integration</li>
              <li>Poll / Quiz engagement</li>
              <li>24-hr or 48-hr highlights</li>
            </ul>
            <div className="service-price">
              <span className="price-start">Starting from</span>
              <span className="price-val">₹6,000</span>
            </div>
          </div>

          <div className="service-card">
            <div className="service-num">03</div>
            <div className="service-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
                <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
                <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
                <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
                <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
                <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />
                <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />
              </svg>
            </div>
            <div className="service-title">UGC Content Creation</div>
            <div className="service-desc">
              Authentic, brand-owned content you can repurpose across ads, website, and other channels. No posting required.
            </div>
            <ul className="service-features">
              <li>Studio-quality product videos</li>
              <li>Lifestyle &amp; aesthetic photography</li>
              <li>Raw + edited files delivered</li>
              <li>Full usage rights transferred</li>
            </ul>
            <div className="service-price">
              <span className="price-start">Starting from</span>
              <span className="price-val">₹8,000</span>
            </div>
          </div>

          <div className="service-card">
            <div className="service-num">04</div>
            <div className="service-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <div className="service-title">Affiliate Campaigns</div>
            <div className="service-desc">
              Performance-based partnership where I promote your product over 30–90 days using trackable links and discount codes.
            </div>
            <ul className="service-features">
              <li>Dedicated promo code / link</li>
              <li>Monthly content schedule</li>
              <li>Live conversion tracking</li>
              <li>Exclusive audience discount</li>
            </ul>
            <div className="service-price">
              <span className="price-start">Commission-based or</span>
              <span className="price-val">Custom</span>
            </div>
          </div>
        </div>

        <div className="services-cta-band reveal">
          <div className="scta-text">
            <h3>
              Ready to amplify
              <br />
              <em className="serif-italic">your brand?</em>
            </h3>
            <p>Custom packages available. Let's build something your audience will love.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-primary">
              Request Pricing
            </a>
            <a href="#media-kit" className="btn-secondary">
              View Analytics
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
