// 2025-11-03T04:42:00-05:00 - Text input tokens governing backgrounds, borders, and focus states.

/**
 * Token contract supporting text-based field variants.
 */
export interface FieldToken {
  /** Primary field background color. */
  background: string;
  /** Text color for user-entered values. */
  foreground: string;
  /** Border color for the resting state. */
  border: string;
  /** Border color presented on hover states. */
  hoverBorder: string;
  /** Placeholder text color. */
  placeholder: string;
  /** Focus ring outline color. */
  focusRing: string;
  /** Shadow applied during focus to elevate the field. */
  focusShadow: string;
  /** Background color when the field is disabled. */
  disabledBackground: string;
  /** Text color when the field is disabled. */
  disabledForeground: string;
}

export type FieldVariant = 'default' | 'filled' | 'invalid' | 'disabled';

/**
 * Theme tokens supporting different input field treatments.
 */
export const fieldTokens: Record<FieldVariant, FieldToken> = Object.freeze({
  default: Object.freeze({
    background: 'var(--color-surface)',
    foreground: 'var(--color-foreground)',
    border: 'var(--color-border)',
    hoverBorder: 'color-mix(in srgb, var(--color-border) 70%, var(--color-foreground) 30%)',
    placeholder: 'var(--color-muted-foreground)',
    focusRing: 'var(--color-ring)',
    focusShadow: '0 0 0 4px color-mix(in srgb, var(--color-ring) 20%, transparent)',
    disabledBackground: 'color-mix(in srgb, var(--color-surface) 70%, var(--color-muted) 30%)',
    disabledForeground: 'color-mix(in srgb, var(--color-foreground) 60%, var(--color-muted-foreground) 40%)',
  }),
  filled: Object.freeze({
    background: 'color-mix(in srgb, var(--color-surface) 60%, var(--color-muted) 40%)',
    foreground: 'var(--color-foreground)',
    border: 'transparent',
    hoverBorder: 'var(--color-ring)',
    placeholder: 'color-mix(in srgb, var(--color-muted-foreground) 80%, var(--color-foreground) 20%)',
    focusRing: 'var(--color-ring)',
    focusShadow: '0 0 0 4px color-mix(in srgb, var(--color-ring) 25%, transparent)',
    disabledBackground: 'color-mix(in srgb, var(--color-muted) 70%, var(--color-surface) 30%)',
    disabledForeground: 'color-mix(in srgb, var(--color-muted-foreground) 70%, var(--color-foreground) 30%)',
  }),
  invalid: Object.freeze({
    background: 'var(--color-surface)',
    foreground: 'var(--color-foreground)',
    border: 'var(--color-danger)',
    hoverBorder: 'color-mix(in srgb, var(--color-danger) 85%, black 15%)',
    placeholder: 'color-mix(in srgb, var(--color-danger) 40%, var(--color-muted-foreground) 60%)',
    focusRing: 'var(--color-danger)',
    focusShadow: '0 0 0 4px color-mix(in srgb, var(--color-danger) 20%, transparent)',
    disabledBackground: 'color-mix(in srgb, var(--color-danger) 10%, var(--color-muted) 90%)',
    disabledForeground: 'color-mix(in srgb, var(--color-danger) 20%, var(--color-muted-foreground) 80%)',
  }),
  disabled: Object.freeze({
    background: 'color-mix(in srgb, var(--color-muted) 65%, var(--color-surface) 35%)',
    foreground: 'color-mix(in srgb, var(--color-muted-foreground) 80%, var(--color-foreground) 20%)',
    border: 'color-mix(in srgb, var(--color-border) 70%, transparent)',
    hoverBorder: 'color-mix(in srgb, var(--color-border) 60%, transparent)',
    placeholder: 'color-mix(in srgb, var(--color-muted-foreground) 80%, var(--color-border) 20%)',
    focusRing: 'transparent',
    focusShadow: 'none',
    disabledBackground: 'color-mix(in srgb, var(--color-muted) 65%, var(--color-surface) 35%)',
    disabledForeground: 'color-mix(in srgb, var(--color-muted-foreground) 80%, var(--color-foreground) 20%)',
  }),
});

// 2025-11-03T04:42:00-05:00 - Extend with success/error adornments as needed.
