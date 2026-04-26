import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Brijal Savaniya — UGC Ads Creator Gujarat',
    short_name: 'Brijal Creates',
    description:
      'Rajkot, Gujarat-based UGC ads creator specializing in lifestyle, fashion, food & makeup content with 50K+ Instagram followers. View media kit, services, and collaboration options.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#c9a84c',
    background_color: '#0d0d0d',
    orientation: 'portrait-primary',
    lang: 'en-IN',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
