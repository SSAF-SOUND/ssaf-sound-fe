import type { ArticleCategory } from '~/services/article';

import { articleCategories } from '~/mocks/handlers/article/data';
import { restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

export const getArticleCategories = restSuccess<ArticleCategory[]>(
  'get',
  composeUrls(API_URL, endpoints.articles.categories()),
  { data: articleCategories }
);

export const articleHandlers = [getArticleCategories];
