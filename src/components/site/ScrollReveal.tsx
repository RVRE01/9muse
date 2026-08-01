'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  layout?: 'wide' | 'standard' | 'tall';
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  layout,
}: ScrollRevealProps) {
  const revealRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'pending' | 'hidden' | 'visible'>('pending');

  useEffect(() => {
    const element = revealRef.current;

    if (!element) {
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
          setState('visible');
          observer.disconnect();
        } else if (state === 'pending') {
          setState('hidden');
        }
      },
      { threshold: 0.08, rootMargin: '-5% 0px -5% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [state]);

  return (
    <div
      ref={revealRef}
      className={className}
      data-layout={layout}
      data-reveal={state}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
