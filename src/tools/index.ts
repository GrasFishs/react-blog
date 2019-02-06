export const delay = (ms: number) =>
  new Promise(r => setTimeout(() => r(), ms));

export const range = (min: number, max: number) =>
  Array.from({ length: max + 1 - min }).map((_, i) => i + min);
