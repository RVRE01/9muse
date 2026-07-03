// 2025-11-03T05:24:00-05:00 - Phone number utilities supporting international formatting fallback.

/**
 * Formats a provided phone number into (XXX) XXX-XXXX style when possible.
 * Falls back to returning the sanitized international string if area code alignment fails.
 */
export function formatPhoneNumber(raw: string, defaultCountry: 'US' | 'INTL' = 'US'): string {
  const sanitized = raw.replace(/[^0-9+]/g, '');

  if (sanitized.length === 0) {
    return '';
  }

  if (sanitized.startsWith('+')) {
    const [, code = '+', rest = ''] = sanitized.match(/^(\+[0-9]{1,3})([0-9]*)$/) ?? [];
    return rest ? `${code} ${rest}`.trim() : code;
  }

  const digits = sanitized.replace(/\D/g, '');
  if (digits.length <= 3) {
    return digits;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`.trim();
  }

  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const lineNumber = digits.slice(6, 10);
  const remainder = digits.slice(10);
  const formatted = `(${area}) ${prefix}-${lineNumber}`;

  if (!remainder) {
    return formatted;
  }

  return defaultCountry === 'US' ? `${formatted} ${remainder}` : `${formatted} ${remainder}`.trim();
}

/**
 * Coerces phone input to a sanitized number ensuring no alphabetic values slip through.
 */
export function sanitizePhoneNumber(raw: string): string {
  return raw.replace(/[^0-9+]/g, '');
}
