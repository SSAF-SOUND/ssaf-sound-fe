import { rest } from 'msw';

import { restInfiniteArticlesSuccess } from '~/mocks/handlers/article/utils';
import { restError } from '~/mocks/utils';
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
