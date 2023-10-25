import { rest } from 'msw';

import { paginatedArticlesHandler } from '~/mocks/handlers/article/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyScrapedArticlesMethod = 'get';
const getMyScrapedArticlesEndpoint = composeUrls(
  API_URL,
  endpoints.articles.myScrapsByOffset()
);

export const mockGetMyScrapedArticlesByOffset = rest[getMyScrapedArticlesMethod](
  getMyScrapedArticlesEndpoint,
  paginatedArticlesHandler(false)
);

export const mockGetMyScrapedArticlesByOffsetError = restError(
  getMyScrapedArticlesMethod,
  getMyScrapedArticlesEndpoint,
  {
    message: 'mockGetMyScrapedArticlesByOffset Error',
  }
);

export const mockGetEmptyMyScrapedArticlesByOffset = rest[getMyScrapedArticlesMethod](
  getMyScrapedArticlesEndpoint,
  paginatedArticlesHandler(true)
);
