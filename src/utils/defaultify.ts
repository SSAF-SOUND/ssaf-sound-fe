export const defaultify = <T>(
  target: T,
  matchers: (null | undefined | number | string | ((value: T) => boolean))[] = [
    undefined,
  ]
) => {
  return {
    to: <V>(defaultValue: V) => {
      const match = matchers.some((matcher) => {
        if (typeof matcher === 'function') {
          return matcher(target);
        }
        return Object.is(target, matcher);
      });

      return match ? defaultValue : target;
    },
  };
};
