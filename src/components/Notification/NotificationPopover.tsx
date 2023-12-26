import type { PopoverContentProps } from '@radix-ui/react-popover';

import Link from 'next/link';

import { css, keyframes } from '@emotion/react';
import * as Popover from '@radix-ui/react-popover';
import { useEffect, useRef, useState } from 'react';

import { Dot } from '~/components/Common/Dot';
import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { Scroll } from '~/components/Common/Scroll';
import {
  useNotificationPopoverOpen,
  useNotificationReadMark,
} from '~/components/Notification/atoms';
import { NotificationInfiniteItems } from '~/components/Notification/NotificationInfiniteItems';
import {
  useHasNewNotifications,
  useResetNotificationsByCursor,
} from '~/services/notifications';
import { colorMix, flex, fontCss, palettes, Theme } from '~/styles/utils';
import { routes, toMs } from '~/utils';

export const NotificationPopover = () => {
  const { closePopover, togglePopover, open } = useNotificationPopoverOpen();

  const triggerClassName = 'notification-trigger';
  const { data: hasNewNotifications, isRefetching } = useHasNewNotifications({
    refetchInterval: toMs(10),
  });
  const { unread, setUnreadMark, markAsRead } = useNotificationReadMark();
  const ref = useRef<HTMLButtonElement>(null);

  const showNotificationRefreshButton = open && unread;
  const showUnreadMark = !open && unread;

  const onPointerDownOutsideContent: PopoverContentProps['onPointerDownOutside'] =
    (e) => {
      const target = e.target as HTMLButtonElement;
      if (target.closest(`.${triggerClassName}`)) return;
      closePopover();
    };

  const handleClickTrigger = () => {
    togglePopover();
    if (!open) {
      markAsRead();
    }
  };

  useEffect(() => {
    // refetching = true -> false (== refetching이 완료되었을 때)
    if (!isRefetching) {
      setUnreadMark(hasNewNotifications ?? false);
    }
  }, [isRefetching, hasNewNotifications, setUnreadMark]);

  useEffect(() => {
    return () => closePopover();
  }, [closePopover]);

  return (
    <Popover.Root open={open}>
      <Popover.Trigger
        asChild
        className={triggerClassName}
        onClick={handleClickTrigger}
      >
        <IconButton size={32} ref={ref} css={{ position: 'relative' }}>
          <Icon name="notification" size={28} />
          {showUnreadMark && (
            <Dot
              theme={Theme.SECONDARY}
              css={{ position: 'absolute', right: 1, top: 1 }}
            />
          )}
        </IconButton>
      </Popover.Trigger>

      <Popover.Content
        align="end"
        alignOffset={-120}
        sideOffset={10}
        css={contentCss}
        onEscapeKeyDown={closePopover}
        onPointerDownOutside={onPointerDownOutsideContent}
      >
        <Scroll.Root>
          <NotificationsLayer
            showNotificationsRefreshButton={showNotificationRefreshButton}
          />

          <Scroll.Bar
            css={{
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
            }}
          >
            <Scroll.Thumb />
          </Scroll.Bar>
        </Scroll.Root>
      </Popover.Content>
    </Popover.Root>
  );
};

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

const contentCss = css({
  padding: 10,
  '&:focus-visible': {
    outline: 0,
  },
});

interface NotificationsRefreshButtonProps {
  handleReset: () => void;
}

const NotificationsRefreshButton = (props: NotificationsRefreshButtonProps) => {
  const { handleReset } = props;
  return (
    <button
      type="button"
      onClick={handleReset}
      css={notificationsRefreshButtonSelfCss}
    >
      <Icon name="refresh" size={20} />
      <div>새로운 알림이 도착했습니다. 새로고침 하려면 눌러주세요.</div>
    </button>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
   opacity: 1;
  }
`;

const notificationsRefreshButtonSelfCss = css([
  fontCss.style.B14,
  flex('center', '', 'row', 8),
  {
    transition: 'background 200ms',
    background: colorMix('50%', palettes.majorDark, palettes.major),
    color: palettes.font.default,
    borderLeft: 0,
    borderRight: 0,
    position: 'absolute',
    top: 10,
    left: 1,
    height: 40,
    overflow: 'hidden',
    width: 'calc(100% - 2px)',
    padding: '0 10px',
    animation: `${fadeIn} 500ms ease-in`,
    cursor: 'pointer',
    '&:active': {
      background: palettes.major,
    },
  },
]);

const NotificationPageLink = () => {
  return (
    <Link
      href={routes.notification.self()}
      css={[
        fontCss.style.B14,
        flex('center', 'right', 'row'),
        {
          marginBottom: 24,
          padding: '0 16px',
          color: palettes.primary.default,
          textDecoration: 'underline',
        },
      ]}
    >
      알림 목록 페이지로
      <Icon name="chevron.right" size={16} />
    </Link>
  );
};
interface NotificationsLayerProps {
  showNotificationsRefreshButton?: boolean;
}
const NotificationsLayer = (props: NotificationsLayerProps) => {
  const { showNotificationsRefreshButton = false } = props;
  const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null);
  const { markAsRead } = useNotificationReadMark();
  const reset = useResetNotificationsByCursor();

  const onClickReset = () => {
    if (scrollParent) {
      scrollParent.scrollTop = 0;
    }
    reset();
    markAsRead();
  };

  return (
    <>
      <Scroll.Viewport ref={setScrollParent} css={viewportCss}>
        <NotificationPageLink />
        {scrollParent && (
          <NotificationInfiniteItems scrollParent={scrollParent} />
        )}
      </Scroll.Viewport>
      {showNotificationsRefreshButton && (
        <NotificationsRefreshButton handleReset={onClickReset} />
      )}
    </>
  );
};

const viewportCss = css({
  minWidth: 380,
  maxWidth: 440,
  width: '50vw',
  minHeight: 500,
  maxHeight: 700,
  height: '50vh',
  background: colorMix(
    '80%',
    palettes.background.default,
    palettes.background.grey
  ),
  position: 'relative',
  color: palettes.font.default,
  animation: `${scaleIn} 0.2s ease-in-out`,
  boxShadow: '10px 10px 20px #272b32, -10px -10px 40px #353a44',
  overscrollBehavior: 'contain',
  padding: '60px 0',
  borderRadius: 12,
  border: `1px solid ${palettes.font.blueGrey}`,
  transition: 'padding 500ms',
});
