'use client';

import { useEffect, useRef, useState } from 'react';
import type { ContentItemData, ContentCategoryData } from '@/lib/api';
import { getStaticContentItems } from '@/lib/api';

interface ContentShowcaseProps {
  categories?: ContentCategoryData[];
  items?: ContentItemData[];
}

export function ContentShowcase({ categories, items }: ContentShowcaseProps) {
  const contentItems = items && items.length > 0 ? items : getStaticContentItems();
  const cats = categories && categories.length > 0 ? categories : [];

  const [activeFilter, setActiveFilter] = useState('all');
  const rootRef = useRef<HTMLElement | null>(null);

  const ensureInstagramScript = () => {
    const w = window as unknown as { instgrm?: { Embeds?: { process?: () => void } } };
    if (w.instgrm?.Embeds?.process) return Promise.resolve();

    const existing = document.querySelector<HTMLScriptElement>('script[data-instgrm="true"]');
    if (existing) {
      return new Promise<void>((resolve) => {
        const done = () => resolve();
        existing.addEventListener('load', done, { once: true });
        window.setTimeout(done, 1200);
      });
    }

    return new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.instagram.com/embed.js';
      s.setAttribute('data-instgrm', 'true');
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load Instagram embed script'));
      document.body.appendChild(s);
    });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const shells = Array.from(root.querySelectorAll<HTMLElement>('.ig-embed-shell'));
    if (shells.length === 0) return;

    let cancelled = false;

    (async () => {
      try {
        await ensureInstagramScript();
      } catch {
        return;
      }

      if (cancelled) return;

      shells.forEach((shell) => {
        if (shell.getAttribute('data-ig-loaded') === 'true') return;
        const permalink = shell.getAttribute('data-instgrm-permalink');
        if (!permalink) return;

        shell.setAttribute('data-ig-loaded', 'true');
        shell.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${permalink}" data-instgrm-version="14"></blockquote>`;
      });

      const w = window as unknown as { instgrm?: { Embeds?: { process?: () => void } } };
      const process = w?.instgrm?.Embeds?.process;
      if (typeof process === 'function') {
        window.setTimeout(() => process(), 50);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeFilter, contentItems.length]);

  const filterKeys = ['all', ...cats.map(c => c.key)];

  const filtered = activeFilter === 'all'
    ? contentItems
    : contentItems.filter(item => item.categoryKeys.includes(activeFilter));

  return (
    <section id="content" ref={rootRef}>
      <div className="max-w">
        <div className="reveal">
          <div className="section-label">Content Showcase</div>
          <h2 className="section-title">
            UGC Ads Portfolio
            <br />
            <em className="serif-italic" style={{ color: 'var(--gold)' }}>
              Lifestyle, Fashion, Food & Makeup
            </em>
          </h2>
          <p className="section-sub">A curated selection of high-performing UGC ads, reels, and content across lifestyle, fashion, food, and makeup niches.</p>
        </div>

        <div className="filter-tabs reveal">
          {filterKeys.map((key) => (
            <button
              key={key}
              className={`filter-btn ${activeFilter === key ? 'active' : ''}`}
              data-filter={key}
              onClick={() => setActiveFilter(key)}
            >
              {key === 'all' ? 'All' : cats.find(c => c.key === key)?.label || key}
            </button>
          ))}
        </div>

        <div className="content-grid reveal" id="contentGrid">
          {filtered.map((item) => (
            <div key={`${activeFilter}-${item._id}`} className="content-item" data-category={item.categoryKeys.join(' ')}>
              <div className="ig-embed-shell" data-instgrm-permalink={item.instagramUrl}>
                <div className="content-thumb">
                  <div className={`content-thumb-bg ${item.placeholderBgClass}`} />
                  <div className="content-icon">{item.placeholderEmoji}</div>
                </div>
                <div className="content-overlay">
                  <div className="content-info">
                    <div className="content-type">{item.displayTypeLabel}</div>
                    <div className="content-views">{item.displayMetric}</div>
                    <div className="content-views-label">{item.displayMetricLabel}</div>
                  </div>
                </div>
              </div>
              {item.badgeText ? (
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'rgba(13,13,13,0.8)',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    padding: '3px 8px',
                    fontSize: '0.62rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gold)',
                  }}
                >
                  {item.badgeText}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
