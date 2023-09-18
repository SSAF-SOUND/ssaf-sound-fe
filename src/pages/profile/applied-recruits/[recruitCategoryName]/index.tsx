import type { SerializedStyles } from '@emotion/react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { CustomNextPage } from 'next/types';
import type { ForwardedRef } from 'react';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { forwardRef } from 'react';

import { PageHead, PageHeadingText, Tabs } from '~/components/Common';
import { InfiniteList } from '~/components/InfiniteList';
import EmptyInfiniteList from '~/components/InfiniteList/EmptyInfiniteList';
import {
  AppliedRecruitCard,
  AppliedRecruitCardSkeleton,
} from '~/components/Recruit/AppliedRecruitCard';
import TitleBar from '~/components/TitleBar';
import {
  getDisplayCategoryName,
  MatchStatus,
  MatchStatusSet,
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
import { concat, createAuthGuard, createNoIndexPageMetaData } from '~/utils';

const createMetaTitle = (str: string) => `신청한 ${str}`;

const defaultTabValue = 'ALL';
const tabTriggersTextMap = {
  [defaultTabValue]: '전체',
  [MatchStatus.PENDING]: '대기 중',
  [MatchStatus.SUCCESS]: '수락 됨',
  [MatchStatus.REJECTED]: '거절 됨',
} as const;

const tabValues = Object.keys(tabTriggersTextMap) as Array<
  keyof typeof tabTriggersTextMap
>;
const possibleTabValueSet = new Set<string | undefined>(tabValues);

const AppliedRecruitsPage: CustomNextPage<Props> = (props) => {
  const router = useRouter();
  const { recruitCategoryName } = props;
  const query = router.query as Partial<Params>;
  const displayCategoryName = getDisplayCategoryName(recruitCategoryName);

  const metaTitle = createMetaTitle(displayCategoryName);
  const metaData = createNoIndexPageMetaData(metaTitle);
  const titleBarTitle = metaTitle;

  const tabValue = possibleTabValueSet.has(query.matchStatus)
    ? query.matchStatus
    : defaultTabValue;
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

        <Tabs.Root defaultValue={tabValue} onValueChange={onTabValueChange}>
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
            const safeTabValue = MatchStatusSet.has(tabValue)
              ? (tabValue as MatchStatus)
              : undefined;

            return (
              <Tabs.Content value={tabValue}>
                <TabContentInner
                  key={tabValue}
                  tabValue={tabValue}
                  matchStatus={safeTabValue}
                  category={recruitCategoryName}
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
    [defaultTabValue]: createTabsColorCss(palettes.white),
    [MatchStatus.PENDING]: createTabsColorCss(palettes.primary.default),
    [MatchStatus.SUCCESS]: createTabsColorCss(palettes.recruit.default),
    [MatchStatus.REJECTED]: createTabsColorCss(palettes.secondary.default),
  };

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

  const emptyRecruitsText = MatchStatusSet.has(tabValue)
    ? `조건에 맞는 ${categoryText} 없습니다.`
    : `아직 ${categoryText} 없습니다.`;

  return emptyRecruitsText;
};

interface TabContentProps {
  category: RecruitCategoryName;
  matchStatus?: MatchStatus;
  tabValue: string;
}

const TabContentInner = (props: TabContentProps) => {
  const { category, matchStatus, tabValue } = props;
  const infiniteQuery = useAppliedRecruits({
    category,
    matchStatus,
  });
  const { data: appliedRecruits } = infiniteQuery;
  const infiniteData =
    appliedRecruits?.pages
      .map(({ appliedRecruits }) => appliedRecruits)
      .reduce(concat) ?? [];

  const emptyRecruitsText = getEmptyRecruitText(category, tabValue);

  return (
    <div css={[{ padding: '10px 0' }, expandCss()]}>
      <InfiniteList
        data={infiniteData}
        useWindowScroll={true}
        infiniteQuery={infiniteQuery}
        skeleton={<AppliedRecruitCardSkeleton />}
        skeletonCount={6}
        itemContent={(_, appliedRecruit) => (
          <AppliedRecruitCard appliedRecruit={appliedRecruit} />
        )}
        emptyElement={<EmptyInfiniteList text={emptyRecruitsText} />}
        List={ItemList}
        skeletonGap={4}
      />
    </div>
  );
};

const ItemList = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div css={listCss} {...props} ref={ref} />;
});
const listCss = css(flex('', '', 'column', 4));

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
