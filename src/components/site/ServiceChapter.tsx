'use client';

import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ServiceChapter as ServiceChapterData } from '@/content/site';
import styles from './Site.module.css';

export function ServiceChapter({
  service,
  reverse = false,
}: {
  service: ServiceChapterData;
  reverse?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealState, setRevealState] = useState<
    'pending' | 'hidden' | 'visible'
  >('pending');

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealState('visible');
          observer.disconnect();
        } else if (revealState === 'pending') {
          setRevealState('hidden');
        }
      },
      { threshold: 0.08, rootMargin: '-8% 0px -8% 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [revealState]);

  return (
    <section
      ref={sectionRef}
      className={styles.serviceChapter}
      data-treatment={service.treatment}
      data-reverse={reverse}
      data-reveal={revealState}
      id={service.id}
      aria-labelledby={`${service.id}-title`}
    >
      <div className={styles.serviceTexture} aria-hidden="true" />
      <div className={styles.serviceInner}>
        <div className={styles.serviceMedia}>
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 840px) 100vw, 56vw"
            className={styles.serviceImage}
            style={{ objectPosition: service.imagePosition }}
          />
          <div className={styles.serviceMediaLabel}>
            <span>{service.index}</span>
            {service.shortLabel}
          </div>
        </div>

        <div className={styles.serviceCopy}>
          <p className={styles.eyebrow}>{service.eyebrow}</p>
          <h2 id={`${service.id}-title`}>{service.shortLabel}</h2>
          <p className={styles.serviceFeature}>{service.headline}</p>
          {service.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className={styles.serviceDetails}>
            {service.details.map((detail) => (
              <li key={detail}>
                <Check aria-hidden size={15} />
                {detail}
              </li>
            ))}
          </ul>
          {service.qualification ? (
            <p className={styles.qualification}>{service.qualification}</p>
          ) : null}
          <a className={styles.textLink} href="#inquiry">
            Discuss this service
            <ArrowUpRight aria-hidden size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
