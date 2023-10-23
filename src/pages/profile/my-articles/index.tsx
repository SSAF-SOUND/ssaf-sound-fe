import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { HotArticleCard } from '~/components/ArticleCard';
import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { FullPageLoader, loaderText } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { EmptyList } from '~/components/EmptyList';
import { QueryItemList } from '~/components/QueryItemList';
import { ResponsivePagination } from '~/components/ResponsivePagination';
import TitleBar from '~/components/TitleBar';
import { useMyArticlesByOffset } from '~/services/article';
import { toSafePageValue } from '~/services/common/utils/pagination';
import { useMyInfo } from '~/services/member';
import {
  fixedFullWidth,
  flex,
  pageCss,
  palettes,
  position,
  titleBarHeight,
} from '~/styles/utils';
import { createAuthGuard, createNoIndexPageMetaData, routes } from '~/utils';

type QueryParams = {
  page?: string;
};

const titleBarTitle = '내가 작성한 게시글';
const metaTitle = titleBarTitle;

const MyArticlesPage: CustomNextPage = () => {
  const { data: myInfo } = useMyInfo();
  const router = useRouter();
  const { page } = router.query as QueryParams;
  const safePage = toSafePageValue(page);

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
          footer={
            <BreadCrumbs
              entries={[
                { name: '프로필', link: routes.profile.self() },
                {
                  name: titleBarTitle,
                  link: routes.profile.myArticles(),
                  active: true,
                },
              ]}
            />
          }
        />

        <ArticleLayer page={safePage} />
      </div>
    </>
  );
};

const fixedLayoutZIndex = 10;
const paginationTop = titleBarHeight + breadcrumbsHeight +1;
const paginationHeight = 32 + 24;
const selfPaddingTop = paginationTop + paginationHeight;
const selfCss = css(
  { padding: `${selfPaddingTop}px 0 0` },
  pageCss.minHeight,
  flex('', '')
);
const paginationCss = css(
  position.xy('center', 'start', 'fixed'),
  fixedFullWidth,
  flex('center', 'center', 'column'),
  {
    top: paginationTop,
    zIndex: fixedLayoutZIndex,
    height: paginationHeight,
    backgroundColor: palettes.background.default,
  }
);

export default MyArticlesPage;
MyArticlesPage.auth = createAuthGuard();
MyArticlesPage.meta = createNoIndexPageMetaData(metaTitle);

interface ArticleLayerProps {
  page: number;
}
const ArticleLayer = (props: ArticleLayerProps) => {
  const { page } = props;

  const myArticlesQuery = useMyArticlesByOffset({ page });

  return (
    <div css={articleContainerCss}>
      <QueryItemList
        css={[flex('', '', 'column', 16), { padding: '12px 0 120px' }]}
        query={myArticlesQuery}
        skeleton={<HotArticleCard.Skeleton />}
        skeletonCount={6}
        render={(data) => {
          const { currentPage, posts, totalPageCount } = data;
          const isEmpty = posts.length === 0;
          const isValidPage = currentPage <= totalPageCount;

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
                  <EmptyList text="아직 작성한 게시글이 없습니다." />
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
    </div>
  );
};

const articleContainerCss = css({
  position: 'relative',
  height: '100%',
  flexGrow: 1,
});
