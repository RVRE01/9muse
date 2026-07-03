'use client';

// 2025-11-03T02:38:00-05:00 - Providing variant metadata context atop next-themes provider.

import {
  createContext,
  useEffect,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import {
  DEFAULT_THEME_VARIANT_ID,
  DEFAULT_THEME_STYLE_ID,
  getThemeVariant,
  getThemeMetadata,
  getThemeStyleMetadata,
  listThemeMetadata,
  listThemeStyleMetadata,
  resolveThemeStyle,
  type ThemeVariantMetadataEntry,
} from '@/theme';
import type {
  GlowTokens,
  ThemeGradientTokens,
  ThemePalette,
  ThemeStyleId,
  ThemeStyleMeta,
  ThemeVariantId,
} from '@/theme/types';

interface ThemeRootProviderProps {
  children: ReactNode;
}

interface ThemeRegistryContextValue {
  activeVariantId: ThemeVariantId;
  activeVariantMetadata: ThemeVariantMetadataEntry;
  variantMetadata: readonly ThemeVariantMetadataEntry[];
  setActiveVariantId: (variantId: ThemeVariantId) => void;
  activeStyleId: ThemeStyleId;
  activeStyleMetadata: ThemeStyleMeta;
  styleMetadata: readonly ThemeStyleMeta[];
  setActiveStyleId: (styleId: ThemeStyleId) => void;
  lightDirection: number;
  setLightDirection: (angle: number) => void;
  /** @deprecated - preserved for backwards compatibility */
  readonly metadata: readonly ThemeVariantMetadataEntry[];
  /** @deprecated - preserved for backwards compatibility */
  readonly activeMetadata: ThemeVariantMetadataEntry;
}

const ThemeRegistryContext = createContext<ThemeRegistryContextValue | undefined>(
  undefined,
);

const themeMetadata = listThemeMetadata();
const themeStyleMetadata = listThemeStyleMetadata();

const variantElementId = 'theme-variant-overrides';
const styleElementId = 'theme-style-overrides';

const toKebab = (token: string) =>
  token.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const paletteToCss = (palette: ThemePalette) =>
  Object.entries(palette)
    .map(([key, value]) => `  --color-${toKebab(key)}: ${value};`)
    .join('\n');

const gradientsToCss = (gradients: ThemeGradientTokens) =>
  Object.entries(gradients)
    .map(([key, value]) => `  --gradient-${toKebab(key)}: ${value};`)
    .join('\n');

export const useThemeRegistry = (): ThemeRegistryContextValue => {
  const context = useContext(ThemeRegistryContext);

  if (!context) {
    throw new Error(
      'useThemeRegistry must be used within a ThemeRootProvider instance.',
    );
  }

  return context;
};

export function ThemeRootProvider({ children }: ThemeRootProviderProps) {
  const [activeVariantId, setActiveVariantId] = useState<ThemeVariantId>(
    DEFAULT_THEME_VARIANT_ID,
  );
  const [activeStyleId, setActiveStyleId] = useState<ThemeStyleId>(
    DEFAULT_THEME_STYLE_ID,
  );
  const [lightDirection, setLightDirection] = useState<number>(135);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const normalised = ((lightDirection % 360) + 360) % 360;
    const adjusted = normalised - 90;
    const radians = (adjusted * Math.PI) / 180;
    const lightX = Math.cos(radians);
    const lightY = Math.sin(radians);
    const shadowX = -lightX;
    const shadowY = -lightY;
    const root = document.documentElement;

    root.style.setProperty('--theme-light-angle', `${normalised}`);
    root.style.setProperty('--theme-light-angle-deg', `${normalised}deg`);
    root.style.setProperty('--theme-light-x-factor', lightX.toFixed(4));
    root.style.setProperty('--theme-light-y-factor', lightY.toFixed(4));
    root.style.setProperty('--theme-shadow-x-factor', shadowX.toFixed(4));
    root.style.setProperty('--theme-shadow-y-factor', shadowY.toFixed(4));

    const highlight = 'color-mix(in srgb, var(--color-primary) 58%, rgba(255, 255, 255, 0.32))';
    const midtone = 'color-mix(in srgb, var(--color-primary) 26%, rgba(255, 255, 255, 0.05))';
    const lowlight =
      'color-mix(in srgb, var(--color-primary) 18%, rgba(15, 23, 42, 0.55))';

    root.style.setProperty('--theme-light-highlight', highlight);
    root.style.setProperty('--theme-light-midtone', midtone);
    root.style.setProperty('--theme-light-lowlight', lowlight);

    const gradient = `linear-gradient(${normalised}deg, ${highlight} 0%, ${midtone} 48%, ${lowlight} 100%)`;
    root.style.setProperty('--theme-glass-border-gradient', gradient);
    root.style.setProperty(
      '--theme-glass-overlay',
      'color-mix(in srgb, var(--color-primary) 14%, rgba(255, 255, 255, 0.82))',
    );
  }, [lightDirection]);

  const registryValue = useMemo<ThemeRegistryContextValue>(() => {
    const activeVariantMetadata =
      themeMetadata.find((entry) => entry.id === activeVariantId) ??
      getThemeMetadata(DEFAULT_THEME_VARIANT_ID);
    const activeStyleMetadata =
      themeStyleMetadata.find((entry) => entry.id === activeStyleId) ??
      getThemeStyleMetadata(DEFAULT_THEME_STYLE_ID);

    return {
      activeVariantId,
      activeVariantMetadata,
      variantMetadata: themeMetadata,
      setActiveVariantId,
      activeStyleId,
      activeStyleMetadata,
      styleMetadata: themeStyleMetadata,
      setActiveStyleId,
      lightDirection,
      setLightDirection,
      metadata: themeMetadata,
      activeMetadata: activeVariantMetadata,
    };
  }, [activeVariantId, activeStyleId, lightDirection]);

  return (
    <ThemeRegistryContext.Provider value={registryValue}>
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeVariantVariables />
        <ThemeStyleVariables />
        {children}
      </NextThemeProvider>
    </ThemeRegistryContext.Provider>
  );
}

const ThemeVariantVariables = () => {
  const { activeVariantId } = useThemeRegistry();
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.themeVariant = activeVariantId;
  }, [activeVariantId]);

  useEffect(() => {
    const resolved = theme === 'system' ? systemTheme ?? 'light' : theme ?? 'light';
    const root = document.documentElement;
    root.dataset.themeColorMode = resolved;
  }, [systemTheme, theme]);

  useEffect(() => {
    const variant = getThemeVariant(activeVariantId);
    const lightCss = [
      paletteToCss(variant.light),
      gradientsToCss(variant.gradients.light),
    ]
      .filter(Boolean)
      .join('\n');
    const darkCss = [
      paletteToCss(variant.dark),
      gradientsToCss(variant.gradients.dark),
    ]
      .filter(Boolean)
      .join('\n');

    const styleTag = (() => {
      const existing = document.getElementById(variantElementId) as
        | HTMLStyleElement
        | null;

      if (existing) {
        return existing;
      }

      const created = document.createElement('style');
      created.id = variantElementId;
      document.head.appendChild(created);
      return created;
    })();

    styleTag.textContent = `:root[data-theme-variant="${activeVariantId}"] {
${lightCss}
}
:root[data-theme-variant="${activeVariantId}"].dark {
${darkCss}
}`;
  }, [activeVariantId]);

  return null;
};

const glowsToCss = (glows: GlowTokens) => {
  const entries = Object.entries(glows) as Array<[keyof GlowTokens, string]>;
  const base = entries
    .map(([key, value]) => `  --glow-${toKebab(key as string)}: ${value};`)
    .join('\n');
  const accentLine = `  --glow-accent: ${glows.medium};`;
  return [base, accentLine].join('\n');
};

const ThemeStyleVariables = () => {
  const { activeStyleId } = useThemeRegistry();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.themeStyle = activeStyleId;
  }, [activeStyleId]);

  useEffect(() => {
    const stylePackage = resolveThemeStyle(activeStyleId);
    const { radii, shadows, glows } = stylePackage.tokens;

    const radiiEntries = Object.entries(radii) as Array<[keyof typeof radii, string]>;
    const shadowEntries = Object.entries(shadows) as Array<[keyof typeof shadows, string]>;
    const radiiCss = radiiEntries
      .map(([key, value]) => `  --radius-${toKebab(key as string)}: ${value};`)
      .join('\n');
    const shadowCss = shadowEntries
      .map(([key, value]) => `  --shadow-${toKebab(key as string)}: ${value};`)
      .join('\n');
    const glowCss = glowsToCss(glows);
    const legacyRadius = radii.md ?? radii.lg ?? radii.sm;

    const cssBlock = [
      radiiCss,
      `  --radius: ${legacyRadius};`,
      shadowCss,
      glowCss,
    ]
      .filter(Boolean)
      .join('\n');

    const styleTag = (() => {
      const existing = document.getElementById(styleElementId) as
        | HTMLStyleElement
        | null;

      if (existing) {
        return existing;
      }

      const created = document.createElement('style');
      created.id = styleElementId;
      document.head.appendChild(created);
      return created;
    })();

    styleTag.textContent = `:root[data-theme-style="${activeStyleId}"] {
${cssBlock}
}`;
  }, [activeStyleId]);

  return null;
};

// 2025-11-03T02:38:00-05:00 - Extend registry context with mutation APIs when variant selection UI ships.
