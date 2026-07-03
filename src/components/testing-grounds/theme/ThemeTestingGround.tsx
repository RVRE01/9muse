'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEventHandler,
  type PointerEventHandler,
} from 'react';
import { useTheme } from 'next-themes';
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  Keyboard,
  Layers,
  Layers2,
  ListFilter,
  Navigation,
  Navigation2,
  Palette,
  PanelsTopLeft,
  Radio,
  Sparkles,
  SquarePen,
  SquareMousePointer,
  ToggleLeft,
} from 'lucide-react';
import {
  DEFAULT_THEME_STYLE_ID,
  getThemeVariant,
  resolveThemeStyle,
  type ThemeColorMode,
  type ThemeVariantMetadataEntry,
} from '@/theme';
import { pillTokens } from '@/theme/tokens/pills';
import type {
  GlowTokens,
  ThemePalette,
  RadiiTokens,
  ShadowTokens,
  ThemeStyleId,
  ThemeVariantCategory,
  ThemeVariantId,
} from '@/theme/types';
import { cn } from '@/lib/utils';
import { useThemeRegistry } from '@/components/theme/ThemeRootProvider';
import { ButtonsShowcase } from '@/components/testing-grounds/variant-testing/ButtonsShowcase';
import { DropdownsShowcase } from '@/components/testing-grounds/variant-testing/DropdownsShowcase';
import { TogglesShowcase } from '@/components/testing-grounds/variant-testing/TogglesShowcase';
import { UniversalCardsShowcase } from '@/components/testing-grounds/variant-testing/UniversalCardsShowcase';
import { OverlaysShowcase } from '@/components/testing-grounds/variant-testing/OverlaysShowcase';
import { FloatingNavigationShowcase } from '@/components/testing-grounds/variant-testing/FloatingNavigationShowcase';
import { InputsShowcase } from '@/components/testing-grounds/variant-testing/InputsShowcase';
import { DayjsShowcase } from '@/components/testing-grounds/variant-testing/DayjsShowcase';
import { Section, SectionGrid, SectionSurface } from '@/components/ui';

const showcaseSections = [
  { id: 'buttons-showcase', label: 'Buttons', Component: ButtonsShowcase },
  { id: 'toggles-showcase', label: 'Toggles & Selectors', Component: TogglesShowcase },
  { id: 'dropdowns-showcase', label: 'Dropdowns', Component: DropdownsShowcase },
  { id: 'cards-showcase', label: 'Universal Cards', Component: UniversalCardsShowcase },
  { id: 'overlays-showcase', label: 'Overlays', Component: OverlaysShowcase },
  { id: 'floating-nav-showcase', label: 'Floating Navigation', Component: FloatingNavigationShowcase },
  { id: 'inputs-showcase', label: 'Inputs', Component: InputsShowcase },
  { id: 'date-time-showcase', label: 'Date & Time', Component: DayjsShowcase },
] as const;

const VARIANT_CATEGORY_LABELS: Record<ThemeVariantCategory, { title: string; tagline: string }> = Object.freeze({
  core: {
    title: 'Core Foundations',
    tagline: 'Balanced everyday palettes calibrated for primary surfaces.',
  },
  natural: {
    title: 'Natural Surrounds',
    tagline: 'Earth-driven hues supporting organic and wellness storytelling.',
  },
  enterprise: {
    title: 'Enterprise Command',
    tagline: 'Grounded neutrals built for reliability and executive clarity.',
  },
  playful: {
    title: 'Playful Spotlight',
    tagline: 'Expressive color pops tailored for marketing and community beats.',
  },
});

const VARIANT_CATEGORY_ORDER: readonly ThemeVariantCategory[] = Object.freeze([
  'core',
  'natural',
  'enterprise',
  'playful',
]);

const ThemeStyleSelector = () => {
  const { activeStyleId, setActiveStyleId, styleMetadata } = useThemeRegistry();

  if (styleMetadata.length <= 1) {
    return (
      <p className="text-xs text-muted-foreground">
        Only smooth style is available. Add additional style packages to expand this catalog.
      </p>
    );
  }

  return (
    <div className="grid gap-sm [grid-template-columns:repeat(auto-fit,minmax(9.5rem,1fr))]">
      {styleMetadata.map((style) => {
        const isActive = style.id === activeStyleId;
        const pillStyle = pillTokens[isActive ? 'active' : 'neutral'];

        return (
          <button
            key={style.id}
            type="button"
            onClick={() => setActiveStyleId(style.id)}
            aria-pressed={isActive}
            className={cn(
              'flex w-full items-center justify-start gap-sm rounded-full border px-md py-sm text-sm font-semibold uppercase tracking-wide transition-transform duration-200',
              'hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
            )}
            style={{
              background: pillStyle.background,
              color: pillStyle.foreground,
              borderColor: pillStyle.border,
              boxShadow: pillStyle.shadow,
            }}
          >
            <Radio className="h-3 w-3" aria-hidden />
            <span>{style.displayName}</span>
          </button>
        );
      })}
    </div>
  );
};

const SurfaceTokenPreview = ({
  radii,
  shadows,
  glows,
  isNeoglass,
  styleId,
}: {
  radii: RadiiTokens;
  shadows: ShadowTokens;
  glows: GlowTokens;
  isNeoglass: boolean;
  styleId: ThemeStyleId;
}) => {
  const surfaceDomains = useMemo(
    () =>
      (
        [
          {
            id: 'radii' as const,
            label: 'Border Radii',
            icon: Layers2,
            tokens: Object.entries(radii),
            renderSample: (value: string) => (
              <div
                className="h-16 w-full rounded-xl border border-border/60 bg-muted/40"
                style={{ borderRadius: value }}
              />
            ),
            tokenVarPrefix: '--radius-',
            fileHint: `src/theme/styles/${styleId}.ts`,
            tokenAccessor: 'radii',
            promptIntro: 'Please style this surface using the border radius token',
          },
          {
            id: 'shadows' as const,
            label: 'Shadow Elevation',
            icon: Palette,
            tokens: Object.entries(shadows),
            renderSample: (value: string) => (
              <div
                className="h-16 w-full rounded-xl border border-border/40 bg-card"
                style={{ boxShadow: value }}
              />
            ),
            tokenVarPrefix: '--shadow-',
            fileHint: `src/theme/styles/${styleId}.ts`,
            tokenAccessor: 'shadows',
            promptIntro: 'Please render this surface using the shadow elevation token',
          },
          {
            id: 'glows' as const,
            label: 'Interactive Glows',
            icon: Sparkles,
            tokens: Object.entries(glows),
            renderSample: (value: string) => (
              <div
                className="h-16 w-full rounded-xl border border-border/20 bg-card"
                style={{ boxShadow: value }}
              />
            ),
            tokenVarPrefix: '--glow-',
            fileHint: `src/theme/styles/${styleId}.ts`,
            tokenAccessor: 'glows',
            promptIntro: 'Please apply the interactive glow token',
          },
        ]
      ),
    [glows, radii, shadows, styleId],
  );

  const [activeDomainIndex, setActiveDomainIndex] = useState(0);

  const activeDomain = surfaceDomains[activeDomainIndex];

  /**
   * @[/bestpractices]
   * @[/documentcode]
   * Converts camelCase tokens into CSS variable suffixes.
   */
  const toCSSVarName = useCallback((token: string) => token.replace(/([A-Z])/g, '-$1').toLowerCase(), []);

  /**
   * @[/bestpractices]
   * @[/documentcode]
   * Cycles the visible domain forward or backward while wrapping around.
   */
  const cycleDomain = useCallback(
    (direction: 'prev' | 'next') => {
      setActiveDomainIndex((current) => {
        if (direction === 'prev') {
          return (current - 1 + surfaceDomains.length) % surfaceDomains.length;
        }

        return (current + 1) % surfaceDomains.length;
      });
    },
    [surfaceDomains.length],
  );

  /**
   * @[/bestpractices]
   * @[/documentcode]
   * Applies the active domain tokens to document-level CSS custom properties so the live preview reflects selection.
   */
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    activeDomain.tokens.forEach(([tokenKey, tokenValue]) => {
      document.documentElement.style.setProperty(
        `${activeDomain.tokenVarPrefix}${toCSSVarName(tokenKey)}`,
        tokenValue,
      );
    });
  }, [activeDomain, toCSSVarName]);

  /**
   * @[/bestpractices]
   * @[/documentcode]
   * Copies an AI-friendly prompt describing where the active token resides within the theme.
   */
  const handleCopyPrompt = useCallback(
    (tokenKey: string) => {
      const cssVariable = `${activeDomain.tokenVarPrefix}${toCSSVarName(tokenKey)}`;
      const prompt = `${activeDomain.promptIntro} "${tokenKey}" (${cssVariable}) defined in ${activeDomain.fileHint}. Reference resolveThemeStyle("${styleId}").tokens.${activeDomain.tokenAccessor}.${tokenKey} to stay aligned with /theme best practices.`;

      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(prompt).catch(() => undefined);
      }
    },
    [activeDomain, styleId, toCSSVarName],
  );

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center justify-between gap-sm">
        <div className="flex items-center gap-sm">
          <button
            type="button"
            onClick={() => cycleDomain('prev')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/70 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="Previous surface token domain"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <div className="flex items-center gap-sm">
            <activeDomain.icon className="h-4 w-4 text-muted-foreground" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {activeDomain.label}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => cycleDomain('next')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/70 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label="Next surface token domain"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div
        className={cn(
          'grid gap-sm [grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))]',
          isNeoglass && 'gap-md',
        )}
      >
        {activeDomain.tokens.map(([token, value]) => (
          <div
            key={token}
            className={cn(
              'flex flex-col gap-sm rounded-2xl border border-border/40 bg-card/70 p-sm shadow-sm transition-shadow duration-300',
              isNeoglass && 'border-border/15 bg-transparent shadow-none backdrop-blur-none',
            )}
          >
            <div className="flex items-start justify-between gap-sm">
              <div className="flex flex-col gap-xs">
                <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                  {token}
                </span>
                <span className="text-[0.65rem] font-mono text-foreground">{value}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyPrompt(token)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-card/70 text-muted-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                aria-label={`Copy AI prompt for ${token}`}
              >
                <Copy className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
            <div className="rounded-xl bg-card/60 p-xs" aria-hidden>
              {activeDomain.renderSample(value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type SectionSurfaceTone = "flat" | "raised";

const SURFACE_DEFAULT_OVERRIDES: Record<SectionSurfaceTone, string> = Object.freeze({
  flat: "border-border/60 bg-card/85",
  raised: "border-border/60 bg-card/85",
});

const SURFACE_NEOGLOSS_OVERRIDES: Record<SectionSurfaceTone, string> = Object.freeze({
  flat: "border-border/20 bg-background/98/92 shadow-[0_24px_54px_rgba(15,23,42,0.22)] backdrop-blur-xl",
  raised: "border-border/10 bg-background/98/96 shadow-[0_52px_112px_rgba(15,23,42,0.28)] backdrop-blur-[28px]",
});

/**
 * @[/bestpractices]
 * @[/documentcode]
 * Resolves override class names that align SectionSurface with the active surface style.
 */
const resolveSurfaceToneOverrides = (
  tone: SectionSurfaceTone,
  isNeoglass: boolean,
) =>
  cn(
    SURFACE_DEFAULT_OVERRIDES[tone],
    isNeoglass ? SURFACE_NEOGLOSS_OVERRIDES[tone] : null,
  );

type SurfaceShadowOverrides = Record<'muted' | 'lifted' | 'hero', CSSProperties | undefined>;

export const ThemeTestingGround = () => {
  const { theme, systemTheme } = useTheme();
  const {
    activeVariantId,
    activeVariantMetadata,
    variantMetadata,
    setActiveVariantId,
    activeStyleId,
    activeStyleMetadata,
    lightDirection,
    setLightDirection,
  } = useThemeRegistry();

  const resolvedTheme = theme === 'system' ? systemTheme ?? 'light' : theme;
  const currentThemeMode: ThemeColorMode = resolvedTheme === 'dark' ? 'dark' : 'light';
  const [activeShowcaseId, setActiveShowcaseId] = useState<string>(showcaseSections[0].id);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const variantPackage = useMemo(
    () => getThemeVariant(activeVariantId),
    [activeVariantId]
  );

  const stylePackage = useMemo(
    () => resolveThemeStyle(activeStyleId ?? DEFAULT_THEME_STYLE_ID),
    [activeStyleId]
  );

  const isNeoglass = activeStyleId === 'neoglass';

  const surfaceShadowOverrides = useMemo<SurfaceShadowOverrides>(() => {
    if (!isNeoglass) {
      return {
        muted: undefined,
        lifted: undefined,
        hero: undefined,
      };
    }

    return {
      muted: { boxShadow: 'var(--shadow-control)' },
      lifted: { boxShadow: 'var(--shadow-interactive), var(--glow-light)' },
      hero: { boxShadow: 'var(--shadow-xl), var(--glow-medium)' },
    };
  }, [isNeoglass]);

  const gridGapScale = isNeoglass ? 'xxl' : 'xl';

  const variantGroups = useMemo(() => {
    const buckets: Record<ThemeVariantCategory, ThemeVariantMetadataEntry[]> = {
      core: [],
      natural: [],
      enterprise: [],
      playful: [],
    };

    variantMetadata.forEach((entry) => {
      buckets[entry.category].push(entry);
    });

    return VARIANT_CATEGORY_ORDER.map((category) => ({
      category,
      entries: buckets[category],
    })).filter((group) => group.entries.length > 0);
  }, [variantMetadata]);

  const variantSwatches = useMemo(() => {
    const paletteMap = new Map<ThemeVariantId, string>();
    variantMetadata.forEach((entry) => {
      const variant = getThemeVariant(entry.id as ThemeVariantId);
      paletteMap.set(entry.id as ThemeVariantId, variant.light.primary);
    });
    return paletteMap;
  }, [variantMetadata]);

  const activeShowcase = useMemo(
    () => showcaseSections.find((section) => section.id === activeShowcaseId) ?? showcaseSections[0],
    [activeShowcaseId]
  );

  const ShowcaseComponent = activeShowcase.Component;
  const activeCategoryDescriptor = VARIANT_CATEGORY_LABELS[activeVariantMetadata.category];

  return (
    <Section
      className={cn('relative flex flex-col', isNeoglass ? 'gap-2xl' : 'gap-xl')}
      maxWidth="content"
    >
      <FloatingModeBadge
        currentThemeMode={currentThemeMode}
        activeVariantName={activeVariantMetadata.displayName}
        activeStyleName={activeStyleMetadata.displayName}
      />

      <section id="overview" className="flex flex-col gap-xl">
        <div className="flex flex-col gap-lg">
          <h1 className="text-3xl font-semibold text-foreground">Theme Testing Ground</h1>
          <p className="max-w-3xl text-base text-muted-foreground">
            Inspect palette, component surfaces, and interactive showcases across theme variants. Toggle between colour variants and surface styles to validate radii, shadows, and glow behaviour in real time.
          </p>
        </div>
        <SectionGrid template="double" gapScale={gridGapScale} className="items-stretch">
          <SectionSurface
            tone="flat"
            className={cn(
              'flex flex-col',
              isNeoglass ? 'gap-xl' : 'gap-lg',
              resolveSurfaceToneOverrides('flat', isNeoglass),
              'min-h-full',
            )}
            style={surfaceShadowOverrides.muted}
          >
            <header className="flex flex-col gap-sm">
              <div className="flex flex-wrap items-center justify-between gap-sm">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Active Variant</span>
                <span className="text-sm font-semibold text-foreground">{activeVariantMetadata.displayName}</span>
              </div>
              <div className="flex flex-wrap items-center gap-sm text-[0.65rem] text-muted-foreground">
                <span className="rounded-full border border-border/60 px-sm py-xs font-semibold uppercase tracking-wide text-muted-foreground/80">
                  {activeCategoryDescriptor.title}
                </span>
                <span className="text-muted-foreground/70">{activeCategoryDescriptor.tagline}</span>
              </div>
            </header>
            {variantGroups.length > 0 ? (
              <div className={cn('flex flex-col', isNeoglass ? 'gap-xl' : 'gap-lg')}>
                {variantGroups.map((group, index) => {
                  const descriptor = VARIANT_CATEGORY_LABELS[group.category];

                  return (
                    <div
                      key={group.category}
                      className={cn(
                        'flex flex-col',
                        isNeoglass ? 'gap-lg' : 'gap-md',
                        index > 0 && 'border-t border-border/60 pt-md',
                      )}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-sm">
                        <div className="flex flex-col gap-xs">
                          <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                            {descriptor.title}
                          </span>
                          <span className="text-[0.65rem] text-muted-foreground/75">{descriptor.tagline}</span>
                        </div>
                        <span className="rounded-full border border-border/60 px-sm py-xs text-[0.6rem] font-semibold uppercase tracking-wide text-muted-foreground/80">
                          {group.entries.length} variants
                        </span>
                      </div>
                      <div
                        className={cn(
                          'grid [grid-template-columns:repeat(auto-fit,minmax(11.5rem,1fr))]',
                          isNeoglass ? 'gap-md' : 'gap-sm',
                        )}
                      >
                        {group.entries.map((entry) => {
                          const isActive = entry.id === activeVariantId;
                          const pillStyle = pillTokens[isActive ? 'active' : 'neutral'];
                          const swatch = variantSwatches.get(entry.id as ThemeVariantId) ?? pillStyle.background;

                          return (
                            <button
                              key={entry.id}
                              type="button"
                              onClick={() => setActiveVariantId(entry.id as ThemeVariantId)}
                              aria-pressed={isActive}
                              className="flex w-full items-center justify-start gap-sm rounded-full border px-md py-sm text-sm font-semibold uppercase tracking-wide transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                              style={{
                                background: pillStyle.background,
                                color: pillStyle.foreground,
                                borderColor: pillStyle.border,
                                boxShadow: pillStyle.shadow,
                              }}
                            >
                              <span
                                className="h-5 w-5 rounded-full border border-border/70"
                                style={{ background: swatch }}
                                aria-hidden
                              />
                              <span className="truncate">{entry.displayName}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </SectionSurface>
          <SectionSurface
            tone="flat"
            className={cn(
              'flex flex-col',
              isNeoglass ? 'gap-xl' : 'gap-lg',
              resolveSurfaceToneOverrides('flat', isNeoglass),
            )}
            style={surfaceShadowOverrides.muted}
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Theme Styles</span>
            <ThemeStyleSelector />
          </SectionSurface>
        </SectionGrid>
      </section>

      <SectionGrid
        template="double"
        gapScale={gridGapScale}
        className={cn('items-stretch', isNeoglass ? 'mt-xxl' : 'mt-xl')}
      >
        <PalettePreview
          palette={variantPackage.light}
          variantName={activeVariantMetadata.displayName}
          isNeoglass={isNeoglass}
          surfaceStyle={surfaceShadowOverrides.lifted}
        />
        <SectionSurface
          tone="raised"
          className={cn(
            'flex flex-col',
            isNeoglass ? 'gap-xl' : 'gap-lg',
            resolveSurfaceToneOverrides('raised', isNeoglass),
          )}
          style={surfaceShadowOverrides.lifted}
        >
          <header className="flex flex-col gap-xs">
            <h2 className="text-lg font-semibold text-foreground">Surface Tokens</h2>
            <p className="text-xs text-muted-foreground">
              Loaded from <code>{activeStyleMetadata.displayName}</code> style package.
            </p>
          </header>
          <SurfaceTokenPreview
            radii={stylePackage.tokens.radii}
            shadows={stylePackage.tokens.shadows}
            glows={stylePackage.tokens.glows}
            isNeoglass={isNeoglass}
            styleId={stylePackage.id}
          />
        </SectionSurface>
      </SectionGrid>

      <section className="flex flex-col gap-xl">
        <h2 className="text-lg font-semibold text-foreground">Component Showcases</h2>
        <div
          className={cn(
            'sticky top-20 z-30 flex justify-center px-sm',
            isNeoglass ? 'py-sm' : 'py-xs',
          )}
        >
          <ShowcaseNavigation
            items={navigationCatalog}
            activeShowcaseId={activeShowcaseId}
            onSelectShowcase={(id) => {
              setActiveShowcaseId(id);
              setOpenDropdownId(null);
            }}
            openDropdownId={openDropdownId}
            onToggleDropdown={(id) =>
              setOpenDropdownId((previous) => (previous === id ? null : id))
            }
            spacingClass={isNeoglass ? 'gap-md' : 'gap-sm'}
            className="w-full"
          />
        </div>
        <SectionSurface
          tone="raised"
          className={cn('relative', resolveSurfaceToneOverrides('raised', isNeoglass))}
          style={surfaceShadowOverrides.hero}
        >
          <ShowcaseComponent />
        </SectionSurface>
      </section>
    </Section>
  );
};

const FloatingModeBadge = ({
  currentThemeMode,
  activeVariantName,
  activeStyleName,
}: {
  currentThemeMode: ThemeColorMode;
  activeVariantName: string;
  activeStyleName: string;
}) => (
  <div className="fixed right-6 top-6 z-50 hidden min-w-[14rem] flex-col gap-1 rounded-2xl border border-border/60 bg-card/90 px-md py-sm text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground shadow-lg backdrop-blur lg:flex">
    <span className="text-muted-foreground/80">Current Mode</span>
    <div className="grid gap-1 text-[0.7rem] text-foreground">
      <span>Color · {currentThemeMode}</span>
      <span>Variant · {activeVariantName}</span>
      <span>Style · {activeStyleName}</span>
    </div>
  </div>
);

const PalettePreview = ({
  palette,
  variantName,
  isNeoglass,
  surfaceStyle,
}: {
  palette: ThemePalette;
  variantName: string;
  isNeoglass: boolean;
  surfaceStyle: CSSProperties | undefined;
}) => {
  const paletteEntries = Object.entries(palette) as Array<[string, string]>;

  return (
    <SectionSurface
      tone="raised"
      className={cn(
        'flex flex-col',
        isNeoglass ? 'gap-xl' : 'gap-lg',
        resolveSurfaceToneOverrides('raised', isNeoglass),
      )}
      style={surfaceStyle}
    >
      <header className="flex flex-col gap-xs">
        <div className="flex flex-wrap items-center gap-sm">
          <h2 className="text-lg font-semibold text-foreground">Palette Preview</h2>
          <span className="rounded-full border border-border px-sm py-xs text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
            {variantName}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Light mode palette values rendered with live swatches.
        </p>
      </header>
      <div className="grid gap-sm [grid-template-columns:repeat(auto-fit,minmax(11.5rem,1fr))]">
        {paletteEntries.map(([token, value]) => (
          <div
            key={token}
            className={cn(
              'flex items-center gap-sm rounded-2xl border border-border/50 bg-background/80 p-sm shadow-sm',
              isNeoglass && 'border-border/30 bg-background/92 shadow-none',
            )}
          >
            <span
              className="h-10 w-10 flex-shrink-0 rounded-full border border-border/60"
              style={{ background: value }}
              aria-hidden
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {token}
              </span>
              <span className="text-[0.7rem] font-mono text-foreground">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionSurface>
  );
};

type ShowcaseNavItem =
  | {
      id: string;
      label: string;
      icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
      children?: undefined;
    }
  | {
      id: string;
      label: string;
      icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
      children: readonly {
        id: string;
        label: string;
        icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
      }[];
    };

const navigationCatalog: readonly ShowcaseNavItem[] = [
  {
    id: 'interface-patterns',
    label: 'Interface Patterns',
    icon: Sparkles,
    children: [
      { id: 'buttons-showcase', label: 'Buttons', icon: SquareMousePointer },
      { id: 'toggles-showcase', label: 'Toggles & Selectors', icon: ToggleLeft },
      { id: 'dropdowns-showcase', label: 'Dropdowns', icon: ListFilter },
    ],
  },
  {
    id: 'surface-systems',
    label: 'Surface Systems',
    icon: Layers,
    children: [
      { id: 'cards-showcase', label: 'Universal Cards', icon: PanelsTopLeft },
      { id: 'overlays-showcase', label: 'Overlays', icon: Layers2 },
    ],
  },
  {
    id: 'navigation-systems',
    label: 'Navigation Systems',
    icon: Navigation,
    children: [
      { id: 'floating-nav-showcase', label: 'Floating Navigation', icon: Navigation2 },
    ],
  },
  {
    id: 'data-entry',
    label: 'Data Entry',
    icon: Keyboard,
    children: [
      { id: 'inputs-showcase', label: 'Inputs', icon: SquarePen },
      { id: 'date-time-showcase', label: 'Date & Time', icon: CalendarClock },
    ],
  },
  {
    id: 'feedback-loops',
    label: 'Feedback Loops',
    icon: Compass,
    children: [
      { id: 'buttons-showcase', label: 'Call to action states', icon: SquareMousePointer },
    ],
  },
];

const ShowcaseNavigation = ({
  items,
  activeShowcaseId,
  onSelectShowcase,
  openDropdownId,
  onToggleDropdown,
  className,
  spacingClass,
}: {
  items: readonly ShowcaseNavItem[];
  activeShowcaseId: string;
  onSelectShowcase: (id: string) => void;
  openDropdownId: string | null;
  onToggleDropdown: (id: string) => void;
  className?: string;
  spacingClass?: string;
}) => (
  <nav
    className={cn(
      'flex flex-wrap justify-center rounded-3xl border border-border/60 bg-card/85 px-md py-sm shadow-lg backdrop-blur',
      spacingClass ?? 'gap-sm',
      className,
    )}
  >
    {items.map((item) => {
      const isDropdown = Boolean(item.children?.length);
      const isOpen = openDropdownId === item.id;
      const childActive = Boolean(item.children?.some((child) => child.id === activeShowcaseId));
      const isDirectActive = !isDropdown && activeShowcaseId === item.id;
      const isActive = isDirectActive || childActive;
      const buttonToken = pillTokens[isActive ? 'active' : 'neutral'];

      return (
        <div key={item.id} className="relative">
          <button
            type="button"
            className="inline-flex items-center gap-sm rounded-full border px-md py-sm text-sm font-semibold uppercase tracking-wide transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            style={{
              background: buttonToken.background,
              color: buttonToken.foreground,
              borderColor: buttonToken.border,
              boxShadow: buttonToken.shadow,
            }}
            onClick={() => {
              if (isDropdown) {
                onToggleDropdown(item.id);
              } else {
                onSelectShowcase(item.id);
              }
            }}
            aria-expanded={isDropdown ? isOpen : undefined}
            aria-haspopup={isDropdown ? 'menu' : undefined}
          >
            <item.icon className="h-4 w-4" aria-hidden />
            <span>{item.label}</span>
          </button>
          {isDropdown && isOpen ? (
            <ul
              role="menu"
              className="absolute left-1/2 top-[calc(100%+0.5rem)] z-40 flex min-w-[16rem] -translate-x-1/2 flex-col gap-xs rounded-2xl border border-border/60 bg-card/95 p-sm shadow-xl backdrop-blur"
            >
              {item.children!.map((child) => {
                const childActive = activeShowcaseId === child.id;
                const token = pillTokens[childActive ? 'active' : 'neutral'];

                return (
                  <li key={child.id} role="presentation">
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={childActive}
                      className="flex w-full items-center gap-sm rounded-xl border px-sm py-xs text-left text-sm font-semibold uppercase tracking-wide transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      style={{
                        background: token.background,
                        color: token.foreground,
                        borderColor: token.border,
                        boxShadow: token.shadow,
                      }}
                      onClick={() => {
                        onSelectShowcase(child.id);
                      }}
                    >
                      <child.icon className="h-3.5 w-3.5" aria-hidden />
                      <span className="truncate">{child.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      );
    })}
  </nav>
);
