import type {
  ArticleCategory,
  ArticleDetail,
  ArticleDetailError,
} from './utils';
import type { ApiSuccessResponse } from '~/types';

import { isAxiosError } from 'axios';

import { endpoints } from '~/react-query/common';
import { getErrorResponse, privateAxios, publicAxios } from '~/utils';

type GetArticleCategoriesApiData = ApiSuccessResponse<ArticleCategory[]>;

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

export type GetArticleDetailApiData = ApiSuccessResponse<{
  post: ArticleDetail;
}>;

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
