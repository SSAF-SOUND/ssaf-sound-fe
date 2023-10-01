import type { GetArticlesApiData } from './getArticles';
import type { InfiniteParams } from '~/services/common';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageCursor,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { privateAxios } from '~/utils/axios';

export interface GetMyArticlesParams {
  cursor?: number;
  size?: number;
}

export type GetMyArticlesApiData = GetArticlesApiData;
export interface GetMyArticlesQueryParams extends InfiniteParams {}

export const getMyArticles = (params: GetMyArticlesParams) => {
  const { cursor = defaultArticlesPageCursor, size = defaultArticlesPageSize } =
    params;
  const endpoint = endpoints.articles.mine();
  const queryParams: GetMyArticlesQueryParams = {
    cursor,
    size,
  };

  return privateAxios<GetMyArticlesApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
