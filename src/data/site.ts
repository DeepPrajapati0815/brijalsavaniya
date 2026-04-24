export const creator = {
  name: 'Brijal Savaniya',
  handle: '@brijal.savaniya',
  nicheRotator: ['Lifestyle', 'Fashion', 'Fitness'],
  headline: 'Instagram Creator • Premium Content that Converts',
  followersHeadline: '50K+ Followers on Instagram',
  location: 'India',
  primaryEmail: 'collabs@brijalsavaniya.com',
  whatsappNumber: '+91 90000 00000',
  instagramUrl: 'https://www.instagram.com/brijalsavaniya',
};

export const stats = {
  followers: 50300,
  engagementRate: 0.047,
  avgReelViews: 82000,
  avgStoryViews: 14500,
};

export const audience = {
  topCountries: [
    { label: 'India', value: 62 },
    { label: 'UAE', value: 11 },
    { label: 'United States', value: 9 },
    { label: 'United Kingdom', value: 6 },
    { label: 'Canada', value: 4 },
  ],
  gender: [
    { label: 'Women', value: 71 },
    { label: 'Men', value: 29 },
  ],
  age: [
    { label: '13–17', value: 6 },
    { label: '18–24', value: 38 },
    { label: '25–34', value: 42 },
    { label: '35–44', value: 11 },
    { label: '45+', value: 3 },
  ],
};

export const services = [
  {
    title: 'Reel Promotion',
    description:
      'High-retention reels with a strong hook, brand-safe visuals, and a clear CTA designed for reach + saves.',
    deliverables: ['1x Reel', 'Caption + CTA', 'Usage rights options'],
  },
  {
    title: 'Story Promotion',
    description:
      'Authentic story sequences with swipe-up style CTAs (link sticker), polls, and product demos that drive clicks.',
    deliverables: ['3–5 frames', 'Link sticker', 'Optional poll/Q&A'],
  },
  {
    title: 'UGC Content',
    description:
      'Premium UGC for your ads and socials — product-focused, well-lit, on-brand, delivered fast.',
    deliverables: ['Raw + edited files', 'Multiple angles', 'Ad-friendly format'],
  },
  {
    title: 'Affiliate Campaigns',
    description:
      'Always-on content that turns into consistent sales — optimized around launches, offers, and seasonal drops.',
    deliverables: ['Tracking + links', 'Content calendar', 'Performance recap'],
  },
] as const;

export const brands = [
  {
    name: 'GlowSkin Co.',
    result: { views: '210K', reach: '145K', saves: '8.4K' },
  },
  {
    name: 'AeroFit',
    result: { views: '178K', reach: '121K', saves: '6.9K' },
  },
  {
    name: 'UrbanWear',
    result: { views: '264K', reach: '190K', saves: '9.1K' },
  },
  {
    name: 'NutriDaily',
    result: { views: '132K', reach: '88K', saves: '4.2K' },
  },
] as const;

export const contentShowcase = [
  {
    id: 'reel-1',
    title: 'Morning routine • glow-up + gym',
    category: 'Lifestyle',
    metric: '92K views',
  },
  {
    id: 'reel-2',
    title: '3 outfits • one day (work → dinner)',
    category: 'Fashion',
    metric: '118K views',
  },
  {
    id: 'reel-3',
    title: '15-min full body workout (no equipment)',
    category: 'Fitness',
    metric: '76K views',
  },
  {
    id: 'reel-4',
    title: 'Skincare routine • product demo',
    category: 'Lifestyle',
    metric: '64K views',
  },
  {
    id: 'reel-5',
    title: 'Capsule wardrobe essentials',
    category: 'Fashion',
    metric: '104K views',
  },
  {
    id: 'reel-6',
    title: 'High-protein snacks for busy days',
    category: 'Fitness',
    metric: '83K views',
  },
] as const;

export const quickLinks = [
  { label: 'Media Kit', href: '/media-kit' },
  { label: 'Services', href: '/#services' },
  { label: 'Brands', href: '/#brands' },
  { label: 'Contact', href: '/#contact' },
] as const;
