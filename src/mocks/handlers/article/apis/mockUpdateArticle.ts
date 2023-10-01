import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const updateArticleMethod = 'patch';
const updateArticleEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line
  // @ts-ignore
  endpoints.articles.detail(':articleId')
);

export const mockUpdateArticle = restSuccess(
  updateArticleMethod,
  updateArticleEndpoint,
  {
    data: null,
  }
);

export const mockUpdateArticleError = restError(
  updateArticleMethod,
  updateArticleEndpoint,
  {
    message: 'mockUpdateArticle Error',
  }
);
