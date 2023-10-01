import type { GetArticlesApiData } from './getArticles';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageCursor,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { privateAxios } from '~/utils/axios';

export interface GetMyArticlesParams {
  cursor?: number;
  size?: number;
}

export type GetMyArticlesApiData = GetArticlesApiData;

export const getMyArticles = (params: GetMyArticlesParams) => {
  const { cursor = defaultArticlesPageCursor, size = defaultArticlesPageSize } =
    params;
  const endpoint = endpoints.articles.mine({ cursor, size });

  return privateAxios
    .get<GetMyArticlesApiData>(endpoint)
    .then((res) => res.data.data);
};
