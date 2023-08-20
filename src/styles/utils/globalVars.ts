import { toCssVar } from '~/styles/utils/toCssVar';

export const globalVars = {
  mainLayoutPaddingX: toCssVar('mainLayoutPaddingX'),
  /**
   * - `radix-ui`에서 `Dialog`, `SelectBox`등 일부 컴포넌트의 `active`상태에 따라 스크롤바가 지워지며, 이 때 지워진 스크롤바의 `size`를 `css variable`로 주입해줍니다.
   * - 이로인해 `position`이 `fixed`인 요소들의 레이아웃에 버그가 발생해서, 이 버그를 해결하기 위해 `removed-body-scroll-bar-size` css variable 을 사용해야합니다.
   * - issue: https://github.com/radix-ui/primitives/discussions/1100
   */
  removedBodyScrollBarSize: toCssVar('removed-body-scroll-bar-size'),
};
