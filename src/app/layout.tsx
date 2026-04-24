import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif-italic',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://brijalsavaniya.com'),
  title: {
    default: 'Brijal Savaniya — Instagram Creator & Brand Collaborations',
    template: '%s — Brijal Savaniya',
  },
  description:
    'Lifestyle, fashion, and fitness creator with 50K+ followers. High-performing Reels, Stories, and UGC that convert — available for paid brand collaborations.',
  openGraph: {
    title: 'Brijal Savaniya — Work With Me',
    description:
      'Media kit, audience insights, and collaboration options for brands. Let’s build a campaign that performs.',
    type: 'website',
    url: 'https://brijalsavaniya.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brijal Savaniya — Work With Me',
    description:
      'Media kit, audience insights, and collaboration options for brands. Let’s build a campaign that performs.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${cormorant.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
