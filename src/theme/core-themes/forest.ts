// 2025-11-03T01:34:00-05:00 - Forest variant delivers earthy greens and browns.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#2F855A",
  primaryForeground: "#FFFFFF",
  secondary: "#A3E635",
  secondaryForeground: "#1F3B1A",
  accent: "#FACC15",
  accentForeground: "#422006",
  success: "#16A34A",
  warning: "#F97316",
  danger: "#DC2626",
  info: "#0EA5E9",
  background: "#F6FBF4",
  foreground: "#1F3B1A",
  surface: "#E8F4E1",
  surfaceForeground: "#1F3B1A",
  card: "#EDF7E7",
  cardForeground: "#1F3B1A",
  muted: "#D7E8D1",
  mutedForeground: "#3B5D3A",
  border: "#B5D5AF",
  ring: "#62C370",
  textStrong: "#1F3B1A",
  textMuted: "#4A6B46",
};

const darkPalette: ThemePalette = {
  primary: "#4ADE80",
  primaryForeground: "#102112",
  secondary: "#365314",
  secondaryForeground: "#D9F99D",
  accent: "#F4D35E",
  accentForeground: "#1F3B1A",
  success: "#22C55E",
  warning: "#FB923C",
  danger: "#F87171",
  info: "#38BDF8",
  background: "#0E1B11",
  foreground: "#E8F9E5",
  surface: "#142616",
  surfaceForeground: "#E8F9E5",
  card: "#19311C",
  cardForeground: "#E8F9E5",
  muted: "#244328",
  mutedForeground: "#93D7A4",
  border: "#28572F",
  ring: "#4ADE80",
  textStrong: "#F5FFF4",
  textMuted: "#93D7A4",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#F6FBF4", position: "0%" },
      { color: "#E1F4D9", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "140deg",
    stops: [
      { color: "#EDF7E7", position: "0%" },
      { color: "#D4EECB", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#2F855A", position: "0%" },
      { color: "#3CB97A", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#FACC15", position: "0%" },
      { color: "#FDE68A", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#0E1B11", position: "0%" },
      { color: "#18351F", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "140deg",
    stops: [
      { color: "#142616", position: "0%" },
      { color: "#1F3B1A", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#4ADE80", position: "0%" },
      { color: "#34D399", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#F4D35E", position: "0%" },
      { color: "#F7E8A3", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "forest",
  displayName: "Forest",
  description: "Organic greens for nature-forward product surfaces.",
  audience: "Sustainability & eco experiences",
  contrastRating: "AA",
  category: "natural",
};

const forestVariant: ThemeVariantPackage = {
  id: "forest",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default forestVariant;

// 2025-11-03T01:34:00-05:00 - Align with brand updates if earthy tones shift.
