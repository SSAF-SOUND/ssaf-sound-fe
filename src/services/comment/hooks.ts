import {
  useCreateArticleComment,
  useInvalidateArticleComments,
  useLikeArticleComment,
  useRemoveArticleComment,
  useReplyArticleComment,
  useUpdateArticleComment,
} from '~/services/articleComment';
import {
  useCreateRecruitComment,
  useInvalidateRecruitComments,
  useLikeRecruitComment,
  useRemoveRecruitComment,
  useReplyRecruitComment,
  useUpdateRecruitComment,
} from '~/services/recruitComment';

export interface CommentHookOptions {
  recruit?: boolean;
}

export const useCreateComment = (
  articleId: number,
  options: CommentHookOptions = {}
) => {
  const { recruit = false } = options;
  const recruitId = articleId;

  const articleCommentMutation = useCreateArticleComment(articleId);
  const recruitCommentMutation = useCreateRecruitComment(recruitId);

  return recruit ? articleCommentMutation : recruitCommentMutation;
};

export const useUpdateComment = (
  commentId: number,
  options: CommentHookOptions = {}
) => {
  const { recruit = false } = options;

  const articleCommentMutation = useUpdateArticleComment(commentId);
  const recruitCommentMutation = useUpdateRecruitComment(commentId);

  return recruit ? recruitCommentMutation : articleCommentMutation;
};

export const useRemoveComment = (
  commentId: number,
  options: CommentHookOptions = {}
) => {
  const { recruit = false } = options;

  const articleCommentMutation = useRemoveArticleComment(commentId);
  const recruitCommentMutation = useRemoveRecruitComment(commentId);

  return recruit ? recruitCommentMutation : articleCommentMutation;
};

interface UseLikeCommentParams {
  commentId: number;
  articleId: number;
}

export const useLikeComment = (
  params: UseLikeCommentParams,
  options: CommentHookOptions = {}
) => {
  const { commentId, articleId } = params;
  const { recruit = false } = options;
  const recruitId = articleId;

  const articleCommentMutation = useLikeArticleComment({
    articleId,
    commentId,
  });

  const recruitCommentMutation = useLikeRecruitComment({
    recruitId,
    commentId,
  });

  return recruit ? recruitCommentMutation : articleCommentMutation;
};

interface UseReplyCommentParams {
  commentId: number;
  articleId: number;
}

export const useReplyComment = (
  params: UseReplyCommentParams,
  options: CommentHookOptions = {}
) => {
  const { articleId, commentId } = params;
  const { recruit = false } = options;
  const recruitId = articleId;

  const articleCommentMutation = useReplyArticleComment({
    articleId,
    commentId,
  });
  const recruitCommentMutation = useReplyRecruitComment({
    recruitId,
    commentId,
  });

  return recruit ? recruitCommentMutation : articleCommentMutation;
};

export const useInvalidateComments = (
  articleId: number,
  options: CommentHookOptions = {}
) => {
  const { recruit = false } = options;
  const recruitId = articleId;

  const invalidateArticleComment = useInvalidateArticleComments(articleId);
  const invalidateRecruitComment = useInvalidateRecruitComments(recruitId);

  return recruit ? invalidateRecruitComment : invalidateArticleComment;
};

// export const useReportComment = () => {}
