// 2025-11-03T12:24:00-05:00 - Parade variant celebrates playful festival hues for marketing moments.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#F97316",
  primaryForeground: "#1F0A02",
  secondary: "#FB7185",
  secondaryForeground: "#3B0A0F",
  accent: "#22D3EE",
  accentForeground: "#032029",
  success: "#16A34A",
  warning: "#EAB308",
  danger: "#DC2626",
  info: "#6366F1",
  background: "#FFF4ED",
  foreground: "#2C0A04",
  surface: "#FFE4D5",
  surfaceForeground: "#2C0A04",
  card: "#FFE9DE",
  cardForeground: "#2C0A04",
  muted: "#FBD5C2",
  mutedForeground: "#7C2D12",
  border: "#F6B59C",
  ring: "#FB7185",
  textStrong: "#2C0A04",
  textMuted: "#7C2D12",
};

const darkPalette: ThemePalette = {
  primary: "#FB923C",
  primaryForeground: "#2C0A04",
  secondary: "#F472B6",
  secondaryForeground: "#3B0A0F",
  accent: "#22D3EE",
  accentForeground: "#032029",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#F87171",
  info: "#A78BFA",
  background: "#170503",
  foreground: "#FFE4E6",
  surface: "#240B07",
  surfaceForeground: "#FFE4E6",
  card: "#2F0F0B",
  cardForeground: "#FFE4E6",
  muted: "#4A1B14",
  mutedForeground: "#FB7185",
  border: "#5C2218",
  ring: "#FB7185",
  textStrong: "#FFF1F2",
  textMuted: "#FCA5A5",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FFF4ED", position: "0%" },
      { color: "#FFE4D5", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "150deg",
    stops: [
      { color: "#FFE9DE", position: "0%" },
      { color: "#FBD5C2", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#F97316", position: "0%" },
      { color: "#FB7185", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#22D3EE", position: "0%" },
      { color: "#67E8F9", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#170503", position: "0%" },
      { color: "#2F0F0B", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "150deg",
    stops: [
      { color: "#240B07", position: "0%" },
      { color: "#401713", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#FB923C", position: "0%" },
      { color: "#F472B6", position: "100%" },
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
  id: "parade",
  displayName: "Parade",
  description: "Festival-inspired palette built for joyful campaign surfaces.",
  audience: "Marketing landing experiences",
  contrastRating: "AA",
  category: "playful",
};

const paradeVariant: ThemeVariantPackage = {
  id: "parade",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default paradeVariant;

// 2025-11-03T12:24:00-05:00 - Refresh neon accents when seasonal campaigns update art direction.
