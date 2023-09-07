/* eslint-disable @typescript-eslint/ban-ts-comment*/
import type {
  CreateRecruitCommentBody,
  GetRecruitCommentsApiData,
  LikeRecruitCommentApiData,
  ReplyRecruitCommentBody,
  UpdateRecruitCommentBody,
} from '~/services/recruitComment';

import { rest } from 'msw';

import { mockError, mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { findArticleCommentById } from '~/services/articleComment';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

import {
  recruitCommentDetails,
  createMockRecruitCommentDetail,
  createMockRecruitCommentDetailWithoutReplies,
  incrementRecruitCommentReplyId,
  recruitCommentReplyId,
} from './data';

export const getRecruitComments = restSuccess<
  GetRecruitCommentsApiData['data']
>(
  'get',
  removeQueryParams(
    // @ts-ignore
    composeUrls(API_URL, endpoints.recruitComments.list(':recruitId'))
  ),
  {
    data: {
      recruitComments: recruitCommentDetails,
    },
  }
);

export const createRecruitComment = rest.post(
  removeQueryParams(
    composeUrls(
      API_URL,
      // @ts-ignore
      endpoints.recruitComments.create(':recruitId')
    )
  ),
  async (req, res, ctx) => {
    const { content } = (await req.json()) as CreateRecruitCommentBody;
    const lastComment = recruitCommentDetails.at(-1);
    const newCommentId = (lastComment?.commentId ?? 1) + 1;
    const newComment = createMockRecruitCommentDetail(newCommentId, 0);
    newComment.content = content;

    recruitCommentDetails.push(newComment);

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

export const likeRecruitComment = rest.post(
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruitComments.like(':commentId')),
  (req, res, ctx) => {
    const params = req.params as { commentId: string };

    const commentId = Number(params.commentId);
    const target = findArticleCommentById(recruitCommentDetails, commentId);

    if (!target) return res(...mockError(ctx, '400', '존재하지 않는 댓글'));

    target.liked = !target.liked;
    const delta = target.liked ? 1 : -1;
    target.likeCount += delta;
    const latestLiked = target.liked;
    const latestLikeCount = target.likeCount;

    return res(
      ctx.delay(500),
      ...mockSuccess<LikeRecruitCommentApiData['data']>(ctx, {
        liked: latestLiked,
        likeCount: latestLikeCount,
      })
    );
  }
);

export const likeRecruitCommentError = restError(
  'post',
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruitComments.like(':commentId')),
  {
    message: '댓글 좋아요 실패',
  }
);

export const replyRecruitComment = rest.post(
  removeQueryParams(
    composeUrls(
      API_URL,
      endpoints.recruitComments.reply({ recruitId: 1, commentId: 1 })
    )
  ),
  async (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const recruitId = Number(searchParams.get('recruitId'));
    const commentId = Number(searchParams.get('commentId'));

    if (Number.isNaN(recruitId) || Number.isNaN(commentId)) {
      return res(
        ...mockError(
          ctx,
          '400',
          `recruitId: ${recruitId}, commentId: ${commentId} 오류`
        )
      );
    }

    const { content } = (await req.json()) as ReplyRecruitCommentBody;

    const parentComment = findArticleCommentById(
      recruitCommentDetails,
      commentId
    );

    if (!parentComment) {
      return res(...mockError(ctx, '400', 'parentComment가 없습니다.'));
    }

    const childComment = createMockRecruitCommentDetailWithoutReplies(
      recruitCommentReplyId
    );
    childComment.content = content;

    parentComment.replies?.push(childComment);
    incrementRecruitCommentReplyId();

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

export const replyRecruitCommentError = restError(
  'post',
  removeQueryParams(
    composeUrls(
      API_URL,
      endpoints.recruitComments.reply({ recruitId: 1, commentId: 1 })
    )
  ),
  { message: '대댓글 작성 실패' }
);

export const updateRecruitComment = rest.put(
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruitComments.detail(':commentId')),
  async (req, res, ctx) => {
    const { content } = (await req.json()) as UpdateRecruitCommentBody;
    const query = req.params as { commentId: string };
    const commentId = Number(query.commentId);

    const result = findArticleCommentById(recruitCommentDetails, commentId);
    if (!result) {
      return res(...mockError(ctx, '400', '존재하지 않는 댓글'));
    }

    result.content = content;

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

export const updateRecruitCommentError = restError(
  'put',
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruitComments.detail(':commentId')),
  {
    message: '댓글 업데이트 실패',
  }
);

export const removeRecruitComment = rest.delete(
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruitComments.detail(':commentId')),
  (req, res, ctx) => {
    const query = req.params as { commentId: string };
    const commentId = Number(query.commentId);

    const result = findArticleCommentById(recruitCommentDetails, commentId);
    if (!result) {
      return res(...mockError(ctx, '400', '존재하지 않는 댓글'));
    }

    result.deletedComment = true;

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

export const removeRecruitCommentError = restError(
  'delete',
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruitComments.detail(':commentId')),
  {
    message: '댓글 삭제 실패',
  }
);

export const recruitCommentHandlers = [
  getRecruitComments,
  createRecruitComment,
  likeRecruitComment,
  replyRecruitComment,
  updateRecruitComment,
  removeRecruitComment,
];
