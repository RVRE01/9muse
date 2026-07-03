// 2025-11-02T22:45:00-05:00 - Centralizing brand color tokens for scalability.

import {
  DEFAULT_THEME_VARIANT_ID,
  resolveThemeVariant,
  themeVariantMetadata,
} from "./core-themes";
import type {
  ThemePalette,
  ThemeVariantId,
  ThemeVariantPackage,
  ThemeVariantSummary,
} from "./types";

export type ThemeColorMode = "light" | "dark";

export type BrandColorSet = ThemePalette;

export interface ThemeColors {
  light: BrandColorSet;
  dark: BrandColorSet;
}

const clonePalette = (palette: ThemePalette): ThemePalette => ({ ...palette });

const defaultVariant = resolveThemeVariant(DEFAULT_THEME_VARIANT_ID);

export const themeColors: ThemeColors = {
  light: clonePalette(defaultVariant.light),
  dark: clonePalette(defaultVariant.dark),
};

Object.freeze(themeColors);
Object.freeze(themeColors.light);
Object.freeze(themeColors.dark);

export const themeColorModes: readonly ThemeColorMode[] = Object.freeze([
  "light",
  "dark",
]);

export const getThemeVariant = (
  variantId: ThemeVariantId = DEFAULT_THEME_VARIANT_ID,
): ThemeVariantPackage => resolveThemeVariant(variantId);

export const getThemePalette = (
  variantId: ThemeVariantId,
  mode: ThemeColorMode,
): ThemePalette => {
  const variant = getThemeVariant(variantId);
  return mode === "light" ? variant.light : variant.dark;
};

export const listThemeVariants = (): ThemeVariantSummary[] =>
  themeVariantMetadata.map(({ id, displayName, contrastRating }) => ({
    id,
    displayName,
    contrastRating,
  }));

// 2025-11-03T02:20:00-05:00 - Default palettes resolve through registry; extend registry before overriding here.
