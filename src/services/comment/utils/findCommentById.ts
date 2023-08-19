import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/comment';

export type FindCommentById = (
  comments: CommentDetail[] | CommentDetailWithoutReplies[],
  commentId: number
) => CommentDetail | CommentDetailWithoutReplies | undefined;

export const findCommentById: FindCommentById = (comments, commentId) => {
  for (const comment of comments) {
    if (comment.commentId === commentId) {
      return comment;
    }

    if (comment.replies) {
      return findCommentById(comment.replies, commentId);
    }
  }

  return;
};
