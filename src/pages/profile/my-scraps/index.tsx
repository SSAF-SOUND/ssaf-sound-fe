import type { CustomNextPage } from 'next/types';
import type { ArticleSummary } from '~/services/article';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { HotArticleCard } from '~/components/ArticleCard';
import {
  DefaultFullPageLoader,
  loaderText,
  PageHeadingText,
  Separator,
  Tabs,
} from '~/components/Common';
import { InfiniteList } from '~/components/InfiniteList';
import EmptyInfiniteList from '~/components/InfiniteList/EmptyInfiniteList';
import TitleBar from '~/components/TitleBar';
import { useMyScrapedArticles } from '~/services/article';
import { useMyInfo } from '~/services/member';
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
  isStorybookMode,
  PossibleMyScrapsCategories,
  routes,
} from '~/utils';

const possibleCategories = Object.values(PossibleMyScrapsCategories);
const defaultCategory = PossibleMyScrapsCategories.ARTICLES;

const titleBarTitle = '나의 스크랩';
const metaTitle = titleBarTitle;

const validateCategory = (category?: string) => {
  if (isStorybookMode()) return true;

  return (
    category &&
    possibleCategories.includes(category as PossibleMyScrapsCategories)
  );
};

type QueryString = {
  category: string;
};

const MyScrapsPage: CustomNextPage = () => {
  const { data: myInfo } = useMyInfo();
  const router = useRouter();
  const { category } = router.query as Partial<QueryString>;
  const isValidCategory = validateCategory(category);

  if (!isValidCategory) {
    router.replace(routes.profile.myScraps(defaultCategory));
    return <DefaultFullPageLoader />;
  }

  if (!myInfo) {
    return <DefaultFullPageLoader text={loaderText.checkUser} />;
  }

  const defaultTabValue = category || defaultCategory;

  return (
    <>
      <PageHeadingText text={titleBarTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          withoutClose
          title={titleBarTitle}
          onClickBackward={routes.profile.detail(myInfo.memberId)}
        />
        <Tabs.Root
          defaultValue={defaultTabValue}
          value={category}
          css={{ flexGrow: 1, position: 'relative' }}
        >
          <TabList />
          <Tabs.Content
            css={contentCss}
            value={PossibleMyScrapsCategories.ARTICLES}
          >
            <ArticleLayer />
          </Tabs.Content>
          <Tabs.Content
            css={contentCss}
            value={PossibleMyScrapsCategories.RECRUITS}
          >
            Recruits
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
});

const tabTexts = {
  [PossibleMyScrapsCategories.ARTICLES]: '게시글',
  [PossibleMyScrapsCategories.RECRUITS]: '리쿠르팅',
};

const contentCss = css({});

const TabList = () => {
  return (
    <div css={tabListContainerCss}>
      <Tabs.List css={tabListCss}>
        <TabTrigger category={PossibleMyScrapsCategories.ARTICLES} />
        <Separator
          orientation="vertical"
          width={2}
          backgroundColor={palettes.primary.default}
          css={separatorCss}
        />
        <TabTrigger category={PossibleMyScrapsCategories.RECRUITS} />
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

const TabTrigger = (props: { category: PossibleMyScrapsCategories }) => {
  const { category } = props;
  return (
    <Tabs.Trigger key={category} css={tabTriggerCss} value={category} asChild>
      <Link href={routes.profile.myScraps(category)}>{tabTexts[category]}</Link>
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

const ArticleLayer = () => {
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
      itemContent={(index, article) => <HotArticleCard article={article} />}
      emptyElement={
        <EmptyInfiniteList text="아직 스크랩한 게시글이 없습니다." />
      }
    />
  );
};
