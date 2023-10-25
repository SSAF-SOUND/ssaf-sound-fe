import { rest } from 'msw';

import { paginatedArticlesHandler } from '~/mocks/handlers/article/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getHotArticlesMethod = 'get';
const getHotArticlesEndpoint = composeUrls(
  API_URL,
  endpoints.articles.hotByOffset()
);

export const mockGetHotArticlesByOffset = rest[getHotArticlesMethod](
  getHotArticlesEndpoint,
  paginatedArticlesHandler(false)
);

export const mockGetHotArticlesByOffsetError = restError(
  getHotArticlesMethod,
  getHotArticlesEndpoint,
  {
    message: 'mockGetHotArticles Error',
  }
);

export const mockGetEmptyHotArticlesByOffset = rest[getHotArticlesMethod](
  getHotArticlesEndpoint,
  paginatedArticlesHandler(true, 0)
);
