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
      const result = findArticleCommentById(comment.replies, commentId);
      if (result) return result;
    }
  }

  return;
};
