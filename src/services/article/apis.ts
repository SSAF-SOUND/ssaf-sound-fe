import type {
  ArticleCategory,
  ArticleDetail,
  ArticleDetailError,
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
  Pick<ArticleDetail, 'liked'>
>;

export const likeArticle = (articleId: number) => {
  const endpoint = endpoints.articles.like(articleId);

  return privateAxios
    .post<LikeArticleApiData>(endpoint, null)
    .then((res) => res.data.data.liked);
};

export type ScrapArticleApiData = ApiSuccessResponse<
  Pick<ArticleDetail, 'scraped'>
>;

export const scrapArticle = (articleId: number) => {
  const endpoint = endpoints.articles.scrap(articleId);

  return privateAxios
    .post<ScrapArticleApiData>(endpoint, null)
    .then((res) => res.data.data.scraped);
};
