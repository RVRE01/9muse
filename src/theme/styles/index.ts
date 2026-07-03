import { smoothStyle } from "./smooth";
import { neoglassStyle } from "./neoglass";
import type {
  ThemeStyleId,
  ThemeStyleMeta,
  ThemeStylePackage,
  ThemeStyleRegistry,
} from "../types";
import { themeStyleIds } from "../types";

const DEV = process.env.NODE_ENV !== "production";

export const DEFAULT_THEME_STYLE_ID: ThemeStyleId = "smooth";

const registry: ThemeStyleRegistry = Object.freeze({
  smooth: smoothStyle,
  neoglass: neoglassStyle,
});

export const themeStyleRegistry = registry;

export const resolveThemeStyle = (
  styleId: ThemeStyleId = DEFAULT_THEME_STYLE_ID,
): ThemeStylePackage => {
  const style = registry[styleId];

  if (style) {
    return style;
  }

  if (DEV) {
    throw new Error(
      `[theme] Unknown theme style "${styleId}". Ensure it is registered in the style registry.`,
    );
  }

  return registry[DEFAULT_THEME_STYLE_ID];
};

const packages = Object.freeze(
  themeStyleIds.map((styleId) => {
    const style = registry[styleId];

    if (!style) {
      if (DEV) {
        throw new Error(`[theme] Theme style "${styleId}" is not registered.`);
      }

      return registry[DEFAULT_THEME_STYLE_ID];
    }

    return style;
  }),
) as readonly ThemeStylePackage[];

const metadata = Object.freeze(
  packages.map((stylePackage) => stylePackage.metadata),
) as readonly ThemeStyleMeta[];

export const themeStylePackages = packages;
export const themeStyleMetadata = metadata;

export const listThemeStyleMetadata = (): readonly ThemeStyleMeta[] => metadata;

export const getThemeStyleMetadata = (
  styleId: ThemeStyleId,
): ThemeStyleMeta => {
  const index = packages.findIndex((packageEntry) => packageEntry.id === styleId);

  if (index !== -1) {
    return metadata[index];
  }

  if (DEV) {
    throw new Error(`[theme] Unknown theme style metadata requested for "${styleId}".`);
  }

  return metadata[
    packages.findIndex((packageEntry) => packageEntry.id === DEFAULT_THEME_STYLE_ID)
  ];
};

export const listThemeStyles = (): readonly ThemeStylePackage[] => packages;

export const hasThemeStyle = (styleId: ThemeStyleId): boolean =>
  Boolean(registry[styleId]);
