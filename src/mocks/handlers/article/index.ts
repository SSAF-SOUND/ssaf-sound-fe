import type { ArticleCategory, CreateArticleApiData } from '~/services/article';

import { rest } from 'msw';

import { articleCategories, articles } from '~/mocks/handlers/article/data';
import { mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

export const getArticleCategories = restSuccess<ArticleCategory[]>(
  'get',
  composeUrls(API_URL, endpoints.articles.categories()),
  { data: articleCategories }
);

export const createArticle = rest.post(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, removeQueryParams(endpoints.articles.create(1))),
  (req, res, ctx) => {
    const postId = articles.length + 1;

    // TODO: update mock articles
    // articles[postId] = { };

    return res(
      ...mockSuccess<CreateArticleApiData['data']>(ctx, {
        postId,
      })
    );
  }
);

export const createArticleError = restError(
  'post',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, removeQueryParams(endpoints.articles.create(1))),
  {
    data: null,
  }
);

export const articleHandlers = [getArticleCategories, createArticle];
