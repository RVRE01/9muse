// 2025-11-02T22:47:30-05:00 - Tailwind tokens sourced from central theme directory.

import type { Config } from "tailwindcss";
import {
  containerTokens,
  DEFAULT_THEME_VARIANT_ID,
  elevationTokens,
  radiiTokens,
  resolveThemeVariant,
  shadowTokens,
  spacingScale,
  themeColors,
  themeVariantRegistry,
  transitionTokens,
  typographyScale,
  type BrandColorSet,
} from "./src/theme";
import type { ThemeGradientTokens } from "./src/theme/types";

type ColorKey = keyof typeof themeColors.light;

type FontSizeKey = keyof typeof typographyScale.fontSize;

const toKebab = (token: string) =>
  token.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const colorPalette = (() => {
  const entries: Record<string, string | Record<string, string>> = {};

  (Object.keys(themeColors.light) as ColorKey[]).forEach((key) => {
    if (key.endsWith("Foreground")) {
      const baseKey = key.replace("Foreground", "");
      const baseEntry = entries[baseKey];
      const baseDefault = `var(--color-${toKebab(baseKey)})`;
      const foregroundValue = `var(--color-${toKebab(key)})`;

      if (typeof baseEntry === "object") {
        entries[baseKey] = {
          ...baseEntry,
          foreground: foregroundValue,
        };
      } else {
        entries[baseKey] = {
          DEFAULT: baseEntry ?? baseDefault,
          foreground: foregroundValue,
        };
      }

      return;
    }

    const baseValue = `var(--color-${toKebab(key)})`;
    const existingEntry = entries[key];

    if (typeof existingEntry === "object") {
      entries[key] = {
        ...existingEntry,
        DEFAULT: baseValue,
      };
    } else {
      entries[key] = baseValue;
    }
  });

  return entries;
})();

const spacingPalette = Object.fromEntries(
  (Object.keys(spacingScale) as Array<keyof typeof spacingScale>).map(
    (key) => [key, `var(--spacing-${toKebab(key as string)})`],
  ),
);

const containerPalette = Object.fromEntries(
  Object.keys(containerTokens).map((key) => [
    key,
    `var(--container-${toKebab(key)})`,
  ]),
);

const gradientVariables = (
  gradients: ThemeGradientTokens,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(gradients).map(([key, value]) => [
      `--gradient-${toKebab(key)}`,
      value,
    ]),
  ) as Record<string, string>;

const fontSizePalette = Object.fromEntries(
  (Object.keys(typographyScale.fontSize) as FontSizeKey[]).map((key) => {
    const details: { lineHeight: string; letterSpacing?: string } = {
      lineHeight: `var(--font-line-height-${toKebab(key)})`,
    };

    if (typographyScale.fontSize[key].letterSpacing) {
      details.letterSpacing = `var(--font-letter-spacing-${toKebab(key)})`;
    }

    return [key, [`var(--font-size-${toKebab(key)})`, details]];
  }),
);

const colorVariables = (colors: BrandColorSet) =>
  Object.fromEntries(
    (Object.entries(colors) as [ColorKey, string][]).map(([key, value]) => [
      `--color-${toKebab(key)}`,
      value,
    ])
  );

const spacingVariables = Object.fromEntries(
  (Object.entries(spacingScale) as Array<[string, string]>).map(
    ([key, value]) => [`--spacing-${toKebab(key)}`, value],
  ),
);

const containerVariables = Object.fromEntries(
  Object.entries(containerTokens).map(([key, value]) => [
    `--container-${toKebab(key)}`,
    value,
  ]),
);

const radiiVariables = Object.fromEntries(
  Object.entries(radiiTokens).map(([key, value]) => [
    `--radius-${toKebab(key)}`,
    value,
  ]),
);

const shadowVariables = Object.fromEntries(
  Object.entries(shadowTokens).map(([key, value]) => [
    `--shadow-${toKebab(key)}`,
    value,
  ]),
);

const elevationVariables = Object.fromEntries(
  Object.entries(elevationTokens).map(([key, value]) => [
    `--elevation-${toKebab(key)}`,
    value,
  ]),
);

const transitionVariables = Object.fromEntries(
  Object.entries(transitionTokens).map(([key, value]) => [
    `--transition-${toKebab(key)}`,
    value,
  ]),
);

const defaultVariantPackage = resolveThemeVariant(DEFAULT_THEME_VARIANT_ID);

const gradientVariablesLight = gradientVariables(
  defaultVariantPackage.gradients.light,
);

const gradientVariablesDark = gradientVariables(
  defaultVariantPackage.gradients.dark,
);

const gradientPalette = Object.fromEntries(
  Object.keys(defaultVariantPackage.gradients.light).map((key) => [
    `gradient-${toKebab(key)}`,
    `var(--gradient-${toKebab(key)})`,
  ]),
);

const fontVariables = Object.fromEntries([
  ["--font-family-sans", typographyScale.fontFamily.sans],
  ["--font-family-heading", typographyScale.fontFamily.heading],
  ["--font-family-mono", typographyScale.fontFamily.mono],
  ...((Object.entries(typographyScale.fontSize) as [FontSizeKey, { size: string; lineHeight: string; letterSpacing?: string }][]).flatMap(
    ([key, value]) => {
      const variables: Array<[string, string]> = [
        [`--font-size-${toKebab(key)}`, value.size],
        [`--font-line-height-${toKebab(key)}`, value.lineHeight],
      ];

      if (value.letterSpacing) {
        variables.push([
          `--font-letter-spacing-${toKebab(key)}`,
          value.letterSpacing,
        ]);
      }

      return variables;
    }
  )),
]);

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/theme/**/*.{ts,tsx}", "./src/lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colorPalette,
      },
      spacing: {
        ...spacingPalette,
      },
      maxWidth: {
        ...containerPalette,
      },
      backgroundImage: {
        ...gradientPalette,
      },
      borderRadius: Object.fromEntries(
        Object.keys(radiiTokens).map((key) => [
          key,
          `var(--radius-${toKebab(key)})`,
        ]),
      ),
      boxShadow: Object.fromEntries(
        Object.keys(shadowTokens).map((key) => [
          key,
          `var(--shadow-${toKebab(key)})`,
        ]),
      ),
      dropShadow: Object.fromEntries(
        Object.keys(elevationTokens).map((key) => [
          key,
          `var(--elevation-${toKebab(key)})`,
        ]),
      ),
      transitionDuration: Object.fromEntries(
        Object.keys(transitionTokens).map((key) => [
          key,
          `var(--transition-${toKebab(key)})`,
        ]),
      ),
      fontSize: {
        ...fontSizePalette,
      },
      fontFamily: {
        sans: ["var(--font-family-sans)", "sans-serif"],
        heading: ["var(--font-family-heading)", "sans-serif"],
        mono: ["var(--font-family-mono)", "monospace"],
      },
      fontWeight: {
        regular: typographyScale.fontWeight.regular,
        medium: typographyScale.fontWeight.medium,
        semibold: typographyScale.fontWeight.semibold,
        bold: typographyScale.fontWeight.bold,
      },
      // 2025-11-02T23:42:00-05:00 - Register explicit border utility for base layer usage.
      borderColor: {
        DEFAULT: colorPalette.border,
        border: colorPalette.border,
      },
      // 2025-11-02T23:42:00-05:00 - Surface ring token for outline utilities used in focus states.
      outlineColor: {
        ring: colorPalette.ring,
      },
    },
  },
  darkMode: "class",
  plugins: [
    ({ addBase }: { addBase: (styles: Record<string, Record<string, string>>) => void }) => {
      Object.keys(themeVariantRegistry).forEach((variantId) => {
        resolveThemeVariant(variantId as keyof typeof themeVariantRegistry);
      });

      addBase({
        ":root": {
          ...colorVariables(themeColors.light),
          ...spacingVariables,
          ...containerVariables,
          ...fontVariables,
          ...radiiVariables,
          ...shadowVariables,
          ...elevationVariables,
          ...transitionVariables,
          ...gradientVariablesLight,
        },
        ".dark": {
          ...colorVariables(themeColors.dark),
          ...gradientVariablesDark,
        },
      });
    },
  ],
};

export default config;

// 2025-11-02T22:47:30-05:00 - Add additional scales (e.g., radii) by importing more tokens.
