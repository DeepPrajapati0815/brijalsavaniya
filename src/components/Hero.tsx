'use client';

import { useEffect } from 'react';

import { creator } from '@/data/site';

const niches = ['Savaniya', 'Lifestyle Creator', 'Fashion Influencer', 'Fitness Coach'];

export function Hero() {
  useEffect(() => {
    const el = document.getElementById('typed-niche');
    if (!el) return;

    let ni = 0;
    let ci = 0;
    let deleting = false;
    let t: number | undefined;

    const tick = () => {
      const word = niches[ni] ?? 'Savaniya';
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
          ni = (ni + 1) % niches.length;
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
  }, []);

  return (
    <section id="hero">
      <div className="hero-bg">
        <div className="blob1" />
        <div className="blob2" />
      </div>

      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-badge">
            <span>Available for Collaborations</span>
          </div>

          <h1 className="hero-name">
            Brijal
            <br />
            <em id="typed-niche">Savaniya</em>
          </h1>

          <div className="hero-niches">
            {creator.nicheRotator.map((n) => (
              <span key={n} className="niche-pill">
                {n}
              </span>
            ))}
            <span className="niche-pill">Beauty</span>
          </div>

          <p className="hero-tagline">
            Creating authentic, high-impact content that resonates with a highly engaged audience of{' '}
            <strong style={{ color: 'var(--cream)' }}>50,000+</strong> followers across Instagram.
            Turning brand stories into viral moments.
          </p>

          <div className="hero-ctas">
            <a href="#contact" className="btn-primary">
              Work With Me
            </a>
            <a href="#media-kit" className="btn-secondary">
              View Media Kit
            </a>
          </div>

          <div className="hero-social-proof">
            <div className="proof-item">
              <div className="proof-number counter" data-target="50" data-suffix="K+">
                0
              </div>
              <div className="proof-label">Followers</div>
            </div>
            <div className="proof-item">
              <div className="proof-number counter" data-target="7.8" data-suffix="%" data-decimal="1">
                0
              </div>
              <div className="proof-label">Engagement Rate</div>
            </div>
            <div className="proof-item">
              <div className="proof-number counter" data-target="120" data-suffix="K+">
                0
              </div>
              <div className="proof-label">Monthly Reach</div>
            </div>
            <div className="proof-item">
              <div className="proof-number counter" data-target="25" data-suffix="+">
                0
              </div>
              <div className="proof-label">Brand Deals</div>
            </div>
          </div>
        </div>

        <div className="hero-visual reveal">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,120,110,0.05))',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
              aspectRatio: '4 / 5',
              maxHeight: 580,
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <div
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
                  src="/hero_profile.jpg"
                  alt="Brijal Savaniya"
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
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '1.5rem',
                background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, transparent 100%)',
                width: '100%',
              }}
            >
              <div
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
                <span className="gold">@brijalsavaniya · 50K followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
