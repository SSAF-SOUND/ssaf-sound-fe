import type { CommentDetail } from '~/services/articleComment/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils';

export type GetArticleCommentsApiData = ApiSuccessResponse<{
  comments: CommentDetail[];
}>;

export const getArticleComments = (articleId: number) => {
  const endpoint = endpoints.articleComments.list(articleId);

  return publicAxios
    .get<GetArticleCommentsApiData>(endpoint)
    .then((res) => res.data.data.comments);
};

export interface CreateArticleCommentParams {
  articleId: number;
  content: string;
  anonymous: boolean;
}

export interface CreateArticleCommentBody {
  content: string;
  anonymity: boolean;
}

export const createArticleComment = (params: CreateArticleCommentParams) => {
  const { articleId, anonymous, content } = params;
  const body: CreateArticleCommentBody = {
    content,
    anonymity: anonymous,
  };

  const endpoint = endpoints.articleComments.create(articleId);

  return privateAxios.post(endpoint, body).then((res) => res.data);
};

export type LikeArticleCommentApiData = ApiSuccessResponse<
  Pick<CommentDetail, 'liked' | 'likeCount'>
>;

export const likeArticleComment = (commentId: number) => {
  const endpoint = endpoints.articleComments.like(commentId);

  return privateAxios
    .post<LikeArticleCommentApiData>(endpoint, null)
    .then((res) => res.data.data);
};
