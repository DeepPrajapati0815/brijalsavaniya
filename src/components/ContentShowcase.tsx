export function ContentShowcase() {
  const items = [
    {
      categories: 'reels fashion',
      permalink: 'https://www.instagram.com/reel/DXMsVtmjjBW/',
      bgClass: 'g1',
      icon: '👗',
      type: '🎬 Reel · Fashion',
      views: '340K',
      viewsLabel: 'views',
      badge: 'TRENDING',
    },
    {
      categories: 'food reels',
      permalink: 'https://www.instagram.com/reel/DWT2VWUD_gW/',
      bgClass: 'g2',
      icon: '🍳',
      type: '🎬 Reel · Food',
      views: '215K',
      viewsLabel: 'views',
    },
    {
      categories: 'lifestyle',
      permalink: 'https://www.instagram.com/reel/DWMP86pjjoR/',
      bgClass: 'g3',
      icon: '☀️',
      type: '📸 Post · Lifestyle',
      views: '98K',
      viewsLabel: 'reach',
    },
    {
      categories: 'fashion reels',
      permalink: 'https://www.instagram.com/reel/DV_I4p_E3Vf/',
      bgClass: 'g4',
      icon: '✨',
      type: '🎬 Reel · Fashion',
      views: '178K',
      viewsLabel: 'views',
    },
    {
      categories: 'lifestyle makeup',
      permalink: 'https://www.instagram.com/reel/DWJp_o2FSPh/',
      bgClass: 'g5',
      icon: '💄',
      type: '📸 Carousel · Makeup',
      views: '62K',
      viewsLabel: 'reach',
    },
    {
      categories: 'reels lifestyle',
      permalink: 'https://www.instagram.com/reel/DV5-7O5E06I/',
      bgClass: 'g6',
      icon: '🎯',
      type: '🎬 Reel · Lifestyle',
      views: '143K',
      viewsLabel: 'views',
    },
  ];

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
          <button className="filter-btn active" data-filter="all">
            All
          </button>
          <button className="filter-btn" data-filter="reels">
            Reels
          </button>
          <button className="filter-btn" data-filter="fashion">
            Fashion
          </button>
          <button className="filter-btn" data-filter="food">
            Food
          </button>
          <button className="filter-btn" data-filter="makeup">
            Makeup
          </button>
          <button className="filter-btn" data-filter="lifestyle">
            Lifestyle
          </button>
        </div>

        <div className="content-grid reveal" id="contentGrid">
          {items.map((item) => (
            <div key={item.permalink} className="content-item" data-category={item.categories}>
              <div className="ig-embed-shell" data-instgrm-permalink={item.permalink}>
                <div className="content-thumb">
                  <div className={`content-thumb-bg ${item.bgClass}`} />
                  <div className="content-icon">{item.icon}</div>
                </div>
                <div className="content-overlay">
                  <div className="content-info">
                    <div className="content-type">{item.type}</div>
                    <div className="content-views">{item.views}</div>
                    <div className="content-views-label">{item.viewsLabel}</div>
                  </div>
                </div>
              </div>
              {item.badge ? (
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
                  {item.badge}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
