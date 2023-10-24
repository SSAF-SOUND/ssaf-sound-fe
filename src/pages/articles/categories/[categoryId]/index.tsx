import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { SearchBarFormProps } from '~/components/Forms/SearchBarForm';
import type {
  GetArticlesByOffsetApiData,
  defaultArticlesPageKey,
} from '~/services/article';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';

import { ArticleCard } from '~/components/ArticleCard';
import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { CircleButton } from '~/components/Common/CircleButton';
import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { EmptyList } from '~/components/EmptyList';
import SearchBarForm from '~/components/Forms/SearchBarForm';
import NoSearchResults from '~/components/NoSearchResults';
import { QueryItemList } from '~/components/QueryItemList';
import { ResponsivePagination } from '~/components/ResponsivePagination';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import {
  defaultArticlesFirstPage,
  getArticleCategories,
  getArticlesByOffset,
  useArticleCategories,
  useArticlesByOffset,
} from '~/services/article';
import {
  validatePage,
  toSafePageValue,
} from '~/services/common/utils/pagination';
import { validateSearchKeyword } from '~/services/common/utils/searchBar';
import { useMyInfo } from '~/services/member';
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

const createMetaDescription = (categoryName = '게시판') =>
  `${globalMetaData.description} 다양한 주제로 소통할 수 있는 ${categoryName}을 이용해보세요.`;

const ArticleCategoryPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { categoryId, page } = props;
  const router = useRouter();
  const { keyword } = router.query as QueryParams;
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;

  const { data: articleCategories } = useArticleCategories();
  const categoryName =
    articleCategories?.find((category) => category.boardId === categoryId)
      ?.title ?? '게시판';

  const metaDescription = createMetaDescription(categoryName);

  return (
    <>
      <PageHead
        title={categoryName}
        description={metaDescription}
        openGraph={{
          title: categoryName,
          description: metaDescription,
          url: routes.article.category({ categoryId }).pathname,
        }}
      />

      <PageHeadingText text={categoryName} />

      <div css={selfCss}>
        <TitleBar.Default
          css={fontCss.style.B16}
          title={categoryName}
          withoutClose
          footer={
            <BreadCrumbs
              entries={[
                { name: '게시판 목록', link: routes.article.categories() },
                {
                  name: categoryName,
                  link: routes.article.category({ categoryId }),
                  active: true,
                },
              ]}
            />
          }
        />

        <SearchBar categoryId={categoryId} />

        <div css={articleContainerCss}>
          <ArticleLayer categoryId={categoryId} keyword={keyword} page={page} />
        </div>

        {isSignedIn && (
          <div css={fabContainerCss}>
            <CircleButton
              css={fabCss}
              name="pencil.plus"
              label="게시글 작성 버튼"
              asLink
              href={routes.article.create({ categoryId })}
            />
          </div>
        )}
      </div>
    </>
  );
};

interface ArticleLayerProps {
  categoryId: number;
  keyword?: string;
  page: number;
}

const ArticleLayer = (props: ArticleLayerProps) => {
  const { categoryId, keyword, page } = props;
  const isValidKeyword = validateSearchKeyword(keyword);
  const articlesQuery = useArticlesByOffset({ categoryId, keyword, page });

  return (
    <div>
      <QueryItemList
        css={[flex('', '', 'column', 16), { paddingBottom: 120 }]}
        query={articlesQuery}
        skeleton={<ArticleCard.Skeleton />}
        skeletonCount={6}
        render={(data) => {
          const { currentPage, posts, totalPageCount } = data;
          const isEmpty = posts.length === 0;
          return (
            <>
              <div css={paginationCss}>
                <ResponsivePagination
                  totalPageCount={totalPageCount}
                  initialPage={currentPage}
                />
              </div>
              {isEmpty ? (
                isValidKeyword ? (
                  <NoSearchResults keyword={keyword} />
                ) : (
                  <EmptyList text="아직 게시글이 없습니다" />
                )
              ) : (
                posts.map((post) => (
                  <ArticleCard article={post} key={post.postId} />
                ))
              )}
            </>
          );
        }}
      />
    </div>
  );
};

interface SearchBarProps {
  categoryId: number;
}

const SearchBar = (props: SearchBarProps) => {
  const { categoryId } = props;
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
    router.push(routes.article.category({ categoryId, keyword }));
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

export default ArticleCategoryPage;

/* css */

const searchBarTop = titleBarHeight + breadcrumbsHeight;
const searchBarContainerHeight = 60;
const paginationTop = searchBarTop + searchBarContainerHeight;
const paginationHeight = 32 + 12;
const selfPaddingTop =
  searchBarTop + searchBarContainerHeight + paginationHeight;

// `Skeleton`의 `zIndex`는 1
const fixedLayoutZIndex = 10;
const fabZIndex = 30;

const selfCss = css(
  { padding: `${selfPaddingTop}px 0 15px` },
  pageCss.minHeight,
  flex('', '', 'column')
);

const searchBarContainerCss = css(
  {
    width: '100%',
    minWidth: pageMinWidth,
    maxWidth: pageMaxWidth,
    padding: `8px ${globalVars.mainLayoutPaddingX.var} 0`,
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

const fabContainerCss = css(flex('center', 'flex-end', 'row'));

const fabCss = css({ position: 'fixed', bottom: 40, zIndex: fabZIndex });

const paginationCss = css(
  position.xy('center', 'start', 'fixed'),
  fixedFullWidth,
  {
    top: paginationTop,
    zIndex: fixedLayoutZIndex,
    height: paginationHeight,
    backgroundColor: palettes.background.default,
  }
);

/* ssr */

interface Props {
  categoryId: number;
  page: number;
}

type Params = {
  categoryId: string;
};

type QueryParams = Partial<{
  keyword: string;
  [defaultArticlesPageKey]: string;
}>;

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const categoryId = Number(context.params?.categoryId);
  const isValidCategoryId = !Number.isNaN(categoryId);

  const { keyword = '', page: unsafePage } = context.query as QueryParams;

  const trimmedKeyword = keyword.trim();
  const safeKeyword = validateSearchKeyword(trimmedKeyword)
    ? trimmedKeyword
    : undefined;

  const page = toSafePageValue(unsafePage);

  if (!isValidCategoryId || page < defaultArticlesFirstPage) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();
  const articleListQueryKey = queryKeys.articles.listByOffset({
    categoryId,
    searchKeyword: safeKeyword,
    page,
  });
  const articleCategoriesQueryKey = queryKeys.articles.categories();
  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: articleListQueryKey,
      queryFn: () =>
        getArticlesByOffset({
          categoryId,
          keyword: safeKeyword,
          page,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: articleCategoriesQueryKey,
      queryFn: getArticleCategories,
    }),
  ]);

  const articles =
    queryClient.getQueryData<GetArticlesByOffsetApiData['data']>(
      articleListQueryKey
    );

  if (articles && !validatePage(articles)) {
    return { notFound: true };
  }

  const { dehydratedState } = dehydrate(queryClient);

  return {
    props: {
      dehydratedState,
      categoryId,
      page,
    },
  };
};
