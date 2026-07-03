// 2025-11-03T04:50:00-05:00 - Dropdown tokens governing select controls and menus.

export interface DropdownToken {
  /** Control background color. */
  controlBackground: string;
  /** Control foreground color. */
  controlForeground: string;
  /** Control border color. */
  controlBorder: string;
  /** Hover state border color. */
  controlHoverBorder: string;
  /** Chevron/icon color. */
  indicator: string;
  /** Option background color. */
  optionBackground: string;
  /** Option hover background color. */
  optionHoverBackground: string;
  /** Option foreground color. */
  optionForeground: string;
  /** Shadow applied to the dropdown menu. */
  menuShadow: string;
}

export type DropdownVariant = 'solid' | 'surface' | 'ghost';

export const dropdownTokens: Record<DropdownVariant, DropdownToken> = Object.freeze({
  solid: Object.freeze({
    controlBackground: 'var(--color-primary)',
    controlForeground: 'var(--color-primary-foreground)',
    controlBorder: 'var(--color-primary)',
    controlHoverBorder: 'color-mix(in srgb, var(--color-primary) 85%, black 15%)',
    indicator: 'var(--color-primary-foreground)',
    optionBackground: 'color-mix(in srgb, var(--color-background) 92%, var(--color-primary) 8%)',
    optionHoverBackground: 'color-mix(in srgb, var(--color-primary) 20%, var(--color-background) 80%)',
    optionForeground: 'var(--color-foreground)',
    menuShadow: 'var(--shadow-lg)',
  }),
  surface: Object.freeze({
    controlBackground: 'var(--color-surface)',
    controlForeground: 'var(--color-foreground)',
    controlBorder: 'var(--color-border)',
    controlHoverBorder: 'color-mix(in srgb, var(--color-border) 70%, var(--color-ring) 30%)',
    indicator: 'var(--color-muted-foreground)',
    optionBackground: 'var(--color-card)',
    optionHoverBackground: 'color-mix(in srgb, var(--color-muted) 30%, var(--color-card) 70%)',
    optionForeground: 'var(--color-card-foreground, var(--color-foreground))',
    menuShadow: 'var(--shadow-md)',
  }),
  ghost: Object.freeze({
    controlBackground: 'transparent',
    controlForeground: 'var(--color-foreground)',
    controlBorder: 'var(--color-border)',
    controlHoverBorder: 'color-mix(in srgb, var(--color-border) 60%, var(--color-foreground) 40%)',
    indicator: 'var(--color-muted-foreground)',
    optionBackground: 'var(--color-background)',
    optionHoverBackground: 'color-mix(in srgb, var(--color-muted) 25%, var(--color-background) 75%)',
    optionForeground: 'var(--color-foreground)',
    menuShadow: 'var(--shadow-sm)',
  }),
});

// 2025-11-03T04:50:00-05:00 - Extend dropdown tokens with destructive or success variants as themes require.
