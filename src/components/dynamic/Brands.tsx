'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BrandData, CollaborationData, TestimonialData } from '@/lib/api';
import { getStaticBrands } from '@/lib/api';

interface BrandsProps {
  brands?: BrandData[];
  collaborations?: CollaborationData[];
  testimonials?: TestimonialData[];
}

export function Brands({ brands, collaborations, testimonials }: BrandsProps) {
  const brandList = brands && brands.length > 0 ? brands : getStaticBrands();
  const collabs = collaborations || [];
  const testimonialsList = testimonials && testimonials.length > 0 ? testimonials : [];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    if (testimonialsList.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % testimonialsList.length);
  }, [testimonialsList.length]);

  const prevSlide = useCallback(() => {
    if (testimonialsList.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  }, [testimonialsList.length]);

  useEffect(() => {
    if (testimonialsList.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [testimonialsList.length, nextSlide]);

  const t = testimonialsList[currentSlide];

  return (
    <section id="brands">
      <div className="max-w">
        <div className="reveal">
          <div className="section-label">Brand Collaborations</div>
          <h2 className="section-title">
            Trusted By
            <br />
            <em className="serif-italic" style={{ color: 'var(--gold)' }}>
              Lifestyle & Fashion Brands
            </em>
          </h2>
          <p className="section-sub">
            Delivering measurable results for lifestyle and fashion brands across India through authentic UGC ad content.
          </p>
        </div>

        <div className="brands-row reveal" style={{ marginTop: '3.5rem' }}>
          {brandList.map((brand) => {
            const brandCollabs = collabs.filter(c => c.brandId === brand._id || c.brandId === brand.slug);
            const collab = brandCollabs[0];
            return (
              <div className="brand-card" key={brand._id}>
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
                    {brand.logoEmoji || '🏢'}
                  </div>
                </div>
                <div className="brand-name">{brand.name}</div>
                <div className="brand-type">{brand.type}</div>
                {collab && (
                  <>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                      {collab.description}
                    </div>
                    <div className="campaign-stat">
                      <div className="cs-item">
                        <div className="cs-val">{collab.viewsCount ? `${(collab.viewsCount/1000).toFixed(0)}K` : '—'}</div>
                        <div className="cs-label">Views</div>
                      </div>
                      <div className="cs-item">
                        <div className="cs-val">{collab.clicksCount ? `${(collab.clicksCount/1000).toFixed(1)}K` : '—'}</div>
                        <div className="cs-label">Clicks</div>
                      </div>
                      <div className="cs-item">
                        <div className="cs-val">{collab.ctrPercent ? `${collab.ctrPercent}%` : '—'}</div>
                        <div className="cs-label">CTR</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {t && (
          <div className="collab-quote reveal" style={{ position: 'relative' }}>
            <p className="quote-text">{t.quoteText}</p>
            <div className="quote-author">
              <div className="qa-avatar">{t.authorName?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'BR'}</div>
              <div>
                <div className="qa-name">{t.authorName}</div>
                <div className="qa-title">{t.authorTitle}</div>
              </div>
            </div>

            {testimonialsList.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', alignItems: 'center' }}>
                <button onClick={prevSlide} style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.4rem 0.6rem', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.75rem' }}>&larr;</button>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {testimonialsList.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      style={{
                        width: i === currentSlide ? 20 : 6,
                        height: 6,
                        borderRadius: 3,
                        background: i === currentSlide ? 'var(--gold)' : 'rgba(255,255,255,0.15)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                      }}
                    />
                  ))}
                </div>
                <button onClick={nextSlide} style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.4rem 0.6rem', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.75rem' }}>&rarr;</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
