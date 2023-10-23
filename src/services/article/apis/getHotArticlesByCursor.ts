import type { GetArticlesByCursorParams, GetArticlesByCursorApiData } from './getArticlesByCursor';
import type { InfiniteParams, PublicRequestOption } from '~/services/common';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageCursor,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { publicAxios, privateAxios } from '~/utils/axios';
import { isClient } from '~/utils/misc';

export type GetHotArticlesByCursorParams = Omit<GetArticlesByCursorParams, 'categoryId'>;
export type GetHotArticlesByCursorApiData = GetArticlesByCursorApiData;
export type GetHotArticlesByCursorOptions = PublicRequestOption;
export interface GetHotArticlesQueryParams extends InfiniteParams {
  keyword?: string;
}

export const getHotArticlesByCursor = (
  params: GetHotArticlesByCursorParams = {},
  options: GetHotArticlesByCursorOptions = {}
) => {
  const { publicRequest = !isClient } = options;
  const {
    cursor = defaultArticlesPageCursor,
    size = defaultArticlesPageSize,
    keyword,
  } = params;
  const endpoint = endpoints.articles.hotByCursor({ keyword });
  const queryParams: GetHotArticlesQueryParams = {
    cursor,
    size,
    keyword,
  };

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance<GetHotArticlesByCursorApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
