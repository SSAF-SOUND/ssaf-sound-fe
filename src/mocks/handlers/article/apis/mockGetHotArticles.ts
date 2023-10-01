import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getHotArticlesMethod = 'get';
const getHotArticlesEndpoint = composeUrls(API_URL, endpoints.articles.hot());

export const mockGetHotArticles = rest[getHotArticlesMethod](
  getHotArticlesEndpoint,
  restInfiniteArticlesSuccess
);

export const mockGetHotArticlesError = restError(
  getHotArticlesMethod,
  getHotArticlesEndpoint,
  {
    message: 'mockGetHotArticles Error',
  }
);
