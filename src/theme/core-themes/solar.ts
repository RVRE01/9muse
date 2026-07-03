// 2025-11-03T01:46:00-05:00 - Solar variant radiates bright yellows and oranges for energetic branding.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#F59E0B",
  primaryForeground: "#1F1300",
  secondary: "#F97316",
  secondaryForeground: "#2A1000",
  accent: "#FDE047",
  accentForeground: "#422006",
  success: "#22C55E",
  warning: "#F97316",
  danger: "#DC2626",
  info: "#F87171",
  background: "#FFF9ED",
  foreground: "#2A1000",
  surface: "#FFF1D6",
  surfaceForeground: "#2A1000",
  card: "#FFF3DC",
  cardForeground: "#2A1000",
  muted: "#FFE6B3",
  mutedForeground: "#773B0C",
  border: "#FFD48A",
  ring: "#F59E0B",
  textStrong: "#2A1000",
  textMuted: "#8B4A14",
};

const darkPalette: ThemePalette = {
  primary: "#FBBF24",
  primaryForeground: "#2A1000",
  secondary: "#EA580C",
  secondaryForeground: "#FFE7C0",
  accent: "#FDE047",
  accentForeground: "#2A1000",
  success: "#34D399",
  warning: "#FB923C",
  danger: "#F87171",
  info: "#FBBF24",
  background: "#241003",
  foreground: "#FFE7C0",
  surface: "#2F1707",
  surfaceForeground: "#FFE7C0",
  card: "#3A200C",
  cardForeground: "#FFE7C0",
  muted: "#4A2A12",
  mutedForeground: "#FCD34D",
  border: "#5C3418",
  ring: "#FBBF24",
  textStrong: "#FFF4D7",
  textMuted: "#FCD34D",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FFF9ED", position: "0%" },
      { color: "#FFEFD4", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "150deg",
    stops: [
      { color: "#FFF3DC", position: "0%" },
      { color: "#FFE0A6", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#F59E0B", position: "0%" },
      { color: "#F97316", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#FDE047", position: "0%" },
      { color: "#FACC15", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#241003", position: "0%" },
      { color: "#3A200C", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "150deg",
    stops: [
      { color: "#2F1707", position: "0%" },
      { color: "#4A2A12", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#FBBF24", position: "0%" },
      { color: "#F97316", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#FDE047", position: "0%" },
      { color: "#FACC15", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "solar",
  displayName: "Solar",
  description: "Sun-drenched palette ideal for activation campaigns.",
  audience: "Events & live experiences",
  contrastRating: "AA",
  category: "playful",
};

const solarVariant: ThemeVariantPackage = {
  id: "solar",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default solarVariant;

// 2025-11-03T01:46:00-05:00 - Rebalance saturation when brand guidelines evolve.
