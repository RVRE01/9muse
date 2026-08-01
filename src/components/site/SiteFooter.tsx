import Image from 'next/image';
import { ArrowUp } from 'lucide-react';
import { primaryNavigation } from '@/content/site';
import styles from './Site.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <Image
            src="/Imgs/9muse-logo-badge.png"
            alt=""
            width={1156}
            height={698}
          />
          <div>
            <strong>9 Muse Customs</strong>
            <p>
              A private automotive atelier for engineered-to-order exterior,
              performance, lightweight, and interior commissions.
            </p>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          {primaryNavigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="#faq">FAQ</a>
          <a href="#inquiry">Request a Build</a>
          <a href="mailto:9muservre@gmail.com?subject=Join%20the%209%20Muse%20mailing%20list">
            Join the Mailing List
          </a>
        </nav>

        <div className={styles.footerReach}>
          <span>New York</span>
          <span>New Jersey</span>
          <span>Pennsylvania</span>
          <p>Nationwide commissions through coordinated enclosed transport.</p>
        </div>
      </div>

      <div className={styles.footerLegal}>
        <p>
          Performance results, compatibility, emissions requirements, and road
          legality vary by platform, configuration, condition, fuel, and
          jurisdiction.
        </p>
        <p>
          Information submitted through this site is used to review and respond
          to the build request.
        </p>
      </div>

      <div className={styles.footerBottom}>
        <span>
          &copy; {new Date().getFullYear()} 9 Muse Customs. All rights reserved.
        </span>
        <a
          className={styles.backToTop}
          href="#overview"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp aria-hidden size={16} />
        </a>
      </div>
    </footer>
  );
}
