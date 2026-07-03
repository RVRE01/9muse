// 2025-11-03T04:47:00-05:00 - Alert and toast tokens for status messaging surfaces.

/**
 * Token contract describing alert surface styling.
 */
export interface AlertToken {
  /** Background color applied to the alert surface. */
  background: string;
  /** Text/icon foreground color. */
  foreground: string;
  /** Border color reinforcing the status. */
  border: string;
  /** Accent color used for leading iconography. */
  accent: string;
  /** Shadow applied to elevated alerts/toasts. */
  shadow: string;
}

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral' | 'toast';

/**
 * Theme token map for alert states.
 */
export const alertTokens: Record<AlertVariant, AlertToken> = Object.freeze({
  info: Object.freeze({
    background: 'color-mix(in srgb, var(--color-info) 12%, var(--color-background) 88%)',
    foreground: 'color-mix(in srgb, var(--color-info) 65%, var(--color-foreground) 35%)',
    border: 'color-mix(in srgb, var(--color-info) 55%, var(--color-border) 45%)',
    accent: 'var(--color-info)',
    shadow: 'var(--shadow-sm)',
  }),
  success: Object.freeze({
    background: 'color-mix(in srgb, var(--color-success) 15%, var(--color-background) 85%)',
    foreground: 'color-mix(in srgb, var(--color-success) 70%, var(--color-foreground) 30%)',
    border: 'color-mix(in srgb, var(--color-success) 60%, var(--color-border) 40%)',
    accent: 'var(--color-success)',
    shadow: 'var(--shadow-sm)',
  }),
  warning: Object.freeze({
    background: 'color-mix(in srgb, var(--color-warning) 18%, var(--color-background) 82%)',
    foreground: 'color-mix(in srgb, var(--color-warning) 70%, var(--color-foreground) 30%)',
    border: 'color-mix(in srgb, var(--color-warning) 60%, var(--color-border) 40%)',
    accent: 'var(--color-warning)',
    shadow: 'var(--shadow-sm)',
  }),
  danger: Object.freeze({
    background: 'color-mix(in srgb, var(--color-danger) 18%, var(--color-background) 82%)',
    foreground: 'color-mix(in srgb, var(--color-danger) 72%, var(--color-foreground) 28%)',
    border: 'color-mix(in srgb, var(--color-danger) 60%, var(--color-border) 40%)',
    accent: 'var(--color-danger)',
    shadow: 'var(--shadow-sm)',
  }),
  neutral: Object.freeze({
    background: 'color-mix(in srgb, var(--color-muted) 20%, var(--color-background) 80%)',
    foreground: 'color-mix(in srgb, var(--color-muted-foreground) 70%, var(--color-foreground) 30%)',
    border: 'color-mix(in srgb, var(--color-muted) 55%, var(--color-border) 45%)',
    accent: 'var(--color-muted-foreground)',
    shadow: 'var(--shadow-xs)',
  }),
  toast: Object.freeze({
    background: 'var(--color-card)',
    foreground: 'var(--color-card-foreground, var(--color-foreground))',
    border: 'color-mix(in srgb, var(--color-ring) 40%, var(--color-border) 60%)',
    accent: 'var(--color-primary)',
    shadow: 'var(--shadow-lg)',
  }),
});

// 2025-11-03T04:47:00-05:00 - Extend tokens when new statuses or tonal ramps are introduced.
