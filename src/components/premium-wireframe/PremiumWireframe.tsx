'use client';

import Image from 'next/image';
import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  ArrowRight,
  Check,
  Circle,
  Film,
  Gauge,
  Moon,
  Play,
  SlidersHorizontal,
  Square,
  Sun,
  X,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import styles from './PremiumWireframe.module.css';

type ThemeMode = 'light' | 'dark';
type RadiusMode = 'none' | 'slight' | 'heavy';

const heroBackgroundVideoId = 'bg1hDxHnj4g';
const chapterVideoId = 'z5kNEvZ_MMM';

const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Craft', href: '#craft' },
  { label: 'Materials', href: '#materials' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Inquiry', href: '#inquiry' },
];

const heroStats = [
  { value: '9M', label: 'signature builds' },
  { value: '01', label: 'custom concept' },
  { value: '#EF402A', label: 'logo red' },
];

const featureCards = [
  {
    label: 'Carbon',
    title: 'Aero-first surfaces',
    body: 'Carbon fiber folds, splitters, grille treatments, and widebody cues get dedicated image-led panels.',
  },
  {
    label: 'Leather',
    title: 'Interior trim language',
    body: 'Leather grains and logo-red stitch details carry the visual system into warmer cabin sections.',
  },
  {
    label: 'Concierge',
    title: 'Build request flow',
    body: 'Inquiry paths stay visible without forcing the layout into a generic dealership template.',
  },
];

const galleryItems = [
  {
    label: 'Carbon nose and lighting',
    src: '/Imgs/magnific_create-a-cinematic-closeu_tfTpu3MmZJ.png',
  },
  {
    label: 'Widebody silver profile',
    src: '/Imgs/magnific_create-a-premium-closeup-_5xhCsRLKxe.png',
  },
  {
    label: 'Wheel and brake detail',
    src: '/Imgs/magnific_generate-a-set-of-luxury-_LUQbwVcswO.png',
  },
  {
    label: 'Rear quarter finish',
    src: '/Imgs/magnific_create-a-premium-closeup-_Uy5rPHSwny.png',
  },
];

const materialPanels = [
  {
    title: 'Carbon fiber exterior weave',
    body: 'A cold technical fold for aero, vents, lips, and splitters. Used behind spec cards and high-contrast build details.',
    className: styles.carbonPanel,
    imageSrc: '/Imgs/magnific_generate-a-luxury-automot_YV93p7XWeC.png',
    imageAlt: 'Grey performance coupe with sculpted carbon exterior details',
  },
  {
    title: 'Black leather with logo-red stitch',
    body: 'A warmer interior fold for upholstery, console, steering, and trim stories. The stitch line matches the 9Muse red.',
    className: styles.leatherPanel,
    imageSrc: '/Imgs/magnific_create-a-premium-automoti_hEMdFMsvqL.png',
    imageAlt: 'Dark custom sports car with polished bodywork and red-accent detailing',
  },
];

const radiusOptions: Array<{ id: RadiusMode; label: string }> = [
  { id: 'none', label: 'None' },
  { id: 'slight', label: 'Slight' },
  { id: 'heavy', label: 'Heavy' },
];

const subscribeToHydration = () => () => undefined;
const clientHydratedSnapshot = () => true;
const serverHydratedSnapshot = () => false;

export function PremiumWireframe() {
  const { resolvedTheme, setTheme } = useTheme();
  const [radiusMode, setRadiusMode] = useState<RadiusMode>('slight');
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const [lightboxVideoId, setLightboxVideoId] = useState<string | null>(null);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    clientHydratedSnapshot,
    serverHydratedSnapshot,
  );
  const activeTheme: ThemeMode = hydrated && resolvedTheme === 'light' ? 'light' : 'dark';

  const setThemeMode = (mode: ThemeMode) => {
    setTheme(mode);
  };

  useEffect(() => {
    if (!lightboxVideoId) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxVideoId(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [lightboxVideoId]);

  return (
    <main className={styles.shell} data-radius={radiusMode}>
      <a className={styles.skipLink} href="#overview">
        Skip to content
      </a>

      <header className={styles.header}>
        <a className={styles.brand} href="#overview" aria-label="9MUSE home">
          <span className={styles.brandMark}>
            <Image
              src="/Imgs/9muse-logo-badge.png"
              alt=""
              width={116}
              height={70}
              priority
            />
          </span>
          <span>
            <strong>9Muse Customs</strong>
            <small>Carbon / Leather / Performance</small>
          </span>
        </a>

        <nav className={styles.primaryNav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.headerAction} href="#inquiry">
          Request build
          <ArrowRight aria-hidden className={styles.iconSm} />
        </a>
      </header>

      <section className={styles.hero} id="overview" aria-labelledby="hero-title">
        <div
          className={styles.heroMedia}
          role="img"
          aria-label="Autoplaying 9Muse Customs video background"
        >
          <div className={styles.heroVideo} aria-hidden="true">
            <iframe
              src={`https://www.youtube.com/embed/${heroBackgroundVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroBackgroundVideoId}&playsinline=1&modestbranding=1&rel=0&disablekb=1&fs=0&iv_load_policy=3`}
              title="9Muse Customs background video"
              tabIndex={-1}
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          </div>
          <div className={styles.mediaTag}>
            <Film aria-hidden className={styles.iconSm} />
            Background film
          </div>
        </div>

        <div className={styles.heroScrim} aria-hidden />

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>9Muse Customs</p>
            <h1 id="hero-title">9 Muse Customs</h1>
            <p>
              Premium custom performance builds with carbon aero, leather trim,
              signature red accents, and a cinematic path from inspiration to
              private build request.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#inquiry">
                Start custom request
                <ArrowRight aria-hidden className={styles.iconSm} />
              </a>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setLightboxVideoId(heroBackgroundVideoId)}
              >
                Watch film
                <Play aria-hidden className={styles.iconSm} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <nav className={styles.subnav} aria-label="Section navigation">
        <div className={styles.subnavInner}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section className={styles.statBand} aria-label="Concept specifications">
        <div className={styles.statBandInner}>
          {heroStats.map((stat) => (
            <article key={stat.label} className={styles.statCard}>
              <Gauge aria-hidden className={styles.iconMd} />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.carbonFold}`} id="craft" aria-labelledby="craft-title">
        <div className={styles.chapterCopy}>
          <p className={styles.eyebrow}>Custom craft</p>
          <h2 id="craft-title">Carbon detail without losing the silhouette.</h2>
          <p>
            The page now leads with real custom-shop imagery, then alternates
            carbon and leather folds so each section feels like a material
            chapter instead of a static wireframe.
          </p>
        </div>
        <div className={styles.pictureFrame}>
          <Image
            src="/Imgs/magnific_generate-a-luxury-automot_SOb1yf4Ub8.png"
            alt="Black performance car in a studio with carbon exterior detailing"
            fill
            sizes="(max-width: 860px) 100vw, 55vw"
            className={styles.frameImage}
          />
          <span>Carbon exterior study</span>
        </div>
      </section>

      <section className={styles.featureGrid} aria-label="Premium page modules">
        {featureCards.map((card) => (
          <article key={card.title} className={styles.featureCard}>
            <span>{card.label}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </section>

      <section className={styles.leatherParallaxFold} aria-labelledby="leather-parallax-title">
        <div className={styles.parallaxContent}>
          <p className={styles.eyebrow}>Leather atelier</p>
          <h2 id="leather-parallax-title">Tailored interiors. Red-stitch attitude.</h2>
          <p>
            A darker parallax fold gives the page a physical cabin moment:
            black leather grain, logo-red stitching, and enough overlay density
            for headlines to stay readable in both themes.
          </p>
        </div>
      </section>

      <section className={styles.materialSection} id="materials" aria-labelledby="materials-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Material system</p>
          <h2 id="materials-title">Alternating carbon and leather folds.</h2>
        </div>
        <div className={styles.materialGrid}>
          {materialPanels.map((panel) => (
            <article key={panel.title} className={`${styles.materialPanel} ${panel.className}`}>
              <Image
                src={panel.imageSrc}
                alt={panel.imageAlt}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                className={styles.materialImage}
              />
              <Image
                src="/Imgs/9muse-logo-mark.png"
                alt=""
                width={180}
                height={109}
                className={styles.panelWatermark}
              />
              <h3>{panel.title}</h3>
              <p>{panel.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.motionSection} aria-labelledby="motion-title">
        <div className={styles.motionCopy}>
          <p className={styles.eyebrow}>Film chapter</p>
          <h2 id="motion-title">Video lives as a premium media object.</h2>
          <p>
            The YouTube film is now connected to both the hero and the media
            fold, with a still image that keeps the page cinematic before the
            visitor decides to play.
          </p>
        </div>
        <button
          type="button"
          className={styles.videoFrame}
          onClick={() => setLightboxVideoId(chapterVideoId)}
          aria-label="Open the 9Muse Customs film in a lightbox"
        >
          <Image
            src={`https://i.ytimg.com/vi/${chapterVideoId}/hqdefault.jpg`}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 860px) 100vw, 60vw"
            className={styles.frameImage}
          />
          <div className={styles.playDisc}>
            <Play aria-hidden className={styles.iconLg} />
          </div>
          <div className={styles.videoMeta}>
            <Film aria-hidden className={styles.iconSm} />
            Open film
          </div>
        </button>
      </section>

      <section className={styles.gallerySection} id="gallery" aria-labelledby="gallery-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Gallery matrix</p>
          <h2 id="gallery-title">Image-led chapters for every angle.</h2>
        </div>

        <div className={styles.galleryGrid}>
          {galleryItems.map((item, index) => (
            <div
              key={item.label}
              className={styles.galleryItem}
              data-large={index === 0}
              role="img"
              aria-label={item.label}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes={index === 0 ? '(max-width: 860px) 100vw, 42vw' : '(max-width: 860px) 100vw, 28vw'}
                className={styles.frameImage}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.inquirySection} id="inquiry" aria-labelledby="inquiry-title">
        <div className={styles.inquiryCopy}>
          <p className={styles.eyebrow}>Concierge flow</p>
          <h2 id="inquiry-title">From inspiration to private build request.</h2>
          <p>
            The final panel uses the logo red, carbon/leather material language,
            and high-contrast surfaces so the call to action stays legible in
            both light and dark themes.
          </p>
        </div>

        <div className={styles.configPanel}>
          <div className={styles.configHeader}>
            <Image
              src="/Imgs/9muse-logo-mark.png"
              alt=""
              width={72}
              height={44}
              className={styles.configLogo}
            />
            <span>Build preferences</span>
          </div>
          <div className={styles.swatches} aria-label="Color placeholder swatches">
            <span className={styles.swatchBlack} />
            <span className={styles.swatchRed} />
            <span className={styles.swatchSilver} />
          </div>
          <ul className={styles.checkList}>
            <li>
              <Check aria-hidden className={styles.iconSm} />
              Hero poster uses the provided YouTube video.
            </li>
            <li>
              <Check aria-hidden className={styles.iconSm} />
              Carbon and leather textures alternate across page folds.
            </li>
            <li>
              <Check aria-hidden className={styles.iconSm} />
              Logo red is matched to #EF402A and checked for contrast.
            </li>
          </ul>
          <a className={styles.primaryButton} href="mailto:studio@example.com">
            Start request
            <ArrowRight aria-hidden className={styles.iconSm} />
          </a>
        </div>
      </section>

      <div className={styles.toolboxDock} data-open={toolboxOpen}>
        <button
          type="button"
          className={styles.toolboxToggle}
          aria-expanded={toolboxOpen}
          aria-controls="display-toolbox-panel"
          onClick={() => setToolboxOpen((open) => !open)}
        >
          {toolboxOpen ? (
            <X aria-hidden className={styles.iconSm} />
          ) : (
            <SlidersHorizontal aria-hidden className={styles.iconSm} />
          )}
          <span>{toolboxOpen ? 'Close' : 'Display'}</span>
        </button>

        <aside
          id="display-toolbox-panel"
          className={styles.toolbox}
          aria-label="Display toolbox"
          hidden={!toolboxOpen}
        >
          <div className={styles.toolboxTitle}>
            <SlidersHorizontal aria-hidden className={styles.iconSm} />
            <span>Toolbox</span>
          </div>

          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>Surface</span>
            <div className={styles.segmented} role="group" aria-label="Theme mode">
              <button
                type="button"
                onClick={() => setThemeMode('light')}
                aria-pressed={activeTheme === 'light'}
                data-active={activeTheme === 'light'}
              >
                <Sun aria-hidden className={styles.iconSm} />
                Light
              </button>
              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                aria-pressed={activeTheme === 'dark'}
                data-active={activeTheme === 'dark'}
              >
                <Moon aria-hidden className={styles.iconSm} />
                Dark
              </button>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>Edges</span>
            <div className={styles.segmented} role="group" aria-label="Edge roundness">
              {radiusOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setRadiusMode(option.id)}
                  aria-pressed={radiusMode === option.id}
                  data-active={radiusMode === option.id}
                >
                  {option.id === 'heavy' ? (
                    <Circle aria-hidden className={styles.iconSm} />
                  ) : (
                    <Square aria-hidden className={styles.iconSm} />
                  )}
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <dl className={styles.toolboxSpecs}>
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      {lightboxVideoId ? (
        <div
          className={styles.videoLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Video lightbox"
          onClick={() => setLightboxVideoId(null)}
        >
          <div
            className={styles.videoLightboxPanel}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.videoLightboxClose}
              onClick={() => setLightboxVideoId(null)}
              aria-label="Close video lightbox"
            >
              <X aria-hidden className={styles.iconSm} />
              Close
            </button>
            <div className={styles.videoLightboxFrame}>
              <iframe
                src={`https://www.youtube.com/embed/${lightboxVideoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                title="9Muse Customs film"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
