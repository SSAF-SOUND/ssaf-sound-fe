import type { PopoverContentProps } from '@radix-ui/react-popover';

import { css, keyframes } from '@emotion/react';
import * as Popover from '@radix-ui/react-popover';
import { atom, useAtom } from 'jotai';
import { useCallback, useRef } from 'react';

import { Dot } from '~/components/Common/Dot';
import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { Scroll } from '~/components/Common/Scroll';
import { SsafyIcon } from '~/components/Common/SsafyIcon';
import {
  useCheckNewNotifications,
  useHasNewNotifications,
} from '~/services/notifications';
import {
  colorMix,
  flex,
  fontCss,
  lineClamp,
  palettes,
  Theme,
} from '~/styles/utils';

const openAtom = atom(false);

const usePopoverOpen = () => {
  const [open, setOpen] = useAtom(openAtom);

  const openPopover = useCallback(() => setOpen(true), [setOpen]);
  const closePopover = useCallback(() => setOpen(false), [setOpen]);
  const togglePopover = useCallback(() => setOpen((o) => !o), [setOpen]);
  return { open, openPopover, closePopover, togglePopover, setOpen };
};

export const NotificationPopover = () => {
  const { closePopover, togglePopover, open } = usePopoverOpen();

  const triggerClassName = 'notification-trigger';
  const { data: hasNewNotifications } = useHasNewNotifications({
    refetchInterval: 1000,
  });
  const checkNewNotifications = useCheckNewNotifications();

  const ref = useRef<HTMLButtonElement>(null);
  const showNotificationRefreshButton = hasNewNotifications && open;
  const showHasNewNotificationsMark = hasNewNotifications && !open;

  const onPointerDownOutsideContent: PopoverContentProps['onPointerDownOutside'] =
    (e) => {
      const target = e.target as HTMLButtonElement;
      if (target.closest(`.${triggerClassName}`)) return;
      closePopover();
    };

  const handleClickTrigger = () => {
    togglePopover();
    if (!open) {
      checkNewNotifications();
    }
  };

  return (
    <Popover.Root open={true}>
      <Popover.Trigger
        asChild
        className={triggerClassName}
        onClick={handleClickTrigger}
      >
        <IconButton size={32} ref={ref} css={{ position: 'relative' }}>
          <Icon name="notification" size={28} />
          {!showHasNewNotificationsMark && (
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
          <Scroll.Viewport css={viewportCss}>
            <div
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
            </div>
            <div css={flex('', '', 'column', 6)}>
              <NotificationItem message="아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서" />
              <NotificationItem message="아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서" />
              <NotificationItem message="아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서" />
              <NotificationItem message="아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서" />
              <NotificationItem message="아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서" />
              <NotificationItem message="아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서아니오늘 싸피에서" />
            </div>
          </Scroll.Viewport>

          {showNotificationRefreshButton && <NotificationsRefreshButton />}

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
const viewportCss = css({
  minWidth: 380,
  maxWidth: 440,
  width: '50vw',
  minHeight: 500,
  maxHeight: 700,
  height: '50vh',
  background: colorMix(
    '90%',
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

interface NotificationItem {
  message: string;
}
const NotificationItem = (props: NotificationItem) => {
  const { message } = props;

  return (
    <div css={notificationItemSelfCss}>
      <div css={notificationMessageCss}>
        <SsafyIcon.LogoCharacter
          size={20}
          css={{ position: 'relative', bottom: -4, marginRight: 6 }}
        />
        {message.repeat(10)}
      </div>
      <Icon name="chevron.right" size={24} />
    </div>
  );
};

const notificationItemSelfCss = css([
  flex('center', 'center', 'row', 8),
  {
    padding: '10px 16px 10px 20px',
    height: 96,
    transition: 'background 200ms',
    cursor: 'pointer',
    background: colorMix(
      '50%',
      palettes.background.grey,
      palettes.background.default
    ),
    '&:hover': {
      background: palettes.primary.darkest,
    },
  },
]);
const notificationMessageCss = css([
  fontCss.style.B14,
  { wordBreak: 'break-word' },
  lineClamp(3),
]);

const NotificationsRefreshButton = () => {
  return (
    <button
      type="button"
      onClick={() => {}}
      css={notificationsRefreshButtonSelfCss}
    >
      <Icon name="refresh" size={20} />
      <div>새로운 알림이 도착했습니다. 새로고침 하려면 눌러주세요.</div>
    </button>
  );
};

const a = keyframes`
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
    background: palettes.majorDark,
    color: palettes.font.default,
    position: 'absolute',
    top: 10,
    left: 1,
    height: 40,
    overflow: 'hidden',
    width: 'calc(100% - 2px)',
    padding: '0 10px',
    animation: `${a} 500ms ease-in`,
    cursor: 'pointer',
    '&:active': {
      background: palettes.major,
    },
  },
]);
