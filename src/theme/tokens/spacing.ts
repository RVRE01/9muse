// 2025-11-03T01:20:00-05:00 - Expanding spacing tokens for layered density and responsive layouts.

export interface SpacingScale {
  none: string;
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
  giant: string;
}

export const spacingScale: SpacingScale = {
  none: "0px",
  xxs: "0.25rem",
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1.25rem",
  lg: "2rem",
  xl: "3rem",
  xxl: "4rem",
  xxxl: "5rem",
  giant: "6rem",
};

// 2025-11-03T01:20:00-05:00 - Add responsive aliases (e.g., breakpoint-prefixed keys) as grid requirements emerge.
