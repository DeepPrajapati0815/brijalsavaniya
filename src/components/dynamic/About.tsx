import type { AboutData } from '@/lib/api';

interface AboutProps {
  data?: AboutData | null;
}

const valueIcons: Record<string, React.ReactNode> = {
  check: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>,
  zap: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  clock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
};

const defaultValues = [
  { iconName: 'check', title: 'Authenticity First', desc: 'I only promote what I genuinely use and believe in' },
  { iconName: 'zap', title: 'Results-Driven', desc: 'Every post is optimized for reach, saves, and conversions' },
  { iconName: 'clock', title: 'Always On Time', desc: 'Deadlines are non-negotiable. Always deliver early' },
  { iconName: 'users', title: 'Community Focus', desc: 'Building genuine relationships, not just follower counts' },
];

export function About({ data }: AboutProps) {
  const about = data;
  const paragraphs = about?.storyParagraphs || [
    `Hey, I'm Brijal Savaniya — a UGC ads creator from Rajkot, Gujarat, specializing in lifestyle, fashion, food, and makeup content. What started as a creative outlet in 2020 has grown into a community of over 50,000 real, engaged people who trust my recommendations, style choices, and product picks.`,
    `I believe UGC should feel authentic, not scripted. My content is a reflection of how I actually live — from morning routines and outfit reels to easy food content and clean makeup looks. This is why my audience converts at 3× the industry average.`,
    `I've had the privilege of working with 25+ brands across lifestyle, fashion, food, and makeup. I'm selective about collaborations because my audience's trust is everything to me. If you're here, I'm already considering you a good fit.`,
  ];
  const values = about?.valuesCards || defaultValues;

  return (
    <section id="about">
      <div className="max-w">
        <div className="about-inner">
          <div className="about-visual reveal">
            <div className="about-frame">
              <img
                src={about?.profileImageUrl || '/about_profile.jpg'}
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
              <div className="aab-num">{about?.communityCount || '50K'}</div>
              <div className="aab-label">Community</div>
            </div>
          </div>

          <div className="about-text reveal">
            <div className="section-label">{about?.sectionLabel || 'About Me'}</div>
            <h2 className="section-title">
              About
              <br />
              <em className="serif-italic" style={{ color: 'var(--gold)' }}>
                {about?.headline || 'Behind the Feed'}
              </em>
            </h2>

            {paragraphs.map((p, i) => (
              <p className="about-story" key={i} style={i > 0 ? { marginTop: '1rem' } : undefined}>
                <span dangerouslySetInnerHTML={{ __html: p }} />
              </p>
            ))}

            <div className="about-values">
              {values.map((v, i) => (
                <div className="about-val" key={i}>
                  <div className="av-icon">
                    {valueIcons[v.iconName] || valueIcons.check}
                  </div>
                  <div className="av-title">{v.title}</div>
                  <div className="av-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
