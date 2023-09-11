/**
 * - `'true'` -> `true`로 변환
 * - 그 외 -> `false`로 변환
 */
export const stringToBoolean = (str: string) => {
  return str === 'true';
};
