// 2025-11-03T12:20:00-05:00 - Vanguard variant balances deep navy and jade for executive workspaces.

import { freezeGradients, linearGradient } from "../gradients";
import type {
  ThemeGradientTokens,
  ThemePalette,
  ThemeVariantMeta,
  ThemeVariantPackage,
} from "../types";

const lightPalette: ThemePalette = {
  primary: "#1E3A8A",
  primaryForeground: "#F8FAFC",
  secondary: "#0F172A",
  secondaryForeground: "#E2E8F0",
  accent: "#0F766E",
  accentForeground: "#F0FDFA",
  success: "#166534",
  warning: "#B45309",
  danger: "#B91C1C",
  info: "#1D4ED8",
  background: "#F2F6FB",
  foreground: "#0F172A",
  surface: "#E2E8F0",
  surfaceForeground: "#0F172A",
  card: "#E8EEF8",
  cardForeground: "#0F172A",
  muted: "#CBD5F5",
  mutedForeground: "#1E3A8A",
  border: "#C1D0EC",
  ring: "#1E3A8A",
  textStrong: "#0B1120",
  textMuted: "#334155",
};

const darkPalette: ThemePalette = {
  primary: "#60A5FA",
  primaryForeground: "#061127",
  secondary: "#0B172F",
  secondaryForeground: "#E2E8F0",
  accent: "#22D3BF",
  accentForeground: "#052321",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#F87171",
  info: "#60A5FA",
  background: "#020617",
  foreground: "#E2E8F0",
  surface: "#07122B",
  surfaceForeground: "#E2E8F0",
  card: "#0D1B38",
  cardForeground: "#E2E8F0",
  muted: "#14284A",
  mutedForeground: "#9CB7FB",
  border: "#14284A",
  ring: "#60A5FA",
  textStrong: "#F8FAFC",
  textMuted: "#A5B4FC",
};

const lightGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#FFFFFF", position: "0%" },
      { color: "#EDF3FF", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "158deg",
    stops: [
      { color: "#E8EEF8", position: "0%" },
      { color: "#D4E3FD", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#1E3A8A", position: "0%" },
      { color: "#0F766E", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#0F766E", position: "0%" },
      { color: "#22D3BF", position: "100%" },
    ],
  }),
});

const darkGradients: ThemeGradientTokens = freezeGradients({
  background: linearGradient({
    stops: [
      { color: "#020617", position: "0%" },
      { color: "#0D1B38", position: "100%" },
    ],
  }),
  surface: linearGradient({
    angle: "158deg",
    stops: [
      { color: "#07122B", position: "0%" },
      { color: "#13274B", position: "100%" },
    ],
  }),
  callToAction: linearGradient({
    stops: [
      { color: "#60A5FA", position: "0%" },
      { color: "#22D3BF", position: "100%" },
    ],
  }),
  accent: linearGradient({
    stops: [
      { color: "#22D3BF", position: "0%" },
      { color: "#0F766E", position: "100%" },
    ],
  }),
});

const metadata: ThemeVariantMeta = {
  id: "vanguard",
  displayName: "Vanguard",
  description: "Navy and jade palette designed for executive dashboards.",
  audience: "Enterprise workflow suites",
  contrastRating: "AAA",
  category: "enterprise",
};

const vanguardVariant: ThemeVariantPackage = {
  id: "vanguard",
  light: lightPalette,
  dark: darkPalette,
  gradients: {
    light: lightGradients,
    dark: darkGradients,
  },
  metadata,
};

export default vanguardVariant;

// 2025-11-03T12:20:00-05:00 - Adjust navy depth when executive dashboards refresh typography.
