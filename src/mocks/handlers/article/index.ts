/* eslint-disable @typescript-eslint/ban-ts-comment */

import type {
  CreateArticleApiData,
  CreateArticleBody,
  GetArticleCategoriesApiData,
  GetArticleDetailApiData,
  LikeArticleApiData,
  ScrapArticleApiData,
  UpdateArticleParams,
} from '~/services/article';

import { rest } from 'msw';

import {
  articleCategories,
  articleError,
  articles,
  createMockArticle,
} from '~/mocks/handlers/article/data';
import {
  restInfiniteArticlesError,
  restInfiniteArticlesSuccess,
} from '~/mocks/handlers/article/utils';
import { mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

export const getArticleCategories = restSuccess<
  GetArticleCategoriesApiData['data']
>('get', composeUrls(API_URL, endpoints.articles.categories()), {
  data: {
    boards: articleCategories,
  },
});

export const getArticleCategoriesError = restError(
  'get',
  composeUrls(API_URL, endpoints.articles.categories()),
  { message: '에러가 발생했습니다.' }
);

export const createArticle = rest.post(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, removeQueryParams(endpoints.articles.create(1))),
  async (req, res, ctx) => {
    const { title, content, images, anonymity } =
      (await req.json()) as CreateArticleBody;

    const articleId = articles.length;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    articles.push({
      ...createMockArticle(articleId),
      title,
      content,
      images,
      anonymity,
    });

    console.log('[현재 mock articles 목록]: ', articles);

    return res(
      ctx.delay(500),
      ...mockSuccess<CreateArticleApiData['data']>(ctx, {
        postId: articleId,
      })
    );
  }
);

export const createArticleError = restError(
  'post',
  // @ts-ignore
  composeUrls(API_URL, removeQueryParams(endpoints.articles.create(1))),
  {
    data: null,
  }
);

export const removeArticle = restSuccess(
  'delete',
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.detail(':articleId')),
  {
    data: null,
  }
);

export const removeArticleError = restError(
  'delete',
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.detail(':articleId')),
  {
    message: '게시글 삭제에 실패했습니다.',
  }
);

export const reportArticle = restSuccess(
  'post',
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.report(':articleId')),
  {
    data: null,
  }
);

export const reportArticleError = restError(
  'post',
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.report(':articleId')),
  {
    message: '게시글 신고에 실패했습니다.',
  }
);

export const updateArticle = rest.patch(
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
  'patch',
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.detail(':articleId')),
  {
    message: '게시글 수정에 실패했습니다.',
  }
);

export const getArticleDetail = rest.get(
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.detail(':articleId')),
  (req, res, ctx) => {
    const params = req.params as { articleId: string };
    const articleId = Number(params.articleId);
    const article = articles[Number(articleId)] || articleError;

    return res(
      ctx.delay(500),
      ...mockSuccess<GetArticleDetailApiData['data']>(ctx, { post: article })
    );
  }
);

export const getArticleDetailError = restError(
  'get',
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
    const delta = article.liked ? 1 : -1;
    article.likeCount += delta;
    const latestLiked = article.liked;
    const latestLikeCount = article.likeCount;

    return res(
      ctx.delay(500),
      ...mockSuccess<LikeArticleApiData['data']>(ctx, {
        liked: latestLiked,
        likeCount: latestLikeCount,
      })
    );
  }
);

export const likeArticleError = restError(
  'post',
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.like(':articleId')),
  {
    message: '좋아요 업데이트에 실패했습니다.',
  }
);

export const scrapArticle = rest.post(
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.scrap(':articleId')),
  (req, res, ctx) => {
    const params = req.params as { articleId: string };

    const articleId = Number(params.articleId);
    const article = articles[articleId];
    article.scraped = !article.scraped;
    const delta = article.scraped ? 1 : -1;
    article.scrapCount += delta;
    const latestScraped = article.scraped;
    const latestScrapCount = article.scrapCount;

    return res(
      ctx.delay(500),
      ...mockSuccess<ScrapArticleApiData['data']>(ctx, {
        scraped: latestScraped,
        scrapCount: latestScrapCount,
      })
    );
  }
);

export const scrapArticleError = restError(
  'post',
  // @ts-ignore
  composeUrls(API_URL, endpoints.articles.scrap(':articleId')),
  {
    message: '스크랩 업데이트에 실패했습니다.',
  }
);

export const getArticles = rest.get(
  removeQueryParams(
    composeUrls(
      API_URL,
      endpoints.articles.list({
        categoryId: 0,
        cursor: 0,
        size: 0,
      })
    )
  ),
  restInfiniteArticlesSuccess
);

export const getArticlesError = rest.get(
  removeQueryParams(
    composeUrls(
      API_URL,
      endpoints.articles.list({
        categoryId: 0,
        cursor: 0,
        size: 0,
      })
    )
  ),
  restInfiniteArticlesError
);

export const getArticlesByKeyword = rest.get(
  removeQueryParams(
    composeUrls(
      API_URL,
      endpoints.articles.list({
        categoryId: 0,
        cursor: 0,
        size: 0,
        keyword: 'keyword',
      })
    )
  ),
  restInfiniteArticlesSuccess
);

export const getArticlesByKeywordError = rest.get(
  removeQueryParams(
    composeUrls(
      API_URL,
      endpoints.articles.list({
        categoryId: 0,
        cursor: 0,
        size: 0,
        keyword: 'keyword',
      })
    )
  ),
  restInfiniteArticlesError
);

export const getHotArticles = rest.get(
  removeQueryParams(
    composeUrls(API_URL, endpoints.articles.hot({ cursor: 0, size: 0 }))
  ),
  restInfiniteArticlesSuccess
);

export const getHotArticlesError = rest.get(
  removeQueryParams(
    composeUrls(API_URL, endpoints.articles.hot({ cursor: 0, size: 0 }))
  ),
  restInfiniteArticlesError
);

export const getHotArticlesByKeyword = rest.get(
  removeQueryParams(
    composeUrls(
      API_URL,
      endpoints.articles.hot({
        cursor: 0,
        size: 0,
        keyword: 'keyword', // 이 값이 있어야 `endpoint`가 달라짐
      })
    )
  ),
  restInfiniteArticlesSuccess
);

export const getHotArticlesByKeywordError = rest.get(
  removeQueryParams(
    composeUrls(
      API_URL,
      endpoints.articles.hot({
        cursor: 0,
        size: 0,
        keyword: 'keyword', // 이 값이 있어야 `endpoint`가 달라짐
      })
    )
  ),
  restInfiniteArticlesError
);

export const getMyArticles = rest.get(
  removeQueryParams(
    composeUrls(API_URL, endpoints.articles.mine({ cursor: 0, size: 0 }))
  ),
  restInfiniteArticlesSuccess
);

export const getMyArticlesError = rest.get(
  removeQueryParams(
    composeUrls(API_URL, endpoints.articles.mine({ cursor: 0, size: 0 }))
  ),
  restInfiniteArticlesError
);

export const getMyScrapedArticles = rest.get(
  removeQueryParams(
    composeUrls(API_URL, endpoints.articles.myScraped({ cursor: 0, size: 0 }))
  ),
  restInfiniteArticlesSuccess
);

export const getMyScrapedArticlesError = rest.get(
  removeQueryParams(
    composeUrls(API_URL, endpoints.articles.myScraped({ cursor: 0, size: 0 }))
  ),
  restInfiniteArticlesError
);

export const articleHandlers = [
  getMyArticles, // /posts/my
  getMyScrapedArticles, // /posts/my-scrap
  // getMyScrapedArticlesError,
  getHotArticles, // /posts/hot?
  getHotArticlesByKeyword, // /posts/hot/search?
  getArticlesByKeyword, // /posts/search?
  getArticles, // /posts?
  // getArticlesError,
  getArticleCategories,
  getArticleDetail, // /posts/:id
  createArticle,
  removeArticle,
  reportArticle,
  updateArticle,
  likeArticle,
  // likeArticleError,
  scrapArticle,
  // scrapArticleError,
];
