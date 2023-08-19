/* eslint-disable @typescript-eslint/ban-ts-comment*/
import type {
  CreateCommentBody,
  GetCommentsApiData,
  LikeCommentApiData,
} from '~/services/comment';

import { rest } from 'msw';

import {
  commentDetails,
  createMockCommentDetail,
} from '~/mocks/handlers/comment/data';
import { mockError, mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { findCommentById } from '~/services/comment';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

export const getComments = restSuccess<GetCommentsApiData['data']>(
  'get',
  removeQueryParams(composeUrls(API_URL, endpoints.comments.list(1))),
  {
    data: {
      comments: commentDetails,
    },
  }
);

export const creatComment = rest.post(
  removeQueryParams(composeUrls(API_URL, endpoints.comments.create(1))),
  async (req, res, ctx) => {
    const { anonymity, content } = (await req.json()) as CreateCommentBody;
    const lastComment = commentDetails.at(-1);
    const newCommentId = (lastComment?.commentId ?? 1) + 1;
    const newComment = createMockCommentDetail(newCommentId, 0);
    newComment.anonymity = anonymity;
    newComment.content = content;

    commentDetails.push(newComment);

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

export const likeComment = rest.post(
  // @ts-ignore
  composeUrls(API_URL, endpoints.comments.like(':commentId')),
  (req, res, ctx) => {
    const params = req.params as { commentId: string };

    const commentId = Number(params.commentId);
    const target = findCommentById(commentDetails, commentId);
    console.log(target);
    console.log(commentDetails);
    if (!target) return res(...mockError(ctx, '400', '존재하지 않는 댓글'));

    target.liked = !target.liked;
    const delta = target.liked ? 1 : -1;
    target.likeCount += delta;
    const latestLiked = target.liked;
    const latestLikeCount = target.likeCount;

    return res(
      ctx.delay(500),
      ...mockSuccess<LikeCommentApiData['data']>(ctx, {
        liked: latestLiked,
        likeCount: latestLikeCount,
      })
    );
  }
);

export const likeCommentError = restError(
  'post',
  // @ts-ignore
  composeUrls(API_URL, endpoints.comments.like(':commentId')),
  {
    message: '댓글 좋아요 실패',
  }
);

export const commentHandlers = [getComments, creatComment, likeComment];
