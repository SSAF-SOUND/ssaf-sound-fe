import type { GetArticlesParams, GetArticlesApiData } from './getArticles';
import type { InfiniteParams, PublicRequestOption } from '~/services/common';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageCursor,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { publicAxios, privateAxios } from '~/utils/axios';
import { isClient } from '~/utils/misc';

export type GetHotArticlesParams = Omit<GetArticlesParams, 'categoryId'>;
export type GetHotArticlesApiData = GetArticlesApiData;
export type GetHotArticlesOptions = PublicRequestOption;
export interface GetHotArticlesQueryParams extends InfiniteParams {
  keyword?: string;
}

export const getHotArticles = (
  params: GetHotArticlesParams = {},
  options: GetHotArticlesOptions = {}
) => {
  const { publicRequest = !isClient } = options;
  const {
    cursor = defaultArticlesPageCursor,
    size = defaultArticlesPageSize,
    keyword,
  } = params;
  const endpoint = endpoints.articles.hot({ keyword });
  const queryParams: GetHotArticlesQueryParams = {
    cursor,
    size,
    keyword,
  };

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance<GetHotArticlesApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
