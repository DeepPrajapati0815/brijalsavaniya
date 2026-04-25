'use client';

import { useState } from 'react';
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

  const filterKeys = ['all', ...cats.map(c => c.key)];

  const filtered = activeFilter === 'all'
    ? contentItems
    : contentItems.filter(item => item.categoryKeys.includes(activeFilter));

  return (
    <section id="content">
      <div className="max-w">
        <div className="reveal">
          <div className="section-label">Content Showcase</div>
          <h2 className="section-title">
            Featured
            <br />
            <em className="serif-italic" style={{ color: 'var(--gold)' }}>
              Content
            </em>
          </h2>
          <p className="section-sub">A curated selection of reels, carousels, and posts across niches.</p>
        </div>

        <div className="filter-tabs reveal">
          {filterKeys.map((key) => (
            <button
              key={key}
              className={`filter-btn ${activeFilter === key ? 'active' : ''}`}
              onClick={() => setActiveFilter(key)}
            >
              {key === 'all' ? 'All' : cats.find(c => c.key === key)?.label || key}
            </button>
          ))}
        </div>

        <div className="content-grid reveal" id="contentGrid">
          {filtered.map((item) => (
            <div key={item._id} className="content-item" data-category={item.categoryKeys.join(' ')}>
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
