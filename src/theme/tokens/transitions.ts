// 2025-11-03T01:24:00-05:00 - Defining motion tokens to standardize animation timing curves.

export interface TransitionTokens {
  fast: string;
  base: string;
  slow: string;
  easingIn: string;
  easingOut: string;
  easingInOut: string;
}

export const transitionTokens: TransitionTokens = {
  fast: "150ms",
  base: "250ms",
  slow: "400ms",
  easingIn: "cubic-bezier(0.4, 0, 1, 1)",
  easingOut: "cubic-bezier(0, 0, 0.2, 1)",
  easingInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
};

// 2025-11-03T01:24:00-05:00 - Add spring-based tokens here when motion design expands beyond cubic-bezier curves.
