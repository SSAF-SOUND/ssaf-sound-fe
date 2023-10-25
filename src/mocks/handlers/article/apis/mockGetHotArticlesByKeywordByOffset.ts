import { rest } from 'msw';

import { paginatedArticlesHandler } from '~/mocks/handlers/article/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getHotArticlesByKeywordMethod = 'get';
const getHotArticlesByKeywordEndpoint = composeUrls(
  API_URL,
  endpoints.articles.hotByOffset({ keyword: 'keyword' })
);

export const mockGetHotArticlesByKeywordByOffset = rest[
  getHotArticlesByKeywordMethod
](getHotArticlesByKeywordEndpoint, paginatedArticlesHandler(false));

export const mockGetHotArticlesByKeywordByOffsetError = restError(
  getHotArticlesByKeywordMethod,
  getHotArticlesByKeywordEndpoint,
  {
    message: 'mockGetHotArticles Error',
  }
);

export const mockGetEmptyHotArticlesByKeywordByOffset = rest[
  getHotArticlesByKeywordMethod
](getHotArticlesByKeywordEndpoint, paginatedArticlesHandler(true, 0));
