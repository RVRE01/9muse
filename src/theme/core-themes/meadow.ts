// 2025-11-03T01:42:00-05:00 - Meadow variant blends fresh greens and soft yellows.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#65A30D",
  primaryForeground: "#FFFFFF",
  secondary: "#FACC15",
  secondaryForeground: "#3C2A00",
  accent: "#4ADE80",
  accentForeground: "#022C22",
  success: "#22C55E",
  warning: "#F97316",
  danger: "#DC2626",
  info: "#0EA5E9",
  background: "#FCFDF5",
  foreground: "#112006",
  surface: "#F5FBEA",
  surfaceForeground: "#112006",
  card: "#F8FCEB",
  cardForeground: "#112006",
  muted: "#E5F4CF",
  mutedForeground: "#375423",
  border: "#CCE8A0",
  ring: "#84CC16",
  textStrong: "#112006",
  textMuted: "#4D6C31",
};

const darkPalette: ThemePalette = {
  primary: "#A3E635",
  primaryForeground: "#142902",
  secondary: "#3F6212",
  secondaryForeground: "#E3FBC5",
  accent: "#4ADE80",
  accentForeground: "#142902",
  success: "#34D399",
  warning: "#FB923C",
  danger: "#F87171",
  info: "#22D3EE",
  background: "#101F06",
  foreground: "#E7FBCF",
  surface: "#152C0A",
  surfaceForeground: "#E7FBCF",
  card: "#1C380F",
  cardForeground: "#E7FBCF",
  muted: "#274514",
  mutedForeground: "#BEE88A",
  border: "#31571C",
  ring: "#A3E635",
  textStrong: "#F4FFE2",
  textMuted: "#BEE88A",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FCFDF5", position: "0%" },
      { color: "#F1F9DD", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "135deg",
    stops: [
      { color: "#F8FCEB", position: "0%" },
      { color: "#E2F5C6", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#65A30D", position: "0%" },
      { color: "#A3E635", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#4ADE80", position: "0%" },
      { color: "#BBF7D0", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#101F06", position: "0%" },
      { color: "#1D3710", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "135deg",
    stops: [
      { color: "#152C0A", position: "0%" },
      { color: "#254615", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#A3E635", position: "0%" },
      { color: "#84CC16", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#4ADE80", position: "0%" },
      { color: "#86EFAC", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "meadow",
  displayName: "Meadow",
  description: "Fresh meadow hues suited for wellness and lifestyle products.",
  audience: "Health & lifestyle",
  contrastRating: "AA",
  category: "natural",
};

const meadowVariant: ThemeVariantPackage = {
  id: "meadow",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default meadowVariant;

// 2025-11-03T01:42:00-05:00 - Revisit palette when sustainable initiatives require new accent colors.
