import type { CustomNextPage } from 'next/types';
import type { ArticleSummary } from '~/services/article';

import { css } from '@emotion/react';

import { HotArticleCard } from '~/components/ArticleCard';
import { FullPageLoader , loaderText } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { InfiniteList } from '~/components/InfiniteList';
import EmptyInfiniteList from '~/components/InfiniteList/EmptyInfiniteList';
import TitleBar from '~/components/TitleBar';
import { useMyArticles } from '~/services/article';
import { useMyInfo } from '~/services/member';
import { flex, pageCss, titleBarHeight } from '~/styles/utils';
import {
  concat,
  createAuthGuard,
  createNoIndexPageMetaData,
  routes,
} from '~/utils';

const titleBarTitle = '내가 작성한 게시글';
const metaTitle = titleBarTitle;

const MyArticlesPage: CustomNextPage = () => {
  const { data: myInfo } = useMyInfo();

  if (!myInfo) {
    return <FullPageLoader text={loaderText.checkUser} />;
  }

  return (
    <>
      <PageHeadingText text={titleBarTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          withoutClose
          title={titleBarTitle}
          onClickBackward={routes.profile.detail(myInfo.memberId)}
        />

        <ArticleLayer />
      </div>
    </>
  );
};
const selfPaddingTop = titleBarHeight + 24;
const selfCss = css(
  { padding: `${selfPaddingTop}px 0 0` },
  pageCss.minHeight,
  flex('', '')
);

export default MyArticlesPage;
MyArticlesPage.auth = createAuthGuard();
MyArticlesPage.meta = createNoIndexPageMetaData(metaTitle);

const ArticleLayer = () => {
  const infiniteQuery = useMyArticles();
  const infiniteData = infiniteQuery.data
    ? infiniteQuery.data.pages.map(({ posts }) => posts).reduce(concat)
    : ([] as ArticleSummary[]);

  return (
    <div css={articleContainerCss}>
      <InfiniteList
        data={infiniteData}
        infiniteQuery={infiniteQuery}
        skeleton={<HotArticleCard.Skeleton />}
        skeletonCount={6}
        useWindowScroll={true}
        skeletonGap={16}
        itemContent={(index, article) => <HotArticleCard article={article} />}
        emptyElement={
          <EmptyInfiniteList text="아직 작성한 게시글이 없습니다." />
        }
      />
    </div>
  );
};

const articleContainerCss = css({
  position: 'relative',
  height: '100%',
  flexGrow: 1,
});
