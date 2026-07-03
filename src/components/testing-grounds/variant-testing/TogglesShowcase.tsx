'use client';

// 2025-11-03T06:58:00-05:00 - Toggle control showcase covering checkbox, radio, and switch tokens.

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { toggleTokens } from '@/theme';

interface CheckboxScenario {
  type: 'checkbox';
  id: string;
  sequence: number;
  label: string;
  description: string;
  initial: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
}

interface RadioScenario {
  type: 'radio';
  id: string;
  sequence: number;
  label: string;
  description: string;
  options: readonly string[];
  initial: string;
  disabled?: boolean;
}

interface SwitchScenario {
  type: 'switch';
  id: string;
  sequence: number;
  label: string;
  description: string;
  initial: boolean;
  disabled?: boolean;
}

type ToggleScenario = CheckboxScenario | RadioScenario | SwitchScenario;

const SCENARIOS: readonly ToggleScenario[] = [
  {
    type: 'checkbox',
    id: 'toggle-001-checkbox-default',
    sequence: 1,
    label: 'Anomaly detection',
    description: 'Default checkbox toggling between checked and unchecked states.',
    initial: 'checked',
  },
  {
    type: 'checkbox',
    id: 'toggle-002-checkbox-indeterminate',
    sequence: 2,
    label: 'Bulk selection',
    description: 'Indeterminate state demonstrates partial selections.',
    initial: 'indeterminate',
  },
  {
    type: 'checkbox',
    id: 'toggle-003-checkbox-disabled',
    sequence: 3,
    label: 'Compliance lock',
    description: 'Disabled checkbox communicates read-only status.',
    initial: 'checked',
    disabled: true,
  },
  {
    type: 'radio',
    id: 'toggle-004-radio-cadence',
    sequence: 4,
    label: 'Billing cadence',
    description: 'Radio group ensures exactly one billing cadence is active.',
    options: ['Monthly', 'Quarterly', 'Annually'],
    initial: 'Monthly',
  },
  {
    type: 'radio',
    id: 'toggle-005-radio-disabled',
    sequence: 5,
    label: 'Payment method',
    description: 'Disabled radio illustrates unavailable configuration paths.',
    options: ['Credit Card', 'Invoice'],
    initial: 'Invoice',
    disabled: true,
  },
  {
    type: 'switch',
    id: 'toggle-006-switch-theme',
    sequence: 6,
    label: 'Auto dark mode',
    description: 'Switch control animates thumb and track tokens.',
    initial: true,
  },
  {
    type: 'switch',
    id: 'toggle-007-switch-disabled',
    sequence: 7,
    label: 'Production deploys',
    description: 'Disabled switch captures gated release flows.',
    initial: false,
    disabled: true,
  },
] as const;

function renderCheckboxGlyph(state: 'checked' | 'unchecked' | 'indeterminate') {
  if (state === 'checked') {
    return '✓';
  }
  if (state === 'indeterminate') {
    return '–';
  }
  return '';
}

/**
 * Presents toggle controls using token-driven styling and enumerated IDs for regression tracking.
 */
export function TogglesShowcase() {
  const [checkboxStates, setCheckboxStates] = useState<Record<string, 'checked' | 'unchecked' | 'indeterminate'>>(
    () =>
      Object.fromEntries(
        SCENARIOS.filter((scenario): scenario is CheckboxScenario => scenario.type === 'checkbox').map(
          (scenario) => [scenario.id, scenario.initial],
        ),
      ),
  );
  const [radioStates, setRadioStates] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      SCENARIOS.filter((scenario): scenario is RadioScenario => scenario.type === 'radio').map((scenario) => [scenario.id, scenario.initial]),
    ),
  );
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      SCENARIOS.filter((scenario): scenario is SwitchScenario => scenario.type === 'switch').map((scenario) => [scenario.id, scenario.initial]),
    ),
  );

  return (
    <section className="flex flex-col gap-md" aria-labelledby="toggles-showcase-heading">
      <header className="flex flex-col gap-xs">
        <h3 id="toggles-showcase-heading" className="text-lg font-semibold text-foreground">
          Toggles & selectors
        </h3>
        <p className="text-sm text-muted-foreground">
          Checkbox, radio, and switch controls styled via <code className="font-mono">toggleTokens</code> with numbered scenarios.
        </p>
      </header>
      <div className="grid gap-md md:grid-cols-2">
        {SCENARIOS.map((scenario) => {
          if (scenario.type === 'checkbox') {
            const state = checkboxStates[scenario.id];
            const token = toggleTokens.checkbox[
              scenario.disabled ? 'disabled' : state
            ];
            const handleClick = () => {
              if (scenario.disabled) {
                return;
              }
              setCheckboxStates((previous) => {
                const nextState: 'checked' | 'unchecked' | 'indeterminate' =
                  previous[scenario.id] === 'checked' ? 'unchecked' : 'checked';
                return { ...previous, [scenario.id]: nextState };
              });
            };

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
                  <span>Checkbox</span>
                </div>
                <p className="text-sm text-muted-foreground">{scenario.description}</p>
                <button
                  type="button"
                  onClick={handleClick}
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded border text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    scenario.disabled ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-0.5',
                  )}
                  style={{
                    background: token.background,
                    color: token.foreground,
                    borderColor: token.border,
                    boxShadow: token.focusShadow,
                  }}
                  aria-pressed={state === 'checked'}
                  aria-label={scenario.label}
                  disabled={scenario.disabled}
                >
                  {renderCheckboxGlyph(state)}
                </button>
                <span className="text-xs text-muted-foreground">State: {state}</span>
              </article>
            );
          }

          if (scenario.type === 'radio') {
            const selected = radioStates[scenario.id];
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
                  <span>Radio</span>
                </div>
                <p className="text-sm text-muted-foreground">{scenario.description}</p>
                <div className="flex flex-col gap-xs">
                  {scenario.options.map((option) => {
                    const checked = selected === option;
                    const token = toggleTokens.radio[
                      scenario.disabled ? 'disabled' : checked ? 'checked' : 'unchecked'
                    ];
                    const handleSelect = () => {
                      if (scenario.disabled) {
                        return;
                      }
                      setRadioStates((previous) => ({ ...previous, [scenario.id]: option }));
                    };

                    return (
                      <button
                        key={`${scenario.id}-${option}`}
                        type="button"
                        onClick={handleSelect}
                        className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full border text-xs transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                          scenario.disabled ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-0.5',
                        )}
                        style={{
                          background: token.background,
                          color: token.foreground,
                          borderColor: token.border,
                          boxShadow: token.focusShadow,
                        }}
                        role="radio"
                        aria-checked={checked}
                        aria-label={`${scenario.label} ${option}`}
                        disabled={scenario.disabled}
                      >
                        {checked ? '•' : ''}
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs text-muted-foreground">Selected: {selected}</span>
              </article>
            );
          }

          const state = switchStates[scenario.id];
          const token = toggleTokens.switch[scenario.disabled ? 'disabled' : state ? 'on' : 'off'];
          const handleSwitch = () => {
            if (scenario.disabled) {
              return;
            }
            setSwitchStates((previous) => ({ ...previous, [scenario.id]: !previous[scenario.id] }));
          };

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
                <span>Switch</span>
              </div>
              <p className="text-sm text-muted-foreground">{scenario.description}</p>
              <button
                type="button"
                role="switch"
                aria-checked={state}
                onClick={handleSwitch}
                className={cn(
                  'relative flex h-9 w-16 items-center rounded-full transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  scenario.disabled ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-0.5',
                )}
                style={{
                  background: token.track,
                  borderColor: token.border,
                  boxShadow: token.focusShadow,
                }}
                disabled={scenario.disabled}
              >
                <span
                  className="absolute h-7 w-7 rounded-full transition-all duration-300"
                  style={{
                    background: token.background,
                    color: token.foreground,
                    boxShadow: token.focusShadow,
                    transform: `translateX(${state ? '1.7rem' : '0.2rem'})`,
                  }}
                >
                  <span className="sr-only">{scenario.label}</span>
                </span>
              </button>
              <span className="text-xs text-muted-foreground">State: {state ? 'Enabled' : 'Disabled'}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
