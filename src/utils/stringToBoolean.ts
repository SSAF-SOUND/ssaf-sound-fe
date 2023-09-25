import { hasOwnProperty } from '~/utils/hasOwnProperty';

type StringToBooleanOptions = Partial<{
  exact: boolean;
}>;

/**
 * - `'true'` -> `true`로 변환
 * - 그 외 -> `false`로 변환
 */
export const stringToBoolean = (
  str?: string,
  options: StringToBooleanOptions = {}
) => {
  const { exact } = options;

  if (exact) {
    if (str && hasOwnProperty(map, str)) {
      return map[str];
    } else {
      throw new Error(
        `[In stringToBoolean]: 올바른 파라미터가 전달되지 않았습니다. str: ${str}`
      );
    }
  }

  return str === 'true';
};

const map = {
  true: true,
  false: false,
};
