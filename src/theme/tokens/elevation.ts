// 2025-11-03T01:23:00-05:00 - Elevation tokens capture z-axis ordering for layered UI surfaces.

export interface ElevationTokens {
  base: number;
  raised: number;
  overlay: number;
  modal: number;
  popover: number;
  tooltip: number;
}

export const elevationTokens: ElevationTokens = {
  base: 0,
  raised: 10,
  overlay: 20,
  modal: 30,
  popover: 40,
  tooltip: 50,
};

// 2025-11-03T01:23:00-05:00 - Adjust or extend indices when introducing new stacked surfaces (e.g., command palette).
