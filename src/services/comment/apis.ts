import type { CommentDetail } from '~/services/comment/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils';

export type GetCommentsApiData = ApiSuccessResponse<{
  comments: CommentDetail[];
}>;

export const getComments = (articleId: number) => {
  const endpoint = endpoints.comments.list(articleId);

  return publicAxios
    .get<GetCommentsApiData>(endpoint)
    .then((res) => res.data.data.comments);
};

export interface CreateCommentParams {
  articleId: number;
  content: string;
  anonymous: boolean;
}

export interface CreateCommentBody {
  content: string;
  anonymity: boolean;
}

export const createComment = (params: CreateCommentParams) => {
  const { articleId, anonymous, content } = params;
  const body: CreateCommentBody = {
    content,
    anonymity: anonymous,
  };

  const endpoint = endpoints.comments.create(articleId);

  return privateAxios.post(endpoint, body).then((res) => res.data);
};

export type LikeCommentApiData = ApiSuccessResponse<
  Pick<CommentDetail, 'liked' | 'likeCount'>
>;

export const likeComment = (commentId: number) => {
  const endpoint = endpoints.comments.like(commentId);

  return privateAxios
    .post<LikeCommentApiData>(endpoint, null)
    .then((res) => res.data.data);
};
