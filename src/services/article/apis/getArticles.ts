import type { ArticleSummary } from '~/services/article/utils';
import type { PublicRequestOption } from '~/services/common';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageCursor,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { publicAxios, privateAxios } from '~/utils/axios';
import { isClient } from '~/utils/misc';

export interface GetArticlesParams {
  categoryId: number;
  cursor?: number;
  size?: number;
  keyword?: string;
}

export type GetArticlesOptions = PublicRequestOption;

export type GetArticlesApiData = ApiSuccessResponse<{
  posts: ArticleSummary[];
  cursor: number | null;
}>;

export const getArticles = (
  params: GetArticlesParams,
  options: GetArticlesOptions = {}
) => {
  const { publicRequest = !isClient } = options;
  const {
    categoryId,
    cursor = defaultArticlesPageCursor,
    size = defaultArticlesPageSize,
    keyword,
  } = params;

  const endpoint = endpoints.articles.list({
    categoryId,
    cursor,
    size,
    keyword,
  });

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance
    .get<GetArticlesApiData>(endpoint)
    .then((res) => res.data.data);
};
