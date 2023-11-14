import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type {
  defaultArticlesPageKey,
  GetAllArticlesByOffsetApiData,
} from '~/services/article/apis';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';

import { HotArticleCard } from '~/components/ArticleCard';
import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { CircleButton } from '~/components/Common/CircleButton';
import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { EmptyList } from '~/components/EmptyList';
import { Footer } from '~/components/Footer';
import NoSearchResults from '~/components/NoSearchResults';
import { QueryItemList } from '~/components/QueryItemList';
import { ResponsivePagination } from '~/components/ResponsivePagination';
import { SearchBar } from '~/components/SearchBar';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import {
  defaultArticlesFirstPage,
  getAllArticlesByOffset,
} from '~/services/article/apis';
import { useAllArticlesByOffset } from '~/services/article/hooks';
import {
  validatePage,
  toSafePageValue,
} from '~/services/common/utils/pagination';
import { toSafeSearchKeyword } from '~/services/common/utils/searchBar';
import { useMyInfo } from '~/services/member';
import {
  fixedFullWidth,
  flex,
  fontCss,
  globalVars,
  pageCss,
  palettes,
  position,
  titleBarHeight,
} from '~/styles/utils';
import { globalMetaData } from '~/utils/metadata';
import { routes } from '~/utils/routes';

const titleBarTitle = '전체 게시판';
const metaTitle = titleBarTitle;
const metaDescription = `${globalMetaData.description} 삼성 청년 SW 아카데미(SSAFY) 학생들이 작성한 모든 게시글을 게시판 종류와 관계없이 모아볼 수 있는 전체 게시판 기능을 이용해보세요.`;

const AllArticlesPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { page } = props;
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;
  const router = useRouter();
  const { keyword: unsafeKeyword = '' } = router.query as QueryParams;
  const keyword = toSafeSearchKeyword({ keyword: unsafeKeyword });

  const handleSearch = (keyword: string) => {
    router.push(routes.article.all({ keyword }));
  };

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: routes.article.all().pathname,
        }}
      />

      <PageHeadingText text={metaTitle} />

      <main css={selfCss}>
        <TitleBar.Default
          css={fontCss.style.B16}
          title={titleBarTitle}
          withoutClose
          footer={
            <BreadCrumbs
              entries={[
                { name: '게시판 목록', link: routes.article.categories() },
                {
                  name: '전체 게시판',
                  link: routes.article.all(),
                  active: true,
                },
              ]}
            />
          }
        />

        <SearchBar
          css={searchBarContainerCss}
          keyword={keyword}
          onSubmit={handleSearch}
        />

        <div css={articleContainerCss}>
          <AllArticlesLayer keyword={keyword} page={page} />
        </div>

        {isSignedIn && (
          <div css={fabContainerCss}>
            <CircleButton
              css={fabCss}
              name="pencil.plus"
              label="게시글 작성 버튼"
              asLink
              href={routes.article.create()}
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

interface AllArticlesLayerProps {
  keyword: string;
  page: number;
}

const AllArticlesLayer = (props: AllArticlesLayerProps) => {
  const { keyword, page } = props;
  const hasKeyword = !!keyword.length;
  const allArticlesQuery = useAllArticlesByOffset({ keyword, page });

  return (
    <QueryItemList
      css={[flex('', '', 'column', 16), { paddingBottom: 120 }]}
      query={allArticlesQuery}
      skeleton={<HotArticleCard.Skeleton />}
      skeletonCount={6}
      render={(data) => {
        const { currentPage, posts, totalPageCount } = data;
        const isEmpty = posts.length === 0;
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
              hasKeyword ? (
                <NoSearchResults keyword={keyword} />
              ) : (
                <EmptyList text="아직 게시글이 없습니다" />
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

export default AllArticlesPage;

/* css */

const searchBarTop = titleBarHeight + breadcrumbsHeight;
const searchBarContainerPaddingX = globalVars.mainLayoutPaddingX.var;
const searchBarContainerHeight = 60;
const paginationTop = searchBarTop + searchBarContainerHeight;
const paginationHeight = 32 + 12;
const fixedLayoutZIndex = 10;
const selfPaddingTop =
  searchBarTop + searchBarContainerHeight + paginationHeight;

const selfCss = css(
  { padding: `${selfPaddingTop}px 0px 15px` },
  pageCss.minHeight,
  flex('', '', 'column')
);

const searchBarContainerCss = css(
  {
    padding: `8px ${searchBarContainerPaddingX} 0`,
    height: searchBarContainerHeight,
    top: searchBarTop,
    zIndex: fixedLayoutZIndex,
    backgroundColor: palettes.background.default,
  },
  fixedFullWidth,
  position.x('center', 'fixed')
);

const articleContainerCss = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  flexGrow: 1,
  marginTop: 4,
});

const paginationCss = css(
  position.xy('center', 'start', 'fixed'),
  fixedFullWidth,
  {
    top: paginationTop,
    zIndex: fixedLayoutZIndex,
    minHeight: paginationHeight,
    backgroundColor: palettes.background.default,
  }
);

const fabContainerCss = css(flex('center', 'flex-end', 'row'));

const fabCss = css({
  position: 'fixed',
  bottom: 40,
  zIndex: fixedLayoutZIndex,
});

/* ssr */

interface Props {
  page: number;
}

type QueryParams = Partial<{
  keyword: string;
  [defaultArticlesPageKey]: string;
}>;

export const getServerSideProps: GetServerSideProps<
  Props,
  QueryParams
> = async (context) => {
  const { keyword = '', page: unsafePage } = context.query as QueryParams;

  const safeKeyword = toSafeSearchKeyword({ keyword });
  const page = toSafePageValue(unsafePage);

  // note: 페이지 범위 서버에서 판단해야 한다고 생각함
  if (page < defaultArticlesFirstPage) {
    return { notFound: true };
  }

  const queryClient = new QueryClient();
  const allArticleListQueryKey = queryKeys.articles.allListByOffset({
    searchKeyword: safeKeyword,
    page,
  });

  await queryClient.prefetchQuery({
    queryKey: allArticleListQueryKey,
    queryFn: () =>
      getAllArticlesByOffset({
        page,
        keyword: safeKeyword,
      }),
  });

  // note: 페이지 범위 서버에서 판단해야 한다고 생각함
  const allArticles = queryClient.getQueryData<
    GetAllArticlesByOffsetApiData['data']
  >(allArticleListQueryKey);

  if (allArticles && !validatePage(allArticles)) {
    return { notFound: true };
  }

  const { dehydratedState } = dehydrate(queryClient);

  return {
    props: {
      dehydratedState,
      page,
    },
  };
};
