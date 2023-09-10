import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/articleComment';

import { add } from '~/utils';

const isActiveComment = (
  comment: CommentDetail | CommentDetailWithoutReplies
) => !comment.deletedComment;

export const countAllComments = (comments: CommentDetail[]) => {
  const commentsCount = comments.filter(isActiveComment).length;

  const repliesCount = comments
    .map(({ replies }) => replies)
    .map((replies) => replies.filter(isActiveComment).length)
    .reduce(add);

  return commentsCount + repliesCount;
};
