import type {
  ArticleCategory,
  CreateArticleApiData,
  GetArticleDetailApiData,
  LikeArticleApiData,
  ScrapArticleApiData,
  UpdateArticleParams,
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

export const updateArticle = rest.put(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.detail(':articleId')),
  async (req, res, ctx) => {
    const payload = (await req.json()) as Omit<
      UpdateArticleParams,
      'articleId'
    >;
    const params = req.params as { articleId: string };
    const articleId = Number(params.articleId);

    // author - anonymous 타입 관계 때문에 타입 에러 발생 (실제로는 문제 없으므로 무시)
    // eslint-disable-next-line
    // @ts-ignore
    articles[articleId] = { ...articles[articleId], ...payload };
    console.log('[현재 mock articles 목록]: ', articles);

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

export const updateArticleError = restError(
  'put',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.detail(':articleId')),
  {
    message: '게시글 수정에 실패했습니다.',
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

export const likeArticle = rest.post(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.like(':articleId')),
  (req, res, ctx) => {
    const params = req.params as { articleId: string };

    const articleId = Number(params.articleId);
    const article = articles[articleId];
    article.liked = !article.liked;
    const latestLiked = article.liked;

    return res(
      ctx.delay(500),
      ...mockSuccess<LikeArticleApiData['data']>(ctx, { liked: latestLiked })
    );
  }
);

export const likeArticleError = restError(
  'post',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.like(':articleId')),
  {
    message: '좋아요에 실패했습니다.',
  }
);

export const scrapArticle = rest.post(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.scrap(':articleId')),
  (req, res, ctx) => {
    const params = req.params as { articleId: string };

    const articleId = Number(params.articleId);
    const article = articles[articleId];
    article.scraped = !article.scraped;
    const latestScraped = article.scraped;

    return res(
      ctx.delay(500),
      ...mockSuccess<ScrapArticleApiData['data']>(ctx, {
        scraped: latestScraped,
      })
    );
  }
);

export const scrapArticleError = restError(
  'post',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.scrap(':articleId')),
  {
    message: '스크랩에 실패했습니다.',

  }
);


export const articleHandlers = [
  getArticleCategories,
  createArticle,
  getArticleDetail,
  removeArticle,
  reportArticle,
  updateArticle,
  likeArticle,
  scrapArticle,
];
