import { useMemo } from 'react';

export const useYears = () => {
  const maxYear = 10;
  const years = useMemo(
    () =>
      Array(maxYear)
        .fill(undefined)
        .map((_, i) => i + 1),
    []
  );

  return { data: years };
};
