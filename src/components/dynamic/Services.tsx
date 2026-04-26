import type { ServiceData } from '@/lib/api';
import { getStaticServices } from '@/lib/api';

interface ServicesProps {
  services?: ServiceData[];
}

const serviceIcons = [
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 8 12 12 14 14" /></svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" /><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" /><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" /><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" /></svg>,
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
];

export function Services({ services }: ServicesProps) {
  const list = services && services.length > 0 ? services : getStaticServices();

  return (
    <section id="services">
      <div className="max-w">
        <div className="reveal">
          <div className="section-label">Services</div>
          <h2 className="section-title">
            UGC Ads & Content
            <br />
            <em className="serif-italic" style={{ color: 'var(--gold)' }}>
              for Lifestyle, Fashion, Food & Makeup Brands
            </em>
          </h2>
          <p className="section-sub">
            Every collaboration is crafted with intention, creativity, and a laser focus on your campaign goals. From UGC ads to reel promotions — tailored for Indian D2C brands.
          </p>
        </div>

        <div className="services-grid reveal">
          {list.map((s, i) => (
            <div className="service-card" key={s._id}>
              <div className="service-num">{s.number}</div>
              <div className="service-icon">
                {serviceIcons[i] || serviceIcons[0]}
              </div>
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.description}</div>
              <ul className="service-features">
                {s.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="service-price">
                <span className="price-start">{s.priceLabel}</span>
                <span className="price-val">{s.priceDisplay}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta-band reveal">
          <div className="scta-text">
            <h3>
              Ready to amplify
              <br />
              <em className="serif-italic">your brand?</em>
            </h3>
            <p>Custom packages available. Let&apos;s build something your audience will love.</p>
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
