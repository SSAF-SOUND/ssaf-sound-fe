import type { ArticleCategory } from './utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils';

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
