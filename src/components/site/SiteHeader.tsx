'use client';

import Image from 'next/image';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { primaryNavigation, serviceNavigation } from '@/content/site';
import styles from './Site.module.css';

const ServiceLinks = ({ onClick }: { onClick?: () => void }) => (
  <>
    {serviceNavigation.map((item, index) => (
      <a key={item.href} href={item.href} onClick={onClick}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        {item.label}
      </a>
    ))}
  </>
);

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className={styles.siteHeader} data-open={open}>
      <div className={styles.headerInner}>
        <a
          className={styles.brand}
          href="#overview"
          aria-label="9 Muse Customs, back to overview"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/Imgs/9Muse Customs_logo2026.png"
            alt=""
            width={764}
            height={764}
            className={styles.brandMark}
            priority
          />
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            item.label === 'Services' ? (
              <details key={item.href} className={styles.desktopServicesMenu}>
                <summary>
                  {item.label}
                  <ChevronDown aria-hidden size={14} />
                </summary>
                <div className={styles.desktopServicesLinks}>
                  <ServiceLinks />
                </div>
              </details>
            ) : (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            )
          ))}
        </nav>

        <a className={styles.headerCta} href="#inquiry">
          Request a Private Build
          <ArrowUpRight aria-hidden size={16} />
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden size={21} /> : <Menu aria-hidden size={21} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={styles.mobileNav}
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {primaryNavigation.map((item) => (
          item.label === 'Services' ? (
            <details key={item.href} className={styles.mobileServicesMenu}>
              <summary>
                {item.label}
                <ChevronDown aria-hidden size={16} />
              </summary>
              <div className={styles.mobileServicesLinks}>
                <ServiceLinks onClick={() => setOpen(false)} />
              </div>
            </details>
          ) : (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          )
        ))}
        <a
          className={styles.mobileNavCta}
          href="#inquiry"
          onClick={() => setOpen(false)}
        >
          Request a Private Build
          <ArrowUpRight aria-hidden size={17} />
        </a>
      </nav>
    </header>
  );
}
