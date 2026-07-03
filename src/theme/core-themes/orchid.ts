// 2025-11-03T01:40:00-05:00 - Orchid variant celebrates vibrant purples and magentas.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#7C3AED",
  primaryForeground: "#FFFFFF",
  secondary: "#C084FC",
  secondaryForeground: "#2E1065",
  accent: "#F472B6",
  accentForeground: "#4A044E",
  success: "#22C55E",
  warning: "#EAB308",
  danger: "#DB2777",
  info: "#6366F1",
  background: "#FBF7FF",
  foreground: "#2E1065",
  surface: "#F4EBFF",
  surfaceForeground: "#2E1065",
  card: "#F7EDFF",
  cardForeground: "#2E1065",
  muted: "#E9D5FF",
  mutedForeground: "#4C1D95",
  border: "#D8B4FE",
  ring: "#A855F7",
  textStrong: "#2E1065",
  textMuted: "#5B21B6",
};

const darkPalette: ThemePalette = {
  primary: "#C084FC",
  primaryForeground: "#240046",
  secondary: "#4C1D95",
  secondaryForeground: "#EDE9FE",
  accent: "#F472B6",
  accentForeground: "#2E1065",
  success: "#34D399",
  warning: "#FACC15",
  danger: "#F472B6",
  info: "#818CF8",
  background: "#20014C",
  foreground: "#F5E6FF",
  surface: "#2B0A60",
  surfaceForeground: "#F5E6FF",
  card: "#351078",
  cardForeground: "#F5E6FF",
  muted: "#45208F",
  mutedForeground: "#D8B4FE",
  border: "#4F289C",
  ring: "#C084FC",
  textStrong: "#FAF5FF",
  textMuted: "#D8B4FE",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FBF7FF", position: "0%" },
      { color: "#F1E4FF", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "155deg",
    stops: [
      { color: "#F7EDFF", position: "0%" },
      { color: "#EAD6FF", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#7C3AED", position: "0%" },
      { color: "#C084FC", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#F472B6", position: "0%" },
      { color: "#FDA4AF", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#20014C", position: "0%" },
      { color: "#341066", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "155deg",
    stops: [
      { color: "#2B0A60", position: "0%" },
      { color: "#42138C", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#C084FC", position: "0%" },
      { color: "#A855F7", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#F472B6", position: "0%" },
      { color: "#FB7185", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "orchid",
  displayName: "Orchid",
  description: "Electric purples for creative and community experiences.",
  audience: "Community & collaboration",
  contrastRating: "AA",
  category: "playful",
};

const orchidVariant: ThemeVariantPackage = {
  id: "orchid",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default orchidVariant;

// 2025-11-03T01:40:00-05:00 - Update accent curves when design refresh targets new creative segments.
