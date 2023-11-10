export const concat = <T>(a: T[], b: T[]) => a.concat(b);
export const add = (a: number, b: number) => a + b;

// [min, min+1, ..., max]
export const range = (min: number, max: number) => {
  if (min > max) return [];

  if (min === max) return [min];

  return Array(max - min + 1)
    .fill(undefined)
    .map((_, index) => index + min);
};

export const deduplicate = <T extends unknown[]>(arr: T) => {
  return [...new Set(arr)] as T;
};
