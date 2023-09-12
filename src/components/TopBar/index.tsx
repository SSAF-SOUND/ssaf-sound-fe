import { css } from '@emotion/react';

import { Bar, Logo } from '~/components/Common';
import { topBarHeight, fixTopCenter, zIndex } from '~/styles/utils';

import { PrivateButtonsLayer } from './PrivateButtonsLayer';

interface TopBarProps {
  className?: string;
}

const TopBar = (props: TopBarProps) => {
  /**
   * LATER
   *   const { data: notification } = useNotification();
   *   const { data: hasUnreadMessage } = useHasUnreadMessage();
   */
  return (
    <Bar
      css={selfCss}
      {...props}
      left={<Logo navigateToMainPage />}
      right={<PrivateButtonsLayer />}
    />
  );
};

export default TopBar;

const selfCss = css(
  {
    transition: 'opacity 200ms',
    padding: '0 25px',
    zIndex: zIndex.fixed.normal,
    height: topBarHeight,
  },
  fixTopCenter
);
