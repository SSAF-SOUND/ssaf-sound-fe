import type { GetArticlesByCursorApiData } from './getArticlesByCursor';
import type { InfiniteParams } from '~/services/common';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageCursor,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { privateAxios } from '~/utils/axios';

export interface GetMyArticlesByCursorParams {
  cursor?: number;
  size?: number;
}

export type GetMyArticlesByCursorApiData = GetArticlesByCursorApiData;
export interface GetMyArticlesByCursorQueryParams extends InfiniteParams {}

export const getMyArticlesByCursor = (params: GetMyArticlesByCursorParams) => {
  const { cursor = defaultArticlesPageCursor, size = defaultArticlesPageSize } =
    params;
  const endpoint = endpoints.articles.mineByCursor();
  const queryParams: GetMyArticlesByCursorQueryParams = {
    cursor,
    size,
  };

  return privateAxios<GetMyArticlesByCursorApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
