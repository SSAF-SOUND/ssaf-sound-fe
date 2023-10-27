import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { SearchBarFormProps } from '~/components/Forms/SearchBarForm';
import type {
  defaultArticlesPageKey,
  GetHotArticlesByOffsetApiData,
} from '~/services/article/apis';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';

import { HotArticleCard } from '~/components/ArticleCard';
import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { EmptyList } from '~/components/EmptyList';
import { Footer } from '~/components/Footer';
import SearchBarForm from '~/components/Forms/SearchBarForm';
import NoSearchResults from '~/components/NoSearchResults';
import { QueryItemList } from '~/components/QueryItemList';
import { ResponsivePagination } from '~/components/ResponsivePagination';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import {
  defaultArticlesFirstPage,
  getHotArticlesByOffset,
} from '~/services/article/apis';
import { useHotArticlesByOffset } from '~/services/article/hooks';
import {
  validatePage,
  toSafePageValue,
} from '~/services/common/utils/pagination';
import { validateSearchKeyword } from '~/services/common/utils/searchBar';
import {
  fixedFullWidth,
  flex,
  fontCss,
  globalVars,
  pageCss,
  pageMaxWidth,
  pageMinWidth,
  palettes,
  position,
  titleBarHeight,
} from '~/styles/utils';
import { customToast, routes } from '~/utils';
import { globalMetaData } from '~/utils/metadata';

const titleBarTitle = 'HOT 게시판';
const metaTitle = titleBarTitle;
const metaDescription = `${globalMetaData.description} 삼성 청년 SW 아카데미(SSAFY) 학생들의 최대 관심사를 모아볼 수 있는 Hot 게시판 기능을 이용해보세요.`;

const HotArticlesPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { page } = props;
  const router = useRouter();
  const { keyword } = router.query as QueryParams;

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: routes.article.hot().pathname,
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
                { name: '핫 게시판', link: routes.article.hot(), active: true },
              ]}
            />
          }
        />

        <SearchBar />

        <div css={articleContainerCss}>
          <HotArticleLayer keyword={keyword} page={page} />
        </div>
      </main>

      <Footer />
    </>
  );
};

interface HotArticleLayerProps {
  keyword?: string;
  page: number;
}

const HotArticleLayer = (props: HotArticleLayerProps) => {
  const { keyword, page } = props;
  const isValidKeyword = validateSearchKeyword(keyword);
  const hotArticlesQuery = useHotArticlesByOffset({ keyword, page });

  return (
    <div>
      <QueryItemList
        css={[flex('', '', 'column', 16), { paddingBottom: 120 }]}
        query={hotArticlesQuery}
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
                isValidKeyword ? (
                  <NoSearchResults keyword={keyword} />
                ) : (
                  <EmptyList text="아직 핫 게시글이 없습니다" />
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

const SearchBar = () => {
  const router = useRouter();
  const { keyword: queryKeyword } = router.query as QueryParams;
  const isValidKeyword = validateSearchKeyword(queryKeyword);
  const defaultKeyword = isValidKeyword ? queryKeyword : '';

  const onValidSubmit: SearchBarFormProps['onValidSubmit'] = async (
    reset,
    formValues
  ) => {
    const { keyword } = formValues;
    if (keyword === queryKeyword) {
      return;
    }
    reset({ keyword });
    await router.push(routes.article.hot({ keyword }));
  };

  const onInvalidSubmit: SearchBarFormProps['onInvalidSubmit'] = (
    errorMessage
  ) => {
    if (errorMessage) {
      customToast.clientError(errorMessage);
    }
  };

  return (
    <SearchBarForm
      css={searchBarContainerCss}
      onValidSubmit={onValidSubmit}
      onInvalidSubmit={onInvalidSubmit}
      defaultValues={{ keyword: defaultKeyword }}
      options={{ allowEmptyString: true }}
    />
  );
};

export default HotArticlesPage;

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
    width: '100%',
    minWidth: pageMinWidth,
    maxWidth: pageMaxWidth,
    padding: `8px ${searchBarContainerPaddingX} 0`,
    height: searchBarContainerHeight,
    top: searchBarTop,
    zIndex: fixedLayoutZIndex,
    backgroundColor: palettes.background.default,
  },
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

  const trimmedKeyword = keyword.trim();
  const safeKeyword = validateSearchKeyword(trimmedKeyword)
    ? trimmedKeyword
    : undefined;
  const page = toSafePageValue(unsafePage);

  if (page < defaultArticlesFirstPage) {
    return { notFound: true };
  }

  const queryClient = new QueryClient();
  const hotArticleListQueryKey = queryKeys.articles.hotByOffset({
    searchKeyword: safeKeyword,
    page,
  });

  await queryClient.prefetchQuery({
    queryKey: hotArticleListQueryKey,
    queryFn: () =>
      getHotArticlesByOffset({
        page,
        keyword: safeKeyword,
      }),
  });

  const hotArticles = queryClient.getQueryData<
    GetHotArticlesByOffsetApiData['data']
  >(hotArticleListQueryKey);

  if (hotArticles && !validatePage(hotArticles)) {
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
