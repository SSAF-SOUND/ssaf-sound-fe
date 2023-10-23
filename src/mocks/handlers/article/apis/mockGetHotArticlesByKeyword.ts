import type { GetHotArticlesByCursorApiData } from '~/services/article';

import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getHotArticlesByKeywordMethod = 'get';
const getHotArticlesByKeywordEndpoint = composeUrls(
  API_URL,
  endpoints.articles.hotByCursor({
    keyword: 'keyword',
  })
);

export const mockGetHotArticlesByKeyword = rest[getHotArticlesByKeywordMethod](
  getHotArticlesByKeywordEndpoint,
  restInfiniteArticlesSuccess
);

export const mockGetHotArticlesByKeywordError = restError(
  getHotArticlesByKeywordMethod,
  getHotArticlesByKeywordEndpoint,
  { message: 'mockGetHotArticlesByKeyword Error' }
);

const emptyHotArticles = {
  posts: [],
  cursor: null,
};

export const mockGetEmptyHotArticlesByKeyword = restSuccess<
  GetHotArticlesByCursorApiData['data']
>(getHotArticlesByKeywordMethod, getHotArticlesByKeywordEndpoint, {
  data: emptyHotArticles,
});
