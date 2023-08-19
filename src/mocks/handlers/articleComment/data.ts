import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/articleComment';

import { faker } from '@faker-js/faker';

import { userInfo } from '~/mocks/handlers/member/data';

export let replyId = 1000000;
export const incrementReplyId = () => (replyId += 1);

export const createMockCommentDetailWithoutReplies = (
  id: number
): CommentDetailWithoutReplies => {
  const modified = id % 2 === 0;
  const mine = id % 2 === 0;
  const deleted = id % 3 === 0;
  const liked = id % 4 === 0;
  const anonymity = id % 4 === 0;
  const numberRange = { min: 1000, max: 100000 };

  return {
    commentId: id,
    content: faker.lorem.paragraph(2),
    createdAt: faker.date.past().toISOString(),
    modified,
    deletedComment: deleted,
    liked,
    likeCount: faker.number.int(numberRange),
    mine,
    anonymity,
    author: userInfo.certifiedSsafyUserInfo,
    replies: undefined,
  };
};

export const createMockCommentDetail = (
  id: number,
  replyCount = faker.number.int({ min: 1, max: 5 })
): CommentDetail => {
  const replies = Array(replyCount)
    .fill(undefined)
    .map(() => createMockCommentDetailWithoutReplies(replyId++));

  return {
    ...createMockCommentDetailWithoutReplies(id),
    replies,
  };
};

export const commentDetails = Array(10)
  .fill(undefined)
  .map((_, index) => createMockCommentDetail(index + 1));
