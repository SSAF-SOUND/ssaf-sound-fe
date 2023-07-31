import type { ArticleCategory } from './utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { publicAxios } from '~/utils';

type GetArticleCategoriesApiData = ApiSuccessResponse<ArticleCategory[]>;

export const getArticleCategories = () => {
  const endpoint = endpoints.articles.categories();
  return publicAxios
    .get<GetArticleCategoriesApiData>(endpoint)
    .then((res) => res.data.data);
};
