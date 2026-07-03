// 2025-11-03T02:25:00-05:00 - Theme metadata registry linking variant descriptors to extension guidance.

import type {
  ThemeGradientTokens,
  ThemeVariantId,
  ThemeVariantMeta,
} from "./types";
import {
  DEFAULT_THEME_VARIANT_ID,
  themeVariantPackages,
} from "./core-themes";
import { containerTokens } from "./tokens";
import { themeVariantIds } from "./types";

const DEV = process.env.NODE_ENV !== "production";

type ContainerTokenKey = keyof typeof containerTokens;

type ThemeGradientKey = keyof ThemeGradientTokens;

export interface ThemeVariantMetadataEntry extends ThemeVariantMeta {
  id: ThemeVariantId;
  gradients: ReadonlyArray<{
    key: ThemeGradientKey;
    light: string;
    dark: string;
  }>;
  containerGuidance: ReadonlyArray<{
    token: ContainerTokenKey;
    value: string;
    description: string;
  }>;
}

const containerGuidanceDescriptions: Record<ContainerTokenKey, string> = Object.freeze({
  sectionMaxWidth: "Maximum width for full-bleed sections before adaptive layouts engage.",
  contentMaxWidth: "Recommended width for long-form content blocks and articles.",
  cardMinHeight: "Baseline height for dashboard and marketing cards to maintain rhythm.",
  cardPadding: "Internal padding applied to card shells across breakpoints.",
  sectionPaddingY: "Vertical section spacing that aligns hero and detail blocks.",
  sectionPaddingX: "Horizontal breathing room for responsive sections on mobile-first layouts.",
});

const frozenContainerGuidance = Object.freeze(
  (Object.entries(containerTokens) as Array<[ContainerTokenKey, string]>).map(
    ([token, value]) =>
      Object.freeze({
        token,
        value,
        description: containerGuidanceDescriptions[token],
      }),
  ),
);

const buildGradientSummary = (gradients: ThemeGradientTokens) =>
  (Object.entries(gradients) as Array<[ThemeGradientKey, string]>).map(
    ([key, value]) => ({ key, value }),
  );

const metadataRegistry = (() => {
  const entries = Object.fromEntries(
    themeVariantPackages.map((variantPackage) => {
      const lightGradients = buildGradientSummary(variantPackage.gradients.light);
      const darkGradients = buildGradientSummary(variantPackage.gradients.dark);

      if (DEV) {
        const lightKeys = lightGradients.map((gradient) => gradient.key).join(",");
        const darkKeys = darkGradients.map((gradient) => gradient.key).join(",");

        if (lightKeys !== darkKeys) {
          throw new Error(
            `[theme] Gradient mismatch for variant "${variantPackage.id}". Light keys (${lightKeys}) differ from dark keys (${darkKeys}).`,
          );
        }
      }

      const entry: ThemeVariantMetadataEntry = Object.freeze({
        ...variantPackage.metadata,
        id: variantPackage.id,
        gradients: Object.freeze(
          lightGradients.map((gradient, index) =>
            Object.freeze({
              key: gradient.key,
              light: gradient.value,
              dark: darkGradients[index]?.value ?? gradient.value,
            }),
          ),
        ),
        containerGuidance: frozenContainerGuidance,
      });

      return [variantPackage.id, entry] as const;
    }),
  ) as Record<ThemeVariantId, ThemeVariantMetadataEntry>;

  if (DEV) {
    const missingMetadata = themeVariantIds.filter(
      (id: ThemeVariantId) => !(id in entries),
    );

    if (missingMetadata.length > 0) {
      throw new Error(
        `[theme] Missing theme metadata for variants: ${missingMetadata.join(", ")}`,
      );
    }
  }

  return Object.freeze(entries);
})();

const metadataList = Object.freeze(
  themeVariantIds.map(
    (variantId: ThemeVariantId) => metadataRegistry[variantId],
  ),
);

export const themeMetadataRegistry = metadataRegistry;

export const listThemeMetadata = (): readonly ThemeVariantMetadataEntry[] =>
  metadataList;

export const getThemeMetadata = (
  variantId: ThemeVariantId,
): ThemeVariantMetadataEntry => {
  const metadata = metadataRegistry[variantId];

  if (metadata) {
    return metadata;
  }

  if (DEV) {
    throw new Error(
      `[theme] Unknown theme metadata requested for "${variantId}". Ensure metadata is registered.`,
    );
  }

  return metadataRegistry[DEFAULT_THEME_VARIANT_ID];
};

export const getDefaultThemeMetadata = (): ThemeVariantMetadataEntry =>
  getThemeMetadata(DEFAULT_THEME_VARIANT_ID);

// 2025-11-03T02:25:00-05:00 - Extend metadata entries with usage heuristics when introducing new token domains.
