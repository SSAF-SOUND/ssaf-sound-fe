import type { NotificationDetail } from '~/services/notifications';

import { css } from '@emotion/react';
import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Icon } from '~/components/Common/Icon';
import { SsafyIcon } from '~/components/Common/SsafyIcon';
import { colorMix, flex, fontCss, lineClamp, palettes } from '~/styles/utils';

export interface NotificationItem {
  notification: NotificationDetail;
}
export const NotificationItem = memo((props: NotificationItem) => {
  const { notification } = props;

  return (
    <div css={selfCss}>
      <div css={messageCss}>
        <SsafyIcon.LogoCharacter
          size={20}
          css={{ position: 'relative', bottom: -4, marginRight: 6 }}
        />
        {notification.message}
      </div>
      <Icon name="chevron.right" size={24} />
    </div>
  );
});
NotificationItem.displayName = 'NotificationItem';

export const NotificationItemSkeleton = () => {
  return (
    <Skeleton
      css={[{ height: 96, zIndex: 0, gap: 0 }]}
      baseColor={palettes.background.grey}
      enableAnimation={false}
    />
  );
};

const selfCss = css([
  flex('center', 'center', 'row', 8),
  {
    padding: '10px 16px 10px 20px',
    height: 96,
    transition: 'background 200ms',
    cursor: 'pointer',
    background: colorMix(
      '100%',
      palettes.background.grey,
      palettes.background.default
    ),
    '&:hover': {
      background: palettes.primary.darkest,
    },
  },
]);
const messageCss = css([
  fontCss.style.B14,
  { wordBreak: 'break-word' },
  lineClamp(3),
]);
