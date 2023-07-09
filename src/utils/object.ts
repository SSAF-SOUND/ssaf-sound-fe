export const pickBy = <O extends object>(
  predicate: ([a, b]: [string, O[keyof O]]) => boolean,
  obj: O
) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([k, v]) => predicate([k, v]))
  ) as Partial<O>;
};
