import type {
  ArticleCategory,
  CreateArticleApiData,
  GetArticleDetailApiData,
} from '~/services/article';

import { rest } from 'msw';

import {
  articleCategories,
  articleFallback,
  articles,
} from '~/mocks/handlers/article/data';
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
    // TODO: update mock articles
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    articles.push({});

    const postId = articles.length;

    console.log('[현재 mock articles 목록]: ', articles);

    return res(
      ctx.delay(500),
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

export const removeArticle = restSuccess(
  'delete',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.detail(':articleId')),
  {
    data: null,
  }
);

export const removeArticleError = restError(
  'delete',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.detail(':articleId')),
  {
    message: '게시글 삭제에 실패했습니다.',
  }
);

export const reportArticle = restSuccess(
  'post',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.report(':articleId')),
  {
    data: null,
  }
);

export const reportArticleError = restError(
  'post',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.report(':articleId')),
  {
    message: '게시글 신고에 실패했습니다.',
  }
);

export const getArticleDetail = rest.get(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.detail(':articleId')),
  (req, res, ctx) => {
    const params = req.params as { articleId: string };
    const articleId = Number(params.articleId);
    const article = articles[Number(articleId)] || articleFallback;

    return res(
      ctx.delay(500),
      ...mockSuccess<GetArticleDetailApiData['data']>(ctx, { post: article })
    );
  }
);

export const getArticleDetailError = restError(
  'get',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.detail(':articleId'))
);

export const articleHandlers = [
  getArticleCategories,
  createArticle,
  getArticleDetail,
  removeArticle,
  reportArticle,
];
