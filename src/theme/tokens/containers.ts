// 2025-11-03T01:38:00-05:00 - Container tokens define canonical sizing for layout primitives.

export interface ContainerTokens {
  sectionMaxWidth: string;
  contentMaxWidth: string;
  cardMinHeight: string;
  cardPadding: string;
  sectionPaddingY: string;
  sectionPaddingX: string;
}

export const containerTokens: ContainerTokens = {
  sectionMaxWidth: "1200px",
  contentMaxWidth: "78rem",
  cardMinHeight: "18rem",
  cardPadding: "1.5rem",
  sectionPaddingY: "4rem",
  sectionPaddingX: "1.5rem",
};

// 2025-11-03T01:38:00-05:00 - Extend with responsive variants as layout breakpoints evolve.
