// 2025-11-02T22:45:30-05:00 - Defining typography tokens for cohesive text styling.

export interface FontFamilyTokens {
  sans: string;
  heading: string;
  mono: string;
}

export interface FontWeightTokens {
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
}

export interface FontSizeEntry {
  size: string;
  lineHeight: string;
  letterSpacing?: string;
}

export interface FontSizeTokens {
  sm: FontSizeEntry;
  base: FontSizeEntry;
  lg: FontSizeEntry;
  xl: FontSizeEntry;
}

export interface TypographyScale {
  fontFamily: FontFamilyTokens;
  fontWeight: FontWeightTokens;
  fontSize: FontSizeTokens;
}

export const typographyScale: TypographyScale = {
  fontFamily: {
    sans: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
    heading: "var(--font-geist-sans), 'Segoe UI', sans-serif",
    mono: "var(--font-geist-mono), 'Fira Code', monospace",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    sm: { size: "0.875rem", lineHeight: "1.4" },
    base: { size: "1rem", lineHeight: "1.5" },
    lg: { size: "1.25rem", lineHeight: "1.6" },
    xl: { size: "1.5rem", lineHeight: "1.6" },
  },
};

// 2025-11-02T22:45:30-05:00 - Expand by adding locale-specific fonts for internationalization.
