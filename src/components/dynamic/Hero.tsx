'use client';

import { useEffect } from 'react';
import type { HeroData, MetricData } from '@/lib/api';
import { getStaticHero, getStaticMetrics } from '@/lib/api';

interface HeroProps {
  data?: HeroData | null;
  metrics?: MetricData[];
}

export function Hero({ data, metrics }: HeroProps) {
  const hero = data || getStaticHero();

  useEffect(() => {
    const el = document.getElementById('typed-niche');
    if (!el) return;

    let ni = 0;
    let ci = 0;
    let deleting = false;
    let t: number | undefined;

    const tick = () => {
      const word = hero.typedNiches[ni] ?? 'Savaniya';
      if (!deleting) {
        el.textContent = word.slice(0, ci + 1);
        ci += 1;
        if (ci === word.length) {
          deleting = true;
          t = window.setTimeout(tick, 2200);
          return;
        }
      } else {
        el.textContent = word.slice(0, ci - 1);
        ci -= 1;
        if (ci === 0) {
          deleting = false;
          ni = (ni + 1) % hero.typedNiches.length;
          if (ni === 0) {
            el.textContent = 'Savaniya';
            return;
          }
        }
      }

      t = window.setTimeout(tick, deleting ? 60 : 90);
    };

    t = window.setTimeout(tick, 2500);
    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [hero.typedNiches]);

  return (
    <section id="hero">
      <div className="hero-bg">
        <div className="blob1" />
        <div className="blob2" />
      </div>

      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-badge">
            <span>{hero.badgeText || 'Available for Collaborations'}</span>
          </div>

          <h1 className="hero-name">
            Brijal
            <br />
            <em id="typed-niche">Savaniya</em>
          </h1>

          <div className="hero-niches">
            {hero.nichePills.filter(p => p.isVisible).map((n) => (
              <span key={n.label} className="niche-pill">
                {n.label}
              </span>
            ))}
          </div>

          <p className="hero-tagline">{hero.tagline}</p>

          <div className="hero-ctas">
            <a href={hero.ctaPrimaryHref || '#contact'} className="btn-primary">
              {hero.ctaPrimaryText || 'Work With Me'}
            </a>
            <a href={hero.ctaSecondaryHref || '#media-kit'} className="btn-secondary">
              {hero.ctaSecondaryText || 'View Media Kit'}
            </a>
          </div>

          <div className="hero-social-proof">
            {(metrics && metrics.length > 0 ? metrics : getStaticMetrics()).slice(0, 4).map((m) => (
              <div className="proof-item" key={m.key}>
                <div className="proof-number">
                  {m.value}
                </div>
                <div className="proof-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual reveal">
          <div
            className="hero-card"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,120,110,0.05))',
              border: '1px solid var(--border)',
              borderRadius: 16,
              aspectRatio: '4 / 5',
              maxHeight: 580,
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <div
              className="hero-card-img"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(160deg, #1a1409 0%, #0d0d0d 40%, #14100a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                className="avatar-art"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: 250,
                    height: 250,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -65%)',
                  }}
                />
                <img
                  src={hero.heroImageUrl || '/hero_profile.jpg'}
                  alt="Brijal Savaniya Rajkot Gujarat UGC ads lifestyle fashion creator 50K followers"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.92,
                    zIndex: 2,
                  }}
                />
                <div
                  className="avatar-initials"
                  style={{
                    fontFamily:
                      "var(--font-serif), ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
                    fontSize: '7rem',
                    fontWeight: 300,
                    color: 'rgba(201,168,76,0.28)',
                    letterSpacing: '-0.04em',
                    position: 'relative',
                    zIndex: 1,
                    lineHeight: 1,
                    paddingTop: 40,
                    mixBlendMode: 'overlay',
                  }}
                >
                  BS
                </div>
              </div>
            </div>

            <div
              className="hero-card-overlay"
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '1.5rem',
                background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, transparent 100%)',
                width: '100%',
              }}
            >
              <div
                className="instagram-badge"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '0.6rem 1rem',
                  fontSize: '0.8rem',
                  color: 'var(--cream)',
                }}
              >
                <span className="gold">@brijalsavaniya · 50K+ Instagram followers · Gujarat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
