import type { CSSProperties } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Button } from '~/components/Common/Button';
import { Tabs } from '~/components/Common/Tabs';
import { ProfileTabs } from '~/components/Profile';
import { QueryItemList } from '~/components/QueryItemList';
import { RecruitCard } from '~/components/Recruit/RecruitCard';
import { RecruitCardSkeleton } from '~/components/Recruit/RecruitCard/RecruitCardSkeleton';
import { ResponsivePagination } from '~/components/ResponsivePagination';
import { validatePage } from '~/services/common/utils/pagination';
import {
  getDisplayCategoryName,
  RecruitCategoryName,
  useJoinedRecruitsByOffset,
} from '~/services/recruit';
import { flex, palettes, Theme, topBarHeight } from '~/styles/utils';
import { routes } from '~/utils';

interface JoinedRecruitsTabContentProps {
  category: RecruitCategoryName;
  userId: number;
  mine?: boolean;
  page?: number;
  paginationContainerStyle?: CSSProperties;
}

const getEmptyRecruitsText = (category: RecruitCategoryName) => {
  const displayCategoryName = getDisplayCategoryName(category);

  return `아직 참여중인 ${displayCategoryName}가 없습니다.`;
};

export const JoinedRecruitsTabContent = (
  props: JoinedRecruitsTabContentProps
) => {
  const { category } = props;
  const tabValue =
    category === RecruitCategoryName.STUDY
      ? ProfileTabs.STUDY
      : ProfileTabs.PROJECT;
  return (
    <Tabs.Content value={tabValue}>
      <JoinedRecruitsTabContentInner {...props} />
    </Tabs.Content>
  );
};

const JoinedRecruitsTabContentInner = (
  props: JoinedRecruitsTabContentProps
) => {
  const { category, userId, mine, page, paginationContainerStyle } = props;

  const joinedRecruitsQuery = useJoinedRecruitsByOffset({
    category,
    userId,
    page,
  });
  const displayCategoryName = getDisplayCategoryName(category);
  const appliedRecruitRoute = routes.recruit.appliedList({ category });

  return (
    <div css={tabContentCss}>
      {mine && (
        <Button
          asChild
          css={[appliedRecruitsLinkCss, { marginBottom: 30 }]}
          theme={Theme.GREY}
        >
          <Link href={appliedRecruitRoute}>신청한 {displayCategoryName}</Link>
        </Button>
      )}

      <QueryItemList
        css={[flex('', '', 'column', 16), { paddingBottom: 120 }]}
        query={joinedRecruitsQuery}
        skeleton={<RecruitCardSkeleton size="md" />}
        skeletonCount={6}
        render={(data) => {
          const { currentPage, recruits, totalPageCount } = data;
          const isEmpty = recruits.length === 0;
          const isValidPage = validatePage({ currentPage, totalPageCount });

          return (
            <>
              <div css={paginationCss} style={paginationContainerStyle}>
                <ResponsivePagination
                  totalPageCount={totalPageCount}
                  initialPage={currentPage}
                />
              </div>
              {isEmpty ? (
                <div css={{ textAlign: 'center', padding: '50px 0' }}>
                  {isValidPage
                    ? getEmptyRecruitsText(category)
                    : '유효하지 않은 페이지입니다.'}
                </div>
              ) : (
                recruits.map((recruit) => (
                  <RecruitCard
                    key={recruit.recruitId}
                    recruitSummary={recruit}
                    withBadge={true}
                    size="md"
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

const tabContentCss = css({
  padding: '20px 0',
});
const appliedRecruitsLinkCss = css({ borderRadius: 20, color: palettes.white });

const fixedLayoutZIndex = 2;
const paginationHeight = 32;
const paginationCss = css(
  {
    position: 'sticky',
    top: topBarHeight,
    minHeight: paginationHeight,
    padding: '8px 0',
    backgroundColor: palettes.background.default,
    zIndex: fixedLayoutZIndex,
  },
  flex('', 'center', 'column')
);
