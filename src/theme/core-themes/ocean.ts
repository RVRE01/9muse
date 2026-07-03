// 2025-11-03T01:32:00-05:00 - Ocean variant highlights cool aquatic blues.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#0A84FF",
  primaryForeground: "#FFFFFF",
  secondary: "#4CD2FF",
  secondaryForeground: "#003049",
  accent: "#5EEAD4",
  accentForeground: "#022C22",
  success: "#0EA5E9",
  warning: "#F97316",
  danger: "#EF4444",
  info: "#14B8A6",
  background: "#F7FBFF",
  foreground: "#012A4A",
  surface: "#E3F2FD",
  surfaceForeground: "#012A4A",
  card: "#EAF6FF",
  cardForeground: "#012A4A",
  muted: "#CFE7F8",
  mutedForeground: "#1E5675",
  border: "#A6D4FF",
  ring: "#50B5FF",
  textStrong: "#012A4A",
  textMuted: "#2F6287",
};

const darkPalette: ThemePalette = {
  primary: "#64B5FF",
  primaryForeground: "#001F33",
  secondary: "#0A5275",
  secondaryForeground: "#D5F4FF",
  accent: "#22D3EE",
  accentForeground: "#012A4A",
  success: "#38BDF8",
  warning: "#FB923C",
  danger: "#F87171",
  info: "#2DD4BF",
  background: "#021827",
  foreground: "#D5F4FF",
  surface: "#03253B",
  surfaceForeground: "#D5F4FF",
  card: "#042E4A",
  cardForeground: "#D5F4FF",
  muted: "#0B3B5A",
  mutedForeground: "#7BC3E6",
  border: "#0D4C72",
  ring: "#64B5FF",
  textStrong: "#F0FAFF",
  textMuted: "#7BC3E6",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#E0F7FA", position: "0%" },
      { color: "#CFF4FF", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "150deg",
    stops: [
      { color: "#EAF6FF", position: "0%" },
      { color: "#C4E9FF", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#0A84FF", position: "0%" },
      { color: "#00B4FF", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#5EEAD4", position: "0%" },
      { color: "#99F6E4", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#021827", position: "0%" },
      { color: "#05304A", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "150deg",
    stops: [
      { color: "#03253B", position: "0%" },
      { color: "#06405E", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#64B5FF", position: "0%" },
      { color: "#3CA7FF", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#22D3EE", position: "0%" },
      { color: "#67E8F9", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "ocean",
  displayName: "Ocean",
  description: "Vibrant aqua tones inspired by coastal palettes.",
  audience: "Analytics & data experiences",
  contrastRating: "AA",
  category: "core",
};

const oceanVariant: ThemeVariantPackage = {
  id: "ocean",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default oceanVariant;

// 2025-11-03T01:32:00-05:00 - Update when maritime rebrands adjust base hues.
