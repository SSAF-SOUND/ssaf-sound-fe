import type {
  ArticleCategory,
  ArticleDetail,
  ArticleDetailError,
  ArticleSummary,
} from './utils';
import type { ApiSuccessResponse } from '~/types';

import { isAxiosError } from 'axios';

import { endpoints } from '~/react-query/common';
import { getErrorResponse, privateAxios, publicAxios } from '~/utils';

export type GetArticleCategoriesApiData = ApiSuccessResponse<ArticleCategory[]>;

export const getArticleCategories = () => {
  const endpoint = endpoints.articles.categories();
  return publicAxios
    .get<GetArticleCategoriesApiData>(endpoint)
    .then((res) => res.data.data);
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

export type CreateArticleApiData = ApiSuccessResponse<{ postId: number }>;

export const createArticle = (params: CreateArticleParams) => {
  const { categoryId, ...body } = params;
  const endpoint = endpoints.articles.create(categoryId);
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

export interface ReportArticleParams {
  articleId: number;
  content: string;
}

export const reportArticle = (params: ReportArticleParams) => {
  const { articleId, content } = params;

  const endpoint = endpoints.articles.report(articleId);
  return privateAxios.post(endpoint, { content }).then((res) => res.data);
};

export interface UpdateArticleParams
  extends Omit<CreateArticleParams, 'categoryId'> {
  articleId: number;
}

export const updateArticle = (params: UpdateArticleParams) => {
  const { articleId, ...body } = params;

  const endpoint = endpoints.articles.detail(articleId);
  return privateAxios.put(endpoint, body).then((res) => res.data);
};

const createArticleDetailErrorData = (
  message: string,
  isUnknownError = false
): ArticleDetailError => {
  return {
    error: {
      isUnknownError,
      message,
    },
  };
};

export const getArticleDetail = (articleId: number) => {
  const endpoint = endpoints.articles.detail(articleId);
  return publicAxios
    .get<GetArticleDetailApiData>(endpoint)
    .then((res) => res.data.data.post)
    .catch((err) => {
      if (isAxiosError(err)) {
        const response = getErrorResponse(err);

        if (response) {
          return createArticleDetailErrorData(response.message);
        }
      }

      return createArticleDetailErrorData(
        '알 수 없는 에러가 발생했습니다.',
        true
      );
    });
};

export type LikeArticleApiData = ApiSuccessResponse<
  Pick<ArticleDetail, 'liked' | 'likeCount'>
>;

export const likeArticle = (articleId: number) => {
  const endpoint = endpoints.articles.like(articleId);

  return privateAxios
    .post<LikeArticleApiData>(endpoint, null)
    .then((res) => res.data.data);
};

export type ScrapArticleApiData = ApiSuccessResponse<
  Pick<ArticleDetail, 'scraped' | 'scrapCount'>
>;

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
