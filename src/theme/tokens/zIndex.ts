// 2025-11-03T01:25:00-05:00 - Z-index tokens codify stacking contexts for predictable layering.

export interface ZIndexTokens {
  auto: string;
  base: number;
  dropdown: number;
  sticky: number;
  banner: number;
  overlay: number;
  modal: number;
  popover: number;
  tooltip: number;
}

export const zIndexTokens: ZIndexTokens = {
  auto: "auto",
  base: 1,
  dropdown: 10,
  sticky: 20,
  banner: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
};

// 2025-11-03T01:25:00-05:00 - Adjust values if new overlay primitives demand higher precedence.
