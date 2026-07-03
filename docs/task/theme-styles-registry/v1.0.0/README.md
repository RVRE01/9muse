# Theme Styles Registry

- **Version:** v1.0.0  
- **Date:** 2025-11-03  
- **Scope:** Introduce theme "styles" (surface treatments) that sit alongside color variants and feed radii, shadow, and glow tokens. Implements smooth (default) and Neoglass styles with a type-safe registry and accessors.  
- **Source Spec/Task:** Theme style expansion request

## Overview

The theme system now distinguishes between **color variants** (palette + gradients) and **theme styles** (surface characteristics such as radii, lighting, and glow behaviour). Styles define how elements feel while reusing existing palette tokens. The registry pattern clusters each style’s metadata and token sets, enabling:

1. Resolving the active style at runtime (`resolveThemeStyle`).
2. Surfacing style metadata for UI pickers (`themeStyleMetadata`).
3. Injecting style-specific tokens (radii, shadows, glows) into CSS variables and component tokens.

The default experience remains the existing smooth style; the registry introduces a Neoglass style for tactile, glass-layered interfaces. Tokens derived from styles feed Tailwind variables, ShadCN components, and higher-level UI tokens (cards, pills, etc.).

## Folder Structure

```
src/theme/
├── styles/
│   ├── index.ts          // style registry + metadata helpers
│   ├── smooth.ts         // default smooth style definition
│   └── neoglass.ts       // Neoglass style definition
├── styles.ts             // barrel export for styles directory
├── tokens/radii.ts       // resolves radii via style registry
├── tokens/shadows.ts     // resolves shadows via style registry
├── tokens/glows.ts       // resolves glows via style registry
└── types.ts              // shared ThemeStyle* types and token interfaces
```

## Public API

### Registry & Metadata

| Export | Location | Description |
| --- | --- | --- |
| `DEFAULT_THEME_STYLE_ID: ThemeStyleId` | `src/theme/styles/index.ts` | Identifier for the default smooth style. |
| `resolveThemeStyle(styleId?: ThemeStyleId): ThemeStylePackage` | `src/theme/styles/index.ts` | Returns the registered style package (metadata + tokens). Falls back to default and throws in dev if unregistered. |
| `listThemeStyles(): readonly ThemeStylePackage[]` | `src/theme/styles/index.ts` | Frozen array of all style packages. |
| `listThemeStyleMetadata(): readonly ThemeStyleMeta[]` | `src/theme/styles/index.ts` | Metadata list for style selection UIs. |
| `getThemeStyleMetadata(styleId: ThemeStyleId): ThemeStyleMeta` | `src/theme/styles/index.ts` | Metadata lookup with dev-time validation. |
| `hasThemeStyle(styleId: ThemeStyleId): boolean` | `src/theme/styles/index.ts` | Registry membership check. |
| `themeStylePackages` | `src/theme/styles/index.ts` | Frozen array of style packages keyed by `themeStyleIds`. |
| `themeStyleMetadata` | `src/theme/styles/index.ts` | Frozen metadata array keyed identically to `themeStylePackages`. |

### Tokens

| Export | Location | Description |
| --- | --- | --- |
| `radiiTokens`, `getRadiiTokens(styleId?)` | `src/theme/tokens/radii.ts` | Style-aware radii scale (`none` → `full`). |
| `shadowTokens`, `getShadowTokens(styleId?)` | `src/theme/tokens/shadows.ts` | Style-aware shadow set (`none`, `xs` … `xl`, `focus`). |
| `glowTokens`, `getGlowTokens(styleId?)` | `src/theme/tokens/glows.ts` | Style-aware glow intensities (light, medium, strong). |

All token modules default to `DEFAULT_THEME_STYLE_ID`, preserving current behaviour while enabling style override without mutating global state.

### Types

Key interfaces and unions live in `src/theme/types.ts`:

- `ThemeStyleId = "smooth" | "neoglass"`
- `ThemeStyleMeta`
- `ThemeStylePackage`
- `ThemeStyleTokenSet`
- `RadiiTokens`, `ShadowTokens`, `GlowTokens`
- `themeStyleIds: ThemeStyleId[]`

Extend the union and `themeStyleIds` when introducing additional style packages.

## Usage Examples

### Resolving Style Tokens

```ts
import { getShadowTokens, type ThemeStyleId } from "@/theme";

function getButtonShadow(styleId: ThemeStyleId) {
  const { md } = getShadowTokens(styleId);
  return md;
}
```

### Listing Available Styles for a Picker

```ts
import { listThemeStyleMetadata, resolveThemeStyle } from "@/theme";

const styles = listThemeStyleMetadata();

const entries = styles.map((metadata) => ({
  metadata,
  tokens: resolveThemeStyle(metadata.id).tokens,
}));
```

### Applying a Style Override in Tailwind Initialization

```ts
import { resolveThemeStyle, DEFAULT_THEME_STYLE_ID } from "@/theme";

const style = resolveThemeStyle(DEFAULT_THEME_STYLE_ID);
const radiiVariables = Object.fromEntries(
  Object.entries(style.tokens.radii).map(([key, value]) => [
    `--radius-${key}`,
    value,
  ]),
);
```

## Implementation Notes

- **Immutable Registries:** Style packages, token sets, and metadata arrays are deeply frozen to prevent runtime mutation and ensure predictable caching.
- **Dev-time Validation:** `resolveThemeStyle` and `getThemeStyleMetadata` throw descriptive errors in development when an unknown style id is requested. Production falls back to the default style.
- **Backward Compatibility:** Existing components continue to consume `radiiTokens`, `shadowTokens`, and `glowTokens` without change. The registry introduces optional style overrides while preserving smooth defaults.
- **Extensibility:** Adding a new style requires:
  1. Extending `ThemeStyleId` union and `themeStyleIds` array.
  2. Creating a `src/theme/styles/<NewStyle>.ts` definition exporting `ThemeStylePackage`.
  3. Registering the style in `src/theme/styles/index.ts`.
  4. Updating any surface-specific documentation/tests.

## Testing & Verification

1. **Type Check:** `pnpm lint` or `pnpm typecheck` to ensure new types and exports compile.
2. **Visual Validation:** Use the testing ground (`src/components/testing-grounds`) to inspect card, pill, and toggle components under each style once the style picker UI consumes the new registry.
3. **Console Assertions:** In development, request an invalid style ID to confirm descriptive error messaging.
4. **Token Snapshot:** Validate Tailwind variable output (e.g., inspect `radiiVariables` in `tailwind.config.ts`) to ensure the default smooth style values propagate.

## Future Work

- Expose a UI control (parallel to variant selector) for switching styles at runtime.
- Extend token domains (e.g., `border`, `texture`) within `ThemeStyleTokenSet` for richer surface controls.
- Integrate automated visual regression when style switching is user-facing.
