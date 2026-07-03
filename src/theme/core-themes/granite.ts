// 2025-11-03T11:58:00-05:00 - Granite variant delivers stoic neutrals for enterprise control centers.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#1F2937",
  primaryForeground: "#F9FAFB",
  secondary: "#374151",
  secondaryForeground: "#F9FAFB",
  accent: "#2563EB",
  accentForeground: "#F9FAFB",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#0EA5E9",
  background: "#F3F4F6",
  foreground: "#111827",
  surface: "#E5E7EB",
  surfaceForeground: "#111827",
  card: "#E8EBF5",
  cardForeground: "#111827",
  muted: "#D1D5DB",
  mutedForeground: "#374151",
  border: "#C7CEDB",
  ring: "#4B5563",
  textStrong: "#0F172A",
  textMuted: "#4B5563",
};

const darkPalette: ThemePalette = {
  primary: "#94A3B8",
  primaryForeground: "#0B1120",
  secondary: "#1F2937",
  secondaryForeground: "#E5E7EB",
  accent: "#3B82F6",
  accentForeground: "#0B1120",
  success: "#22C55E",
  warning: "#FACC15",
  danger: "#F87171",
  info: "#38BDF8",
  background: "#020617",
  foreground: "#E2E8F0",
  surface: "#0F172A",
  surfaceForeground: "#E2E8F0",
  card: "#111C35",
  cardForeground: "#E2E8F0",
  muted: "#1E293B",
  mutedForeground: "#94A3B8",
  border: "#1E293B",
  ring: "#94A3B8",
  textStrong: "#F8FAFC",
  textMuted: "#94A3B8",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FFFFFF", position: "0%" },
      { color: "#F1F5F9", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "160deg",
    stops: [
      { color: "#F3F4F6", position: "0%" },
      { color: "#E2E8F0", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#1F2937", position: "0%" },
      { color: "#374151", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#2563EB", position: "0%" },
      { color: "#60A5FA", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#020617", position: "0%" },
      { color: "#0F172A", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "160deg",
    stops: [
      { color: "#0F172A", position: "0%" },
      { color: "#1E293B", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#94A3B8", position: "0%" },
      { color: "#CBD5F5", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#3B82F6", position: "0%" },
      { color: "#60A5FA", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "granite",
  displayName: "Granite",
  description: "Stoic charcoal neutrals for enterprise command centers.",
  audience: "Mission-critical operations",
  contrastRating: "AAA",
  category: "enterprise",
};

const graniteVariant: ThemeVariantPackage = {
  id: "granite",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default graniteVariant;

// 2025-11-03T11:58:00-05:00 - Adjust neutral ramps when enterprise branding updates typography contrast.
