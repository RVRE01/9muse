import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { capabilities } from '@/content/site';
import { HeroBackgroundVideo } from './HeroBackgroundVideo';
import styles from './Site.module.css';

const heroVideoId = 'R0gS7MmgCdk';

export function Hero() {
  return (
    <>
      <section
        className={styles.hero}
        id="overview"
        aria-labelledby="hero-title"
      >
        <div className={styles.heroMedia} aria-hidden="true">
          <Image
            src="https://i.ytimg.com/vi/R0gS7MmgCdk/maxresdefault.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            className={styles.heroPoster}
          />
          <HeroBackgroundVideo videoId={heroVideoId} />
        </div>
        <div className={styles.heroScrim} aria-hidden="true" />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            Private Automotive Atelier / NY / NJ / PA / Nationwide
          </p>
          <h1 id="hero-title">
            <span>9 Muse Customs</span>
            Built Beyond Specification.
          </h1>
          <p className={styles.heroLead}>
            Premium automotive work where finish, color, form, restoration, and
            measured performance resolve into one coherent machine. Private
            commissions are available across the Northeast and nationally
            through coordinated enclosed transport.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#inquiry">
              Request a Private Build
              <ArrowUpRight aria-hidden size={18} />
            </a>
            <a className={styles.secondaryButton} href="#services">
              Explore the Services
              <ArrowDown aria-hidden size={17} />
            </a>
          </div>
        </div>

        <a className={styles.heroScroll} href="#services">
          Scroll to the services
          <ArrowDown aria-hidden size={15} />
        </a>
      </section>

      <section className={styles.capabilityBand} aria-label="9 Muse capabilities">
        <div className={styles.capabilityInner}>
          {capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
        <p>Northeast-focused. Nationally available by enclosed transport.</p>
      </section>
    </>
  );
}
