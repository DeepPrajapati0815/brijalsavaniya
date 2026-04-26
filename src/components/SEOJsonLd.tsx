const SITE_URL = 'https://brijalsavaniya.com';

export function SEOJsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Brijal Savaniya',
    jobTitle: 'UGC Ads Creator',
    description:
      'Rajkot, Gujarat-based UGC ads creator specializing in lifestyle, fashion, food, and makeup content with 50K+ Instagram followers and 7.8% engagement rate. Producing high-converting UGC ads for Indian D2C brands.',
    image: `${SITE_URL}/brijal-savaniya-ugc-ads-lifestyle-fashion-creator.webp`,
    url: SITE_URL,
    sameAs: [
      'https://www.instagram.com/brijalsavaniya',
      'https://www.linkedin.com/in/brijalsavaniya',
      'https://twitter.com/brijalsavaniya',
      'https://www.youtube.com/@brijalsavaniya',
      'https://in.pinterest.com/brijalsavaniya',
      'https://www.tiktok.com/@brijalsavaniya',
    ],
    knowsAbout: [
      'UGC ads creation',
      'Lifestyle content creation',
      'Fashion styling and lookbooks',
      'Food content creation',
      'Makeup product demos',
      'Brand collaborations',
      'UGC content production',
      'Instagram marketing',
      'Influencer marketing India',
      'Social media advertising',
    ],
    nationality: {
      '@type': 'Country',
      name: 'India',
    },
    homeLocation: {
      '@type': 'City',
      name: 'Rajkot',
      containedInPlace: {
        '@type': 'State',
        name: 'Gujarat',
      },
      containedInPlace2: {
        '@type': 'Country',
        name: 'India',
      },
    },
    email: 'brijal@brijalcreates.com',
    telephone: '+91 98765 43210',
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Brijal Savaniya — UGC Ads & Lifestyle Fashion Content Services',
    description:
      'Professional UGC ads creation and content services including reel promotions, story campaigns, UGC ad content, and affiliate marketing for lifestyle, fashion, food, and makeup brands in India.',
    provider: {
      '@type': 'Person',
      name: 'Brijal Savaniya',
      url: SITE_URL,
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'AdministrativeArea', name: 'Gujarat' },
      { '@type': 'AdministrativeArea', name: 'Maharashtra' },
      { '@type': 'AdministrativeArea', name: 'Rajasthan' },
    ],
    priceRange: '₹6,000 - ₹15,000+',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'UGC Ads & Lifestyle Fashion Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Instagram Reel Promotion',
            description:
              'High-retention UGC-style Instagram reel with strong hook, brand-safe visuals, and clear CTA designed for maximum reach, saves, and conversions. Ideal for lifestyle, fashion, food, and makeup brands. Includes caption writing, hashtag strategy, and usage rights options.',
          },
          price: '15000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Instagram Story Promotion',
            description:
              'Authentic UGC-style story sequences with link sticker CTAs, interactive polls, and product demos that drive clicks and traffic for lifestyle, fashion, food, and makeup brands. Includes 3-5 story frames with optional Q&A engagement.',
          },
          price: '6000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UGC Ads Content Creation',
            description:
              'Premium UGC ad content for lifestyle, fashion, food, and makeup brands — product-focused, well-lit, on-brand visuals optimized for paid ads and social media. Includes raw and edited files with multiple angles in ad-friendly format.',
          },
          price: '8000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Affiliate Marketing Campaigns',
            description:
              'Always-on content that drives consistent sales — optimized around launches, offers, and seasonal drops. Includes tracking links, content calendar, and performance recap reporting.',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '0',
            priceCurrency: 'INR',
            description: 'Custom pricing based on campaign scope and commission structure',
          },
        },
      ],
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Brijal Savaniya — UGC Ads Creator',
    description:
      'Rajkot, Gujarat-based UGC ads creator offering lifestyle and fashion UGC content services for Indian D2C brands. 50K+ engaged followers with 7.8% engagement rate.',
    founder: {
      '@type': 'Person',
      name: 'Brijal Savaniya',
    },
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rajkot',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    telephone: '+91 98765 43210',
    email: 'brijal@brijalcreates.com',
    openingHours: 'Mo-Fr 10:00-19:00',
    priceRange: '₹6,000 - ₹15,000+',
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 22.3039,
        longitude: 70.8022,
      },
      geoRadius: '100000',
    },
    sameAs: [
      'https://www.instagram.com/brijalsavaniya',
      'https://www.linkedin.com/in/brijalsavaniya',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Brijal Savaniya\'s engagement rate on Instagram?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Brijal Savaniya maintains a 7.8% engagement rate on Instagram — approximately 3× the industry average for micro-influencers in India. This means brands can expect significantly higher interaction (likes, comments, saves, and shares) compared to creators with similar follower counts. Her 72% female audience aged 18-34 drives particularly strong engagement in lifestyle and fashion UGC ad content.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to collaborate with Brijal Savaniya for brand campaigns?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To collaborate with Brijal Savaniya, you can reach out via the contact form on brijalsavaniya.com, email brijal@brijalcreates.com, or message directly on WhatsApp at +91 98765 43210. She typically responds within 24 hours. You can also DM her on Instagram @brijalsavaniya. For best results, include your brand name, campaign type (reel, story, UGC, or affiliate), budget range, and timeline in your initial outreach.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are Brijal Savaniya\'s content collaboration rates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Brijal Savaniya\'s collaboration rates start at ₹15,000 for Instagram Reel Promotions, ₹6,000 for Story Promotions, and ₹8,000 for UGC Content Creation. Affiliate campaigns have custom pricing based on commission structure and campaign scope. Custom packages and long-term brand ambassador deals are available at negotiated rates. All prices include content creation, caption writing, and standard usage rights.',
        },
      },
      {
        '@type': 'Question',
        name: 'What niches does Brijal Savaniya cover as a UGC ads creator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Brijal Savaniya creates UGC ad content across four primary niches: Lifestyle (morning routines, daily vlogs, product demonstrations), Fashion (outfit-of-the-day, capsule wardrobes, styling tips), Food (easy recipes, snack content, product tastings), and Makeup (product demos, clean looks, routine-based content). Her UGC ads are optimized for paid social campaigns and resonate most with women aged 18-34 across India.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many Instagram followers does Brijal Savaniya have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Brijal Savaniya has 50,200+ followers on Instagram, with consistent monthly growth of 2,400+ new followers. Her audience is primarily based in India (62%), with significant reach in UAE (11%), US (9%), UK (6%), and Canada (4%). 72% of her audience is female, with the largest age demographic being 25-34 (42%) and 18-24 (38%).',
        },
      },
      {
        '@type': 'Question',
        name: 'What brands has Brijal Savaniya worked with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Brijal Savaniya has collaborated with 25+ brands across lifestyle and fashion sectors. Notable past collaborations include Nykaa Fashion, WellBeing Nutrition, Aldo India, and Minimalist. Campaign results have included up to 264K reel views, 190K reach, and 9.1K saves. She is selective about partnerships to maintain audience trust and UGC ad authenticity.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Brijal Savaniya create UGC content for brand ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, UGC ads are Brijal Savaniya\'s core offering, starting at ₹8,000. She delivers product-focused, well-lit, on-brand UGC ad content optimized for paid social campaigns and organic reach. Deliverables include raw and edited files, multiple angles, and ad-friendly formats optimized for Instagram, Facebook, and other platforms. All UGC ad content is provided with full usage rights for brand advertising.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to contact Brijal Savaniya for brand deals and sponsorships?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can contact Brijal Savaniya for brand deals through multiple channels: email at brijal@brijalcreates.com, WhatsApp at +91 98765 43210, or the collaboration form on brijalsavaniya.com. She also accepts DMs on Instagram @brijalsavaniya. Typical response time is under 24 hours. For media kit requests, use the form on her website or email directly with your brand details and campaign brief.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Media Kit & Analytics',
        item: `${SITE_URL}/#media-kit`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Content Showcase',
        item: `${SITE_URL}/#content`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Brand Collaborations',
        item: `${SITE_URL}/#brands`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Services',
        item: `${SITE_URL}/#services`,
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'About',
        item: `${SITE_URL}/#about`,
      },
      {
        '@type': 'ListItem',
        position: 7,
        name: 'Contact for Collaboration',
        item: `${SITE_URL}/#contact`,
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Brijal Savaniya — UGC Ads Creator Gujarat',
    url: SITE_URL,
    description:
      'Official website of Brijal Savaniya, Rajkot Gujarat-based UGC ads creator specializing in lifestyle, fashion, food, and makeup content with 50K+ Instagram followers. View media kit, services, and collaboration options.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
