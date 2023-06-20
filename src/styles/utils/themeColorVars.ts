import { toCssVar } from './toCssVar';

/**
 * data-theme=""
 * 어트리뷰트를 가지는 엘리먼트에서 사용할 수 있는 CSS 변수
 */
export const themeColorVars = {
  mainColor: toCssVar('mainColor'),
  mainLightColor: toCssVar('mainLightColor'),
  mainDarkColor: toCssVar('mainDarkColor'),
  mainDarkenColor: toCssVar('mainDarkenColor'),
  mainDarkestColor: toCssVar('mainDarkestColor'),
};
