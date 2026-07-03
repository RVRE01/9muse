// 2025-11-03T05:02:00-05:00 - Overlay tokens for modal, tooltip, and popover surfaces.

export interface OverlayToken {
  background: string;
  foreground: string;
  border: string;
  shadow: string;
  backdrop?: string;
}

export type OverlayVariant = 'modal' | 'tooltip' | 'popover';

export const overlayTokens: Record<OverlayVariant, OverlayToken> = Object.freeze({
  modal: Object.freeze({
    background: 'var(--color-card)',
    foreground: 'var(--color-card-foreground, var(--color-foreground))',
    border: 'color-mix(in srgb, var(--color-border) 70%, transparent)',
    shadow: 'var(--shadow-2xl)',
    backdrop: 'color-mix(in srgb, var(--color-background) 40%, black 60%)',
  }),
  tooltip: Object.freeze({
    background: 'color-mix(in srgb, var(--color-foreground) 94%, var(--color-background) 6%)',
    foreground: 'var(--color-background)',
    border: 'color-mix(in srgb, var(--color-foreground) 80%, transparent)',
    shadow: 'var(--shadow-md)',
  }),
  popover: Object.freeze({
    background: 'var(--color-card)',
    foreground: 'var(--color-card-foreground, var(--color-foreground))',
    border: 'var(--color-border)',
    shadow: 'var(--shadow-lg)',
  }),
});

// 2025-11-03T05:02:00-05:00 - Extend overlays for banners/sheets as interaction models expand.
