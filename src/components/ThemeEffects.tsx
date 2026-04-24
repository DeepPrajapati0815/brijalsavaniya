'use client';

import { useEffect } from 'react';

function animateCounter(el: HTMLElement) {
  const targetRaw = el.getAttribute('data-target');
  if (!targetRaw) return;

  const target = Number.parseFloat(targetRaw);
  const suffix = el.getAttribute('data-suffix') ?? '';
  const decimalRaw = el.getAttribute('data-decimal');
  const decimal = decimalRaw ? Number.parseInt(decimalRaw, 10) : 0;

  const duration = 1800;
  const start = performance.now();

  const update = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = target * ease;

    el.textContent = decimal ? `${current.toFixed(decimal)}${suffix}` : `${Math.floor(current)}${suffix}`;

    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

export function ThemeEffects() {
  useEffect(() => {
    const scrollBar = document.getElementById('scrollBar');
    const backTop = document.getElementById('backTop');
    const navbar = document.getElementById('navbar');

    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      if (scrollBar) scrollBar.style.width = `${pct}%`;
      if (backTop) backTop.classList.toggle('visible', scrollTop > 400);

      if (navbar) {
        navbar.style.background =
          window.scrollY > 50 ? 'rgba(13,13,13,0.95)' : 'rgba(13,13,13,0.75)';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          target.classList.add('visible');

          target.querySelectorAll<HTMLElement>('.counter').forEach((c) => animateCounter(c));

          target
            .querySelectorAll<HTMLElement>('.stat-bar-fill, .demo-fill, .city-bar-fill')
            .forEach((bar) => {
              const w = bar.getAttribute('data-width') ?? '0';
              window.setTimeout(() => {
                bar.style.width = `${w}%`;
              }, 200);
            });

          observer.unobserve(target);
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => observer.observe(el));

    // Trigger hero counters quickly
    const heroCounters = document.querySelectorAll<HTMLElement>('.hero-social-proof .counter');
    window.setTimeout(() => heroCounters.forEach((c) => animateCounter(c)), 500);

    // Content filter (1:1 with HTML)
    const filterButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>('.filter-btn'),
    );

    const filterHandler = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const cat = btn.getAttribute('data-filter') ?? 'all';

      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll<HTMLElement>('.content-item').forEach((item) => {
        const itemCats = item.getAttribute('data-category') ?? '';
        const matches = cat === 'all' || itemCats.includes(cat);

        if (matches) {
          item.style.display = '';
          item.style.opacity = '1';
        } else {
          item.style.opacity = '0';
          window.setTimeout(() => {
            if (item.style.opacity === '0') item.style.display = 'none';
          }, 300);
        }
      });
    };

    filterButtons.forEach((b) => b.addEventListener('click', filterHandler));

    // Form submit (toast)
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = toast?.querySelector<HTMLElement>('.toast-icon') ?? null;

    const showToast = (msg: string, icon = '✓') => {
      if (!toast || !toastMsg) return;
      toastMsg.textContent = msg;
      if (toastIcon) toastIcon.textContent = icon;
      toast.classList.add('show');
      window.setTimeout(() => toast.classList.remove('show'), 4000);
    };

    const submitBtn = document.getElementById('submitBtn');
    const submitHandler = () => {
      const brand = (document.getElementById('brandName') as HTMLInputElement | null)?.value.trim() ?? '';
      const name = (document.getElementById('contactName') as HTMLInputElement | null)?.value.trim() ?? '';
      const email = (document.getElementById('email') as HTMLInputElement | null)?.value.trim() ?? '';

      if (!brand || !name || !email) {
        showToast('Please fill in the required fields.', '⚠️');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        showToast('Please enter a valid email address.', '⚠️');
        return;
      }

      showToast(`Thanks, ${name}! I'll reply within 24 hours. 🎉`);

      const ids = ['brandName', 'contactName', 'email', 'campaignType', 'budget', 'timeline', 'message'];
      ids.forEach((id) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
        if (el) el.value = '';
      });
    };

    submitBtn?.addEventListener('click', submitHandler);

    // Instagram official embeds (lazy)
    type InstgrmGlobal = {
      Embeds?: {
        process?: () => void;
      };
    };

    const ensureInstagramScript = () => {
      const w = window as unknown as { instgrm?: InstgrmGlobal };
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

    const injectEmbed = async (shell: HTMLElement) => {
      if (shell.getAttribute('data-ig-loaded') === 'true') return;

      const permalink = shell.getAttribute('data-instgrm-permalink');
      if (!permalink) return;

      shell.setAttribute('data-ig-loaded', 'true');
      shell.innerHTML = `
        <blockquote class="instagram-media" data-instgrm-permalink="${permalink}" data-instgrm-version="14"></blockquote>
      `;

      try {
        await ensureInstagramScript();
        const w = window as unknown as { instgrm?: InstgrmGlobal };
        w.instgrm?.Embeds?.process?.();
      } catch {
        // Keep silent; the placeholder grid is still visible until shell innerHTML replaced.
      }
    };

    const igObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const shell = entry.target as HTMLElement;
          injectEmbed(shell);
          igObserver.unobserve(shell);
        });
      },
      { threshold: 0.15, rootMargin: '200px 0px' },
    );

    document
      .querySelectorAll<HTMLElement>('.ig-embed-shell')
      .forEach((el) => igObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();

      igObserver.disconnect();

      filterButtons.forEach((b) => b.removeEventListener('click', filterHandler));
      submitBtn?.removeEventListener('click', submitHandler);
    };
  }, []);

  return null;
}
