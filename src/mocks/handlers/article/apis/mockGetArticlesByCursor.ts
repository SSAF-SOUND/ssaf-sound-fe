import type { GetArticlesByCursorApiData } from '~/services/article/apis';

import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getArticlesMethod = 'get';
const getArticlesEndpoint = composeUrls(API_URL, endpoints.articles.listByCursor());

export const mockGetArticlesByCursor = rest[getArticlesMethod](
  getArticlesEndpoint,
  restInfiniteArticlesSuccess
);

export const mockGetArticlesByCursorError = restError(
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
export const mockGetEmptyArticlesByCursor = restSuccess<GetArticlesByCursorApiData['data']>(
  getArticlesMethod,
  getArticlesEndpoint,
  { data: emptyArticles }
);
