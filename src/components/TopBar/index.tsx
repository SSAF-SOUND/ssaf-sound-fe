import { css } from '@emotion/react';

import { Bar, Icon, Logo } from '~/components/Common';
import Dot from '~/components/Common/Dot';
import { flex } from '~/styles/utils';

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
      {...props}
      left={<Logo navigateToHome />}
      right={
        <div css={rightSelfCss}>
          <div css={rightIconContainerCss}>
            <Dot size="md" theme="secondary" />
            <Icon name="notification" size={iconSize} />
          </div>
          <div css={rightIconContainerCss}>
            <Dot size="md" theme="secondary" />
            <Icon name="chat" size={iconSize} />
          </div>
        </div>
      }
    />
  );
};

export default TopBar;

const iconSize = 28;
const iconContainerGap = 4;
const iconContainerWidth = iconSize + iconContainerGap + 10;

const rightSelfCss = css(flex('center', '', 'row', 10));
const rightIconContainerCss = css(
  { minWidth: iconContainerWidth },
  flex('center', 'flex-end', 'row', iconContainerGap)
);
