export const clamp = (value: number, [min, max]: [number, number]) => {
  return Math.min(max, Math.max(min, value));
};

export const createBoundClamp =
  ([min, max]: [number, number]) =>
  (value: number) =>
    clamp(value, [min, max]);
