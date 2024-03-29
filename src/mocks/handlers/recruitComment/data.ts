import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/articleComment';

import { faker } from '@faker-js/faker';

import { userInfo } from '~/mocks/handlers/member/data';

export let recruitCommentReplyId = 1000000;
export const incrementRecruitCommentReplyId = () =>
  (recruitCommentReplyId += 1);

export const createMockRecruitCommentDetailWithoutReplies = (
  id: number
): CommentDetailWithoutReplies => {
  const modified = id % 2 === 0;
  const mine = id % 2 === 0;
  const deleted = id % 3 === 0;
  const liked = id % 4 === 0;
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
    author: userInfo.certifiedSsafyUserInfo,
    replies: undefined,
  };
};

export const createMockRecruitCommentDetail = (
  id: number,
  replyCount = faker.number.int({ min: 1, max: 5 })
): CommentDetail => {
  const replies = Array(replyCount)
    .fill(undefined)
    .map(() =>
      createMockRecruitCommentDetailWithoutReplies(recruitCommentReplyId++)
    );

  return {
    ...createMockRecruitCommentDetailWithoutReplies(id),
    replies,
  };
};

export const recruitCommentDetails = Array(10)
  .fill(undefined)
  .map((_, index) => createMockRecruitCommentDetail(index + 1));
