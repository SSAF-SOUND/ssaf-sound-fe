import { atom, useAtom } from 'jotai/index';
import { useCallback } from 'react';

const openAtom = atom(false);

// hasNewNotifications Query Data를 미러링
// -> setQueryData로 수동 업데이트하면, refetchInterval이 초기화되기 때문에
const readMarkAtom = atom(false);

const useNotificationPopoverOpen = () => {
  const [open, setOpen] = useAtom(openAtom);

  const openPopover = useCallback(() => setOpen(true), [setOpen]);
  const closePopover = useCallback(() => setOpen(false), [setOpen]);
  const togglePopover = useCallback(() => setOpen((o) => !o), [setOpen]);
  return { open, openPopover, closePopover, togglePopover, setOpen };
};
const useNotificationReadMark = () => {
  const [readMark, setReadMark] = useAtom(readMarkAtom);

  const markAsRead = () => setReadMark(true);
  const markAsUnread = () => setReadMark(false);
  const setUnreadMark = useCallback(
    (v: boolean) => setReadMark(!v),
    [setReadMark]
  );

  return {
    unread: !readMark,
    markAsRead,
    markAsUnread,
    setReadMark,
    setUnreadMark,
  };
};

export const notificationAtoms = {
  open: openAtom,
  readMark: readMarkAtom,
};

export { useNotificationPopoverOpen, useNotificationReadMark };
