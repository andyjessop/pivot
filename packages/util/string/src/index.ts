export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Get a random(ish) 10 character string.
 */
export function generateRandomId(length = 10): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return new Array(length)
    .fill(0)
    .reduce((acc) => acc + possible.charAt(Math.floor(Math.random() * possible.length)), '');
}
