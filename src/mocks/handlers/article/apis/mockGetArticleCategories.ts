import type { GetArticleCategoriesApiData } from '~/services/article/apis';

import { articleCategories } from '~/mocks/handlers/article/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getArticleCategoriesMethod = 'get';
const getArticleCategoriesEndpoint = composeUrls(
  API_URL,
  endpoints.articles.categories()
);

export const mockGetArticleCategories = restSuccess<
  GetArticleCategoriesApiData['data']
>(getArticleCategoriesMethod, getArticleCategoriesEndpoint, {
  data: {
    boards: articleCategories,
  },
});

export const mockGetArticleCategoriesError = restError(
  getArticleCategoriesMethod,
  getArticleCategoriesEndpoint,
  { message: 'mockGetArticleCategories Error.' }
);
