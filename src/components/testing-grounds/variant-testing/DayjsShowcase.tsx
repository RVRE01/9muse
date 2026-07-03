'use client';

// 2025-11-03T07:05:00-05:00 - Day.js scenario gallery demonstrating formatting utilities.

import { useMemo } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import calendar from 'dayjs/plugin/calendar';
import isoWeek from 'dayjs/plugin/isoWeek';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';

import { cn } from '@/lib/utils';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(isoWeek);
dayjs.extend(quarterOfYear);

interface DayjsScenario {
  id: string;
  sequence: number;
  label: string;
  description: string;
  reference: dayjs.Dayjs;
  patterns: readonly string[];
}

const SCENARIOS: readonly DayjsScenario[] = [
  {
    id: 'dayjs-001-release-window',
    sequence: 1,
    label: 'Upcoming release window',
    description: 'Formats a scheduled deployment using long-form date and calendar variants.',
    reference: dayjs().add(9, 'day').hour(16).minute(45),
    patterns: ['MMMM D, YYYY h:mm A', 'dddd, MMMM Do', 'YYYY-[W]WW'],
  },
  {
    id: 'dayjs-002-relative-incident',
    sequence: 2,
    label: 'Recent incident timeline',
    description: 'Showcases relative time, ISO strings, and precise timestamps for audit trails.',
    reference: dayjs().subtract(37, 'minute'),
    patterns: ['relative', 'YYYY-MM-DDTHH:mm:ss[Z]', 'HH:mm:ss.SSS'],
  },
  {
    id: 'dayjs-003-quarterly-rollup',
    sequence: 3,
    label: 'Quarterly rollup snapshot',
    description: 'Combines fiscal quarter notation with locale-aware formatting.',
    reference: dayjs().startOf('quarter'),
    patterns: ['Qo [quarter] YYYY', 'MMM YYYY', 'dddd, MMMM Do'],
  },
] as const;

function renderPatternValue(reference: dayjs.Dayjs, pattern: string): string {
  if (pattern === 'relative') {
    return reference.fromNow();
  }
  return reference.format(pattern);
}

/**
 * Displays sample Day.js formatting scenarios with numbered IDs for regression visibility.
 */
export function DayjsShowcase() {
  const today = useMemo(() => dayjs(), []);

  return (
    <section className="flex flex-col gap-md" aria-labelledby="dayjs-showcase-heading">
      <header className="flex flex-col gap-xs">
        <h3 id="dayjs-showcase-heading" className="text-lg font-semibold text-foreground">
          Day.js utilities
        </h3>
        <p className="text-sm text-muted-foreground">
          Humanized, ISO, and quarter-based formatting powered by <code className="font-mono">dayjs</code>. Current reference: {today.format('YYYY-MM-DD HH:mm:ss')}
        </p>
      </header>
      <div className="grid gap-md md:grid-cols-2 xl:grid-cols-3">
        {SCENARIOS.map((scenario) => (
          <article
            key={scenario.id}
            className="flex flex-col gap-sm rounded-2xl border border-border/60 bg-card/85 p-md shadow-sm backdrop-blur"
            data-component-id={scenario.id}
          >
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold uppercase tracking-wide">
                {scenario.sequence.toString().padStart(2, '0')} · {scenario.id}
              </span>
              <span>{scenario.reference.format('MMM D, YYYY')}</span>
            </div>
            <h4 className="text-base font-semibold text-foreground">{scenario.label}</h4>
            <p className="text-sm text-muted-foreground">{scenario.description}</p>
            <dl className="flex flex-col gap-xs">
              {scenario.patterns.map((pattern) => (
                <div
                  key={`${scenario.id}-${pattern}`}
                  className="flex flex-col gap-0.5 rounded-xl border border-border/60 bg-background/70 px-sm py-xs"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {pattern === 'relative' ? 'Relative time' : pattern}
                  </dt>
                  <dd className={cn('text-sm font-mono text-foreground', pattern === 'relative' && 'italic')}>
                    {renderPatternValue(scenario.reference, pattern)}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
