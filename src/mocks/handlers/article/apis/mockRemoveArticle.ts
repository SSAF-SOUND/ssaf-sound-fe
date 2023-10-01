import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const removeArticleMethod = 'delete';
const removeArticleEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line
  // @ts-ignore
  endpoints.articles.detail(':articleId')
);

export const mockRemoveArticle = restSuccess(
  removeArticleMethod,
  removeArticleEndpoint,
  { data: null }
);

export const mockRemoveArticleError = restError(
  removeArticleMethod,
  removeArticleEndpoint,
  {
    message: 'mockRemoveArticle Error.',
  }
);
