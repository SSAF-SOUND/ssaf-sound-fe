export const toCssVar = (str: string) => {
  return {
    var: `var(--${str})`,
    varName: `--${str}`,
  } as const;
};
