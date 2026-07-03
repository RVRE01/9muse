'use client';

// 2025-11-03T04:58:00-05:00 - Dropdown/select variants derived from dropdownTokens.

import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dropdownTokens, type DropdownVariant } from '@/theme';

interface DropdownScenario {
  id: string;
  sequence: number;
  label: string;
  description: string;
  variant: DropdownVariant;
  options: readonly string[];
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
}

const SCENARIOS: readonly DropdownScenario[] = [
  {
    id: 'dropdown-001-solid-environment',
    sequence: 1,
    label: 'Primary environment',
    description: 'Solid control emphasizing critical selections.',
    variant: 'solid',
    options: ['Production', 'Staging', 'QA', 'Development'],
  },
  {
    id: 'dropdown-002-surface-region',
    sequence: 2,
    label: 'Region',
    description: 'Surface variant with subtle elevation for general usage.',
    variant: 'surface',
    options: ['us-east-1', 'us-west-2', 'eu-central-1', 'ap-southeast-2'],
    placeholder: 'Select region',
  },
  {
    id: 'dropdown-003-ghost-owner',
    sequence: 3,
    label: 'Filter by owner',
    description: 'Ghost treatment for inline filters with optional disabled state.',
    variant: 'ghost',
    options: ['Alex Johnson', 'Timothy Rivera', 'Radhika Kapoor', 'Fatima al-Hassan'],
    disabled: true,
  },
  {
    id: 'dropdown-004-searchable-teammate',
    sequence: 4,
    label: 'Assign teammate',
    description: 'Searchable dropdown filtering options as you type.',
    variant: 'surface',
    options: [
      'Aminah Khan',
      'Bianca Ortega',
      'Cristian Müller',
      'Devon Carter',
      'Emiko Tanaka',
      'Fedor Volkov',
      'Giulia Bianchi',
      'Harper Li',
    ],
    placeholder: 'Search teammate',
    searchable: true,
  },
] as const;

const menuClassName =
  'flex flex-col gap-xs rounded-xl border px-sm py-sm text-sm shadow-lg backdrop-blur-md';

/**
 * Dropdown showcase visualizing token-driven controls and option menus.
 */
export function DropdownsShowcase() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      SCENARIOS.map((scenario) => [scenario.id, scenario.placeholder ?? scenario.options[0] ?? '']),
    ),
  );
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});

  const filteredOptions = useMemo(() => {
    return SCENARIOS.reduce<Record<string, readonly string[]>>((accumulator, scenario) => {
      const query = searchQueries[scenario.id]?.toLowerCase() ?? '';
      if (!scenario.searchable || query.length === 0) {
        accumulator[scenario.id] = scenario.options;
        return accumulator;
      }
      accumulator[scenario.id] = scenario.options.filter((option) =>
        option.toLowerCase().includes(query),
      );
      return accumulator;
    }, {});
  }, [searchQueries]);

  const handleControlClick = (scenario: DropdownScenario) => {
    if (scenario.disabled) {
      return;
    }
    setOpenMenu((previous) => (previous === scenario.id ? null : scenario.id));
  };

  const handleOptionSelect = (scenario: DropdownScenario, option: string) => {
    setSelectedOption((previous) => ({ ...previous, [scenario.id]: option }));
    setOpenMenu(null);
    if (scenario.searchable) {
      setSearchQueries((previous) => ({ ...previous, [scenario.id]: '' }));
    }
  };

  const handleSearchChange = (scenarioId: string, value: string) => {
    setSearchQueries((previous) => ({ ...previous, [scenarioId]: value }));
  };

  return (
    <section className="flex flex-col gap-md" aria-labelledby="dropdown-showcase-heading">
      <header className="flex flex-col gap-xs">
        <h3 id="dropdown-showcase-heading" className="text-lg font-semibold text-foreground">
          Dropdowns
        </h3>
        <p className="text-sm text-muted-foreground">
          Solid, surface, ghost, and searchable controls built from <code className="font-mono">dropdownTokens</code>.
        </p>
      </header>
      <div className="grid gap-md md:grid-cols-2">
        {SCENARIOS.map((scenario) => {
          const token = dropdownTokens[scenario.variant];
          const isDisabled = Boolean(scenario.disabled);
          const isOpen = openMenu === scenario.id;
          const selected = selectedOption[scenario.id];
          const options = filteredOptions[scenario.id] ?? scenario.options;
          const searchValue = searchQueries[scenario.id] ?? '';

          return (
            <article
              key={scenario.id}
              className="flex flex-col gap-sm rounded-2xl border border-border/70 bg-card/85 p-md shadow-sm backdrop-blur"
              data-component-id={scenario.id}
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold uppercase tracking-wide">
                  {scenario.sequence.toString().padStart(2, '0')} · {scenario.id}
                </span>
                <span>{scenario.variant}</span>
              </div>
              <p className="text-sm text-muted-foreground">{scenario.description}</p>
              <label htmlFor={`${scenario.id}-control`} className="text-sm font-medium text-foreground">
                {scenario.label}
              </label>
              <button
                id={`${scenario.id}-control`}
                type="button"
                disabled={isDisabled}
                onClick={() => handleControlClick(scenario)}
                className={cn(
                  'flex items-center justify-between gap-sm rounded-xl border px-md py-sm text-sm font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  isDisabled ? 'cursor-not-allowed opacity-70' : 'hover:-translate-y-0.5',
                )}
                style={{
                  background: token.controlBackground,
                  color: token.controlForeground,
                  borderColor: token.controlBorder,
                  boxShadow: isDisabled ? 'none' : token.menuShadow,
                }}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={`${scenario.id}-menu`}
              >
                <span className="truncate">{selected}</span>
                <ChevronDown className="h-4 w-4" style={{ color: token.indicator }} aria-hidden />
              </button>
              {isOpen ? (
                <div
                  id={`${scenario.id}-menu`}
                  role="listbox"
                  className={menuClassName}
                  style={{
                    background: token.optionBackground,
                    borderColor: token.controlBorder,
                    boxShadow: token.menuShadow,
                  }}
                >
                  {scenario.searchable ? (
                    <div className="flex items-center gap-xs rounded-lg border border-border/60 bg-background/70 px-sm py-xs">
                      <Search className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                      <input
                        autoFocus
                        type="search"
                        value={searchValue}
                        onChange={(event) => handleSearchChange(scenario.id, event.target.value)}
                        placeholder="Search options"
                        className="w-full bg-transparent text-sm text-foreground outline-none"
                      />
                    </div>
                  ) : null}
                  {options.length === 0 ? (
                    <p className="rounded-lg px-sm py-xs text-xs text-muted-foreground">
                      No matches found.
                    </p>
                  ) : null}
                  {options.map((option) => {
                    const isSelected = option === selected;
                    return (
                      <button
                        key={`${scenario.id}-${option}`}
                        type="button"
                        onClick={() => handleOptionSelect(scenario, option)}
                        className={cn(
                          'flex items-center justify-between gap-sm rounded-lg px-sm py-xs text-left text-sm transition-colors duration-150',
                          isSelected ? 'bg-primary/15 text-primary' : 'text-foreground',
                        )}
                        style={{
                          color: token.optionForeground,
                        }}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <span className="truncate">{option}</span>
                        <span className="text-xs text-muted-foreground">
                          {isSelected ? 'Selected' : `${option.length} chars`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
