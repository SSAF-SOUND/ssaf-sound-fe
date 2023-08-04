import type { CommentDetail } from '~/services/comment/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { publicAxios } from '~/utils';

export type GetCommentsApiData = ApiSuccessResponse<{ comments: CommentDetail[] }>;

export const getComments = (articleId: number) => {
  const endpoint = endpoints.comments.list(articleId);

  return publicAxios
    .get<GetCommentsApiData>(endpoint)
    .then((res) => res.data.data.comments);
};
