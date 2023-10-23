import type {
  GetArticlesByOffsetParams,
  GetArticlesByOffsetApiData,
} from './getArticlesByOffset';
import type { PaginationParams, PublicRequestOption } from '~/services/common';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageOffset,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { publicAxios, privateAxios } from '~/utils/axios';
import { isClient } from '~/utils/misc';

export type GetHotArticlesByOffsetParams = Omit<
  GetArticlesByOffsetParams,
  'categoryId'
>;
export type GetHotArticlesByOffsetApiData = GetArticlesByOffsetApiData;
export type GetHotArticlesByOffsetOptions = PublicRequestOption;
export interface GetHotArticlesByOffsetQueryParams extends PaginationParams {
  keyword?: string;
}

export const getHotArticlesByOffset = (
  params: GetHotArticlesByOffsetParams = {},
  options: GetHotArticlesByOffsetOptions = {}
) => {
  const { publicRequest = !isClient } = options;
  const {
    page = defaultArticlesPageOffset,
    size = defaultArticlesPageSize,
    keyword,
  } = params;
  const endpoint = endpoints.articles.hotByOffset({ keyword });
  const queryParams: GetHotArticlesByOffsetQueryParams = {
    page,
    size,
    keyword,
  };

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance<GetHotArticlesByOffsetApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
