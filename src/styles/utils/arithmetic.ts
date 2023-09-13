type CssArithmeticValue<T extends string> = (
  a: number | string,
  b: number | string
) => `calc(${string} ${T} ${string})`;

const cssArithmeticCore =
  <T extends string>(operator: T): CssArithmeticValue<T> =>
  (a, b) => {
    const parsedA = typeof a === 'number' ? `${a}px` : a;
    const parsedB = typeof b === 'number' ? `${b}px` : b;
    return `calc(${parsedA} ${operator} ${parsedB})`;
  };

export const cssArithmetic = {
  multiply: cssArithmeticCore('*'),
  subtract: cssArithmeticCore('-'),
  add: cssArithmeticCore('+'),
} as const;
