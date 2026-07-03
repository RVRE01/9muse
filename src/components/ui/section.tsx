import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { containerTokens, shadowTokens, spacingScale } from "@/theme";

type SectionMaxWidthPreset = "section" | "content" | "none";

const SECTION_MAX_WIDTH_VARS: Record<Exclude<SectionMaxWidthPreset, "none">, string> = {
  section: "--container-section-max-width",
  content: "--container-content-max-width",
};

const SECTION_PADDING_BLOCK_VAR = "--container-section-padding-y";
const SECTION_PADDING_INLINE_VAR = "--container-section-padding-x";

type SectionComputedStyle = CSSProperties & {
  "--section-padding-block": string;
  "--section-padding-inline": string;
};

const fallback = (cssVar: string, value: string) => `var(${cssVar}, ${value})`;

/**
 * @[/bestpractices]
 * @[/documentcode]
 * Normalises conversion from token keys to CSS custom property names.
 */
const toCSSVarName = (token: string) => token.replace(/([A-Z])/g, "-$1").toLowerCase();

/**
 * @[/bestpractices]
 * @[/documentcode]
 * Normalises CSS variable fallback usage for theme-driven values.
 */
const withFallback = fallback;

/**
 * @[/bestpractices]
 * @[/documentcode]
 * Provides a responsive section wrapper that aligns max widths and padding with container tokens.
 */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  maxWidth?: SectionMaxWidthPreset;
  bleedX?: boolean;
  bleedY?: boolean;
}

/**
 * @[/bestpractices]
 * @[/documentcode]
 * Renders a semantic section element with theme-aligned spacing fallbacks.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({
    className,
    children,
    maxWidth = "section",
    bleedX = false,
    bleedY = false,
    style,
    ...props
  }, ref) => {
    const computedStyle: SectionComputedStyle = {
      "--section-padding-block": bleedY
        ? "0px"
        : withFallback(SECTION_PADDING_BLOCK_VAR, containerTokens.sectionPaddingY),
      "--section-padding-inline": bleedX
        ? "0px"
        : withFallback(SECTION_PADDING_INLINE_VAR, containerTokens.sectionPaddingX),
      paddingBlock: "var(--section-padding-block)",
      paddingInline: "var(--section-padding-inline)",
      marginInline: "auto",
      ...style,
    };

    if (maxWidth !== "none") {
      computedStyle.maxWidth = withFallback(
        SECTION_MAX_WIDTH_VARS[maxWidth],
        maxWidth === "section"
          ? containerTokens.sectionMaxWidth
          : containerTokens.contentMaxWidth,
      );
    } else {
      computedStyle.maxWidth = "none";
    }

    return (
      <section
        ref={ref}
        className={cn("w-full", className)}
        style={computedStyle}
        {...props}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = "Section";

type SectionGridTemplate = "single" | "double" | "triple" | "quad";

const GRID_TEMPLATE_CLASSES: Record<SectionGridTemplate, string> = {
  single: "grid-cols-1",
  double: "grid-cols-1 md:grid-cols-2",
  triple: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  quad: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
};

type SectionGridComputedStyle = CSSProperties & {
  "--section-grid-gap": string;
};

/**
 * @[/bestpractices]
 * @[/documentcode]
 * Creates a responsive CSS grid informed by the section layout presets.
 */
export interface SectionGridProps extends HTMLAttributes<HTMLDivElement> {
  template?: SectionGridTemplate;
  gapScale?: keyof typeof spacingScale;
}

/**
 * @[/bestpractices]
 * @[/documentcode]
 * Provides responsive grid spacing leveraging spacing tokens as CSS variables.
 */
export const SectionGrid = forwardRef<HTMLDivElement, SectionGridProps>(
  (
    { className, template = "single", gapScale = "xl", style, children, ...props },
    ref,
  ) => {
    const spacingVar = `--spacing-${toCSSVarName(gapScale)}`;
    const computedStyle: SectionGridComputedStyle = {
      "--section-grid-gap": withFallback(spacingVar, spacingScale[gapScale]),
      gap: "var(--section-grid-gap)",
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn("grid", GRID_TEMPLATE_CLASSES[template], className)}
        style={computedStyle}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SectionGrid.displayName = "SectionGrid";

type SectionSurfaceTone = "flat" | "raised";

const SECTION_SURFACE_CLASSES =
  "rounded-3xl border border-border bg-card/85 backdrop-blur transition-shadow duration-300";

const SURFACE_TONE_TOKENS: Record<SectionSurfaceTone, keyof typeof shadowTokens> = {
  flat: "sm",
  raised: "lg",
};

type SectionSurfaceComputedStyle = CSSProperties & {
  "--section-surface-padding": string;
  "--section-surface-shadow": string;
};

/**
 * @[/bestpractices]
 * @[/documentcode]
 * Harmonises interior padding for section surfaces like cards or panels.
 */
export interface SectionSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  tone?: SectionSurfaceTone;
  paddingScale?: keyof typeof spacingScale;
}

/**
 * @[/bestpractices]
 * @[/documentcode]
 * Renders a themed surface wrapper using card padding and elevation tokens.
 */
export const SectionSurface = forwardRef<HTMLDivElement, SectionSurfaceProps>(
  ({ className, tone = "flat", paddingScale, style, children, ...props }, ref) => {
    const paddingVar = paddingScale
      ? `--spacing-${toCSSVarName(paddingScale)}`
      : "--container-card-padding";
    const paddingFallback = paddingScale
      ? spacingScale[paddingScale]
      : containerTokens.cardPadding;
    const shadowVar = `--shadow-${toCSSVarName(SURFACE_TONE_TOKENS[tone])}`;
    const computedStyle: SectionSurfaceComputedStyle = {
      "--section-surface-padding": withFallback(paddingVar, paddingFallback),
      "--section-surface-shadow": withFallback(shadowVar, shadowTokens[SURFACE_TONE_TOKENS[tone]]),
      padding: "var(--section-surface-padding)",
      boxShadow: "var(--section-surface-shadow)",
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(SECTION_SURFACE_CLASSES, className)}
        style={computedStyle}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SectionSurface.displayName = "SectionSurface";

export const SectionLayout = Object.freeze({
  Section,
  Grid: SectionGrid,
  Surface: SectionSurface,
});
