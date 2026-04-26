export function About() {
  return (
    <section id="about">
      <div className="max-w">
        <div className="about-inner">
          <div className="about-visual reveal">
            <div className="about-frame">
              <img
                src="/about_profile.jpg"
                alt="Brijal Savaniya UGC ads creator Rajkot Gujarat lifestyle fashion profile photo"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.92,
                  borderRadius: 16,
                }}
              />
              <div className="about-frame-initials" style={{ mixBlendMode: 'overlay' }}>
                B·S
              </div>
            </div>
            <div className="about-accent-box">
              <div className="aab-num">50K</div>
              <div className="aab-label">Community</div>
            </div>
          </div>

          <div className="about-text reveal">
            <div className="section-label">About Me</div>
            <h2 className="section-title">
              The Person
              <br />
              <em className="serif-italic" style={{ color: 'var(--gold)' }}>
                Behind the Feed
              </em>
            </h2>

            <p className="about-story">
              Hey, I'm <strong>Brijal Savaniya</strong> — a UGC ads creator from <strong>Rajkot, Gujarat</strong>, specializing in lifestyle, fashion, food, and makeup content.
              What started as a creative outlet in 2020 has grown into a community of over <strong>50,000 real, engaged people</strong> who
              trust my recommendations, style choices, and product picks.
            </p>

            <p className="about-story" style={{ marginTop: '1rem' }}>
              I believe UGC should feel <strong>authentic, not scripted</strong>. My content is a reflection of how I actually live — from
              morning routines and outfit reels to easy food content and clean makeup looks. This is why my audience{' '}
              <strong>converts at 3× the industry average</strong>.
            </p>

            <p className="about-story" style={{ marginTop: '1rem' }}>
              I've had the privilege of working with <strong>25+ brands</strong> across lifestyle, fashion, food, and makeup. I'm selective
              about collaborations because my audience's trust is everything to me. If you're here, I'm already considering you a good fit.
            </p>

            <div className="about-values">
              <div className="about-val">
                <div className="av-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="av-title">Authenticity First</div>
                <div className="av-desc">I only promote what I genuinely use and believe in</div>
              </div>

              <div className="about-val">
                <div className="av-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div className="av-title">Results-Driven</div>
                <div className="av-desc">Every post is optimized for reach, saves, and conversions</div>
              </div>

              <div className="about-val">
                <div className="av-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div className="av-title">Always On Time</div>
                <div className="av-desc">Deadlines are non-negotiable. Always deliver early</div>
              </div>

              <div className="about-val">
                <div className="av-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <div className="av-title">Community Focus</div>
                <div className="av-desc">Building genuine relationships, not just follower counts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
