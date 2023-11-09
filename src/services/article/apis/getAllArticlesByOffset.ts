import type { ArticleSummary } from '~/services/article/utils';
import type {
  PaginationParams,
  PaginationStatus,
  PublicRequestOption,
} from '~/services/common';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageOffset,
  defaultArticlesPageSize,
} from '~/services/article';
import { isClient, privateAxios, publicAxios } from '~/utils';

export interface GetAllArticlesByOffsetParams {
  page?: number;
  size?: number;
  keyword?: string;
}

export type GetAllArticlesByOffsetOptions = PublicRequestOption;

export type GetAllArticlesByOffsetApiData = ApiSuccessResponse<
  {
    posts: ArticleSummary[];
  } & PaginationStatus
>;

export interface GetAllArticlesByOffsetQueryParams extends PaginationParams {
  keyword?: string;
}

export const getAllArticlesByOffset = (
  params: GetAllArticlesByOffsetParams,
  options: GetAllArticlesByOffsetOptions = {}
) => {
  const { publicRequest = !isClient } = options;
  const {
    page = defaultArticlesPageOffset,
    size = defaultArticlesPageSize,
    keyword,
  } = params;

  const endpoint = endpoints.articles.allListByOffset({ keyword });
  const queryParams: GetAllArticlesByOffsetQueryParams = {
    page,
    size,
    keyword,
  };

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance<GetAllArticlesByOffsetApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
