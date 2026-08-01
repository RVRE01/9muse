import { CoverageSection } from '@/components/site/CoverageSection';
import { FaqSection } from '@/components/site/FaqSection';
import { FeaturedFilm } from '@/components/site/FeaturedFilm';
import { Hero } from '@/components/site/Hero';
import { InquirySection } from '@/components/site/InquirySection';
import { ProcessSection } from '@/components/site/ProcessSection';
import { ProjectGallery } from '@/components/site/ProjectGallery';
import { ServiceChapter } from '@/components/site/ServiceChapter';
import { ServiceIndex } from '@/components/site/ServiceIndex';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { StructuredData } from '@/components/site/StructuredData';
import { ScrollReveal } from '@/components/site/ScrollReveal';
import { services } from '@/content/site';
import styles from '@/components/site/Site.module.css';

export default function HomePage() {
  return (
    <div className={styles.siteShell}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main-content">
        <Hero />

        <section
          className={styles.servicesIntro}
          id="services"
          aria-labelledby="services-title"
        >
          <ScrollReveal className={styles.servicesIntroCopy}>
            <div className={styles.servicesIntroHeading}>
              <p className={styles.eyebrow}>The 9 Muse Services</p>
              <h2 id="services-title">Four ways to make the vehicle feel like yours.</h2>
            </div>
            <div className={styles.servicesIntroMedia}>
              <FeaturedFilm />
              <p className={styles.servicesIntroSubtext}>
                Every commission begins with the complete vehicle in mind. Finish,
                color, form, restoration, and measured performance are developed
                as related decisions, not isolated upgrades.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal className={styles.serviceIndexReveal} delay={110}>
            <ServiceIndex />
          </ScrollReveal>
        </section>

        {services.map((service, index) => (
          <ServiceChapter
            key={service.id}
            service={service}
            reverse={index % 2 === 1}
          />
        ))}

        <ProjectGallery />
        <ProcessSection />
        <CoverageSection />
        <FaqSection />
        <InquirySection />
      </main>

      <SiteFooter />
      <StructuredData />
    </div>
  );
}
