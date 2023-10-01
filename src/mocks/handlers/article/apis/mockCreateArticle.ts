import type { CreateArticleApiData } from '~/services/article/apis';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

const createArticleMethod = 'post';
const createArticleEndpoint = removeQueryParams(
  composeUrls(API_URL, endpoints.articles.create(1))
);

export const mockCreateArticle = restSuccess<CreateArticleApiData['data']>(
  createArticleMethod,
  createArticleEndpoint,
  {
    data: {
      postId: 1,
    },
  }
);

export const mockCreateArticleError = restError(
  createArticleMethod,
  createArticleEndpoint,
  {
    message: 'mockCreateArticle Error',
  }
);
