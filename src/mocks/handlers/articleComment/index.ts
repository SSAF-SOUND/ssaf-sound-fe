/* eslint-disable @typescript-eslint/ban-ts-comment*/
import type {
  CreateArticleCommentBody,
  GetArticleCommentsApiData,
  LikeArticleCommentApiData,
} from '~/services/articleComment';

import { rest } from 'msw';

import { mockError, mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { findArticleCommentById } from '~/services/articleComment';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

import { commentDetails, createMockCommentDetail } from './data';

export const getArticleComments = restSuccess<
  GetArticleCommentsApiData['data']
>(
  'get',
  removeQueryParams(composeUrls(API_URL, endpoints.articleComments.list(1))),
  {
    data: {
      comments: commentDetails,
    },
  }
);

export const createArticleComment = rest.post(
  removeQueryParams(composeUrls(API_URL, endpoints.articleComments.create(1))),
  async (req, res, ctx) => {
    const { anonymity, content } =
      (await req.json()) as CreateArticleCommentBody;
    const lastComment = commentDetails.at(-1);
    const newCommentId = (lastComment?.commentId ?? 1) + 1;
    const newComment = createMockCommentDetail(newCommentId, 0);
    newComment.anonymity = anonymity;
    newComment.content = content;

    commentDetails.push(newComment);

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

export const likeArticleComment = rest.post(
  // @ts-ignore
  composeUrls(API_URL, endpoints.articleComments.like(':commentId')),
  (req, res, ctx) => {
    const params = req.params as { commentId: string };

    const commentId = Number(params.commentId);
    const target = findArticleCommentById(commentDetails, commentId);
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
      ...mockSuccess<LikeArticleCommentApiData['data']>(ctx, {
        liked: latestLiked,
        likeCount: latestLikeCount,
      })
    );
  }
);

export const likeArticleCommentError = restError(
  'post',
  // @ts-ignore
  composeUrls(API_URL, endpoints.articleComments.like(':commentId')),
  {
    message: '댓글 좋아요 실패',
  }
);

export const articleCommentHandlers = [
  getArticleComments,
  createArticleComment,
  likeArticleComment,
];
