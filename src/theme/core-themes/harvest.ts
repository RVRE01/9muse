// 2025-11-03T12:04:00-05:00 - Harvest variant captures autumnal warmth for nature-centric storytelling.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#B45309",
  primaryForeground: "#FFFBEB",
  secondary: "#D97706",
  secondaryForeground: "#2F1704",
  accent: "#F97316",
  accentForeground: "#3B0D03",
  success: "#166534",
  warning: "#F59E0B",
  danger: "#B91C1C",
  info: "#0F766E",
  background: "#FFF7ED",
  foreground: "#2F1704",
  surface: "#FDEAD7",
  surfaceForeground: "#2F1704",
  card: "#FDF0DF",
  cardForeground: "#2F1704",
  muted: "#F5D2B3",
  mutedForeground: "#8C4A10",
  border: "#EDBF8D",
  ring: "#D97706",
  textStrong: "#2F1704",
  textMuted: "#8C4A10",
};

const darkPalette: ThemePalette = {
  primary: "#F59E0B",
  primaryForeground: "#2F1704",
  secondary: "#EA580C",
  secondaryForeground: "#FDE68A",
  accent: "#FB923C",
  accentForeground: "#2F1704",
  success: "#22C55E",
  warning: "#FACC15",
  danger: "#F87171",
  info: "#2DD4BF",
  background: "#1C1004",
  foreground: "#FDE68A",
  surface: "#2A1606",
  surfaceForeground: "#FDE68A",
  card: "#341C08",
  cardForeground: "#FDE68A",
  muted: "#4A2A0B",
  mutedForeground: "#F59E0B",
  border: "#5C330F",
  ring: "#F59E0B",
  textStrong: "#FFF7ED",
  textMuted: "#F5C97B",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FFF7ED", position: "0%" },
      { color: "#FDEAD7", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "145deg",
    stops: [
      { color: "#FDF0DF", position: "0%" },
      { color: "#F6D8B8", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#B45309", position: "0%" },
      { color: "#D97706", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#F97316", position: "0%" },
      { color: "#FDBA74", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#1C1004", position: "0%" },
      { color: "#2F1706", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "145deg",
    stops: [
      { color: "#2A1606", position: "0%" },
      { color: "#44240B", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#F59E0B", position: "0%" },
      { color: "#EA580C", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#FB923C", position: "0%" },
      { color: "#FDBA74", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "harvest",
  displayName: "Harvest",
  description: "Autumn spice palette supporting agricultural storytelling.",
  audience: "Agro & sustainability narratives",
  contrastRating: "AA",
  category: "natural",
};

const harvestVariant: ThemeVariantPackage = {
  id: "harvest",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default harvestVariant;

// 2025-11-03T12:04:00-05:00 - Tweak brown ramp if product photography introduces richer tones.
