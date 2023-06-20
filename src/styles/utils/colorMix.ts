/**
 * - 두 가지 색상을 `percentage`% 섞습니다.
 * - `color2`의 기본값은 `transparent`로, 명시하지 않으면 투명도를 조절하는것과 같은 효과입니다.
 */
export const colorMix = (
  percentage: `${string}%`,
  color1: string,
  color2 = 'transparent'
) => {
  return `color-mix(in srgb, ${color1} ${percentage}, ${color2})`;
};
