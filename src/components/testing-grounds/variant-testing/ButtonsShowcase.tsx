'use client';

// 2025-11-03T04:44:00-05:00 - Button variant scenarios leveraging buttonTokens for consistent styling.

import { ArrowRight, Loader2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonTokens, type ButtonVariant, getShadowTokens, getGlowTokens } from '@/theme';
import { useThemeRegistry } from '@/components/theme/ThemeRootProvider';

interface ButtonScenario {
  id: string;
  sequence: number;
  label: string;
  variant: ButtonVariant;
  description: string;
  icon?: 'plus' | 'arrow' | 'spinner';
  longLabel?: boolean;
  disabled?: boolean;
}

const SCENARIOS: ButtonScenario[] = [
  {
    id: 'button-001-primary-launch',
    sequence: 1,
    label: 'Launch workspace',
    variant: 'primary',
    description: 'Standard CTA for high-emphasis actions.',
    icon: 'arrow',
  },
  {
    id: 'button-002-secondary-followup',
    sequence: 2,
    label: 'Secondary action',
    variant: 'secondary',
    description: 'Contrasting follow-up actions with balanced contrast.',
  },
  {
    id: 'button-003-icon-create',
    sequence: 3,
    label: 'Create item',
    variant: 'icon',
    description: 'Icon-only affordance with accessible labelling.',
    icon: 'plus',
  },
  {
    id: 'button-004-ghost-long-label',
    sequence: 4,
    label: 'View audit history for this region cluster',
    variant: 'ghost',
    description: 'Ghost button showcasing very long labels without layout breakage.',
    longLabel: true,
  },
  {
    id: 'button-005-primary-loading',
    sequence: 5,
    label: 'Syncing',
    variant: 'primary',
    description: 'Loading state with spinner and disabled interaction.',
    icon: 'spinner',
    disabled: true,
  },
];

const iconMap = {
  plus: Plus,
  arrow: ArrowRight,
  spinner: Loader2,
} as const;

/**
 * Button showcase ensuring token usage keeps CTA alignment and accessibility consistent.
 */
export function ButtonsShowcase() {
  const { activeStyleId } = useThemeRegistry();
  const shadowTokens = getShadowTokens(activeStyleId);
  const glowTokens = getGlowTokens(activeStyleId);

  return (
    <section className="flex flex-col gap-md" aria-labelledby="button-showcase-heading">
      <header className="flex flex-col gap-xs">
        <h3 id="button-showcase-heading" className="text-lg font-semibold text-foreground">
          Buttons
        </h3>
        <p className="text-sm text-muted-foreground">
          Primary, secondary, icon-only, and ghost variants with long labels, loading states, and accessibility tokens.
        </p>
      </header>
      <ul className="grid gap-sm md:grid-cols-2" role="list">
        {SCENARIOS.map((scenario) => {
          const token = buttonTokens[scenario.variant];
          const Icon = scenario.icon ? iconMap[scenario.icon] : null;
          return (
            <li
              key={scenario.id}
              className="flex flex-col gap-xs rounded-2xl border border-border/60 bg-card/80 p-md backdrop-blur"
              data-component-id={scenario.id}
              style={{ boxShadow: shadowTokens.sm }}
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold uppercase tracking-wide">
                  {scenario.sequence.toString().padStart(2, '0')} · {scenario.id}
                </span>
                <span>{scenario.variant}</span>
              </div>
              <p className="text-sm text-muted-foreground">{scenario.description}</p>
              <button
                type="button"
                disabled={scenario.disabled}
                className={cn(
                  'group inline-flex items-center justify-center gap-sm rounded-full px-lg py-sm text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  scenario.disabled ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-0.5',
                  scenario.variant === 'icon' ? 'h-12 w-12 px-none py-none' : 'min-h-[3rem]',
                )}
                style={{
                  background: token.background,
                  color: token.foreground,
                  borderColor: token.border,
                  boxShadow:
                    scenario.variant === 'icon'
                      ? `${shadowTokens.md}, ${glowTokens.light}`
                      : token.shadow,
                }}
                aria-label={scenario.variant === 'icon' ? scenario.label : undefined}
              >
                {Icon ? (
                  <Icon
                    className={cn('h-4 w-4', scenario.icon === 'spinner' && 'animate-spin')}
                    aria-hidden
                  />
                ) : null}
                {scenario.variant !== 'icon' ? (
                  <span className={cn('truncate', scenario.longLabel && 'max-w-[18rem] sm:max-w-full')}>
                    {scenario.label}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
