import type { GetArticlesByCursorApiData } from '~/services/article';

import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getArticlesByKeywordMethod = 'get';
const getArticlesByKeywordEndpoint = composeUrls(
  API_URL,
  endpoints.articles.listByCursor({
    keyword: 'keyword',
  })
);

export const mockGetArticlesByKeywordByCursor = rest[getArticlesByKeywordMethod](
  getArticlesByKeywordEndpoint,
  restInfiniteArticlesSuccess
);

export const mockGetArticlesByKeywordByCursorError = restError(
  getArticlesByKeywordMethod,
  getArticlesByKeywordEndpoint,
  {
    message: 'mockGetArticlesByKeyword Error',
  }
);

const emptyArticles = {
  posts: [],
  cursor: null,
};

export const mockGetEmptyArticlesByKeywordByCursor = restSuccess<
  GetArticlesByCursorApiData['data']
>(getArticlesByKeywordMethod, getArticlesByKeywordEndpoint, {
  data: emptyArticles,
});
