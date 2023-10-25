import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { useState } from 'react';

import { HotArticleCard } from '~/components/ArticleCard';
import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { FullPageLoader, loaderText } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Separator } from '~/components/Common/Separator';
import { Tabs } from '~/components/Common/Tabs';
import { EmptyList } from '~/components/EmptyList';
import { QueryItemList } from '~/components/QueryItemList';
import { RecruitCard } from '~/components/Recruit/RecruitCard';
import { RecruitCardSkeleton } from '~/components/Recruit/RecruitCard/RecruitCardSkeleton';
import { ResponsivePagination } from '~/components/ResponsivePagination';
import TitleBar from '~/components/TitleBar';
import {
  defaultArticlesFirstPage,
  defaultArticlesPageKey,
  useMyScrapedArticlesByOffset,
} from '~/services/article';
import {
  toSafePageValue,
  validatePage,
} from '~/services/common/utils/pagination';
import { useMyInfo } from '~/services/member';
import { useMyScrapedRecruitsByOffset } from '~/services/recruit';
import {
  fixedFullWidth,
  flex,
  pageCss,
  pageMaxWidth,
  pageMinWidth,
  palettes,
  position,
  titleBarHeight,
} from '~/styles/utils';
import { createAuthGuard, createNoIndexPageMetaData, routes } from '~/utils';
import {
  PossibleMyScrapsTabValue,
  PossibleMyScrapsTabValueSet,
} from '~/utils/client-routes/profile';

const defaultTab = PossibleMyScrapsTabValue.ARTICLES;

const titleBarTitle = '내 스크랩';
const metaTitle = titleBarTitle;

const getSafeTab = (category?: string) => {
  if (PossibleMyScrapsTabValueSet.has(category as PossibleMyScrapsTabValue)) {
    return category as PossibleMyScrapsTabValue;
  }

  return defaultTab;
};

const enum ParamsKey {
  TAB = 'tab',
  PAGE = defaultArticlesPageKey,
}

type Params = {
  [ParamsKey.TAB]?: string;
  [ParamsKey.PAGE]?: PossibleMyScrapsTabValue;
};

const MyScrapsPage: CustomNextPage = () => {
  const { data: myInfo } = useMyInfo();
  const router = useRouter();
  const { tab, page } = router.query as Params;
  const safeTab = getSafeTab(tab);
  const safePage = toSafePageValue(page);
  const [latestPages, setLatestPages] = useState({
    [PossibleMyScrapsTabValue.ARTICLES]: defaultArticlesFirstPage,
    [PossibleMyScrapsTabValue.RECRUITS]: defaultArticlesFirstPage,
  });

  if (!myInfo) {
    return <FullPageLoader text={loaderText.checkUser} />;
  }

  const onTabValueChange = async (value: string) => {
    const nextTabValue = value as PossibleMyScrapsTabValue;
    const currentTab = safeTab;

    const latestPageOfTargetTab = latestPages[nextTabValue];

    await router.push({
      query: {
        ...router.query,
        [ParamsKey.TAB]: nextTabValue,
        [ParamsKey.PAGE]: latestPageOfTargetTab,
      },
    });
    setLatestPages((p) => ({
      ...p,
      [currentTab]: safePage,
    }));
  };

  return (
    <>
      <PageHeadingText text={titleBarTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          withoutClose
          title={titleBarTitle}
          footer={
            <BreadCrumbs
              entries={[
                { name: '프로필', link: routes.profile.self() },
                {
                  name: titleBarTitle,
                  link: routes.profile.myScraps(),
                  active: true,
                },
              ]}
            />
          }
        />

        <Tabs.Root
          value={safeTab}
          onValueChange={onTabValueChange}
          css={{ flexGrow: 1 }}
        >
          <TabList />
          <Tabs.Content
            css={contentCss}
            value={PossibleMyScrapsTabValue.ARTICLES}
          >
            <MyScrapedArticlesLayer page={safePage} />
          </Tabs.Content>
          <Tabs.Content
            css={contentCss}
            value={PossibleMyScrapsTabValue.RECRUITS}
          >
            <MyScrapedRecruitsLayer page={safePage} />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default MyScrapsPage;
MyScrapsPage.auth = createAuthGuard();
MyScrapsPage.meta = createNoIndexPageMetaData(metaTitle);

const tabListContainerTop = titleBarHeight + breadcrumbsHeight;
const tabListContainerPaddingY = 8;
const tabListHeight = 24;
const fixedLayoutZIndex = 2;
const paginationTop =
  tabListContainerTop + tabListHeight + 2 * tabListContainerPaddingY;
const paginationHeight = 32 + 24;
const selfPaddingTop = paginationTop + paginationHeight;

const selfCss = css(pageCss.minHeight, {
  padding: `${selfPaddingTop}px 0 0`,
  position: 'relative',
});

const tabTriggersTextMap = {
  [PossibleMyScrapsTabValue.ARTICLES]: '게시글',
  [PossibleMyScrapsTabValue.RECRUITS]: '리쿠르팅',
};

const contentCss = css({});

const paginationCss = css(
  position.xy('center', 'start', 'fixed'),
  fixedFullWidth,
  flex('center', 'center', 'column'),
  {
    top: paginationTop,
    zIndex: fixedLayoutZIndex,
    minHeight: paginationHeight,
    backgroundColor: palettes.background.default,
  }
);

const TabList = () => {
  return (
    <div css={tabListContainerCss}>
      <Tabs.List css={tabListCss}>
        <TabTrigger value={PossibleMyScrapsTabValue.ARTICLES} />
        <Separator
          orientation="vertical"
          width={2}
          backgroundColor={palettes.primary.default}
          css={separatorCss}
        />
        <TabTrigger value={PossibleMyScrapsTabValue.RECRUITS} />
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

const TabTrigger = (props: { value: PossibleMyScrapsTabValue }) => {
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
    zIndex: fixedLayoutZIndex,
    minWidth: pageMinWidth,
    maxWidth: pageMaxWidth,
    width: '100%',
  },
  position.x('center', 'fixed')
);

const tabTriggerCss = css({
  border: 0,
});

interface MyScrapedArticlesLayerProps {
  page: number;
}

const listContainerCss = css([
  flex('', '', 'column', 16),
  { paddingBottom: 120 },
]);
const MyScrapedArticlesLayer = (props: MyScrapedArticlesLayerProps) => {
  const { page } = props;

  const myScrapedArticlesQuery = useMyScrapedArticlesByOffset({ page });

  return (
    <QueryItemList
      css={listContainerCss}
      query={myScrapedArticlesQuery}
      skeleton={<HotArticleCard.Skeleton />}
      skeletonCount={6}
      render={(data) => {
        const { currentPage, posts, totalPageCount } = data;
        const isEmpty = posts.length === 0;
        const isValidPage = validatePage({ currentPage, totalPageCount });

        return (
          <>
            <div css={paginationCss}>
              <ResponsivePagination
                totalPageCount={totalPageCount}
                initialPage={currentPage}
              />
            </div>
            {isEmpty ? (
              isValidPage ? (
                <EmptyList text="아직 스크랩한 게시글이 없습니다." />
              ) : (
                <EmptyList text="유효하지 않은 페이지입니다." />
              )
            ) : (
              posts.map((post) => (
                <HotArticleCard article={post} key={post.postId} />
              ))
            )}
          </>
        );
      }}
    />
  );
};

interface MyScrapedRecruitsLayerProps {
  page: number;
}
const MyScrapedRecruitsLayer = (props: MyScrapedRecruitsLayerProps) => {
  const { page } = props;
  const myScrapedRecruitsQuery = useMyScrapedRecruitsByOffset({
    page,
  });

  return (
    <QueryItemList
      css={listContainerCss}
      query={myScrapedRecruitsQuery}
      skeleton={<RecruitCardSkeleton size="md" />}
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
              isValidPage ? (
                <EmptyList text="아직 스크랩한 게시글이 없습니다." />
              ) : (
                <EmptyList text="유효하지 않은 페이지입니다." />
              )
            ) : (
              recruits.map((recruit) => (
                <RecruitCard
                  size="md"
                  withBadge={true}
                  recruitSummary={recruit}
                  key={recruit.recruitId}
                />
              ))
            )}
          </>
        );
      }}
    />
  );
};
