import { rest } from 'msw';

import { paginatedArticlesHandler } from '~/mocks/handlers/article/utils';
import { restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getAllArticlesByKeywordMethod = 'get';
const getAllArticlesByKeywordEndpoint = composeUrls(
  API_URL,
  endpoints.articles.allListByOffset({ keyword: 'keyword' })
);

export const mockGetAllArticlesByKeywordByOffset = rest[
  getAllArticlesByKeywordMethod
](getAllArticlesByKeywordEndpoint, paginatedArticlesHandler(false));

export const mockGetAllArticlesByKeywordByOffsetError = restError(
  getAllArticlesByKeywordMethod,
  getAllArticlesByKeywordEndpoint,
  {
    message: 'mockGetAllArticlesByKeywordByOffset Error',
  }
);

export const mockGetEmptyAllArticlesByKeywordByOffset = rest[
  getAllArticlesByKeywordMethod
](getAllArticlesByKeywordEndpoint, paginatedArticlesHandler(true, 0));
