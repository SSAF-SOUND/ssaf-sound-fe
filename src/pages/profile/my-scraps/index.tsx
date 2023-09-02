import type { CustomNextPage } from 'next/types';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import ArticleCardList from '~/components/ArticleCardList';
import {
  DefaultFullPageLoader,
  loaderText,
  PageHeadingText,
  Separator,
  Tabs,
} from '~/components/Common';
import TitleBar from '~/components/TitleBar';
import { useMyArticles } from '~/services/article';
import { useMyInfo } from '~/services/member';
import {
  pageMaxWidth,
  pageMinWidth,
  palettes,
  position,
  titleBarHeight,
} from '~/styles/utils';
import { isStorybookMode, PossibleMyScrapsCategories, routes } from '~/utils';

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
        <Tabs.Root defaultValue={defaultTabValue} value={category}>
          <TabList />
          <Tabs.Content value={PossibleMyScrapsCategories.ARTICLES}>
            <ArticleLayer />
          </Tabs.Content>
          <Tabs.Content value={PossibleMyScrapsCategories.RECRUITS}>
            Recruits
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

const tabTexts = {
  [PossibleMyScrapsCategories.ARTICLES]: '게시글',
  [PossibleMyScrapsCategories.RECRUITS]: '리쿠르팅',
};
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

const TabTrigger = (props: { category: PossibleMyScrapsCategories }) => {
  const { category } = props;
  return (
    <Tabs.Trigger key={category} css={tabTriggerCss} value={category} asChild>
      <Link href={routes.profile.myScraps(category)}>{tabTexts[category]}</Link>
    </Tabs.Trigger>
  );
};

const ArticleLayer = () => {
  const myArticlesInfiniteQuery = useMyArticles();

  return (
    <ArticleCardList
      hot
      infiniteQuery={myArticlesInfiniteQuery}
      skeletonCount={5}
    />
  );
};

export default MyScrapsPage;
MyScrapsPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText.checkUser} />,
  unauthorized: routes.unauthorized(),
};
MyScrapsPage.meta = {
  title: metaTitle,
  openGraph: { title: metaTitle },
  robots: { index: false, follow: false },
};

const tabListContainerTop = titleBarHeight;
const tabListContainerPaddingY = 16;
const tabListHeight = 24;
const tabListContainerZIndex = 2;

const selfPaddingTop =
  tabListContainerTop + tabListHeight + tabListContainerPaddingY * 2 + 30;

const selfCss = css({
  padding: `${selfPaddingTop}px 15px 0`,
});
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
const separatorCss = css({ flexShrink: 0, margin: '0 24px' });
const tabListCss = css({
  height: tabListHeight,
  width: 250,
  margin: '0 auto',
});
const tabTriggerCss = css({
  border: 0,
});
