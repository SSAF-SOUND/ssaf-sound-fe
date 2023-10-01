import type { CreateArticleParams, CreateArticleBody } from './createArticle';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';


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
