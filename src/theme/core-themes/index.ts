// 2025-11-03T02:15:00-05:00 - Central registry for core theme variant packages and metadata.

import canyonVariant from "./canyon";
import defaultVariant from "./default";
import emberVariant from "./ember";
import forestVariant from "./forest";
import graniteVariant from "./granite";
import harvestVariant from "./harvest";
import keystoneVariant from "./keystone";
import meadowVariant from "./meadow";
import midnightVariant from "./midnight";
import oceanVariant from "./ocean";
import orchidVariant from "./orchid";
import paradeVariant from "./parade";
import prismVariant from "./prism";
import solarVariant from "./solar";
import sterlingVariant from "./sterling";
import vanguardVariant from "./vanguard";
import type {
  ThemeVariantId,
  ThemeVariantMeta,
  ThemeVariantPackage,
  ThemeVariantRegistry,
} from "../types";
import { themeVariantIds } from "../types";

const DEV = process.env.NODE_ENV !== "production";

const registry: ThemeVariantRegistry = {
  default: defaultVariant,
  ocean: oceanVariant,
  forest: forestVariant,
  ember: emberVariant,
  orchid: orchidVariant,
  meadow: meadowVariant,
  midnight: midnightVariant,
  solar: solarVariant,
  granite: graniteVariant,
  harvest: harvestVariant,
  canyon: canyonVariant,
  sterling: sterlingVariant,
  keystone: keystoneVariant,
  vanguard: vanguardVariant,
  parade: paradeVariant,
  prism: prismVariant,
};

Object.freeze(registry);

export const DEFAULT_THEME_VARIANT_ID: ThemeVariantId = "default";

const computeFallbackVariant = (): ThemeVariantPackage => {
  const preferred = registry[DEFAULT_THEME_VARIANT_ID];

  if (preferred) {
    return preferred;
  }

  const [firstVariant] = Object.values(registry);

  if (!firstVariant) {
    if (DEV) {
      throw new Error("[theme] Theme variant registry is empty.");
    }

    return defaultVariant;
  }

  if (DEV) {
    throw new Error(
      `[theme] Default theme variant "${DEFAULT_THEME_VARIANT_ID}" is not registered.`,
    );
  }

  return firstVariant;
};

export const resolveThemeVariant = (
  variantId: ThemeVariantId,
): ThemeVariantPackage => {
  const variant = registry[variantId];

  if (variant) {
    return variant;
  }

  if (DEV) {
    throw new Error(
      `[theme] Unknown theme variant "${variantId}". Ensure it is registered in core themes.`,
    );
  }

  if (typeof console !== "undefined") {
    console.warn(
      `[theme] Falling back to default theme variant because "${variantId}" is not registered.`,
    );
  }

  return computeFallbackVariant();
};

if (DEV) {
  const missingVariants = themeVariantIds.filter((id) => !(id in registry));

  if (missingVariants.length > 0) {
    throw new Error(
      `[theme] Missing theme variants in registry: ${missingVariants.join(", ")}`,
    );
  }

  for (const id of themeVariantIds) {
    const variant = registry[id];

    if (!variant) {
      throw new Error(`[theme] Theme variant "${id}" is not registered.`);
    }

    if (variant.id !== id) {
      throw new Error(
        `[theme] Theme variant registry mismatch: expected id "${id}", received "${variant.id}".`,
      );
    }

    if (!variant.gradients.light || !variant.gradients.dark) {
      throw new Error(
        `[theme] Theme variant "${id}" must define both light and dark gradient tokens.`,
      );
    }
  }
}

export const themeVariantRegistry = registry;

export const themeVariantPackages: readonly ThemeVariantPackage[] = Object.freeze(
  themeVariantIds.map((id) => resolveThemeVariant(id)),
);

export const themeVariantMetadata: readonly ThemeVariantMeta[] = Object.freeze(
  themeVariantPackages.map((variant) => variant.metadata),
);

export const hasThemeVariant = (variantId: ThemeVariantId): boolean =>
  Boolean(themeVariantRegistry[variantId]);
