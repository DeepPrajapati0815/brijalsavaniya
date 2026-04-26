export function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#" className="nav-logo" style={{ fontSize: '1.6rem' }}>
            Brijal<span style={{ color: 'var(--gold)' }}>.</span>
          </a>
          <p>UGC ads creator based in Rajkot, Gujarat. Lifestyle · Fashion · Food · Makeup content for brands that convert.</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/brijalsavaniya" className="social-link" title="Instagram" target="_blank" rel="noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="social-link" title="YouTube">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
              </svg>
            </a>
            <a href="#" className="social-link" title="Pinterest">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.57 2.25-.87 3.5-.25 1.04.52 1.89 1.54 1.89 1.85 0 3.28-1.95 3.28-4.77 0-2.49-1.79-4.24-4.35-4.24-2.96 0-4.7 2.22-4.7 4.52 0 .9.34 1.85.77 2.37.08.1.09.19.07.29-.08.33-.25 1.04-.28 1.19-.04.19-.14.23-.32.14-1.25-.58-2.03-2.42-2.03-3.89 0-3.15 2.29-6.05 6.6-6.05 3.46 0 6.15 2.47 6.15 5.77 0 3.44-2.17 6.21-5.18 6.21-1.01 0-1.96-.53-2.29-1.15l-.62 2.33c-.22.86-.83 1.93-1.24 2.59.94.29 1.93.44 2.96.44 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
            </a>
            <a href="https://wa.me/919876543210" className="social-link" title="WhatsApp" target="_blank" rel="noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h5>Navigate</h5>
          <ul>
            <li>
              <a href="#hero">Home</a>
            </li>
            <li>
              <a href="#media-kit">Media Kit</a>
            </li>
            <li>
              <a href="#content">Content</a>
            </li>
            <li>
              <a href="#brands">Brands</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Services</h5>
          <ul>
            <li>
              <a href="#services">Reel Promotion</a>
            </li>
            <li>
              <a href="#services">Story Promotion</a>
            </li>
            <li>
              <a href="#services">UGC Content</a>
            </li>
            <li>
              <a href="#services">Affiliate Campaigns</a>
            </li>
            <li>
              <a href="#services">Brand Ambassador</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li>
              <a href="mailto:brijal@brijalcreates.com">brijal@brijalcreates.com</a>
            </li>
            <li>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
                WhatsApp Me
              </a>
            </li>
            <li>
              <a href="#contact">Send Inquiry</a>
            </li>
            <li>
              <a href="#media-kit">Download Media Kit</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Brijal Savaniya. All rights reserved.</p>
        <p style={{ color: 'rgba(122,117,104,0.5)', fontSize: '0.7rem' }}>Crafted with intention · Rajkot, Gujarat, India</p>
      </div>
    </footer>
  );
}
