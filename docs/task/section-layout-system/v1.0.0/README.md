# Section Layout System

- **Version:** v1.0.0
- **Date:** 2025-11-03
- **Owner:** Cascade assistant

## Overview

This task introduces a reusable section layout system that centralises spacing, grid, and surface behaviour across the application. The implementation couples the new tokens-driven `Section`, `SectionGrid`, and `SectionSurface` primitives with the Theme Testing Ground, ensuring every section respects container sizing, spacing, and elevation tokens sourced from the design system.

Key goals:

1. Provide a universal wrapper that aligns padding and max-width values with tokenised container guidance.
2. Offer responsive grid presets (single, double, triple, quad) that leverage spacing tokens instead of ad-hoc gaps.
3. Harmonise surface padding and elevation, with tone-aware fallbacks driven by shadow and glow tokens.
4. Integrate the primitives into the Theme Testing Ground so top-level sections, navigation, and component showcases adopt consistent spacing.
5. Introduce a tabbed surface token selector that applies radii, shadow, or glow tokens globally and surfaces AI-friendly prompts.

## Components

### `Section`

- **Purpose:** Wraps content in a semantic `<section>` with token-aligned horizontal and vertical padding plus configurable max-width presets (`section`, `content`, or `none`).
- **Key Props:**
  - `maxWidth`: Chooses container width preset.
  - `bleedX`/`bleedY`: Allow controlled padding overrides for full-bleed content.
- **Behaviour:** Falls back to container tokens (`sectionPaddingX`, `sectionPaddingY`, `sectionMaxWidth`, `contentMaxWidth`) while allowing CSS variable overrides if present on ancestors.

### `SectionGrid`

- **Purpose:** Renders responsive CSS grids with presets for single, double, triple, or quad column layouts.
- **Key Props:**
  - `template`: Selects the predefined column pattern.
  - `gapScale`: Maps directly to `spacingScale` to keep internal gaps token-driven.
- **Behaviour:** Computes a `--section-grid-gap` CSS variable with a fallback to the matching spacing token, ensuring consistency if higher-level CSS variables exist.

### `SectionSurface`

- **Purpose:** Provides a surface wrapper for cards/panels with consistent padding, border, elevation, and optional neumorphic overrides using theme tokens.
- **Key Props:**
  - `tone`: Chooses between `flat` and `raised` surface shadows.
  - `paddingScale`: Optional spacing token override for interior padding.
- **Behaviour:** Derives padding from container or spacing tokens and maps tone to shadow/glow tokens (`sm`, `lg`) to keep elevation consistent across the design system, while neumorphic variants apply softened transparency and blur values aligned with design heuristics.

## Theme Testing Ground Integration

- Replaced ad-hoc layout wrappers with `Section`, `SectionGrid`, and `SectionSurface` to guarantee top-level spacing.
- Added neumorphic-aware override classes via `resolveSurfaceToneOverrides` to offset style differences using softened transparency and blur while preserving tone defaults.
- Converted Surface Tokens preview into a tabbed experience that lets designers cycle between radii, shadows, and glows. The active domain applies tokens globally and exposes contextual copy prompts describing theme file origins.
- Navigation shell now uses `SectionSurface` with condensed padding scale to ensure the sticky bar respects tokenised spacing.

## Usage Example

```tsx
import { Section, SectionGrid, SectionSurface } from '@/components/ui';

export const AnalyticsOverview = () => (
  <Section maxWidth="content">
    <SectionGrid template="double" gapScale="lg">
      <SectionSurface tone="flat">\/* ... *\/</SectionSurface>
      <SectionSurface tone="raised">\/* ... *\/</SectionSurface>
    </SectionGrid>
  </Section>
);
```

## Testing & Validation

- Manual verification inside Theme Testing Ground confirms top sections no longer touch view edges and interior surfaces respect padding tokens.
- Browser console inspected for React hydration or layout warnings (none observed).
- Automated tests not applicable; no existing suite covers Theme Testing Ground interactions.

## Follow-up Ideas

1. Promote `resolveSurfaceToneOverrides` into the UI library alongside the other Section utilities for wider reuse.
2. Implement actual tabbed toggles for radii, shadows, and glows to further improve surface token UX.
3. Add storybook stories demonstrating each preset to speed up regression testing.
