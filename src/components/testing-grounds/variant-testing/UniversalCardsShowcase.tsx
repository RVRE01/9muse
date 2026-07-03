'use client';

// 2025-11-03T04:38:00-05:00 - Universal card scenarios with edge-case alignment previews.

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cardLayoutTokens, type CardLayoutKey } from '@/theme';

/**
 * Scenario inputs used to stress-test each card layout.
 */
interface CardScenario {
  id?: string;
  sequence?: number;
  variantLabel: string;
  title: string;
  description: string;
  mediaLabel?: string;
  metric?: string;
  metricDelta?: string;
  ctaLabel?: string;
  footnote?: string;
  badges?: string[];
}

/**
 * Static configuration describing available card layouts in the showcase.
 */
interface CardLayoutConfig {
  key: CardLayoutKey;
  title: string;
  description: string;
  scenarios: ReadonlyArray<CardScenario>;
}

const cardLayoutConfigs: ReadonlyArray<CardLayoutConfig> = [
  {
    key: 'cardBasic',
    title: 'Card Basic',
    description: 'Simple content-first layout with optional hero media and CTA.',
    scenarios: [
      {
        variantLabel: 'Baseline copy',
        title: 'Standard product card',
        description:
          'Introduce a concise summary and optional CTA that wraps gracefully across breakpoints.',
        mediaLabel: 'Header media',
        ctaLabel: 'Learn more',
        badges: ['Highlighted'],
      },
      {
        variantLabel: 'Long headline stress',
        title:
          'Regional Infrastructure Insights with Automated Drift Detection and Compliance Alerts for 147 Regions',
        description:
          'When titles balloon in length, the vertical rhythm holds and the CTA remains pinned to the footer.',
        mediaLabel: 'Hero diagram',
        ctaLabel: 'Audit environment',
        footnote: 'Footer alignment verified against long-form header content.',
      },
      {
        variantLabel: 'Narrative testimonial',
        title: '“We reduced onboarding time by 72%” — Global Operations testimonial',
        description:
          'Layer in quote-driven storytelling with multi-sentence narrative copy to ensure the layout tolerates storytelling density without collapsing.',
        mediaLabel: 'Testimonial portrait',
        ctaLabel: 'Read case study',
        footnote: 'Ensures card accommodates human stories and extended quotes.',
      },
    ],
  },
  {
    key: 'cardEnhanced',
    title: 'Card Enhanced',
    description: 'Hero image, condensed body copy, and CTA with accent emphasis.',
    scenarios: [
      {
        variantLabel: 'Launch moment',
        title: 'Introducing Borealis 3.0',
        description:
          'Command attention with a high-impact hero visual and a compact supporting paragraph.',
        mediaLabel: 'Feature image',
        ctaLabel: 'View release',
        badges: ['New'],
      },
      {
        variantLabel: 'Dense descriptor',
        title: 'Adaptive anomaly detection for zero-trust environments',
        description:
          'Long-form body copy spanning multiple sentences verifies that top and bottom gutters remain balanced even when description content flows beyond three lines.',
        mediaLabel: 'Security overlay',
        ctaLabel: 'Schedule briefing',
        footnote: 'CTA pinned regardless of description length.',
      },
      {
        variantLabel: 'No CTA fallback',
        title: 'Operational policy compliance insights',
        description:
          'Sometimes cards act as read-only status surfaces. This scenario removes the primary CTA to ensure footer spacing remains proportional.',
        mediaLabel: 'Compliance heatmap',
        footnote: 'Footer gracefully handles absent CTA states.',
      },
    ],
  },
  {
    key: 'cardSpotlight',
    title: 'Card Spotlight',
    description: 'Centered storytelling card for testimonials or spotlight moments.',
    scenarios: [
      {
        variantLabel: 'Customer love',
        title: '“This platform let us ship twice as fast.”',
        description:
          'A succinct testimonial demonstrating balanced padding and centered content for short quotes.',
        mediaLabel: 'Spotlight art',
        ctaLabel: 'See story',
      },
      {
        variantLabel: 'Paragraph spotlight',
        title: 'Empowering public sector resiliency narratives',
        description:
          'Longer-form storytelling that stretches to five lines validates that center alignment, badge spacing, and CTA placement persist without overflow.',
        mediaLabel: 'City skyline',
        ctaLabel: 'Read interview',
      },
      {
        variantLabel: 'Badge forward',
        title: 'Global accessibility pledge — 2030',
        description:
          'Highlight commitments with supportive taglines. Badges align above the hero copy and remain evenly spaced.',
        mediaLabel: 'Accessibility glyph',
        ctaLabel: 'Explore pledge',
        badges: ['Commitment', 'Global'],
      },
    ],
  },
  {
    key: 'cardSplit',
    title: 'Card Split',
    description: 'Two-column layout great for product comparisons or tier breakdowns.',
    scenarios: [
      {
        variantLabel: 'Plan comparison',
        title: 'Growth vs Scale tiers',
        description:
          'Balancing paired content showcases how lists and columnar text stay legible across responsive breakpoints.',
        ctaLabel: 'Compare plans',
        badges: ['Upgrade ready'],
      },
      {
        variantLabel: 'Dense bullet content',
        title: 'Core capabilities audit',
        description:
          'Enumerated benefits and checklist-style copy prove the split layout can withstand multiline bullet replacements without breaking footer alignment.',
        ctaLabel: 'Open checklist',
        footnote: 'Checklist sizing uses consistent leading.',
      },
      {
        variantLabel: 'Narrative & metrics',
        title: 'Two-week stabilization window achieved',
        description:
          'Pair a narrative summary with nested metrics to stress the vertical balancing between two columns.',
        metric: '14 days',
        metricDelta: 'Stabilization target met ahead of schedule.',
        ctaLabel: 'Review timeline',
      },
    ],
  },
  {
    key: 'cardMetric',
    title: 'Card Metric',
    description: 'Primary KPI with supporting delta and contextual details.',
    scenarios: [
      {
        variantLabel: 'Balanced metric',
        title: 'Net promoter score',
        description:
          'Center the primary metric with a short supporting summary for quick scanning.',
        metric: '78%',
        metricDelta: '+6.2% vs last week',
        ctaLabel: 'View report',
      },
      {
        variantLabel: 'Extremely long metric label',
        title: 'Rolling 12-Month Infrastructure Availability Across Multi-Zone Deployments',
        description:
          'Ensures line breaks are respected when metric labels run the full width of the card.',
        metric: '99.982%',
        metricDelta: '↑ 0.34% QoQ reliability uplift',
        ctaLabel: 'See uptime logs',
        footnote: 'Delta text keeps consistent alignment regardless of length.',
      },
      {
        variantLabel: 'Metric only with footnote',
        title: 'Maintained error budget',
        description:
          'Where storytelling is minimal, the metric and delta still align footers via the min-height token.',
        metric: '100%',
        metricDelta: 'Error budget preserved 4 weeks straight',
        footnote: 'CTA optionally omitted without collapsing layout.',
      },
    ],
  },
  {
    key: 'cardCTABanner',
    title: 'Card CTA Banner',
    description: 'Full-width promotional banner with centered call-to-action.',
    scenarios: [
      {
        variantLabel: 'Concise CTA',
        title: 'Scale with Borealis Cloud',
        description:
          'Short headline and single-sentence description demonstrate the baseline promotional use case.',
        ctaLabel: 'Start trial',
      },
      {
        variantLabel: 'Long descriptive CTA',
        title: 'Unified procurement for globally distributed teams',
        description:
          'Testing banner copy that spans several lines ensures button positioning remains centered within the footer alignment constraints.',
        ctaLabel: 'Request enterprise quote',
      },
      {
        variantLabel: 'Policy disclosure',
        title: 'Accessibility and sustainability commitments',
        description:
          'In cases where legal or policy text runs long, the banner still retains vertical balance and does not misalign the call-to-action.',
        ctaLabel: 'Review commitments',
        footnote: 'Footer spacing accommodates required disclosures.',
      },
    ],
  },
];

/**
 * Predefined edge case sets showcasing how mixed content behaves in a grid.
 */
const edgeCaseSets: ReadonlyArray<{
  label: string;
  combinations: ReadonlyArray<{ layoutKey: CardLayoutKey; scenarioIndex: number }>;
}> = [
  {
    label: 'Mixed marketing & analytics',
    combinations: [
      { layoutKey: 'cardBasic', scenarioIndex: 1 },
      { layoutKey: 'cardMetric', scenarioIndex: 0 },
      { layoutKey: 'cardCTABanner', scenarioIndex: 1 },
      { layoutKey: 'cardEnhanced', scenarioIndex: 2 },
      { layoutKey: 'cardSplit', scenarioIndex: 0 },
      { layoutKey: 'cardSpotlight', scenarioIndex: 0 },
    ],
  },
  {
    label: 'High-density storytelling',
    combinations: [
      { layoutKey: 'cardBasic', scenarioIndex: 2 },
      { layoutKey: 'cardEnhanced', scenarioIndex: 1 },
      { layoutKey: 'cardSpotlight', scenarioIndex: 1 },
      { layoutKey: 'cardSplit', scenarioIndex: 1 },
      { layoutKey: 'cardMetric', scenarioIndex: 1 },
      { layoutKey: 'cardCTABanner', scenarioIndex: 2 },
    ],
  },
  {
    label: 'CTA-optional dashboard set',
    combinations: [
      { layoutKey: 'cardBasic', scenarioIndex: 0 },
      { layoutKey: 'cardEnhanced', scenarioIndex: 2 },
      { layoutKey: 'cardSplit', scenarioIndex: 2 },
      { layoutKey: 'cardMetric', scenarioIndex: 2 },
      { layoutKey: 'cardCTABanner', scenarioIndex: 0 },
      { layoutKey: 'cardSpotlight', scenarioIndex: 2 },
    ],
  },
];

interface CardPreviewProps extends CardScenario {
  layoutKey: CardLayoutKey;
}

const CardPreview = ({
  layoutKey,
  variantLabel,
  title,
  description,
  mediaLabel,
  metric,
  metricDelta,
  ctaLabel,
  footnote,
  badges,
}: CardPreviewProps) => {
  const layout = cardLayoutTokens[layoutKey];
  const showMedia = Boolean(mediaLabel) && layout.mediaHeight !== '0rem';
  const isSplit = layoutKey === 'cardSplit';

  return (
    <article
      className="flex h-full flex-col border border-border bg-card/90 shadow-lg backdrop-blur"
      style={{
        padding: layout.padding,
        borderRadius: layout.radius,
        boxShadow: layout.shadow,
        gap: layout.gap,
        minHeight: layout.minHeight,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {variantLabel}
        </span>
      </div>
      <div className={cn('flex flex-1 flex-col gap-sm', isSplit && 'md:flex-row md:items-stretch md:gap-md')}>
        {showMedia ? (
          <div
            className="flex items-center justify-center rounded-2xl border border-dashed border-border/60 text-xs font-medium uppercase tracking-wide text-muted-foreground"
            style={{ minHeight: layout.mediaHeight }}
            aria-label={mediaLabel}
          >
            {mediaLabel}
          </div>
        ) : null}
        <div
          className={cn('flex flex-1 flex-col gap-sm', isSplit && 'justify-between')}
          style={{ gap: layout.gap }}
        >
          {badges?.length ? (
            <div className="flex flex-wrap items-center gap-xs">
              {badges.map((badge) => (
                <span
                  key={`${variantLabel}-${badge}`}
                  className="rounded-full bg-accent/20 px-sm py-xs text-[0.7rem] font-semibold uppercase tracking-wide text-accent"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
          <header className="flex flex-col gap-xs">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </header>
          {metric ? (
            <div className="flex flex-col gap-xs">
              <span className="text-3xl font-semibold text-foreground">{metric}</span>
              {metricDelta ? (
                <span className="text-xs font-medium text-success">{metricDelta}</span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-sm">
        {footnote ? (
          <p className="text-xs text-muted-foreground/80">{footnote}</p>
        ) : null}
        {ctaLabel ? (
          <footer
            className={cn('flex items-center gap-sm', {
              'justify-start': layout.footerAlignment === 'start',
              'justify-center': layout.footerAlignment === 'center',
              'justify-end': layout.footerAlignment === 'end',
            })}
          >
            <button
              type="button"
              className="rounded-full bg-primary px-md py-sm text-sm font-semibold text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary/90"
            >
              {ctaLabel}
            </button>
          </footer>
        ) : null}
      </div>
    </article>
  );
};

/**
 * Carousel of universal card layouts with scenario cycling and grid-wide edge case validation.
 */
export function UniversalCardsShowcase() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<Record<CardLayoutKey, number>>(() =>
    Object.fromEntries(cardLayoutConfigs.map(({ key }) => [key, 0])) as Record<CardLayoutKey, number>,
  );
  const [activeEdgeCaseSet, setActiveEdgeCaseSet] = useState(0);

  const scenarioMap = useMemo(() => new Map(cardLayoutConfigs.map((config) => [config.key, config])), []);

  return (
    <article className="grid gap-lg rounded-3xl border border-border/60 bg-card/75 p-xl shadow-lg backdrop-blur">
      <header className="flex flex-col gap-sm border-b border-border/60 pb-md">
        <h2 className="text-xl font-semibold text-foreground">Universal card layouts</h2>
        <p className="text-sm text-muted-foreground">
          Each card pulls structural tokens from <code className="font-mono">cardLayoutTokens</code> to keep spacing, radius, and elevation consistent across variants.
        </p>
      </header>
      <div className="grid gap-lg md:grid-cols-2">
        {cardLayoutConfigs.map((config) => {
          const currentIndex = activeScenarioIndex[config.key];
          const scenario = config.scenarios[currentIndex];
          return (
            <section
              key={config.key}
              className="flex flex-col gap-sm"
              aria-label={`${config.title} scenario deck`}
            >
              <header className="flex items-center justify-between gap-sm">
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-foreground">{config.title}</h3>
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                </div>
                <div className="flex items-center gap-xs">
                  <button
                    type="button"
                    className="rounded-full border border-border bg-card/80 p-xs text-muted-foreground transition hover:text-foreground"
                    onClick={() =>
                      setActiveScenarioIndex((previous) => ({
                        ...previous,
                        [config.key]: (previous[config.key] - 1 + config.scenarios.length) % config.scenarios.length,
                      }))
                    }
                    aria-label={`Previous scenario for ${config.title}`}
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                  </button>
                  <span className="min-w-[3.75rem] text-center text-xs font-medium text-muted-foreground">
                    {scenario.variantLabel}
                  </span>
                  <button
                    type="button"
                    className="rounded-full border border-border bg-card/80 p-xs text-muted-foreground transition hover:text-foreground"
                    onClick={() =>
                      setActiveScenarioIndex((previous) => ({
                        ...previous,
                        [config.key]: (previous[config.key] + 1) % config.scenarios.length,
                      }))
                    }
                    aria-label={`Next scenario for ${config.title}`}
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </header>
              <CardPreview layoutKey={config.key} {...scenario} />
            </section>
          );
        })}
      </div>
      <section className="flex flex-col gap-md border-t border-border/60 pt-md">
        <header className="flex flex-wrap items-center justify-between gap-sm">
          <div className="flex flex-col gap-xs">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Edge-case grid preview
            </h3>
            <p className="text-xs text-muted-foreground">
              Combine layouts to validate alignment when real-world content diverges.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-xs">
            {edgeCaseSets.map((set, index) => (
              <button
                key={set.label}
                type="button"
                onClick={() => setActiveEdgeCaseSet(index)}
                className={cn(
                  'rounded-full border border-border bg-card/80 px-sm py-xs text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors duration-200',
                  activeEdgeCaseSet === index ? 'bg-primary text-primary-foreground shadow' : 'hover:text-foreground',
                )}
                aria-pressed={activeEdgeCaseSet === index}
              >
                {set.label}
              </button>
            ))}
          </div>
        </header>
        <div className="grid gap-md md:grid-cols-2 xl:grid-cols-3">
          {edgeCaseSets[activeEdgeCaseSet].combinations.map(({ layoutKey, scenarioIndex }) => {
            const config = scenarioMap.get(layoutKey);
            if (!config) {
              return null;
            }
            const scenario = config.scenarios[scenarioIndex];
            return (
              <CardPreview
                key={`${layoutKey}-${scenarioIndex}`}
                layoutKey={layoutKey}
                {...scenario}
              />
            );
          })}
        </div>
      </section>
    </article>
  );
}
