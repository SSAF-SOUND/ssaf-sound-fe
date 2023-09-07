import type { CommentDetail } from '~/services/articleComment';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils';

export type GetRecruitCommentsApiData = ApiSuccessResponse<{
  comments: CommentDetail[];
}>;

export const getRecruitComments = (recruitId: number) => {
  const endpoint = endpoints.recruitComments.list(recruitId);

  return publicAxios
    .get<GetRecruitCommentsApiData>(endpoint)
    .then((res) => res.data.data.comments);
};

export interface CreateRecruitCommentParams {
  recruitId: number;
  content: string;
}

export interface CreateRecruitCommentBody {
  content: string;
  commentGroup: number; // parentCommentId
}

export const createRecruitComment = (params: CreateRecruitCommentParams) => {
  const { recruitId, content } = params;
  const endpoint = endpoints.recruitComments.create(recruitId);

  const body: CreateRecruitCommentBody = {
    content,
    commentGroup: -1,
  };

  return privateAxios.post(endpoint, body).then((res) => res.data);
};

export type LikeRecruitCommentApiData = ApiSuccessResponse<
  Pick<CommentDetail, 'liked' | 'likeCount'>
>;

export const likeRecruitComment = (commentId: number) => {
  const endpoint = endpoints.articleComments.like(commentId);

  return privateAxios
    .post<LikeRecruitCommentApiData>(endpoint, null)
    .then((res) => res.data.data);
};

export interface ReplyRecruitCommentParams {
  recruitId: number;
  commentId: number;
  content: string;
}

export type ReplyRecruitCommentBody = CreateRecruitCommentBody;

export const replyRecruitComment = (params: ReplyRecruitCommentParams) => {
  const { commentId, recruitId, content } = params;
  const endpoint = endpoints.recruitComments.reply({
    commentId,
    recruitId,
  });

  const body: ReplyRecruitCommentBody = {
    content,
    commentGroup: commentId,
  };

  return privateAxios.post(endpoint, body).then((res) => res.data);
};

export interface UpdateRecruitCommentParams {
  commentId: number;
  content: string;
}

export type UpdateRecruitCommentBody = {
  content: string;
};

export const updateRecruitComment = (params: UpdateRecruitCommentParams) => {
  const { commentId, content } = params;
  const endpoint = endpoints.recruitComments.detail(commentId);

  const body: UpdateRecruitCommentBody = {
    content,
  };

  return privateAxios.put(endpoint, body).then((res) => res.data);
};

export const removeRecruitComment = (commentId: number) => {
  const endpoint = endpoints.recruitComments.detail(commentId);

  return privateAxios.delete(endpoint).then((res) => res.data);
};
