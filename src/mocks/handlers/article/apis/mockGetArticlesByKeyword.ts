import type { GetArticlesApiData } from '~/services/article';

import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getArticlesByKeywordMethod = 'get';
const getArticlesByKeywordEndpoint = composeUrls(
  API_URL,
  endpoints.articles.list({
    keyword: 'keyword',
  })
);

export const mockGetArticlesByKeyword = rest[getArticlesByKeywordMethod](
  getArticlesByKeywordEndpoint,
  restInfiniteArticlesSuccess
);

export const mockGetArticlesByKeywordError = restError(
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

export const mockGetEmptyArticlesByKeyword = restSuccess<
  GetArticlesApiData['data']
>(getArticlesByKeywordMethod, getArticlesByKeywordEndpoint, {
  data: emptyArticles,
});
