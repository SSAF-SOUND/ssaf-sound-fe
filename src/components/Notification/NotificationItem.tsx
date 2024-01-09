import type { LinkProps } from 'next/link';
import type { NotificationDetail } from '~/services/notifications';

import Link from 'next/link';

import { css } from '@emotion/react';
import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Dot } from '~/components/Common/Dot';
import { Icon } from '~/components/Common/Icon';
import { SsafyIcon } from '~/components/Common/SsafyIcon';
import { NotificationServiceCategory } from '~/services/notifications';
import {
  colorMix,
  flex,
  fontCss,
  lineClamp,
  palettes,
  Theme,
} from '~/styles/utils';
import { routes } from '~/utils';

type GetLinkPath = (params: {
  serviceCategory: NotificationServiceCategory;
  id: number;
}) => LinkProps['href'] | undefined;

const getLink: GetLinkPath = (params) => {
  const { id, serviceCategory } = params;

  if (serviceCategory === NotificationServiceCategory.POST) {
    return routes.article.detail(id);
  }

  if (serviceCategory === NotificationServiceCategory.RECRUIT) {
    return routes.recruit.detail(id);
  }
};

export interface NotificationItem {
  notification: NotificationDetail;
  className?: string;
  maxLine?: number;
}
export const NotificationItem = memo((props: NotificationItem) => {
  const { notification, maxLine = 3, ...restProps } = props;
  const { message, serviceType, read, contentId } = notification;
  const link = getLink({ serviceCategory: serviceType, id: contentId });
  const hasLink = !!link;
  const messageNode = (
    <NotificationMessage
      read={read}
      message={message}
      hasLink={!!link}
      maxLine={maxLine}
    />
  );

  return hasLink ? (
    <Link href={link} css={[selfCss, linkItemCss]} {...restProps}>
      {messageNode}
    </Link>
  ) : (
    <div css={selfCss} {...restProps}>
      {messageNode}
    </div>
  );
});
NotificationItem.displayName = 'NotificationItem';

const itemHeight = 86;
const selfCss = css([
  fontCss.style.B14,
  flex('center', 'space-between', 'row', 8),
  {
    position: 'relative',
    padding: '8px 16px 8px 20px',
    height: itemHeight,
    transition: 'background 200ms',
    cursor: 'pointer',
    background: colorMix('30%', palettes.grey.dark, palettes.background.grey),
  },
]);

const linkItemCss = css({
  '&:hover': {
    background: palettes.grey.dark,
  },
});

export const NotificationItemSkeleton = (props: { className?: string }) => {
  return (
    <Skeleton
      css={[{ height: itemHeight, zIndex: 0, gap: 0 }]}
      baseColor={palettes.background.grey}
      enableAnimation={false}
      {...props}
    />
  );
};

interface NotificationMessageProps {
  read: boolean;
  message: string;
  hasLink?: boolean;
  maxLine: number;
}
const NotificationMessage = memo((props: NotificationMessageProps) => {
  const { read, message, hasLink = false, maxLine } = props;
  return (
    <>
      {!read && (
        <Dot
          theme={Theme.SECONDARY}
          css={{ position: 'absolute', left: 6, top: 12 }}
        />
      )}
      <div css={[messageCss, lineClamp(maxLine)]}>
        <SsafyIcon.LogoCharacter
          size={20}
          css={{ position: 'relative', bottom: -4, marginRight: 6 }}
        />
        {message}
      </div>
      {hasLink && <Icon name="chevron.right" size={24} />}
    </>
  );
});
NotificationMessage.displayName = 'NotificationMessage';

const messageCss = css([{ wordBreak: 'break-all' }]);
