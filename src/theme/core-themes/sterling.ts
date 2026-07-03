// 2025-11-03T12:12:00-05:00 - Sterling variant brings refined blues and silvers for enterprise governance.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#1E40AF",
  primaryForeground: "#F8FAFC",
  secondary: "#0F172A",
  secondaryForeground: "#E2E8F0",
  accent: "#3B82F6",
  accentForeground: "#0B1120",
  success: "#15803D",
  warning: "#B45309",
  danger: "#B91C1C",
  info: "#2563EB",
  background: "#F5F7FA",
  foreground: "#0F172A",
  surface: "#E2E8F0",
  surfaceForeground: "#0F172A",
  card: "#E5EDFF",
  cardForeground: "#0F172A",
  muted: "#CBD5F5",
  mutedForeground: "#1E3A8A",
  border: "#C7D2FE",
  ring: "#3B82F6",
  textStrong: "#0B1120",
  textMuted: "#334155",
};

const darkPalette: ThemePalette = {
  primary: "#93C5FD",
  primaryForeground: "#061127",
  secondary: "#0F172A",
  secondaryForeground: "#E2E8F0",
  accent: "#60A5FA",
  accentForeground: "#061127",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#F87171",
  info: "#38BDF8",
  background: "#020617",
  foreground: "#E2E8F0",
  surface: "#0B1120",
  surfaceForeground: "#E2E8F0",
  card: "#0F172A",
  cardForeground: "#E2E8F0",
  muted: "#1E293B",
  mutedForeground: "#A5B4FC",
  border: "#1E293B",
  ring: "#60A5FA",
  textStrong: "#F8FAFC",
  textMuted: "#CBD5F5",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FFFFFF", position: "0%" },
      { color: "#EBF0FF", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "155deg",
    stops: [
      { color: "#E5EDFF", position: "0%" },
      { color: "#CFDBFF", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#1E40AF", position: "0%" },
      { color: "#3B82F6", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#3B82F6", position: "0%" },
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
    angle: "155deg",
    stops: [
      { color: "#0B1120", position: "0%" },
      { color: "#18264A", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#93C5FD", position: "0%" },
      { color: "#60A5FA", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#60A5FA", position: "0%" },
      { color: "#3B82F6", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "sterling",
  displayName: "Sterling",
  description: "Executive silver-blue palette for governance dashboards.",
  audience: "Enterprise leadership",
  contrastRating: "AAA",
  category: "enterprise",
};

const sterlingVariant: ThemeVariantPackage = {
  id: "sterling",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default sterlingVariant;

// 2025-11-03T12:12:00-05:00 - Revise metallic accents when governance modules adopt new iconography.
