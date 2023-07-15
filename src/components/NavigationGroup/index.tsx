import { css } from '@emotion/react';

import { Gnb } from '~/components/Common';
import TopBar from '~/components/TopBar';
import {
  globalVars,
  pageMaxWidth,
  pageMinWidth,
  position,
} from '~/styles/utils';

const NavigationGroup = () => {
  return (
    <>
      <TopBar css={[barCss, position.y('start', 'fixed')]} />
      <Gnb css={[barCss, position.y('end', 'fixed')]} />
    </>
  );
};

export default NavigationGroup;

const barCss = css({
  minWidth: pageMinWidth,
  maxWidth: pageMaxWidth,
  width: '100%',
  marginLeft: `calc(-1 * ${globalVars.mainLayoutPaddingX.var})`,
});
