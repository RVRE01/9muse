// 2025-11-03T01:30:00-05:00 - Default theme variant anchors the design system baseline.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#0F62FE",
  primaryForeground: "#FFFFFF",
  secondary: "#A6C8FF",
  secondaryForeground: "#001141",
  accent: "#FFD580",
  accentForeground: "#1F2A40",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#2563EB",
  background: "#FFFFFF",
  foreground: "#0B1A33",
  surface: "#F5F7FB",
  surfaceForeground: "#0B1A33",
  card: "#F7F9FC",
  cardForeground: "#0B1A33",
  muted: "#E2E8F0",
  mutedForeground: "#3C4B66",
  border: "#D0D9E8",
  ring: "#5B73F2",
  textStrong: "#0B1A33",
  textMuted: "#5B6C8F",
};

const darkPalette: ThemePalette = {
  primary: "#84A9FF",
  primaryForeground: "#001141",
  secondary: "#3451B2",
  secondaryForeground: "#E8EEFF",
  accent: "#FFB454",
  accentForeground: "#0B1A33",
  success: "#22C55E",
  warning: "#FACC15",
  danger: "#F87171",
  info: "#60A5FA",
  background: "#050B19",
  foreground: "#E8EEFF",
  surface: "#0B152B",
  surfaceForeground: "#E8EEFF",
  card: "#0F1C35",
  cardForeground: "#E8EEFF",
  muted: "#1D2A46",
  mutedForeground: "#8FA4D4",
  border: "#1F2B47",
  ring: "#8FA4D4",
  textStrong: "#F4F7FF",
  textMuted: "#9AA9D6",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FFFFFF", position: "0%" },
      { color: "#EBF1FF", position: "50%" },
      { color: "#D6E4FF", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "160deg",
    stops: [
      { color: "#FFFFFF", position: "0%" },
      { color: "#F2F6FF", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#0F62FE", position: "0%" },
      { color: "#467BFF", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#FFD580", position: "0%" },
      { color: "#FFE7B3", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#050B19", position: "0%" },
      { color: "#0D1A33", position: "50%" },
      { color: "#162447", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "160deg",
    stops: [
      { color: "#0B152B", position: "0%" },
      { color: "#142446", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#84A9FF", position: "0%" },
      { color: "#648FFF", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#FFB454", position: "0%" },
      { color: "#FFCD85", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "default",
  displayName: "Default",
  description: "Balanced corporate palette for general-purpose interfaces.",
  audience: "Core experience",
  contrastRating: "AA",
  category: "core",
};

const defaultVariant: ThemeVariantPackage = {
  id: "default",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default defaultVariant;

// 2025-11-03T01:30:00-05:00 - Adjust palette/metadata when rebranding the primary experience.
