interface IsEqualStringOptions {
  caseSensitive?: boolean;
}

export const isEqualString = (
  a: string,
  b: string,
  options: IsEqualStringOptions = {}
) => {
  const { caseSensitive = true } = options;

  if (caseSensitive) return a === b;
  return a.toLowerCase() === b.toLowerCase();
};
