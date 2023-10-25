import type { SerializedStyles } from '@emotion/react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { useState } from 'react';

import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Tabs } from '~/components/Common/Tabs';
import { EmptyList } from '~/components/EmptyList';
import { ProfileTabs } from '~/components/Profile';
import { QueryItemList } from '~/components/QueryItemList';
import {
  AppliedRecruitCard,
  AppliedRecruitCardSkeleton,
} from '~/components/Recruit/AppliedRecruitCard';
import { ResponsivePagination } from '~/components/ResponsivePagination';
import TitleBar from '~/components/TitleBar';
import {
  toSafePageValue,
  validatePage,
} from '~/services/common/utils/pagination';
import {
  defaultRecruitsFirstPage,
  getDisplayCategoryName,
  MatchStatus,
  MatchStatusSet,
  RecruitCategoryName,
  useAppliedRecruitsByOffset,
} from '~/services/recruit';
import {
  colorMix,
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

const createMetaTitle = (str: string) => `신청한 ${str}`;

const defaultTabValue = 'ALL';
const tabTriggersTextMap = {
  [defaultTabValue]: '전체',
  [MatchStatus.PENDING]: '대기 중',
  [MatchStatus.SUCCESS]: '수락 됨',
  [MatchStatus.REJECTED]: '거절 됨',
} as const;

type TabValues = keyof typeof tabTriggersTextMap;
const tabValues = Object.keys(tabTriggersTextMap) as Array<
  keyof typeof tabTriggersTextMap
>;
const possibleTabValueSet = new Set<string | undefined>(tabValues);
const toSafeTabValue = (unsafeValue?: string | string[]) => {
  const targetTabValue = Array.isArray(unsafeValue)
    ? unsafeValue[0]
    : unsafeValue;

  if (possibleTabValueSet.has(targetTabValue)) {
    return targetTabValue as TabValues;
  }
  return defaultTabValue as TabValues;
};

const AppliedRecruitsPage: CustomNextPage<Props> = (props) => {
  const router = useRouter();
  const { recruitCategoryName } = props;
  const query = router.query as Params;
  const { page, matchStatus } = query;

  const [latestPages, setLatestPages] = useState({
    [defaultTabValue]: defaultRecruitsFirstPage,
    [MatchStatus.PENDING]: defaultRecruitsFirstPage,
    [MatchStatus.SUCCESS]: defaultRecruitsFirstPage,
    [MatchStatus.REJECTED]: defaultRecruitsFirstPage,
  });

  const displayCategoryName = getDisplayCategoryName(recruitCategoryName);
  const metaTitle = createMetaTitle(displayCategoryName);
  const metaData = createNoIndexPageMetaData(metaTitle);
  const titleBarTitle = metaTitle;

  const safePage = toSafePageValue(page);
  const safeTabValue = toSafeTabValue(matchStatus);

  const onTabValueChange = async (nextTabValue: string) => {
    const matchStatus = nextTabValue as TabValues;
    const latestPageOfMatchStatus = latestPages[matchStatus];

    await router.push({
      query: {
        ...router.query,
        matchStatus,
        page: latestPageOfMatchStatus,
      },
    });
    setLatestPages((p) => ({
      ...p,
      [safeTabValue]: safePage,
    }));
  };

  const backwardRouteTab =
    recruitCategoryName === RecruitCategoryName.PROJECT
      ? ProfileTabs.PROJECT
      : ProfileTabs.STUDY;

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <PageHead {...metaData} />

      <div css={selfCss}>
        <Tabs.Root value={safeTabValue} onValueChange={onTabValueChange}>
          <TitleBar.Default
            title={titleBarTitle}
            withoutClose
            footer={
              <div>
                <BreadCrumbs
                  entries={[
                    {
                      name: '프로필',
                      link: routes.profile.self({ tab: backwardRouteTab }),
                    },
                    {
                      name: '신청한 리쿠르팅',
                      link: routes.recruit.appliedList({
                        category: recruitCategoryName,
                      }),
                      active: true,
                    },
                  ]}
                />
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
              </div>
            }
          />

          {tabValues.map((tabValue) => {
            const safeTabValue = MatchStatusSet.has(tabValue)
              ? (tabValue as MatchStatus)
              : undefined;

            return (
              <Tabs.Content value={tabValue} key={tabValue}>
                <TabContentInner
                  key={tabValue}
                  tabValue={tabValue}
                  matchStatus={safeTabValue}
                  category={recruitCategoryName}
                  page={safePage}
                />
              </Tabs.Content>
            );
          })}
        </Tabs.Root>
      </div>
    </>
  );
};

const tabsListHeight = 48;
const paginationTop = titleBarHeight + breadcrumbsHeight + tabsListHeight;
const paginationHeight = 32;
const paginationPaddingY = 8;
const fixedLayoutZIndex = 2;
const selfPaddingY = paginationTop + paginationHeight;

const selfCss = css(
  {
    padding: `${selfPaddingY}px 0`,
    position: 'relative',
  },
  pageCss.minHeight
);

const tabsListCss = css(
  {
    height: tabsListHeight,
    padding: '0 25px',
    backgroundColor: palettes.background.default,
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
    [defaultTabValue]: createTabsColorCss(palettes.white),
    [MatchStatus.PENDING]: createTabsColorCss(palettes.primary.default),
    [MatchStatus.SUCCESS]: createTabsColorCss(palettes.recruit.default),
    [MatchStatus.REJECTED]: createTabsColorCss(palettes.secondary.default),
  };

const paginationCss = css(
  position.xy('center', 'start', 'fixed'),
  fixedFullWidth,
  flex('center', 'center', 'column'),
  {
    top: paginationTop,
    zIndex: fixedLayoutZIndex,
    padding: `${paginationPaddingY}px 0`,
    minHeight: paginationHeight,
    backgroundColor: palettes.background.default,
  }
);

export default AppliedRecruitsPage;
AppliedRecruitsPage.auth = createAuthGuard();

const getEmptyRecruitText = (
  category: RecruitCategoryName,
  tabValue: string
) => {
  const categoryText =
    category === RecruitCategoryName.STUDY
      ? '신청한 스터디가'
      : '신청한 프로젝트가';

  // tabValue가 MatchStatus중 하나라면, 필터링 정보가 없다는 안내메세지
  // tabValue가 ALL 이라면, 아직 신청한 리쿠르팅 정보가 없다는 안내메세지
  const emptyRecruitsText = MatchStatusSet.has(tabValue)
    ? `조건에 맞는 ${categoryText} 없습니다.`
    : `아직 ${categoryText} 없습니다.`;

  return emptyRecruitsText;
};

interface TabContentProps {
  category: RecruitCategoryName;
  matchStatus?: MatchStatus;
  tabValue: string;
  page?: number;
}

const TabContentInner = (props: TabContentProps) => {
  const { category, matchStatus, tabValue, page } = props;
  const appliedRecruitsQuery = useAppliedRecruitsByOffset({
    category,
    matchStatus,
    page,
  });

  const emptyRecruitsText = getEmptyRecruitText(category, tabValue);

  return (
    <div css={[{ padding: '10px 0' }, expandCss()]}>
      <QueryItemList
        css={[listCss, { paddingBottom: 120 }]}
        query={appliedRecruitsQuery}
        skeleton={<AppliedRecruitCardSkeleton />}
        skeletonCount={6}
        render={(data) => {
          const { currentPage, recruits, totalPageCount } = data;
          const isEmpty = recruits.length === 0;
          const isValidPage = validatePage({ currentPage, totalPageCount });

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
                <EmptyList
                  text={
                    isValidPage
                      ? emptyRecruitsText
                      : '유효하지 않은 페이지입니다.'
                  }
                />
              ) : (
                recruits.map((recruit) => (
                  <AppliedRecruitCard
                    key={recruit.recruitId}
                    appliedRecruit={recruit}
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

const listCss = css(flex('', '', 'column', 4));

type Props = {
  recruitCategoryName: RecruitCategoryName;
};
type Params = {
  recruitCategoryName?: RecruitCategoryName;
  matchStatus?: TabValues;
  page?: string;
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
