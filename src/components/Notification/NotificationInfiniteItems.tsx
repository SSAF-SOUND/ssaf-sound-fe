import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { useEffect, forwardRef } from 'react';

import { InfiniteList } from '~/components/InfiniteList';
import {
  NotificationItem,
  NotificationItemSkeleton,
} from '~/components/Notification/NotificationItem';
import {
  useNotificationsByCursor,
  useResetNotificationsByCursor,
} from '~/services/notifications';
import { flex } from '~/styles/utils';
import { concat } from '~/utils';

interface NotificationItemsProps {
  scrollParent: HTMLElement;
}
export const NotificationInfiniteItems = (props: NotificationItemsProps) => {
  const { scrollParent } = props;
  const notificationsInfiniteQuery = useNotificationsByCursor();
  const reset = useResetNotificationsByCursor();

  const infiniteData = notificationsInfiniteQuery.data
    ? notificationsInfiniteQuery.data.pages
        .map(({ notifications }) => notifications)
        .reduce(concat)
    : [];

  useEffect(() => {
    // Popover를 열 때 이전 데이터가 있다면 초기화하고 새 데이터를 보여줌
    if (infiniteData.length) {
      reset();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <InfiniteList
      data={infiniteData}
      infiniteQuery={notificationsInfiniteQuery}
      skeleton={<NotificationItemSkeleton />}
      skeletonCount={4}
      useWindowScroll={false}
      skeletonGap={6}
      itemContent={(index, data) => <NotificationItem notification={data} />}
      List={NotificationList}
      emptyElement={<>Empty</>}
      customScrollParent={scrollParent}
    />
  );
};

const NotificationList = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ComponentPropsWithoutRef<'div'>>
>((props, ref) => {
  return <div {...props} ref={ref} css={flex('', '', 'column', 6)} />;
});

NotificationList.displayName = 'NotificationList';
