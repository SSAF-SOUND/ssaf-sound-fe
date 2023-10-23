import { rest } from 'msw';

import { paginatedArticlesHandler } from '~/mocks/handlers/article/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getArticlesByKeywordMethod = 'get';
const getArticlesByKeywordEndpoint = composeUrls(
  API_URL,
  endpoints.articles.listByOffset({ keyword: 'keyword' })
);

export const mockGetArticlesByKeywordByOffset = rest[
  getArticlesByKeywordMethod
](getArticlesByKeywordEndpoint, paginatedArticlesHandler(false));

export const mockGetArticlesByKeywordByOffsetError = restError(
  getArticlesByKeywordMethod,
  getArticlesByKeywordEndpoint,
  {
    message: 'mockGetArticlesByKeywordByOffset Error',
  }
);

export const mockGetEmptyArticlesByKeywordByOffset = rest[
  getArticlesByKeywordMethod
](getArticlesByKeywordEndpoint, paginatedArticlesHandler(true));
