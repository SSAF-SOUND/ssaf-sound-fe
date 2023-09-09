import type { ArticleCategory, ArticleDetail, ArticleSummary } from './utils';
import type { LikeStatus, ScrapStatus } from '~/services/common';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils';

export type GetArticleCategoriesApiData = ApiSuccessResponse<{
  boards: ArticleCategory[];
}>;

export const getArticleCategories = () => {
  const endpoint = endpoints.articles.categories();
  return publicAxios
    .get<GetArticleCategoriesApiData>(endpoint)
    .then((res) => res.data.data.boards);
};

export interface CreateArticleImagePayload {
  imagePath: string; // 이미지를 삭제하기 위한 URL
  imageUrl: string; // 이미지를 렌더링하기 위한 URL
}

export interface CreateArticleParams {
  categoryId: number;
  title: string;
  content: string;
  anonymous: boolean;
  images: CreateArticleImagePayload[];
}

export interface CreateArticleBody {
  title: string;
  content: string;
  anonymity: boolean;
  images: CreateArticleImagePayload[];
}

export type CreateArticleApiData = ApiSuccessResponse<{ postId: number }>;

export const createArticle = (params: CreateArticleParams) => {
  const { categoryId, anonymous, ...restParams } = params;
  const endpoint = endpoints.articles.create(categoryId);

  const body: CreateArticleBody = {
    ...restParams,
    anonymity: anonymous,
  };

  return privateAxios
    .post<CreateArticleApiData>(endpoint, body)
    .then((res) => res.data.data.postId);
};

export interface RemoveArticleParams {
  articleId: number;
}

export const removeArticle = (params: RemoveArticleParams) => {
  const { articleId } = params;
  const endpoint = endpoints.articles.detail(articleId);
  return privateAxios.delete(endpoint).then((res) => res.data);
};

export type GetArticleDetailApiData = ApiSuccessResponse<{
  post: ArticleDetail;
}>;

export interface UpdateArticleParams
  extends Omit<CreateArticleParams, 'categoryId'> {
  articleId: number;
}

export type UpdateArticleBody = CreateArticleBody;

export const updateArticle = (params: UpdateArticleParams) => {
  const { articleId, anonymous, ...restParams } = params;
  const body: UpdateArticleBody = {
    ...restParams,
    anonymity: anonymous,
  };

  const endpoint = endpoints.articles.detail(articleId);
  return privateAxios.patch(endpoint, body).then((res) => res.data);
};

export const getArticleDetail = (articleId: number) => {
  const endpoint = endpoints.articles.detail(articleId);
  return publicAxios
    .get<GetArticleDetailApiData>(endpoint)
    .then((res) => res.data.data.post);
};

export type LikeArticleApiData = ApiSuccessResponse<LikeStatus>;

export const likeArticle = (articleId: number) => {
  const endpoint = endpoints.articles.like(articleId);

  return privateAxios
    .post<LikeArticleApiData>(endpoint, null)
    .then((res) => res.data.data);
};

export type ScrapArticleApiData = ApiSuccessResponse<ScrapStatus>;

export const scrapArticle = (articleId: number) => {
  const endpoint = endpoints.articles.scrap(articleId);

  return privateAxios
    .post<ScrapArticleApiData>(endpoint, null)
    .then((res) => res.data.data);
};

export interface GetArticlesParams {
  categoryId: number;
  cursor?: number;
  size?: number;
  keyword?: string;
}

export type GetArticlesApiData = ApiSuccessResponse<{
  posts: ArticleSummary[];
  cursor: number | null;
}>;

const defaultCursor = -1;
const defaultSize = 20;

export const getArticles = (params: GetArticlesParams) => {
  const {
    categoryId,
    cursor = defaultCursor,
    size = defaultSize,
    keyword,
  } = params;
  const endpoint = endpoints.articles.list({
    categoryId,
    cursor,
    size,
    keyword,
  });

  return publicAxios
    .get<GetArticlesApiData>(endpoint)
    .then((res) => res.data.data);
};

export type GetHotArticlesParams = Omit<GetArticlesParams, 'categoryId'>;
export type GetHotArticlesApiData = GetArticlesApiData;

export const getHotArticles = (params: GetHotArticlesParams) => {
  const { cursor = defaultCursor, size = defaultSize, keyword } = params;
  const endpoint = endpoints.articles.hot({ cursor, size, keyword });

  return publicAxios
    .get<GetHotArticlesApiData>(endpoint)
    .then((res) => res.data.data);
};

export interface GetMyArticlesParams {
  cursor?: number;
  size?: number;
}

export type GetMyArticlesApiData = GetArticlesApiData;

export const getMyArticles = (params: GetMyArticlesParams) => {
  const { cursor = defaultCursor, size = defaultSize } = params;
  const endpoint = endpoints.articles.mine({ cursor, size });
  return privateAxios
    .get<GetMyArticlesApiData>(endpoint)
    .then((res) => res.data.data);
};

export interface GetMyScrapedArticlesParams {
  cursor?: number;
  size?: number;
}

export type GetMyScrapedArticlesApiData = GetArticlesApiData;

export const getMyScrapedArticles = (params: GetMyScrapedArticlesParams) => {
  const { cursor = defaultCursor, size = defaultSize } = params;
  const endpoint = endpoints.articles.myScraped({ cursor, size });
  return privateAxios
    .get<GetMyScrapedArticlesApiData>(endpoint)
    .then((res) => res.data.data);
};
