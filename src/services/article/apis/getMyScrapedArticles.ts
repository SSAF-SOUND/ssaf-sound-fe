import type { GetArticlesApiData } from './getArticles';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageCursor,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { privateAxios } from '~/utils/axios';

export interface GetMyScrapedArticlesParams {
  cursor?: number;
  size?: number;
}

export type GetMyScrapedArticlesApiData = GetArticlesApiData;

export const getMyScrapedArticles = (params: GetMyScrapedArticlesParams) => {
  const { cursor = defaultArticlesPageCursor, size = defaultArticlesPageSize } =
    params;
  const endpoint = endpoints.articles.myScraped({ cursor, size });
  return privateAxios
    .get<GetMyScrapedArticlesApiData>(endpoint)
    .then((res) => res.data.data);
};
