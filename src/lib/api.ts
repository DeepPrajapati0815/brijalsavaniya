import { creator, stats, audience, services, brands, contentShowcase } from '@/data/site';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const REVALIDATE = 60; // ISR: revalidate every 60s

async function fetchApi<T>(path: string): Promise<T | null> {
  const url = `${API_BASE}${path}`;
  try {
    const isDev = process.env.NODE_ENV === 'development';
    const res = await fetch(url, {
      ...(isDev ? { cache: 'no-store' } : { next: { revalidate: REVALIDATE } }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      return null;
    }
    const json = await res.json();
    if (!json.success || json.data === undefined) {
      return null;
    }
    return json.data as T;
  } catch (err) {
    return null;
  }
}

// ── Typed responses matching backend models ──

export interface HeroData {
  headline: string;
  subheadline: string;
  typedNiches: string[];
  nichePills: { label: string; sortOrder: number; isVisible: boolean }[];
  tagline: string;
  badgeText: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  heroImageUrl: string;
}

export interface MetricData {
  key: string;
  label: string;
  value: string;
  rawValue: number;
  suffix: string;
  growthNote: string;
  growthPositive: boolean;
  barPercent: number;
  sortOrder: number;
  isVisible: boolean;
}

export interface DemographicData {
  _id: string;
  type: string;
  label: string;
  percentage: number;
  sortOrder: number;
  isVisible: boolean;
}

export interface ContentCategoryData {
  _id: string;
  key: string;
  label: string;
  sortOrder: number;
  isVisible: boolean;
}

export interface ContentItemData {
  _id: string;
  title: string;
  type: string;
  categoryKeys: string[];
  instagramUrl: string;
  placeholderBgClass: string;
  placeholderEmoji: string;
  displayTypeLabel: string;
  displayMetric: string;
  displayMetricLabel: string;
  badgeText: string;
  viewsCount: number;
  reachCount: number;
  likesCount: number;
  commentsCount: number;
  savesCount: number;
  isTrending: boolean;
  isFeatured: boolean;
  isVisible: boolean;
  sortOrder: number;
}

export interface BrandData {
  _id: string;
  name: string;
  slug: string;
  type: string;
  logoEmoji: string;
  isFeatured: boolean;
  isVisible: boolean;
  sortOrder: number;
}

export interface CollaborationData {
  _id: string;
  brandId: string;
  title: string;
  description: string;
  campaignType: string;
  viewsCount: number;
  clicksCount: number;
  ctrPercent: number;
  isFeatured: boolean;
  isVisible: boolean;
}

export interface TestimonialData {
  _id: string;
  brandId: string;
  authorName: string;
  authorTitle: string;
  quoteText: string;
  rating: number;
  isFeatured: boolean;
  isVisible: boolean;
}

export interface ServiceData {
  _id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  priceLabel: string;
  priceDisplay: string;
  isVisible: boolean;
  sortOrder: number;
}

export interface AboutData {
  sectionLabel: string;
  headline: string;
  storyParagraphs: string[];
  profileImageUrl: string;
  communityCount: string;
  valuesCards: { iconName: string; title: string; desc: string }[];
}

export interface SettingsData {
  creator_name?: string;
  creator_handle?: string;
  creator_location?: string;
  primary_email?: string;
  whatsapp_number?: string;
  instagram_url?: string;
}

// ── Fetchers with static fallback ──

export async function getHero(): Promise<HeroData | null> {
  return fetchApi<HeroData>('/hero');
}

export async function getMediaKit(): Promise<{ metrics: MetricData[]; demographics: DemographicData[] }> {
  return (await fetchApi<{ metrics: MetricData[]; demographics: DemographicData[] }>('/media-kit')) || { metrics: [], demographics: [] };
}

export async function getContent(): Promise<{ categories: ContentCategoryData[]; items: ContentItemData[] }> {
  return (await fetchApi<{ categories: ContentCategoryData[]; items: ContentItemData[] }>('/content')) || { categories: [], items: [] };
}

export async function getBrandsData(): Promise<{ brands: BrandData[]; collaborations: CollaborationData[]; testimonials: TestimonialData[] }> {
  return (await fetchApi<{ brands: BrandData[]; collaborations: CollaborationData[]; testimonials: TestimonialData[] }>('/brands')) || { brands: [], collaborations: [], testimonials: [] };
}

export async function getServices(): Promise<ServiceData[]> {
  return (await fetchApi<ServiceData[]>('/services')) || [];
}

export async function getAbout(): Promise<AboutData | null> {
  return fetchApi<AboutData>('/about');
}

export async function getSettings(): Promise<SettingsData> {
  return (await fetchApi<SettingsData>('/settings')) || {};
}

// ── Composite: full page data ──

export interface HomePageData {
  hero: HeroData | null;
  metrics: MetricData[];
  demographics: DemographicData[];
  contentCategories: ContentCategoryData[];
  contentItems: ContentItemData[];
  brands: BrandData[];
  collaborations: CollaborationData[];
  testimonials: TestimonialData[];
  services: ServiceData[];
  about: AboutData | null;
  settings: SettingsData;
}

export async function getHomePageData(): Promise<HomePageData> {
  const [hero, mediaKit, content, brandsData, services, about, settings] =
    await Promise.all([
      getHero(),
      getMediaKit(),
      getContent(),
      getBrandsData(),
      getServices(),
      getAbout(),
      getSettings(),
    ]);

  return {
    hero,
    metrics: mediaKit.metrics,
    demographics: mediaKit.demographics,
    contentCategories: content.categories,
    contentItems: content.items,
    brands: brandsData.brands,
    collaborations: brandsData.collaborations,
    testimonials: brandsData.testimonials,
    services,
    about,
    settings,
  };
}

// ── Static fallback helpers (used when API is unreachable) ──

export function getStaticHero(): HeroData {
  return {
    headline: creator.headline,
    subheadline: creator.followersHeadline,
    typedNiches: ['Savaniya', ...creator.nicheRotator],
    nichePills: [...creator.nicheRotator].map((label, i) => ({ label, sortOrder: i, isVisible: true })),
    tagline: `Rajkot, Gujarat-based UGC ads creator specializing in lifestyle, fashion, food, and makeup content with 50K+ Instagram followers. Delivering high-converting UGC ads that turn brand stories into sales.`,
    badgeText: 'Available for Collaborations',
    ctaPrimaryText: 'Work With Me',
    ctaPrimaryHref: '#contact',
    ctaSecondaryText: 'View Media Kit',
    ctaSecondaryHref: '#media-kit',
    heroImageUrl: '/hero_profile.jpg',
  };
}

export function getStaticMetrics(): MetricData[] {
  return [
    { key: 'followers', label: 'Total Followers', value: '50.2K', rawValue: 50200, suffix: 'K', growthNote: '+2,400 this month', growthPositive: true, barPercent: 82, sortOrder: 1, isVisible: true },
    { key: 'engagement', label: 'Engagement Rate', value: '7.8%', rawValue: 7.8, suffix: '%', growthNote: '3× industry avg', growthPositive: true, barPercent: 78, sortOrder: 2, isVisible: true },
    { key: 'avgReelViews', label: 'Avg Reel Views', value: '82K', rawValue: 82000, suffix: 'K', growthNote: 'Peaked at 340K', growthPositive: true, barPercent: 68, sortOrder: 3, isVisible: true },
    { key: 'avgStoryViews', label: 'Story Views / Day', value: '18K', rawValue: 18000, suffix: 'K', growthNote: '72% story reach rate', growthPositive: true, barPercent: 72, sortOrder: 4, isVisible: true },
  ];
}

export function getStaticDemographics(): DemographicData[] {
  return [
    { _id: '1', type: 'city', label: 'Rajkot', percentage: 22, sortOrder: 1, isVisible: true },
    { _id: '2', type: 'city', label: 'Ahmedabad', percentage: 18, sortOrder: 2, isVisible: true },
    { _id: '3', type: 'city', label: 'Mumbai', percentage: 15, sortOrder: 3, isVisible: true },
    { _id: '4', type: 'city', label: 'Delhi', percentage: 12, sortOrder: 4, isVisible: true },
    { _id: '5', type: 'city', label: 'Others', percentage: 33, sortOrder: 5, isVisible: true },
  ];
}

export function getStaticContentItems(): ContentItemData[] {
  return contentShowcase.map((item, i) => ({
    _id: item.id,
    title: item.title,
    type: 'reel',
    categoryKeys: [item.category.toLowerCase()],
    instagramUrl: '',
    placeholderBgClass: `g${i + 1}`,
    placeholderEmoji: ['👗', '💪', '☀️', '✨', '🌿', '🎯'][i] || '🎬',
    displayTypeLabel: `🎬 Reel · ${item.category}`,
    displayMetric: item.metric.split(' ')[0],
    displayMetricLabel: item.metric.split(' ')[1] || 'views',
    badgeText: i === 0 ? 'TRENDING' : '',
    viewsCount: 0,
    reachCount: 0,
    likesCount: 0,
    commentsCount: 0,
    savesCount: 0,
    isTrending: i === 0,
    isFeatured: false,
    isVisible: true,
    sortOrder: i + 1,
  }));
}

export function getStaticServices(): ServiceData[] {
  return services.map((s, i) => ({
    _id: String(i + 1),
    number: String(i + 1).padStart(2, '0'),
    title: s.title,
    description: s.description,
    features: [...s.deliverables],
    priceLabel: 'Starting from',
    priceDisplay: i === 3 ? 'Custom' : ['₹15,000', '₹6,000', '₹8,000', 'Custom'][i],
    isVisible: true,
    sortOrder: i + 1,
  }));
}

export function getStaticBrands(): BrandData[] {
  return brands.map((b, i) => ({
    _id: String(i + 1),
    name: b.name,
    slug: b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    type: '',
    logoEmoji: ['🌸', '💊', '👜', '🧴'][i] || '🏢',
    isFeatured: i === 0,
    isVisible: true,
    sortOrder: i + 1,
  }));
}
