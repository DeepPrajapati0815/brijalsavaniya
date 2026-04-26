import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/dynamic/Hero';
import { MediaKitPreview } from '@/components/dynamic/MediaKitPreview';
import { ContentShowcase } from '@/components/dynamic/ContentShowcase';
import { Brands } from '@/components/dynamic/Brands';
import { Services } from '@/components/dynamic/Services';
import { About } from '@/components/dynamic/About';
import { Contact } from '@/components/dynamic/Contact';
import { Footer } from '@/components/Footer';
import { ThemeEffects } from '@/components/ThemeEffects';
import { BackToTopButton } from '@/components/BackToTopButton';
import { SEOJsonLd } from '@/components/SEOJsonLd';
import { getHomePageData } from '@/lib/api';

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <div>
      <div className="scroll-indicator">
        <div className="scroll-progress" id="scrollBar" />
      </div>
      <ThemeEffects />
      <SEOJsonLd />
      <Navbar />
      <main>
        <Hero data={data.hero} metrics={data.metrics} />
        <div className="section-divider" />
        <MediaKitPreview metrics={data.metrics} demographics={data.demographics} />
        <div className="section-divider" />
        <ContentShowcase categories={data.contentCategories} items={data.contentItems} />
        <div className="section-divider" />
        <Brands brands={data.brands} collaborations={data.collaborations} testimonials={data.testimonials} />
        <div className="section-divider" />
        <Services services={data.services} />
        <div className="section-divider" />
        <About data={data.about} />
        <div className="section-divider" />
        <Contact settings={data.settings} />
      </main>
      <Footer />

      <BackToTopButton />
    </div>
  );
}
