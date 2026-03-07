export function formatPhoneNumber(value: string | undefined | null): string {
  if (!value) return '+994 ';

  let cleaned = value.replace(/[^\d+]/g, '');

  if (!cleaned.startsWith('+994')) {
    cleaned = '+994' + cleaned.replace(/^\+?(994)?/, '');
  }

  const plainNumber = cleaned.slice(4);

  let formatted = '+994';
  if (plainNumber.length > 0) {
    formatted += ' ' + plainNumber.slice(0, 2);
  }
  if (plainNumber.length > 2) {
    formatted += ' ' + plainNumber.slice(2, 5);
  }
  if (plainNumber.length > 5) {
    formatted += ' ' + plainNumber.slice(5, 7);
  }
  if (plainNumber.length > 7) {
    formatted += ' ' + plainNumber.slice(7, 9);
  }

  return formatted;
}
