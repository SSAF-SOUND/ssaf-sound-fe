import type { CustomNextPage } from 'next/types';
import type { ArticleSummary } from '~/services/article';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { HotArticleCard } from '~/components/ArticleCard';
import { FullPageLoader , loaderText } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Separator } from '~/components/Common/Separator';
import { Tabs } from '~/components/Common/Tabs';
import { InfiniteList } from '~/components/InfiniteList';
import EmptyInfiniteList from '~/components/InfiniteList/EmptyInfiniteList';
import { RecruitCard } from '~/components/Recruit/RecruitCard';
import { RecruitCardSkeleton } from '~/components/Recruit/RecruitCard/RecruitCardSkeleton';
import TitleBar from '~/components/TitleBar';
import { useMyScrapedArticles } from '~/services/article';
import { useMyInfo } from '~/services/member';
import { useMyScrapedRecruits } from '~/services/recruit/hooks/useMyScrapedRecruits';
import {
  pageCss,
  pageMaxWidth,
  pageMinWidth,
  palettes,
  position,
  titleBarHeight,
} from '~/styles/utils';
import {
  concat,
  createAuthGuard,
  createNoIndexPageMetaData,
  PossibleMyScrapsCategories,
  routes,
} from '~/utils';

const possibleCategories = Object.values(PossibleMyScrapsCategories);
const defaultTab = PossibleMyScrapsCategories.ARTICLES;

const titleBarTitle = '나의 스크랩';
const metaTitle = titleBarTitle;

const getSafeTab = (category?: string) => {
  if (possibleCategories.includes(category as PossibleMyScrapsCategories)) {
    return category;
  }

  return defaultTab;
};

const enum ParamsKey {
  TAB = 'tab',
}

type Params = {
  [ParamsKey.TAB]: string;
};

const MyScrapsPage: CustomNextPage = () => {
  const { data: myInfo } = useMyInfo();
  const router = useRouter();
  const { tab } = router.query as Partial<Params>;
  const safeTab = getSafeTab(tab);

  if (!myInfo) {
    return <FullPageLoader text={loaderText.checkUser} />;
  }

  const onTabValueChange = (value: string) => {
    router.push({
      query: {
        ...router.query,
        [ParamsKey.TAB]: value,
      },
    });
  };

  return (
    <>
      <PageHeadingText text={titleBarTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          withoutClose
          title={titleBarTitle}
          onClickBackward={routes.profile.self()}
        />

        <Tabs.Root
          defaultValue={safeTab}
          onValueChange={onTabValueChange}
          css={{ flexGrow: 1 }}
        >
          <TabList />
          <Tabs.Content
            css={contentCss}
            value={PossibleMyScrapsCategories.ARTICLES}
          >
            <MyScrapedArticlesLayer />
          </Tabs.Content>
          <Tabs.Content
            css={contentCss}
            value={PossibleMyScrapsCategories.RECRUITS}
          >
            <MyScrapedRecruitsLayer />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default MyScrapsPage;
MyScrapsPage.auth = createAuthGuard();
MyScrapsPage.meta = createNoIndexPageMetaData(metaTitle);

const tabListContainerTop = titleBarHeight;
const tabListContainerPaddingY = 16;
const tabListHeight = 24;
const tabListContainerZIndex = 2;

const selfPaddingTop =
  tabListContainerTop + tabListHeight + tabListContainerPaddingY * 2 + 30;

const selfCss = css(pageCss.minHeight, {
  padding: `${selfPaddingTop}px 0 0`,
  position: 'relative',
});

const tabTriggersTextMap = {
  [PossibleMyScrapsCategories.ARTICLES]: '게시글',
  [PossibleMyScrapsCategories.RECRUITS]: '리쿠르팅',
};

const contentCss = css({});

const TabList = () => {
  return (
    <div css={tabListContainerCss}>
      <Tabs.List css={tabListCss}>
        <TabTrigger value={PossibleMyScrapsCategories.ARTICLES} />
        <Separator
          orientation="vertical"
          width={2}
          backgroundColor={palettes.primary.default}
          css={separatorCss}
        />
        <TabTrigger value={PossibleMyScrapsCategories.RECRUITS} />
      </Tabs.List>
    </div>
  );
};

const tabListCss = css({
  height: tabListHeight,
  width: 250,
  margin: '0 auto',
});

const separatorCss = css({ flexShrink: 0, margin: '0 24px' });

const TabTrigger = (props: { value: PossibleMyScrapsCategories }) => {
  const { value } = props;
  return (
    <Tabs.Trigger css={tabTriggerCss} value={value}>
      {tabTriggersTextMap[value]}
    </Tabs.Trigger>
  );
};

const tabListContainerCss = css(
  {
    backgroundColor: palettes.background.default,
    padding: `${tabListContainerPaddingY}px 0`,
    top: tabListContainerTop,
    zIndex: tabListContainerZIndex,
    minWidth: pageMinWidth,
    maxWidth: pageMaxWidth,
    width: '100%',
  },
  position.x('center', 'fixed')
);

const tabTriggerCss = css({
  border: 0,
});

const MyScrapedArticlesLayer = () => {
  const infiniteQuery = useMyScrapedArticles();
  const infiniteData = infiniteQuery.data
    ? infiniteQuery.data.pages.map(({ posts }) => posts).reduce(concat)
    : ([] as ArticleSummary[]);

  return (
    <InfiniteList
      data={infiniteData}
      infiniteQuery={infiniteQuery}
      skeleton={<HotArticleCard.Skeleton />}
      skeletonCount={6}
      useWindowScroll={true}
      skeletonGap={16}
      itemContent={(_, article) => <HotArticleCard article={article} />}
      emptyElement={
        <EmptyInfiniteList text="아직 스크랩한 게시글이 없습니다." />
      }
    />
  );
};

const MyScrapedRecruitsLayer = () => {
  const infiniteQuery = useMyScrapedRecruits();
  const infiniteData =
    infiniteQuery?.data?.pages.map(({ recruits }) => recruits).reduce(concat) ??
    [];

  return (
    <InfiniteList
      data={infiniteData}
      infiniteQuery={infiniteQuery}
      skeleton={<RecruitCardSkeleton size="md" />}
      skeletonCount={6}
      useWindowScroll={true}
      skeletonGap={16}
      itemContent={(_, recruitSummary) => (
        <RecruitCard
          size="md"
          withBadge={true}
          recruitSummary={recruitSummary}
        />
      )}
      emptyElement={
        <EmptyInfiniteList text="아직 스크랩한 리쿠르팅이 없습니다." />
      }
    />
  );
};
