import type { GetArticlesApiData } from './getArticles';
import type { InfiniteParams } from '~/services/common';

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

export interface GetMyScrapedArticlesQueryParams extends InfiniteParams {}

export const getMyScrapedArticles = (params: GetMyScrapedArticlesParams) => {
  const { cursor = defaultArticlesPageCursor, size = defaultArticlesPageSize } =
    params;
  const endpoint = endpoints.articles.myScraped();
  const queryParams: GetMyScrapedArticlesQueryParams = {
    cursor,
    size,
  };

  return privateAxios<GetMyScrapedArticlesApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
