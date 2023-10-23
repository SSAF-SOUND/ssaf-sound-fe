import type { ArticleSummary } from '~/services/article/utils';
import type { PublicRequestOption, InfiniteParams } from '~/services/common';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageCursor,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { publicAxios, privateAxios } from '~/utils/axios';
import { isClient } from '~/utils/misc';

export interface GetArticlesByCursorParams {
  categoryId: number;
  cursor?: number;
  size?: number;
  keyword?: string;
}

export type GetArticlesByCursorOptions = PublicRequestOption;

export type GetArticlesByCursorApiData = ApiSuccessResponse<{
  posts: ArticleSummary[];
  cursor: number | null;
}>;

export interface GetArticlesByCursorQueryParams extends InfiniteParams {
  boardId: number;
  keyword?: string;
}

export const getArticlesByCursor = (
  params: GetArticlesByCursorParams,
  options: GetArticlesByCursorOptions = {}
) => {
  const { publicRequest = !isClient } = options;
  const {
    categoryId,
    cursor = defaultArticlesPageCursor,
    size = defaultArticlesPageSize,
    keyword,
  } = params;

  const endpoint = endpoints.articles.listByCursor({
    keyword,
  });
  const queryParams: GetArticlesByCursorQueryParams = {
    boardId: categoryId,
    cursor,
    size,
    keyword,
  };

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance<GetArticlesByCursorApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
