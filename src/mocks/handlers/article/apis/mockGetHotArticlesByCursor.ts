import type { GetHotArticlesByCursorApiData } from '~/services/article';

import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getHotArticlesMethod = 'get';
const getHotArticlesEndpoint = composeUrls(API_URL, endpoints.articles.hotByCursor());

export const mockGetHotArticlesByCursor = rest[getHotArticlesMethod](
  getHotArticlesEndpoint,
  restInfiniteArticlesSuccess
);

export const mockGetHotArticlesByCursorError = restError(
  getHotArticlesMethod,
  getHotArticlesEndpoint,
  {
    message: 'mockGetHotArticles Error',
  }
);

const emptyHotArticles = {
  posts: [],
  cursor: null,
};

export const mockGetEmptyHotArticlesByCursor = restSuccess<
  GetHotArticlesByCursorApiData['data']
>(getHotArticlesMethod, getHotArticlesEndpoint, { data: emptyHotArticles });
