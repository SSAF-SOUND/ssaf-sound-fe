import is from '@sindresorhus/is';

import undefined = is.undefined;

export interface DefaultifyOptions<T> {
  matchers: (undefined | null | number | string | ((value: T) => boolean))[];
}

export const defaultify = <T, V>(
  target: T,
  defaultValue: V,
  options: Partial<DefaultifyOptions<T>> = {}
) => {
  const { matchers = [undefined] } = options;

  const match = matchers.some((matcher) => {
    if (typeof matcher === 'function') {
      return matcher(target);
    }
    return matcher === target;
  });

  if (match) return defaultValue;
  return target;
};
