import type { LikeStatus } from '~/services/common/types';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export type LikeArticleApiData = ApiSuccessResponse<LikeStatus>;

export const likeArticle = (articleId: number) => {
  const endpoint = endpoints.articles.like(articleId);

  return privateAxios
    .post<LikeArticleApiData>(endpoint, null)
    .then((res) => res.data.data);
};
