import Link from 'next/link';

import { css } from '@emotion/react';

import { Button, Tabs } from '~/components/Common';
import { InfiniteList } from '~/components/InfiniteList';
import EmptyInfiniteList from '~/components/InfiniteList/EmptyInfiniteList';
import { ProfileTabs } from '~/components/Profile';
import { RecruitCard } from '~/components/Recruit/RecruitCard';
import { RecruitCardSkeleton } from '~/components/Recruit/RecruitCard/RecruitCardSkeleton';
import {
  getDisplayCategoryName,
  RecruitCategoryName,
} from '~/services/recruit';
import { useJoinedRecruits } from '~/services/recruit/hooks/useJoinedRecruits';
import { palettes, Theme } from '~/styles/utils';
import { concat, routes } from '~/utils';

interface JoinedRecruitsTabContentProps {
  category: RecruitCategoryName;
  userId: number;
  mine?: boolean;
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
  const { category, userId, mine } = props;

  const infiniteQuery = useJoinedRecruits({ category, userId });
  const { data: joinedRecruits } = infiniteQuery;

  const infiniteData =
    joinedRecruits?.pages.map(({ recruits }) => recruits).reduce(concat) ?? [];

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

      <InfiniteList
        useWindowScroll={true}
        data={infiniteData}
        infiniteQuery={infiniteQuery}
        skeleton={<RecruitCardSkeleton size="md" />}
        skeletonCount={6}
        itemContent={(index, recruitSummary) => {
          return (
            <RecruitCard
              recruitSummary={recruitSummary}
              withBadge={true}
              size="md"
            />
          );
        }}
        emptyElement={
          <div css={{ height: 250, position: 'relative' }}>
            <EmptyInfiniteList text={getEmptyRecruitsText(category)} />
          </div>
        }
      />
    </div>
  );
};

const tabContentCss = css({
  padding: '20px 0',
});
const appliedRecruitsLinkCss = css({ borderRadius: 20, color: palettes.white });
