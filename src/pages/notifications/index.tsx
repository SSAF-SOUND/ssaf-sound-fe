import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { EmptyList } from '~/components/EmptyList';
import {
  NotificationItem,
  NotificationItemSkeleton,
} from '~/components/Notification/NotificationItem';
import { QueryItemList } from '~/components/QueryItemList';
import { ResponsivePagination } from '~/components/ResponsivePagination';
import TitleBar from '~/components/TitleBar';
import { toSafePageValue } from '~/services/common/utils/pagination';
import { useNotificationsByOffset } from '~/services/notifications';
import {
  expandCss,
  fixedFullWidth,
  flex,
  fontCss,
  pageCss,
  palettes,
  position,
  titleBarHeight,
} from '~/styles/utils';
import { createAuthGuard, createNoIndexPageMetaData, routes } from '~/utils';

const metaTitle = '알림';
const titleBarTitle = metaTitle;
const NotificationsPage: CustomNextPage = () => {
  return (
    <>
      <PageHeadingText text={metaTitle} />
      <main css={selfCss}>
        <TitleBar.Default
          css={fontCss.style.B16}
          title={titleBarTitle}
          withoutClose
          footer={
            <BreadCrumbs
              entries={[
                { name: '홈', link: routes.main() },
                {
                  name: '알림',
                  link: routes.notification.self(),
                  active: true,
                },
              ]}
            />
          }
        />
        <NotificationsLayer />
      </main>
    </>
  );
};

export default NotificationsPage;
NotificationsPage.auth = createAuthGuard();
NotificationsPage.meta = createNoIndexPageMetaData(metaTitle);

const NotificationsLayer = () => {
  const { query } = useRouter();
  const { page } = query as Params;
  const safePage = toSafePageValue(page);
  const notificationsQuery = useNotificationsByOffset({ page: safePage });

  const itemHeight = 152;

  return (
    <div css={expandCss()}>
      <QueryItemList
        css={flex('', '', 'column', 12)}
        query={notificationsQuery}
        skeleton={<NotificationItemSkeleton css={{ height: itemHeight }} />}
        skeletonCount={12}
        render={(data) => {
          const { currentPage, notifications, totalPageCount } = data;
          const isEmpty = notifications.length === 0;

          return (
            <>
              {totalPageCount > 0 && (
                <div css={paginationCss}>
                  <ResponsivePagination
                    totalPageCount={totalPageCount}
                    initialPage={currentPage}
                  />
                </div>
              )}
              {isEmpty ? (
                <EmptyList text="알림이 없습니다" />
              ) : (
                notifications.map((notification) => (
                  <NotificationItem
                    css={[{ height: itemHeight }, fontCss.style.B16]}
                    notification={notification}
                    key={notification.notificationId}
                    maxLine={4}
                  />
                ))
              )}
            </>
          );
        }}
      />
    </div>
  );
};

type Params = Partial<{
  page: string;
}>;

const paginationTop = titleBarHeight + breadcrumbsHeight;
const fixedLayoutZIndex = 10;
const paginationHeight = 32 + 12;
const selfPaddingTop = paginationTop + paginationHeight;

const selfCss = css([
  { padding: `${selfPaddingTop}px 0 15px` },
  pageCss.minHeight,
  flex('', '', 'column'),
]);
const paginationCss = css(
  position.xy('center', 'start', 'fixed'),
  fixedFullWidth,
  {
    top: paginationTop,
    zIndex: fixedLayoutZIndex,
    minHeight: paginationHeight,
    backgroundColor: palettes.background.default,
  }
);
