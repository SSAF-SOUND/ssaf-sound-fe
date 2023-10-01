import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyScrapedArticlesMethod = 'get';
const getMyScrapedArticlesEndpoint = composeUrls(
  API_URL,
  endpoints.articles.myScraped()
);

export const mockGetMyScrapedArticles = rest[getMyScrapedArticlesMethod](
  getMyScrapedArticlesEndpoint,
  restInfiniteArticlesSuccess
);

export const mockGetMyScrapedArticlesError = restError(
  getMyScrapedArticlesMethod,
  getMyScrapedArticlesEndpoint,
  { message: 'mockGetMyScrapedArticles Error' }
);
