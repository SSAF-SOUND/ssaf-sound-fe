import type { GetArticleDetailApiData } from '~/services/article/apis';

import { createMockArticle } from '~/mocks/handlers/article/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getArticleDetailMethod = 'get';
const getArticleDetailEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line
  // @ts-ignore
  endpoints.articles.detail(':articleId')
);

const createMockGetArticleDetail = (
  articleDetail: GetArticleDetailApiData['data']['post']
) => {
  return restSuccess<GetArticleDetailApiData['data']>(
    getArticleDetailMethod,
    getArticleDetailEndpoint,
    {
      data: {
        post: articleDetail,
      },
    }
  );
};

export const mockGetArticleDetail = createMockGetArticleDetail(
  createMockArticle(1)
);

export const mockGetArticleDetailError = restError(
  getArticleDetailMethod,
  getArticleDetailEndpoint,
  {
    message: 'mockGetArticleDetail Error',
  }
);
