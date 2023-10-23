import type { GetArticlesByOffsetApiData } from './getArticlesByOffset';
import type { PaginationParams } from '~/services/common';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageOffset,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { privateAxios } from '~/utils/axios';

export interface GetMyArticlesByOffsetParams {
  page?: number;
  size?: number;
}

export type GetMyArticlesByOffsetApiData = GetArticlesByOffsetApiData;
export interface GetMyArticlesByOffsetQueryParams extends PaginationParams {}

export const getMyArticlesByOffset = (params: GetMyArticlesByOffsetParams) => {
  const { page = defaultArticlesPageOffset, size = defaultArticlesPageSize } =
    params;
  const endpoint = endpoints.articles.mineByOffset();
  const queryParams: GetMyArticlesByOffsetQueryParams = {
    page,
    size,
  };

  return privateAxios<GetMyArticlesByOffsetApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
