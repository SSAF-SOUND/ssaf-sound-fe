import { rest } from 'msw';

import { paginatedArticlesHandler } from '~/mocks/handlers/article/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getArticlesMethod = 'get';
const getArticlesEndpoint = composeUrls(
  API_URL,
  endpoints.articles.listByOffset()
);

export const mockGetArticlesByOffset = rest[getArticlesMethod](
  getArticlesEndpoint,
  paginatedArticlesHandler(false)
);

export const mockGetArticlesByOffsetError = restError(
  getArticlesMethod,
  getArticlesEndpoint,
  {
    message: 'mockGetArticlesByOffset Error',
  }
);

export const mockGetEmptyArticlesByOffset = rest[getArticlesMethod](
  getArticlesEndpoint,
  paginatedArticlesHandler(true)
);
