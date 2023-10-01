import type { GetArticlesApiData } from '~/services/article/apis';

import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getArticlesMethod = 'get';
const getArticlesEndpoint = composeUrls(API_URL, endpoints.articles.list());

export const mockGetArticles = rest[getArticlesMethod](
  getArticlesEndpoint,
  restInfiniteArticlesSuccess
);

export const mockGetArticlesError = restError(
  getArticlesMethod,
  getArticlesEndpoint,
  {
    message: 'mockGetArticles Error',
  }
);

const emptyArticles = {
  posts: [],
  cursor: null,
};
export const mockGetEmptyArticles = restSuccess<GetArticlesApiData['data']>(
  getArticlesMethod,
  getArticlesEndpoint,
  { data: emptyArticles }
);
