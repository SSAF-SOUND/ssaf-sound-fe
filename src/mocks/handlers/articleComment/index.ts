/* eslint-disable @typescript-eslint/ban-ts-comment*/
import type {
  CreateArticleCommentBody,
  GetArticleCommentsApiData,
  LikeArticleCommentApiData,
  ReplyArticleCommentBody,
  UpdateArticleCommentBody,
} from '~/services/articleComment';

import { rest } from 'msw';

import { mockError, mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { findArticleCommentById } from '~/services/articleComment';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

import {
  commentDetails,
  createMockCommentDetail,
  createMockCommentDetailWithoutReplies,
  incrementReplyId,
  replyId,
} from './data';

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

export const replyArticleComment = rest.post(
  removeQueryParams(
    composeUrls(
      API_URL,
      endpoints.articleComments.reply({ articleId: 1, commentId: 1 })
    )
  ),
  async (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const articleId = Number(searchParams.get('articleId'));
    const commentId = Number(searchParams.get('commentId'));

    if (Number.isNaN(articleId) || Number.isNaN(commentId)) {
      return res(...mockError(ctx, '400', 'articleId, commentId 오류'));
    }

    const { anonymity, content } =
      (await req.json()) as ReplyArticleCommentBody;

    const parentComment = findArticleCommentById(commentDetails, commentId);

    if (!parentComment) {
      return res(...mockError(ctx, '400', 'parentComment가 없습니다.'));
    }

    const childComment = createMockCommentDetailWithoutReplies(replyId);
    childComment.content = content;
    childComment.anonymity = anonymity;

    parentComment.replies?.push(childComment);
    incrementReplyId();

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

export const updateArticleComment = rest.put(
  // @ts-ignore
  composeUrls(API_URL, endpoints.articleComments.detail(':commentId')),
  async (req, res, ctx) => {
    const { anonymity, content } =
      (await req.json()) as UpdateArticleCommentBody;
    const query = req.params as { commentId: string };
    const commentId = Number(query.commentId);

    const result = findArticleCommentById(commentDetails, commentId);
    if (!result) {
      return res(...mockError(ctx, '400', '존재하지 않는 댓글'));
    }

    result.content = content;
    result.anonymity = anonymity;

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

export const updateArticleCommentError = restError(
  'put',
  // @ts-ignore
  composeUrls(API_URL, endpoints.articleComments.detail(':commentId')),
  {
    message: '댓글 업데이트 실패',
  }
);

export const removeArticleComment = rest.delete(
  // @ts-ignore
  composeUrls(API_URL, endpoints.articleComments.detail(':commentId')),
  (req, res, ctx) => {
    const query = req.params as { commentId: string };
    const commentId = Number(query.commentId);

    const result = findArticleCommentById(commentDetails, commentId);
    if (!result) {
      return res(...mockError(ctx, '400', '존재하지 않는 댓글'));
    }

    result.deletedComment = true;

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

export const removeArticleCommentError = restError(
  'delete',
  // @ts-ignore
  composeUrls(API_URL, endpoints.articleComments.detail(':commentId')),
  {
    message: '댓글 삭제 실패',
  }
);

export const articleCommentHandlers = [
  getArticleComments,
  createArticleComment,
  likeArticleComment,
  replyArticleComment,
  updateArticleComment,
  removeArticleComment,
];
