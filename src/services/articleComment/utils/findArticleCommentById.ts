import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/articleComment';

export type FindArticleCommentById = (
  comments: CommentDetail[] | CommentDetailWithoutReplies[],
  commentId: number
) => CommentDetail | CommentDetailWithoutReplies | undefined;

export const findArticleCommentById: FindArticleCommentById = (
  comments,
  commentId
) => {
  for (const comment of comments) {
    if (comment.commentId === commentId) {
      return comment;
    }

    if (comment.replies) {
      return findArticleCommentById(comment.replies, commentId);
    }
  }

  return;
};
