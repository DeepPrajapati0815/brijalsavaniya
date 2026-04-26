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

const SITE_URL = 'https://brijalsavaniya.com';
const OG_IMAGE = `${SITE_URL}/og-brijal-savaniya-brand-collaboration-media-kit.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Brijal Savaniya — UGC Ads Creator Gujarat | Lifestyle & Fashion',
    template: '%s — Brijal Savaniya',
  },
  description:
    'Rajkot Gujarat UGC ads creator with 50K+ Instagram followers & 7.8% engagement. Lifestyle, fashion, food & makeup UGC content for Indian D2C brands. Partner with Brijal today.',
  keywords: [
    'Brijal Savaniya',
    'UGC ads creator India',
    'lifestyle UGC creator Gujarat',
    'fashion UGC content creator India',
    'Instagram influencer Rajkot',
    'UGC content creator India',
    'lifestyle fashion influencer India',
    'food UGC creator India',
    'makeup UGC creator India',
    'micro influencer 50k followers',
    'UGC ads lifestyle fashion India',
    'UGC ads food India',
    'UGC ads makeup India',
    'influencer marketing India',
    'brand collaboration influencer Gujarat',
    'Instagram story promotion',
    'influencer media kit India',
    'content creator Rajkot Gujarat',
    'fashion lifestyle creator India',
    'D2C brand UGC creator India',
    'influencer collaboration Gujarat',
    'Instagram creator Gujarat',
    'Brijal Savaniya collaboration',
    'UGC ads for fashion brands India',
  ],
  authors: [{ name: 'Brijal Savaniya', url: SITE_URL }],
  creator: 'Brijal Savaniya',
  publisher: 'Brijal Savaniya',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Brijal Savaniya — UGC Ads Creator Gujarat | Lifestyle & Fashion',
    description:
      '50K+ followers, 7.8% engagement rate. UGC ads & lifestyle, fashion, food and makeup content for Indian D2C brands. View media kit & start your campaign.',
    url: SITE_URL,
    siteName: 'Brijal Savaniya',
    locale: 'en_IN',
    alternateLocale: ['hi_IN'],
    type: 'profile',
    firstName: 'Brijal',
    lastName: 'Savaniya',
    username: 'brijalsavaniya',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Brijal Savaniya — Rajkot Gujarat UGC ads lifestyle fashion creator with 50K followers, available for brand collaborations',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@brijalsavaniya',
    creator: '@brijalsavaniya',
    title: 'Brijal Savaniya — UGC Ads Creator Gujarat | Lifestyle & Fashion',
    description:
      '50K+ followers, 7.8% engagement. UGC ads & lifestyle, fashion, food and makeup content for Indian D2C brands. Start your campaign.',
    images: [
      {
        url: OG_IMAGE,
        alt: 'Brijal Savaniya — Rajkot Gujarat UGC ads lifestyle fashion creator available for brand collaborations',
      },
    ],
  },
  other: {
    'profile:username': 'brijalsavaniya',
    'pinterest:creator': '@brijalsavaniya',
    'pinterest:richpin': 'true',
  },
  verification: {
    google: '[CUSTOMIZE: Add your Google Search Console verification code]',
  },
  category: 'UGC Ads, Lifestyle, Fashion, Food, Makeup',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
    { media: '(prefers-color-scheme: light)', color: '#c9a84c' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preload" as="image" href="/hero_profile.jpg" />
        {/* [CUSTOMIZE: Uncomment when OG image is ready] <link rel="preload" as="image" href="/og-brijal-savaniya-brand-collaboration-media-kit.jpg" /> */}
        {/* [CUSTOMIZE: Replace G-XXXXXXXXXX with your GA4 Measurement ID] */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        /> */}
      </head>
      <body
        className={`${dmSans.variable} ${cormorant.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
