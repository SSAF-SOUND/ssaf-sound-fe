import type { GetArticlesByCursorApiData } from './getArticlesByCursor';
import type { InfiniteParams } from '~/services/common';

import { endpoints } from '~/react-query/common';
import {
  defaultArticlesPageCursor,
  defaultArticlesPageSize,
} from '~/services/article/apis/constants';
import { privateAxios } from '~/utils/axios';

export interface GetMyScrapedArticlesByCursorParams {
  cursor?: number;
  size?: number;
}

export type GetMyScrapedArticlesByCursorApiData = GetArticlesByCursorApiData;

export interface GetMyScrapedArticlesByCursorQueryParams extends InfiniteParams {}

export const getMyScrapedArticlesByCursor = (params: GetMyScrapedArticlesByCursorParams) => {
  const { cursor = defaultArticlesPageCursor, size = defaultArticlesPageSize } =
    params;
  const endpoint = endpoints.articles.myScrapsByCursor();
  const queryParams: GetMyScrapedArticlesByCursorQueryParams = {
    cursor,
    size,
  };

  return privateAxios<GetMyScrapedArticlesByCursorApiData>({
    method: 'get',
    url: endpoint,
    params: queryParams,
  }).then((res) => res.data.data);
};
