// 2025-11-03T12:08:00-05:00 - Canyon variant channels desert sandstone gradients for outdoor narratives.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#C2410C",
  primaryForeground: "#FFF7ED",
  secondary: "#EA580C",
  secondaryForeground: "#2C0A02",
  accent: "#F97316",
  accentForeground: "#2C0A02",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#0EA5E9",
  background: "#FFF3E4",
  foreground: "#2C0A02",
  surface: "#FBE0C4",
  surfaceForeground: "#2C0A02",
  card: "#FDE6CF",
  cardForeground: "#2C0A02",
  muted: "#F2C49E",
  mutedForeground: "#7C3413",
  border: "#E7B48D",
  ring: "#F97316",
  textStrong: "#2C0A02",
  textMuted: "#7C3413",
};

const darkPalette: ThemePalette = {
  primary: "#FB923C",
  primaryForeground: "#2C0A02",
  secondary: "#9A3412",
  secondaryForeground: "#FED7AA",
  accent: "#F97316",
  accentForeground: "#2C0A02",
  success: "#22C55E",
  warning: "#FACC15",
  danger: "#F87171",
  info: "#2DD4BF",
  background: "#190803",
  foreground: "#FED7AA",
  surface: "#241006",
  surfaceForeground: "#FED7AA",
  card: "#2D1708",
  cardForeground: "#FED7AA",
  muted: "#4A2610",
  mutedForeground: "#FB923C",
  border: "#5C2F13",
  ring: "#FB923C",
  textStrong: "#FFF0E0",
  textMuted: "#FDBA74",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FFF3E4", position: "0%" },
      { color: "#FBD8B2", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "142deg",
    stops: [
      { color: "#FDE6CF", position: "0%" },
      { color: "#F5BE8A", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#C2410C", position: "0%" },
      { color: "#EA580C", position: "100%" },
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
      { color: "#190803", position: "0%" },
      { color: "#2D1708", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "142deg",
    stops: [
      { color: "#241006", position: "0%" },
      { color: "#3A1E0D", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#FB923C", position: "0%" },
      { color: "#EA580C", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#F97316", position: "0%" },
      { color: "#FDBA74", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "canyon",
  displayName: "Canyon",
  description: "Sun-etched sandstone palette for outdoor adventure surfaces.",
  audience: "Travel & exploration",
  contrastRating: "AA",
  category: "natural",
};

const canyonVariant: ThemeVariantPackage = {
  id: "canyon",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default canyonVariant;

// 2025-11-03T12:08:00-05:00 - Revisit terracotta hues when outdoor imagery brand shifts.
