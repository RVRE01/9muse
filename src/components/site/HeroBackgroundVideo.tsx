'use client';

import { useEffect, useState } from 'react';
import styles from './Site.module.css';

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

export function HeroBackgroundVideo({ videoId }: { videoId: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const smallViewport = window.matchMedia('(max-width: 767px)').matches;
    const connection = (navigator as NavigatorWithConnection).connection;
    const constrainedConnection =
      connection?.saveData ||
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g';

    if (prefersReducedMotion || smallViewport || constrainedConnection) {
      return;
    }

    const timer = window.setTimeout(() => setEnabled(true), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className={styles.heroVideo} aria-hidden="true">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&modestbranding=1&rel=0&disablekb=1&fs=0&iv_load_policy=3`}
        title="9 Muse Customs background film"
        tabIndex={-1}
        loading="lazy"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}

