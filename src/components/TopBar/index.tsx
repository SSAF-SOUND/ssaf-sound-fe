import { css } from '@emotion/react';

import { Bar, Icon, IconButton, Logo } from '~/components/Common';
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
      left={<Logo navigateToMainPage />}
      right={
        <div css={rightSelfCss}>
          <div css={rightIconContainerCss}>
            <Dot size="md" theme="secondary" />
            <IconButton size={iconSize + 4}>
              <Icon name="notification" size={iconSize} />
            </IconButton>
          </div>
          <div css={rightIconContainerCss}>
            <Dot size="md" theme="secondary" />
            <IconButton size={iconSize + 4}>
              <Icon name="chat" size={iconSize} />
            </IconButton>
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
