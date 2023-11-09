import { rest } from 'msw';

import { paginatedArticlesHandler } from '~/mocks/handlers/article/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getAllArticlesMethod = 'get';
const getAllArticlesEndpoint = composeUrls(
  API_URL,
  endpoints.articles.allListByOffset()
);

export const mockGetAllArticlesByOffset = rest[getAllArticlesMethod](
  getAllArticlesEndpoint,
  paginatedArticlesHandler(false)
);

export const mockGetAllArticlesByOffsetError = restError(
  getAllArticlesMethod,
  getAllArticlesEndpoint,
  {
    message: 'mockGetAllArticlesByOffset Error',
  }
);

export const mockGetEmptyAllArticlesByOffset = rest[getAllArticlesMethod](
  getAllArticlesEndpoint,
  paginatedArticlesHandler(true, 0)
);
