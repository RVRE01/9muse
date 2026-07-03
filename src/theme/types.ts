// 2025-11-03T01:06:00-05:00 - Shared theme type definitions for variant orchestration.

export type ThemeVariantCategory =
  | "core"
  | "natural"
  | "enterprise"
  | "playful";

export type ThemeVariantId =
  | "default"
  | "ocean"
  | "forest"
  | "ember"
  | "orchid"
  | "meadow"
  | "midnight"
  | "solar"
  | "granite"
  | "harvest"
  | "canyon"
  | "sterling"
  | "keystone"
  | "vanguard"
  | "parade"
  | "prism";

export interface ThemePalette {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  background: string;
  foreground: string;
  surface: string;
  surfaceForeground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  ring: string;
  textStrong: string;
  textMuted: string;
}

export interface ThemeGradientTokens {
  background: string;
  surface: string;
  callToAction: string;
  accent: string;
}

export interface ThemeVariantMeta {
  id: ThemeVariantId;
  displayName: string;
  description: string;
  audience: string;
  contrastRating: "AA" | "AAA" | "Needs Review";
  category: ThemeVariantCategory;
  notes?: string;
}

export interface ThemeVariantPackage {
  id: ThemeVariantId;
  light: ThemePalette;
  dark: ThemePalette;
  gradients: {
    light: ThemeGradientTokens;
    dark: ThemeGradientTokens;
  };
  metadata: ThemeVariantMeta;
}

export interface ThemeVariantSummary {
  id: ThemeVariantId;
  displayName: string;
  contrastRating: ThemeVariantMeta["contrastRating"];
}

export type ThemeVariantRegistry = Record<ThemeVariantId, ThemeVariantPackage>;

export const themeVariantIds: ThemeVariantId[] = [
  "default",
  "ocean",
  "forest",
  "ember",
  "orchid",
  "meadow",
  "midnight",
  "solar",
  "granite",
  "harvest",
  "canyon",
  "sterling",
  "keystone",
  "vanguard",
  "parade",
  "prism",
];

// 2025-11-03T01:06:00-05:00 - Extend union/types here when onboarding new theme variants.

export type ThemeStyleId = "smooth" | "neoglass";

export interface RadiiTokens {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ShadowTokens {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  focus: string;
  control: string;
  interactive: string;
}

export interface GlowTokens {
  light: string;
  medium: string;
  strong: string;
}

export interface ThemeStyleMeta {
  id: ThemeStyleId;
  displayName: string;
  description: string;
  audience: string;
  principles: readonly string[];
  notes?: string;
}

export type ThemeStyleMetadataEntry = ThemeStyleMeta;

export interface ThemeStyleTokenSet {
  radii: RadiiTokens;
  shadows: ShadowTokens;
  glows: GlowTokens;
}

export interface ThemeStylePackage {
  id: ThemeStyleId;
  tokens: ThemeStyleTokenSet;
  metadata: ThemeStyleMeta;
}

export interface ThemeStyleSummary {
  id: ThemeStyleId;
  displayName: string;
  description: string;
}

export type ThemeStyleRegistry = Record<ThemeStyleId, ThemeStylePackage>;

// 2025-11-03T07:45:00-05:00 - Extend style unions/types here when introducing new surface treatments.

export const themeStyleIds: ThemeStyleId[] = ["smooth", "neoglass"];
