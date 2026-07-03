// 2025-11-03T03:02:00-05:00 - Pill tokens support variant selector treatments.

export interface PillToken {
  background: string;
  foreground: string;
  border: string;
  hoverBackground: string;
  shadow: string;
}

export type PillTone = 'neutral' | 'active' | 'outline';

export const pillTokens: Record<PillTone, PillToken> = Object.freeze({
  neutral: Object.freeze({
    background: 'var(--color-card)',
    foreground: 'var(--color-foreground)',
    border: 'var(--color-border)',
    hoverBackground: 'color-mix(in srgb, var(--color-card) 85%, var(--color-primary) 15%)',
    shadow: 'var(--shadow-sm, 0 1px 2px rgba(15, 23, 42, 0.08))',
  }),
  active: Object.freeze({
    background: 'var(--color-primary)',
    foreground: 'var(--color-primary-foreground)',
    border: 'transparent',
    hoverBackground: 'color-mix(in srgb, var(--color-primary) 80%, white 20%)',
    shadow: 'var(--glow-accent, 0 0 24px color-mix(in srgb, var(--color-primary) 80%, transparent))',
  }),
  outline: Object.freeze({
    background: 'transparent',
    foreground: 'var(--color-muted-foreground)',
    border: 'var(--color-muted)',
    hoverBackground: 'color-mix(in srgb, var(--color-muted) 20%, transparent)',
    shadow: 'none',
  }),
});

// 2025-11-03T03:02:00-05:00 - Expand with density variants as component catalog grows.
