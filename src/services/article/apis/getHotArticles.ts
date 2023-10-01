import type { GetArticlesParams, GetArticlesApiData } from './getArticles';
import type { PublicRequestOption } from '~/services/common';

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
  const endpoint = endpoints.articles.hot({ cursor, size, keyword });

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance
    .get<GetHotArticlesApiData>(endpoint)
    .then((res) => res.data.data);
};
