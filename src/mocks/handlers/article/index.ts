import type {
  ArticleCategory,
  ArticleSummary,
  CreateArticleApiData,
  GetArticleDetailApiData,
  LikeArticleApiData,
  ScrapArticleApiData,
  UpdateArticleParams,
  GetArticlesApiData,
} from '~/services/article';

import { rest } from 'msw';

import {
  articleCategories,
  articleFallback,
  articles,
  articleSummaries,
} from '~/mocks/handlers/article/data';
import { mockError, mockSuccess, restError, restSuccess } from '~/mocks/utils';
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
    message: '좋아요 업데이트에 실패했습니다.',
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
  (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const categoryId = Number(searchParams.get('boardId'));
    // const size = Number(searchParams.get('size'));
    const size = 10;
    const cursor = Number(searchParams.get('cursor'));
    if (cursor > 10) {
      return res(ctx.delay(500), ...mockError(ctx, '100', 'ㅁ'));
    }

    // 데이터는 `size`개 만큼 보내야 하는데
    // 이후 데이터가 더 있는지 확인하기 위해 `size + 1`개를 가져옵니다.
    // 데이터가 더 있다면, `size + 1`개가 가져와지고
    // 데이터가 더 없다면, `size + 1`개보다 적은 개수만 가져와집니다.
    const startIndex = cursor < 0 || Number.isNaN(cursor) ? 0 : cursor;
    const endIndex = startIndex + size;

    const data = articleSummaries.slice(startIndex, endIndex + 1);
    const isReachingEnd = data.length < size + 1;

    if (!isReachingEnd) data.pop();

    const lastArticleSummaries = data.at(-1) as ArticleSummary;
    const nextCursor = isReachingEnd ? null : lastArticleSummaries.postId;

    return res(
      ctx.delay(500),
      ...mockSuccess<GetArticlesApiData['data']>(ctx, {
        posts: data,
        cursor: nextCursor,
      })
    );
  }
);

export const getArticlesError = restError(
  'get',
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
  {
    message: '에러가 발생했습니다',
  }
);

export const getArticlesByKeyword = rest.get(
  removeQueryParams(
    composeUrls(
      API_URL,
      endpoints.articles.search({
        categoryId: 0,
        cursor: 0,
        size: 0,
        keyword: '',
      })
    )
  ),
  (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const categoryId = Number(searchParams.get('boardId'));
    // const size = Number(searchParams.get('size'));
    const size = 10;
    const cursor = Number(searchParams.get('cursor'));
    const keyword = searchParams.get('keyword');

    if (cursor > 10) {
      return res(ctx.delay(500), ...mockError(ctx, '100', 'ㅁ'));
    }

    const startIndex = cursor < 0 || Number.isNaN(cursor) ? 0 : cursor;
    const endIndex = startIndex + size;

    const data = articleSummaries.slice(startIndex, endIndex + 1);
    const isReachingEnd = data.length < size + 1;

    if (!isReachingEnd) data.pop();

    const lastArticleSummaries = data.at(-1) as ArticleSummary;
    const nextCursor = isReachingEnd ? null : lastArticleSummaries.postId;

    return res(
      ctx.delay(500),
      ...mockSuccess<GetArticlesApiData['data']>(ctx, {
        posts: data,
        cursor: nextCursor,
      })
    );
  }
);

export const getArticlesByKeywordError = restError(
  'get',
  removeQueryParams(
    composeUrls(
      API_URL,
      endpoints.articles.search({
        categoryId: 0,
        cursor: 0,
        size: 0,
        keyword: '',
      })
    )
  ),
  {
    message: '에러가 발생했습니다',
  }
);

export const articleHandlers = [
  getArticlesByKeyword,
  getArticleCategories,
  createArticle,
  getArticleDetail,
  removeArticle,
  reportArticle,
  updateArticle,
  likeArticle,
  // likeArticleError,
  scrapArticle,
  // scrapArticleError,
  getArticles,
  // getArticlesError,
];
