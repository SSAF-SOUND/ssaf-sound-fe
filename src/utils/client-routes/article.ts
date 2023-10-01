import { isString } from 'is-what';

import { validateSearchKeyword } from '~/services/common/utils/searchBar';
import { createRoute } from '~/utils/client-routes/utils';

const toSafeKeyword = (keyword?: string) => {
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
  const { keyword } = query;
  return {
    keyword: toSafeKeyword(keyword),
  };
};

// ---------- article hot ----------

export type HotArticlesPageRouteQuery = {
  keyword?: string;
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
  const { keyword } = query;
  return {
    keyword: toSafeKeyword(keyword),
  };
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
  hot: hotArticlesPageRoute,
  detail: articleDetailPageRoute,
  edit: articleEditPageRoute,
  create: articleCreatePageRoute,
};
