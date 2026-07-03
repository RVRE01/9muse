// 2025-11-03T04:46:00-05:00 - Toggle tokens for checkbox, switch, and radio components.

/**
 * Shared toggle state contract.
 */
interface ToggleStateToken {
  /** Background or fill for the control. */
  background: string;
  /** Foreground glyph or thumb color. */
  foreground: string;
  /** Border color for outline controls. */
  border: string;
  /** Focus ring outline. */
  focusRing: string;
  /** Shadow or glow on focus. */
  focusShadow: string;
}

/**
 * Token representation for a checkbox toggle.
 */
export interface CheckboxToken {
  unchecked: ToggleStateToken;
  checked: ToggleStateToken;
  indeterminate: ToggleStateToken;
  disabled: ToggleStateToken;
}

/**
 * Token representation for a radio control.
 */
export interface RadioToken {
  unchecked: ToggleStateToken;
  checked: ToggleStateToken;
  disabled: ToggleStateToken;
}

/**
 * Token representation for a switch control.
 */
export interface SwitchToken {
  off: ToggleStateToken & { track: string };
  on: ToggleStateToken & { track: string };
  disabled: ToggleStateToken & { track: string };
}

/**
 * Toggle token map keyed by control type.
 */
export const toggleTokens = Object.freeze({
  checkbox: Object.freeze<CheckboxToken>({
    unchecked: {
      background: 'var(--color-surface)',
      foreground: 'transparent',
      border: 'var(--color-border)',
      focusRing: 'var(--color-ring)',
      focusShadow: '0 0 0 3px color-mix(in srgb, var(--color-ring) 25%, transparent)',
    },
    checked: {
      background: 'var(--color-primary)',
      foreground: 'var(--color-primary-foreground)',
      border: 'var(--color-primary)',
      focusRing: 'var(--color-primary)',
      focusShadow: '0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent)',
    },
    indeterminate: {
      background: 'color-mix(in srgb, var(--color-primary) 70%, var(--color-secondary) 30%)',
      foreground: 'var(--color-primary-foreground)',
      border: 'var(--color-primary)',
      focusRing: 'var(--color-primary)',
      focusShadow: '0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent)',
    },
    disabled: {
      background: 'color-mix(in srgb, var(--color-muted) 70%, var(--color-surface) 30%)',
      foreground: 'color-mix(in srgb, var(--color-muted-foreground) 70%, var(--color-foreground) 30%)',
      border: 'color-mix(in srgb, var(--color-border) 70%, transparent)',
      focusRing: 'transparent',
      focusShadow: 'none',
    },
  }),
  radio: Object.freeze<RadioToken>({
    unchecked: {
      background: 'var(--color-surface)',
      foreground: 'transparent',
      border: 'var(--color-border)',
      focusRing: 'var(--color-ring)',
      focusShadow: '0 0 0 3px color-mix(in srgb, var(--color-ring) 25%, transparent)',
    },
    checked: {
      background: 'var(--color-primary)',
      foreground: 'var(--color-primary-foreground)',
      border: 'var(--color-primary)',
      focusRing: 'var(--color-primary)',
      focusShadow: '0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent)',
    },
    disabled: {
      background: 'color-mix(in srgb, var(--color-muted) 70%, var(--color-surface) 30%)',
      foreground: 'color-mix(in srgb, var(--color-muted-foreground) 70%, var(--color-foreground) 30%)',
      border: 'color-mix(in srgb, var(--color-border) 70%, transparent)',
      focusRing: 'transparent',
      focusShadow: 'none',
    },
  }),
  switch: Object.freeze<SwitchToken>({
    off: {
      background: 'var(--color-muted)',
      foreground: 'var(--color-surface)',
      border: 'var(--color-muted)',
      track: 'color-mix(in srgb, var(--color-muted) 70%, var(--color-surface) 30%)',
      focusRing: 'var(--color-ring)',
      focusShadow: '0 0 0 4px color-mix(in srgb, var(--color-ring) 20%, transparent)',
    },
    on: {
      background: 'var(--color-primary)',
      foreground: 'var(--color-primary-foreground)',
      border: 'var(--color-primary)',
      track: 'color-mix(in srgb, var(--color-primary) 70%, var(--color-secondary) 30%)',
      focusRing: 'var(--color-primary)',
      focusShadow: '0 0 0 4px color-mix(in srgb, var(--color-primary) 20%, transparent)',
    },
    disabled: {
      background: 'color-mix(in srgb, var(--color-muted) 80%, var(--color-surface) 20%)',
      foreground: 'color-mix(in srgb, var(--color-muted-foreground) 80%, var(--color-surface) 20%)',
      border: 'color-mix(in srgb, var(--color-muted) 80%, transparent)',
      track: 'color-mix(in srgb, var(--color-muted) 85%, var(--color-surface) 15%)',
      focusRing: 'transparent',
      focusShadow: 'none',
    },
  }),
} as const);

// 2025-11-03T04:46:00-05:00 - Extend toggles with danger or success accents as UX evolves.
