import type { ScrapStatus } from '~/services/common/types';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export type ScrapArticleApiData = ApiSuccessResponse<ScrapStatus>;

export const scrapArticle = (articleId: number) => {
  const endpoint = endpoints.articles.scrap(articleId);

  return privateAxios
    .post<ScrapArticleApiData>(endpoint, null)
    .then((res) => res.data.data);
};
