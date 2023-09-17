import type { SerializedStyles } from '@emotion/react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { CustomNextPage } from 'next/types';
import type { RecruitSummary } from '~/services/recruit';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { PageHead, PageHeadingText, Tabs } from '~/components/Common';
import { InfiniteList } from '~/components/InfiniteList';
import {
  AppliedRecruitCard,
  AppliedRecruitCardSkeleton,
} from '~/components/Recruit/AppliedRecruitCard';
import TitleBar from '~/components/TitleBar';
import {
  getDisplayCategoryName,
  MatchStatus,
  RecruitCategoryName,
} from '~/services/recruit';
import { useAppliedRecruits } from '~/services/recruit/hooks/useAppliedRecruits';
import {
  colorMix,
  expandCss,
  fixTopCenter,
  flex,
  fontCss,
  palettes,
  titleBarHeight,
} from '~/styles/utils';
import {
  concat,
  createAuthGuard,
  createNoIndexPageMetaData,
  routes,
} from '~/utils';

const createMetaTitle = (str: string) => `신청한 ${str}`;

const tabTriggersTextMap = {
  all: '전체',
  [MatchStatus.PENDING]: '대기 중',
  [MatchStatus.SUCCESS]: '수락 됨',
  [MatchStatus.REJECTED]: '거절 됨',
} as const;

const defaultTabValue = 'all';
const tabValues = Object.keys(tabTriggersTextMap) as Array<
  keyof typeof tabTriggersTextMap
>;

const AppliedRecruitsPage: CustomNextPage<Props> = (props) => {
  const router = useRouter();
  const { recruitCategoryName } = props;
  const query = router.query as Partial<Params>;
  const displayCategoryName = getDisplayCategoryName(recruitCategoryName);

  const metaTitle = createMetaTitle(displayCategoryName);
  const metaData = createNoIndexPageMetaData(metaTitle);
  const titleBarTitle = metaTitle;

  const tabValue = query.matchStatus || defaultTabValue;
  const onTabValueChange = (matchStatus: string) => {
    router.push({
      query: {
        ...router.query,
        matchStatus,
      },
    });
  };

  return (
    <>
      <PageHeadingText text={metaTitle} />
      <PageHead {...metaData} />
      <div css={selfCss}>
        <TitleBar.Default title={titleBarTitle} withoutClose />

        <Tabs.Root value={tabValue} onValueChange={onTabValueChange}>
          <Tabs.List css={tabsListCss}>
            {tabValues.map((tabValue) => (
              <Tabs.Trigger
                theme="white"
                variant="fit"
                css={[tabsTriggerCss, tabsColorCss[tabValue]]}
                value={tabValue}
                key={tabValue}
              >
                {tabTriggersTextMap[tabValue]}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {tabValues.map((tabValue) => {
            const safeTabValue = (
              tabValue in MatchStatus ? tabValue : undefined
            ) as MatchStatus;

            return (
              <TabContent
                key={tabValue}
                tabValue={tabValue}
                matchStatus={safeTabValue}
                category={recruitCategoryName}
              />
            );
          })}
        </Tabs.Root>
      </div>
    </>
  );
};

const tabsListHeight = 48;
const selfPaddingY = titleBarHeight + tabsListHeight;

const selfCss = css({
  padding: `${selfPaddingY}px 0`,
});

const tabsListCss = css(
  fixTopCenter,
  {
    top: titleBarHeight,
    height: tabsListHeight,
    padding: '0 25px',
    backgroundColor: palettes.background.default,
    zIndex: 2,
  },
  flex('center', 'flex-start', 'row', 20)
);
const tabsTriggerCss = css({ border: 0 }, fontCss.style.B16);

const createTabsColorCss = (color: string) =>
  css({
    color: colorMix('50%', color),
    '&[data-state="active"]': { color: color },
  });
const tabsColorCss: Record<keyof typeof tabTriggersTextMap, SerializedStyles> =
  {
    all: createTabsColorCss(palettes.white),
    [MatchStatus.PENDING]: createTabsColorCss(palettes.primary.default),
    [MatchStatus.SUCCESS]: createTabsColorCss(palettes.recruit.default),
    [MatchStatus.REJECTED]: createTabsColorCss(palettes.secondary.default),
  };

export default AppliedRecruitsPage;
AppliedRecruitsPage.auth = createAuthGuard();

interface TabContentProps {
  category: RecruitCategoryName;
  matchStatus?: MatchStatus;
  tabValue: string;
}
const TabContent = (props: TabContentProps) => {
  const { category, matchStatus, tabValue } = props;
  const infiniteQuery = useAppliedRecruits({
    category,
    matchStatus,
  });
  const { data: appliedRecruits } = infiniteQuery;
  const infiniteData =
    appliedRecruits?.pages.map(({ recruits }) => recruits).reduce(concat) ?? [];

  return (
    <Tabs.Content value={tabValue}>
      <div css={[{ padding: '10px 0' }, expandCss()]}>
        <InfiniteList
          data={infiniteData}
          useWindowScroll={true}
          infiniteQuery={infiniteQuery}
          skeleton={<AppliedRecruitCardSkeleton />}
          skeletonCount={6}
          itemContent={infiniteItemContent}
        />
      </div>
    </Tabs.Content>
  );
};

const infiniteItemContent = (index: number, recruit: RecruitSummary) => {
  return <AppliedRecruitCard appliedRecruit={recruit} />;
};

type Props = {
  recruitCategoryName: RecruitCategoryName;
};
type Params = {
  recruitCategoryName: RecruitCategoryName;
  matchStatus?: MatchStatus;
};

export const getStaticProps: GetStaticProps<Props, Params> = (context) => {
  const { params: { recruitCategoryName = RecruitCategoryName.PROJECT } = {} } =
    context;
  return {
    props: {
      recruitCategoryName,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const recruitCategoryNames = Object.values(RecruitCategoryName);
  const paths = recruitCategoryNames.map((recruitCategoryName) => {
    return {
      params: {
        recruitCategoryName,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
