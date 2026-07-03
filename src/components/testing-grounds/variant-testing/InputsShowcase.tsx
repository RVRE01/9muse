'use client';

// 2025-11-03T05:33:00-05:00 - Form control showcase leveraging shared input primitives.

import { InputVariantCard, inputVariants } from '@/components/ui/input';

/**
 * Renders the full catalogue of form controls (text, phone, checkbox, etc.) using the shared input primitives.
 * Includes live validation, autoplay formatting, and numbered variant identifiers.
 */
export function InputsShowcase() {
  return (
    <section className="flex flex-col gap-md" aria-labelledby="inputs-showcase-heading">
      <header className="flex flex-col gap-xs">
        <h3 id="inputs-showcase-heading" className="text-lg font-semibold text-foreground">
          Form control gallery
        </h3>
        <p className="text-sm text-muted-foreground">
          Fifteen controls exercise shared token styling, Day.js date logic, Zod validation, and phone formatting fallbacks.
        </p>
      </header>
      <div className="grid gap-md md:grid-cols-2 xl:grid-cols-3">
        {inputVariants.map((definition) => (
          <InputVariantCard key={definition.id} definition={definition} />
        ))}
      </div>
    </section>
  );
}
