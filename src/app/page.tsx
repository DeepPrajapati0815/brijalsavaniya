import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MediaKitPreview } from '@/components/MediaKitPreview';
import { ContentShowcase } from '@/components/ContentShowcase';
import { Brands } from '@/components/Brands';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ThemeEffects } from '@/components/ThemeEffects';
import { BackToTopButton } from '@/components/BackToTopButton';

export default function HomePage() {
  return (
    <div>
      <div className="scroll-indicator">
        <div className="scroll-progress" id="scrollBar" />
      </div>
      <ThemeEffects />
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <MediaKitPreview />
        <div className="section-divider" />
        <ContentShowcase />
        <div className="section-divider" />
        <Brands />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />

      <BackToTopButton />
    </div>
  );
}
