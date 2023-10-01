import type { ArticleCategory } from '~/services/article/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { publicAxios } from '~/utils/axios';

export type GetArticleCategoriesApiData = ApiSuccessResponse<{
  boards: ArticleCategory[];
}>;

export const getArticleCategories = () => {
  const endpoint = endpoints.articles.categories();
  return publicAxios
    .get<GetArticleCategoriesApiData>(endpoint)
    .then((res) => res.data.data.boards);
};
