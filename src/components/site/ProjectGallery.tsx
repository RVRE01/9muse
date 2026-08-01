import Image from 'next/image';
import { galleryStudies } from '@/content/site';
import { ScrollReveal } from './ScrollReveal';
import styles from './Site.module.css';

export function ProjectGallery() {
  return (
    <section
      className={styles.projectsSection}
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className={styles.sectionIntro}>
        <div>
          <p className={styles.eyebrow}>Four Service Directions</p>
          <h2 id="projects-title">One standard. Four ways in.</h2>
        </div>
        <p>
          Each category begins with a clear finish, form, or performance
          objective. The right combination is shaped around the vehicle, its
          condition, and how you intend to live with it.
        </p>
      </div>

      <div className={styles.galleryGrid}>
        {galleryStudies.map((study, index) => (
          <ScrollReveal
            key={`${study.label}-${index}`}
            className={styles.galleryItem}
            layout={study.layout}
            delay={index * 70}
          >
            <figure>
              <Image
                src={study.image}
                alt={study.alt}
                fill
                sizes={
                  study.layout === 'wide'
                    ? '(max-width: 760px) 100vw, 66vw'
                    : '(max-width: 760px) 100vw, 34vw'
                }
                className={styles.galleryImage}
                style={{ objectPosition: study.imagePosition }}
              />
              <figcaption>
                <span>{study.category}</span>
                <strong>{study.label}</strong>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
