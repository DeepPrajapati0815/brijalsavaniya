'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { creator } from '@/data/site';

export function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: 'Media Kit', href: '#media-kit' },
      { label: 'Content', href: '#content' },
      { label: 'Brands', href: '#brands' },
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
    ],
    [],
  );

  return (
    <>
      <nav id="navbar">
        <Link href="/#hero" className="nav-logo" onClick={() => setOpen(false)}>
          Brijal<span>.</span>
        </Link>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            <Link href="/#contact" className="nav-cta">
              Work With Me
            </Link>
          </li>
        </ul>

        <div className="hamburger" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <span />
          <span />
          <span />
        </div>
      </nav>

      <div className={open ? 'mobile-menu open' : 'mobile-menu'} id="mobileMenu">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <Link
          href="/#contact"
          onClick={() => setOpen(false)}
          className="nav-cta"
          style={{ display: 'inline-block', width: 'fit-content' }}
        >
          Work With Me
        </Link>
        <a href={creator.instagramUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
          Instagram
        </a>
        <Link href="/media-kit" onClick={() => setOpen(false)}>
          Media Kit (Page)
        </Link>
      </div>
    </>
  );
}
