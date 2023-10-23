import type { GetMyArticlesByCursorApiData } from '~/services/article';

import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyArticlesMethod = 'get';
const getMyArticlesEndpoint = composeUrls(API_URL, endpoints.articles.mineByCursor());

export const mockGetMyArticlesByCursor = rest[getMyArticlesMethod](
  getMyArticlesEndpoint,
  restInfiniteArticlesSuccess
);

export const mockGetMyArticlesByCursorError = restError(
  getMyArticlesMethod,
  getMyArticlesEndpoint,
  { message: 'mockGetMyArticles Error' }
);

export const mockGetEmptyMyArticlesByCursor = restSuccess<GetMyArticlesByCursorApiData['data']>(
  getMyArticlesMethod,
  getMyArticlesEndpoint,
  { data: { cursor: null, posts: [] } }
);
