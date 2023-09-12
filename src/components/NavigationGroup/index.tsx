import { css } from '@emotion/react';

import { Gnb } from '~/components/Common';
import TopBar from '~/components/TopBar';

interface NavigationGroupProps {
  hide?: boolean;
}

const NavigationGroup = (props: NavigationGroupProps) => {
  const { hide } = props;
  return (
    <>
      <TopBar css={hide && hideCss} />
      <Gnb css={hide && hideCss} />
    </>
  );
};

export default NavigationGroup;

const hideCss = css({
  opacity: 0,
  pointerEvents: 'none',
});
