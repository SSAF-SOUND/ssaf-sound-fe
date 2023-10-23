import type { ArticleSummary } from '~/services/article/utils';
import type {
  PublicRequestOption,
  PaginationStatus,
  PaginationParams,
} from '~/services/common';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageOffset,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { publicAxios, privateAxios } from '~/utils/axios';
import { isClient } from '~/utils/misc';

export interface GetArticlesByOffsetParams {
  categoryId: number;
  page?: number;
  size?: number;
  keyword?: string;
}

export type GetArticlesByOffsetOptions = PublicRequestOption;

export type GetArticlesByOffsetApiData = ApiSuccessResponse<
  {
    posts: ArticleSummary[];
  } & PaginationStatus
>;

export interface GetArticlesByOffsetQueryParams extends PaginationParams {
  boardId: number;
  keyword?: string;
}

export const getArticlesByOffset = (
  params: GetArticlesByOffsetParams,
  options: GetArticlesByOffsetOptions = {}
) => {
  const { publicRequest = !isClient } = options;
  const {
    categoryId,
    page = defaultArticlesPageOffset,
    size = defaultArticlesPageSize,
    keyword,
  } = params;

  const endpoint = endpoints.articles.listByOffset({
    keyword,
  });
  const queryParams: GetArticlesByOffsetQueryParams = {
    boardId: categoryId,
    page,
    size,
    keyword,
  };

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance<GetArticlesByOffsetApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
