import type { GetMyScrapedArticlesByCursorApiData } from '~/services/article';

import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyScrapedArticlesMethod = 'get';
const getMyScrapedArticlesEndpoint = composeUrls(
  API_URL,
  endpoints.articles.myScrapsByCursor()
);

export const mockGetMyScrapedArticlesByCursor = rest[getMyScrapedArticlesMethod](
  getMyScrapedArticlesEndpoint,
  restInfiniteArticlesSuccess
);

export const mockGetMyScrapedArticlesByCursorError = restError(
  getMyScrapedArticlesMethod,
  getMyScrapedArticlesEndpoint,
  { message: 'mockGetMyScrapedArticles Error' }
);

const emptyArticles = {
  posts: [],
  cursor: null,
};

export const mockGetEmptyMyScrapedArticlesByCursor = restSuccess<
  GetMyScrapedArticlesByCursorApiData['data']
>(getMyScrapedArticlesMethod, getMyScrapedArticlesEndpoint, {
  data: emptyArticles,
});
