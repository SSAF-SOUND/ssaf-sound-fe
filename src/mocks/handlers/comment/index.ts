import type { CreateCommentBody, GetCommentsApiData } from '~/services/comment';

import { rest } from 'msw';

import {
  commentDetails,
  createMockCommentDetail,
} from '~/mocks/handlers/comment/data';
import { mockSuccess, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
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

export const commentHandlers = [getComments, creatComment];
