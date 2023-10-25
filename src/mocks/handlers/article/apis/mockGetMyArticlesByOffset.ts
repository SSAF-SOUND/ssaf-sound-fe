import { rest } from 'msw';

import { paginatedArticlesHandler } from '~/mocks/handlers/article/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyArticlesMethod = 'get';
const getMyArticlesEndpoint = composeUrls(
  API_URL,
  endpoints.articles.mineByOffset()
);

export const mockGetMyArticlesByOffset = rest[getMyArticlesMethod](
  getMyArticlesEndpoint,
  paginatedArticlesHandler(false)
);

export const mockGetMyArticlesByOffsetError = restError(
  getMyArticlesMethod,
  getMyArticlesEndpoint,
  {
    message: 'mockGetMyArticlesByOffset Error',
  }
);

export const mockGetEmptyMyArticlesByOffset = rest[getMyArticlesMethod](
  getMyArticlesEndpoint,
  paginatedArticlesHandler(true, 0)
);
