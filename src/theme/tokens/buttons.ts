// 2025-11-03T04:35:00-05:00 - Button tokens describing semantic variants across states.

/**
 * Semantic representation of a button variant mapped to CSS custom properties.
 */
export interface ButtonVariantToken {
  /** Default background fill for the control. */
  background: string;
  /** Text and icon color rendered atop the control. */
  foreground: string;
  /** Optional border color framing the control. */
  border: string;
  /** Background color applied on hover to maintain accessibility contrast. */
  hoverBackground: string;
  /** Outline color used during focus-visible states. */
  focusRing: string;
  /** Elevation shadow applied to the control. */
  shadow: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'icon' | 'ghost';

/**
 * Token table defining each supported button variant.
 */
export const buttonTokens: Record<ButtonVariant, ButtonVariantToken> = Object.freeze({
  primary: Object.freeze({
    background: 'var(--color-primary)',
    foreground: 'var(--color-primary-foreground)',
    border: 'var(--color-primary)',
    hoverBackground: 'color-mix(in srgb, var(--color-primary) 90%, black 10%)',
    focusRing: 'var(--color-primary)',
    shadow: 'var(--shadow-control)',
  }),
  secondary: Object.freeze({
    background: 'var(--color-secondary)',
    foreground: 'var(--color-secondary-foreground)',
    border: 'var(--color-secondary)',
    hoverBackground: 'color-mix(in srgb, var(--color-secondary) 92%, black 8%)',
    focusRing: 'var(--color-secondary)',
    shadow: 'var(--shadow-control)',
  }),
  icon: Object.freeze({
    background: 'var(--color-surface)',
    foreground: 'var(--color-foreground)',
    border: 'var(--color-border)',
    hoverBackground: 'color-mix(in srgb, var(--color-surface) 85%, var(--color-foreground) 15%)',
    focusRing: 'var(--color-ring)',
    shadow: 'var(--shadow-interactive)',
  }),
  ghost: Object.freeze({
    background: 'transparent',
    foreground: 'var(--color-foreground)',
    border: 'transparent',
    hoverBackground: 'color-mix(in srgb, var(--color-foreground) 12%, transparent)',
    focusRing: 'var(--color-ring)',
    shadow: 'var(--shadow-none)',
  }),
});

// 2025-11-03T04:35:00-05:00 - Extend button variants as new semantic types are introduced.
