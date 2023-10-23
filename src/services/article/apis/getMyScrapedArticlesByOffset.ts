import type { GetArticlesByOffsetApiData } from './getArticlesByOffset';
import type { PaginationParams } from '~/services/common';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageCursor,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { privateAxios } from '~/utils/axios';

export interface GetMyScrapedArticlesByOffsetParams {
  page?: number;
  size?: number;
}

export type GetMyScrapedArticlesByOffsetApiData = GetArticlesByOffsetApiData;

export interface GetMyScrapedArticlesByOffsetQueryParams
  extends PaginationParams {}

export const getMyScrapedArticlesByOffset = (
  params: GetMyScrapedArticlesByOffsetParams
) => {
  const { page = defaultArticlesPageCursor, size = defaultArticlesPageSize } =
    params;
  const endpoint = endpoints.articles.myScrapsByOffset();
  const queryParams: GetMyScrapedArticlesByOffsetQueryParams = {
    page,
    size,
  };

  return privateAxios<GetMyScrapedArticlesByOffsetApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
