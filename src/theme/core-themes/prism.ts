// 2025-11-03T12:28:00-05:00 - Prism variant introduces iridescent gradients for playful experimentation.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#6366F1",
  primaryForeground: "#F8FAFC",
  secondary: "#A855F7",
  secondaryForeground: "#2E1065",
  accent: "#06B6D4",
  accentForeground: "#022C32",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#EC4899",
  background: "#FDF4FF",
  foreground: "#2E1065",
  surface: "#F7ECFF",
  surfaceForeground: "#2E1065",
  card: "#F3E8FF",
  cardForeground: "#2E1065",
  muted: "#E9D5FF",
  mutedForeground: "#5B21B6",
  border: "#D8B4FE",
  ring: "#A855F7",
  textStrong: "#2E1065",
  textMuted: "#5B21B6",
};

const darkPalette: ThemePalette = {
  primary: "#A5B4FC",
  primaryForeground: "#0B1120",
  secondary: "#C084FC",
  secondaryForeground: "#2E1065",
  accent: "#22D3EE",
  accentForeground: "#022C32",
  success: "#34D399",
  warning: "#FACC15",
  danger: "#F87171",
  info: "#F472B6",
  background: "#1B1033",
  foreground: "#F5E6FF",
  surface: "#251647",
  surfaceForeground: "#F5E6FF",
  card: "#2F1F5A",
  cardForeground: "#F5E6FF",
  muted: "#392A68",
  mutedForeground: "#D8B4FE",
  border: "#46357C",
  ring: "#C084FC",
  textStrong: "#FAF5FF",
  textMuted: "#D8B4FE",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FDF4FF", position: "0%" },
      { color: "#E9D5FF", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "152deg",
    stops: [
      { color: "#F3E8FF", position: "0%" },
      { color: "#DBEAFE", position: "50%" },
      { color: "#CFFAFE", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#6366F1", position: "0%" },
      { color: "#EC4899", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#06B6D4", position: "0%" },
      { color: "#A855F7", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#1B1033", position: "0%" },
      { color: "#2F1F5A", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "152deg",
    stops: [
      { color: "#251647", position: "0%" },
      { color: "#1B1033", position: "50%" },
      { color: "#0F172A", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#A5B4FC", position: "0%" },
      { color: "#F472B6", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#22D3EE", position: "0%" },
      { color: "#A855F7", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "prism",
  displayName: "Prism",
  description: "Iridescent gradients supporting experimental launches.",
  audience: "Labs & events",
  contrastRating: "AA",
  category: "playful",
};

const prismVariant: ThemeVariantPackage = {
  id: "prism",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default prismVariant;

// 2025-11-03T12:28:00-05:00 - Update gradient ramps when introducing new experimental brand motifs.
