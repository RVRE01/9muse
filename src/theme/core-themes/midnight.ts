// 2025-11-03T01:44:00-05:00 - Midnight variant provides deep nocturnal blues for high-contrast dashboards.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#1D4ED8",
  primaryForeground: "#FFFFFF",
  secondary: "#3B82F6",
  secondaryForeground: "#0B1120",
  accent: "#38BDF8",
  accentForeground: "#082F49",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#2563EB",
  background: "#F1F5FF",
  foreground: "#0B1120",
  surface: "#E2E8FF",
  surfaceForeground: "#0B1120",
  card: "#E5EBFF",
  cardForeground: "#0B1120",
  muted: "#CBD5F5",
  mutedForeground: "#1E3A8A",
  border: "#94A3DC",
  ring: "#3B82F6",
  textStrong: "#0B1120",
  textMuted: "#334155",
};

const darkPalette: ThemePalette = {
  primary: "#60A5FA",
  primaryForeground: "#030712",
  secondary: "#1D4ED8",
  secondaryForeground: "#E2E8F0",
  accent: "#38BDF8",
  accentForeground: "#0B1120",
  success: "#22C55E",
  warning: "#FACC15",
  danger: "#F87171",
  info: "#60A5FA",
  background: "#010314",
  foreground: "#E2E8F0",
  surface: "#050B1F",
  surfaceForeground: "#E2E8F0",
  card: "#0B122F",
  cardForeground: "#E2E8F0",
  muted: "#111C3F",
  mutedForeground: "#8EA4D6",
  border: "#1C2A4E",
  ring: "#60A5FA",
  textStrong: "#F8FAFC",
  textMuted: "#94A3B8",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#F1F5FF", position: "0%" },
      { color: "#E0E7FF", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "140deg",
    stops: [
      { color: "#E5EBFF", position: "0%" },
      { color: "#CBD5F5", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#1D4ED8", position: "0%" },
      { color: "#3B82F6", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#38BDF8", position: "0%" },
      { color: "#7DD3FC", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#010314", position: "0%" },
      { color: "#0B122F", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "140deg",
    stops: [
      { color: "#050B1F", position: "0%" },
      { color: "#162447", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#60A5FA", position: "0%" },
      { color: "#3B82F6", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#38BDF8", position: "0%" },
      { color: "#0EA5E9", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "midnight",
  displayName: "Midnight",
  description: "High-contrast midnight blues tailored for observability dashboards.",
  audience: "Ops & reporting",
  contrastRating: "AAA",
  category: "core",
};

const midnightVariant: ThemeVariantPackage = {
  id: "midnight",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default midnightVariant;

// 2025-11-03T01:44:00-05:00 - Monitor luminance levels if analytics UI introduces new color requirements.
