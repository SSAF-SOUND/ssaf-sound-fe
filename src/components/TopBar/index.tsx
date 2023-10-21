import { css } from '@emotion/react';

import { Bar } from '~/components/Common/Bar';
import { Logo } from '~/components/Common/Logo';
import { topBarHeight, fixTopCenter, zIndex, palettes } from '~/styles/utils';

import { PrivateButtonsLayer } from './PrivateButtonsLayer';

interface TopBarProps {
  className?: string;
  withoutBorderBottom?: boolean;
}

const TopBar = (props: TopBarProps) => {
  const { withoutBorderBottom } = props;
  /**
   * LATER
   *   const { data: notification } = useNotification();
   *   const { data: hasUnreadMessage } = useHasUnreadMessage();
   */
  return (
    <Bar
      css={[selfCss, !withoutBorderBottom && borderBottomCss]}
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

const borderBottomCss = css({
  borderBottom: `1px solid ${palettes.border.dark}`,
});
