// 2025-11-03T03:20:00-05:00 - Universal card layout tokens for testing showcase scenarios.

/**
 * Semantic contract for testing-ground universal card layouts.
 * Ensures padding, media sizing, and button alignment align with theme tokens.
 */
export interface CardLayoutToken {
  /** Padding token reference for the card shell. */
  padding: string;
  /** Spacing token applied between card sections. */
  gap: string;
  /** Border radius token applied to the card container. */
  radius: string;
  /** Height for optional media/hero slots expressed via CSS value. */
  mediaHeight: string;
  /** Shadow token applied to the card for elevation. */
  shadow: string;
  /** Primary axis alignment for footer actions within the card. */
  footerAlignment: 'start' | 'center' | 'end';
  /** Minimum height target ensuring footer alignment across responsive grids. */
  minHeight: string;
}

/**
 * Enumerated token keys for each universal card layout available in the testing ground.
 */
export type CardLayoutKey =
  | 'cardBasic'
  | 'cardEnhanced'
  | 'cardSpotlight'
  | 'cardSplit'
  | 'cardMetric'
  | 'cardCTABanner';

/**
 * Lookup table mapping layout keys to theme-driven card configuration tokens.
 */
export const cardLayoutTokens: Record<CardLayoutKey, CardLayoutToken> = Object.freeze({
  cardBasic: Object.freeze({
    padding: 'var(--spacing-lg)',
    gap: 'var(--spacing-md)',
    radius: 'var(--radius-lg)',
    mediaHeight: '12rem',
    shadow: 'var(--shadow-md)',
    footerAlignment: 'end',
    minHeight: 'calc(var(--spacing-xl) * 12)',
  }),
  cardEnhanced: Object.freeze({
    padding: 'var(--spacing-lg)',
    gap: 'var(--spacing-md)',
    radius: 'var(--radius-xl)',
    mediaHeight: '14rem',
    shadow: 'var(--shadow-lg)',
    footerAlignment: 'end',
    minHeight: 'calc(var(--spacing-xl) * 13)',
  }),
  cardSpotlight: Object.freeze({
    padding: 'var(--spacing-xl)',
    gap: 'var(--spacing-lg)',
    radius: 'var(--radius-2xl)',
    mediaHeight: '10rem',
    shadow: 'var(--shadow-xl)',
    footerAlignment: 'center',
    minHeight: 'calc(var(--spacing-xl) * 14)',
  }),
  cardSplit: Object.freeze({
    padding: 'var(--spacing-lg)',
    gap: 'var(--spacing-md)',
    radius: 'var(--radius-lg)',
    mediaHeight: '0rem',
    shadow: 'var(--shadow-md)',
    footerAlignment: 'end',
    minHeight: 'calc(var(--spacing-xl) * 12)',
  }),
  cardMetric: Object.freeze({
    padding: 'var(--spacing-lg)',
    gap: 'var(--spacing-sm)',
    radius: 'var(--radius-lg)',
    mediaHeight: '0rem',
    shadow: 'var(--shadow-md)',
    footerAlignment: 'end',
    minHeight: 'calc(var(--spacing-xl) * 10)',
  }),
  cardCTABanner: Object.freeze({
    padding: 'var(--spacing-xl)',
    gap: 'var(--spacing-md)',
    radius: 'var(--radius-2xl)',
    mediaHeight: '0rem',
    shadow: 'var(--shadow-lg)',
    footerAlignment: 'center',
    minHeight: 'calc(var(--spacing-xl) * 9)',
  }),
});

// 2025-11-03T03:20:00-05:00 - Introduce additional layouts as new universal card needs emerge.
