// 2025-11-03T02:59:00-05:00 - Badge tokens encapsulate semantic statuses.

export interface BadgeToken {
  background: string;
  foreground: string;
  border: string;
}

export type BadgeTone =
  | 'neutral'
  | 'accent'
  | 'success'
  | 'warning'
  | 'critical'
  | 'info';

export const badgeTones: readonly BadgeTone[] = Object.freeze([
  'neutral',
  'accent',
  'success',
  'warning',
  'critical',
  'info',
]);

export const badgeTokens: Record<BadgeTone, BadgeToken> = Object.freeze({
  neutral: Object.freeze({
    background: 'var(--color-muted)',
    foreground: 'var(--color-muted-foreground)',
    border: 'var(--color-border)',
  }),
  accent: Object.freeze({
    background: 'var(--color-accent)',
    foreground: 'var(--color-accent-foreground)',
    border: 'var(--color-accent)',
  }),
  success: Object.freeze({
    background: 'var(--color-success)',
    foreground: 'var(--color-surface-foreground, var(--color-foreground))',
    border: 'var(--color-success)',
  }),
  warning: Object.freeze({
    background: 'var(--color-warning)',
    foreground: 'var(--color-surface-foreground, var(--color-foreground))',
    border: 'var(--color-warning)',
  }),
  critical: Object.freeze({
    background: 'var(--color-danger)',
    foreground: 'var(--color-surface-foreground, var(--color-foreground))',
    border: 'var(--color-danger)',
  }),
  info: Object.freeze({
    background: 'var(--color-info)',
    foreground: 'var(--color-surface-foreground, var(--color-foreground))',
    border: 'var(--color-info)',
  }),
});

// 2025-11-03T02:59:00-05:00 - Extend tones as new semantic statuses are introduced.
