'use client';

// 2025-11-03T07:12:00-05:00 - Overlay surfaces (modal, tooltip, popover) rendered from overlayTokens.

import { overlayTokens } from '@/theme';

interface OverlayScenario {
  id: string;
  sequence: number;
  variant: keyof typeof overlayTokens;
  title: string;
  description: string;
  details: string;
}

const SCENARIOS: readonly OverlayScenario[] = [
  {
    id: 'overlay-001-modal-default',
    sequence: 1,
    variant: 'modal',
    title: 'Session expiration modal',
    description: 'Modal surfaces use elevated shadows and tinted backdrops to capture focus.',
    details: 'Backdrop blur + 2xl shadow reinforce depth while border blends with theme.',
  },
  {
    id: 'overlay-002-tooltip-primary',
    sequence: 2,
    variant: 'tooltip',
    title: 'Inline tooltip',
    description: 'Tooltip variant leverages inverse colors for high-contrast hints.',
    details: 'Foreground flips to background tone and shadow stays subtle for hover contexts.',
  },
  {
    id: 'overlay-003-popover-context',
    sequence: 3,
    variant: 'popover',
    title: 'Command palette popover',
    description: 'Popover tokens align with card surfaces but keep decisive borders.',
    details: 'Ideal for menus, pickers, and inspectors that stack above base layout.',
  },
] as const;

/**
 * Overlay surfaces referencing overlayTokens for consistent background, border, and depth values.
 */
export function OverlaysShowcase() {
  return (
    <section className="flex flex-col gap-md" aria-labelledby="overlays-showcase-heading">
      <header className="flex flex-col gap-xs">
        <h3 id="overlays-showcase-heading" className="text-lg font-semibold text-foreground">
          Overlays & surfaces
        </h3>
        <p className="text-sm text-muted-foreground">
          Modal, tooltip, and popover previews demonstrate <code className="font-mono">overlayTokens</code> in motion.
        </p>
      </header>
      <div className="grid gap-md md:grid-cols-2 xl:grid-cols-3">
        {SCENARIOS.map((scenario) => {
          const token = overlayTokens[scenario.variant];
          return (
            <article
              key={scenario.id}
              className="flex flex-col gap-sm rounded-2xl border border-border/60 bg-card/85 p-md shadow-sm backdrop-blur"
              data-component-id={scenario.id}
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold uppercase tracking-wide">
                  {scenario.sequence.toString().padStart(2, '0')} · {scenario.id}
                </span>
                <span>{scenario.variant}</span>
              </div>
              <h4 className="text-base font-semibold text-foreground">{scenario.title}</h4>
              <p className="text-sm text-muted-foreground">{scenario.description}</p>
              <div
                className="flex flex-col gap-sm rounded-2xl border px-md py-lg shadow-lg"
                style={{
                  background: token.background,
                  color: token.foreground,
                  borderColor: token.border,
                  boxShadow: token.shadow,
                }}
              >
                <p className="text-sm text-current/90">{scenario.details}</p>
                <div className="rounded-xl border border-dashed border-current/30 bg-transparent px-sm py-xs text-xs text-current/70">
                  Overlay surface inherits tokens: background {token.background}, border {token.border}, shadow {token.shadow}.
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
