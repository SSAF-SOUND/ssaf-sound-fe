import type { GetMyArticlesApiData } from '~/services/article';

import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getMyArticlesMethod = 'get';
const getMyArticlesEndpoint = composeUrls(API_URL, endpoints.articles.mine());

export const mockGetMyArticles = rest[getMyArticlesMethod](
  getMyArticlesEndpoint,
  restInfiniteArticlesSuccess
);

export const mockGetMyArticlesError = restError(
  getMyArticlesMethod,
  getMyArticlesEndpoint,
  { message: 'mockGetMyArticles Error' }
);

export const mockGetEmptyMyArticles = restSuccess<GetMyArticlesApiData['data']>(
  getMyArticlesMethod,
  getMyArticlesEndpoint,
  { data: { cursor: null, posts: [] } }
);
