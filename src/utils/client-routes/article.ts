import { isString } from 'is-what';

import { validateSearchKeyword } from '~/services/common/utils/searchBar';
import { createRoute } from '~/utils/client-routes/utils';

const toSafeKeyword = (keyword?: string) => {
  // FIXME: 문자열이 아니거나, 빈 문자열이라면 undefined로 만들기
  return isString(keyword) && validateSearchKeyword(keyword.trim())
    ? keyword
    : undefined;
};

// ---------- article self ----------

const articleSelfRoute = () => createRoute('/articles')();

// ---------- article categories ----------

const articleCategoriesPageRoute = () => {
  const pathname = articleSelfRoute().pathname;
  return createRoute(`${pathname}/categories`)();
};

// ---------- article category ----------

export type ArticlesPageRouteSegment = {
  categoryId: number;
};
export type ArticlesPageRouteQuery = {
  keyword?: string;
  page?: number;
};

const articlesPageRoute = (
  params: ArticlesPageRouteQuery & ArticlesPageRouteSegment
) => {
  const { categoryId, ...query } = params;
  const pathname = articleCategoriesPageRoute().pathname;

  return createRoute<ArticlesPageRouteQuery>(`${pathname}/${categoryId}`)(
    toSafeArticlesPageRouteQuery(query)
  );
};

const toSafeArticlesPageRouteQuery = (
  query: ArticlesPageRouteQuery
): ArticlesPageRouteQuery => {
  const { keyword, page } = query;

  return {
    keyword: toSafeKeyword(keyword),
    page,
  };
};

// ---------- article hot ----------

export type HotArticlesPageRouteQuery = {
  keyword?: string;
  page?: number;
};

const hotArticlesPageRoute = (query: HotArticlesPageRouteQuery = {}) => {
  const pathname = '/hot-articles';

  return createRoute<HotArticlesPageRouteQuery>(pathname)(
    toSafeHotArticlesPageRouteQuery(query)
  );
};

const toSafeHotArticlesPageRouteQuery = (
  query: HotArticlesPageRouteQuery
): HotArticlesPageRouteQuery => {
  const { keyword, page } = query;
  return {
    keyword: toSafeKeyword(keyword),
    page,
  };
};

// ---------- article all ----------

export type AllArticlesPageRouteQuery = {
  keyword?: string;
  page?: number;
};

const allArticlesPageRoute = (query: AllArticlesPageRouteQuery = {}) => {
  const pathname = '/all-articles';

  return createRoute<AllArticlesPageRouteQuery>(pathname)(
    // note: 핫 게시글과 동일한 쿼리 파라미터 사용
    toSafeHotArticlesPageRouteQuery(query)
  );
};

// ---------- article detail ----------

const articleDetailPageRoute = (articleId: number) => {
  const pathname = articleSelfRoute().pathname;

  return createRoute(`${pathname}/${articleId}`)();
};

// ---------- article edit ----------

const articleEditPageRoute = (articleId: number) => {
  const pathname = articleDetailPageRoute(articleId).pathname;
  return createRoute(`${pathname}/edit`)();
};

// ---------- article create ----------

export type ArticleCreatePageRouteQuery = {
  categoryId?: number;
};

const articleCreatePageRoute = (query: ArticleCreatePageRouteQuery = {}) => {
  const pathname = articleSelfRoute().pathname;

  return createRoute<ArticleCreatePageRouteQuery>(`${pathname}/new`)(query);
};

export const article = {
  self: articleSelfRoute,
  categories: articleCategoriesPageRoute,
  category: articlesPageRoute,
  all: allArticlesPageRoute,
  hot: hotArticlesPageRoute,
  detail: articleDetailPageRoute,
  edit: articleEditPageRoute,
  create: articleCreatePageRoute,
};
