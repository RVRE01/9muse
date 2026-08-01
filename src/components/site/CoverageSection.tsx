import Image from 'next/image';
import { ArrowUpRight, Route, ShieldCheck, Truck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import styles from './Site.module.css';

export function CoverageSection() {
  return (
    <section
      className={styles.coverageSection}
      id="nationwide"
      aria-labelledby="coverage-title"
    >
      <div className={styles.coverageImage}>
        <Image
          src="/Imgs/9muse-enclosed-transport-loading-hd.png"
          alt="Dark performance coupe being loaded onto an enclosed transport trailer at dusk with the loading ramp and wheel straps visible"
          fill
          sizes="(max-width: 840px) 100vw, 50vw"
          className={styles.galleryImage}
          style={{ objectPosition: '52% center' }}
        />
      </div>

      <ScrollReveal className={styles.coverageCopyReveal}>
        <div className={styles.coverageCopy}>
          <p className={styles.eyebrow}>Northeast Access / National Reach</p>
          <h2 id="coverage-title">
            Built for NY, NJ, and PA. Available Across the Country.
          </h2>
          <p>
            9 Muse Customs is positioned for private clients across New York, New
            Jersey, and Pennsylvania. Clients elsewhere in the United States can
            begin remotely and plan vehicle arrival and return as part of the
            commission.
          </p>
          <p>
            For clients outside the Northeast, project planning can include
            enclosed vehicle transportation through an approved or client-selected
            carrier. Transport timing, insurance, inspection, and delivery
            requirements are confirmed in the final scope.
          </p>
          <div className={styles.coverageProof}>
            <span>
              <Route aria-hidden size={18} />
              Remote scope development
            </span>
            <span>
              <Truck aria-hidden size={18} />
              Enclosed-carrier planning
            </span>
            <span>
              <ShieldCheck aria-hidden size={18} />
              Inspection and delivery requirements
            </span>
          </div>
          <a className={styles.textLink} href="#inquiry">
            Plan an out-of-region build
            <ArrowUpRight aria-hidden size={16} />
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
