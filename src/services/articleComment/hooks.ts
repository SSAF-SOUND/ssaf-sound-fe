import type {
  ReplyArticleCommentParams,
  UpdateArticleCommentParams,
} from '~/services/articleComment/apis';
import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/articleComment/utils';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

import { queryKeys } from '~/react-query/common';
import {
  createArticleComment,
  getArticleComments,
  likeArticleComment,
  removeArticleComment,
  replyArticleComment,
  updateArticleComment,
} from '~/services/articleComment/apis';
import { findArticleCommentById } from '~/services/articleComment/utils';

export const useArticleComments = (articleId: number) => {
  return useQuery({
    queryKey: queryKeys.articleComments.list(articleId),
    queryFn: () => getArticleComments(articleId),
  });
};

export const useInvalidateArticleComments = (articleId: number) => {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries(queryKeys.articleComments.list(articleId));

  return invalidate;
};

export const useCreateArticleComment = () => {
  return useMutation({
    mutationFn: createArticleComment,
  });
};

interface UseLikeArticleCommentParams {
  commentId: number;
  articleId: number;
}

export const useLikeArticleComment = (params: UseLikeArticleCommentParams) => {
  const { articleId, commentId } = params;
  const queryClient = useQueryClient();
  const queryKey = queryKeys.articleComments.list(articleId);
  const setArticleCommentWithImmer = useSetArticleCommentWithImmer({
    articleId,
    commentId,
  });

  return useMutation({
    mutationFn: () => likeArticleComment(commentId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const comments = queryClient.getQueryData<CommentDetail[]>(queryKey);
      if (!comments) return;

      setArticleCommentWithImmer((target) => {
        if (!target) return;

        const { liked, likeCount } = target;
        const nextLiked = !liked;
        const nextLikeCount = nextLiked ? likeCount + 1 : likeCount - 1;

        target.liked = nextLiked;
        target.likeCount = nextLikeCount;
      });

      return { prevComments: comments };
    },
    onError: (err, _, context) => {
      const prevComments = context?.prevComments;
      queryClient.setQueryData<CommentDetail[]>(queryKey, prevComments);
    },
    onSuccess: ({ likeCount, liked }) => {
      setArticleCommentWithImmer((comment) => {
        if (!comment) return;

        comment.liked = liked;
        comment.likeCount = likeCount;
      });
    },
  });
};

interface SetArticleCommentParams {
  articleId: number;
  commentId: number;
}

const useSetArticleCommentWithImmer = (params: SetArticleCommentParams) => {
  const { commentId, articleId } = params;
  const queryClient = useQueryClient();

  const setArticleCommentWithImmer = (
    recipe: (comment?: CommentDetail | CommentDetailWithoutReplies) => void
  ) => {
    const commentsQueryKey = queryKeys.articleComments.list(articleId);

    queryClient.setQueryData<ReturnType<typeof useArticleComments>['data']>(
      commentsQueryKey,
      (prevComments) => {
        if (!prevComments) return;

        const nextComments = produce(prevComments, (draft) => {
          const result = findArticleCommentById(draft, commentId);

          recipe(result);
        });

        return nextComments;
      }
    );
  };

  return setArticleCommentWithImmer;
};

interface UseReplyArticleCommentParams {
  commentId: number;
  articleId: number;
}

type UseReplyArticleCommentMutationBody = Omit<
  ReplyArticleCommentParams,
  keyof UseReplyArticleCommentParams
>;

export const useReplyArticleComment = (
  params: UseReplyArticleCommentParams
) => {
  const { articleId, commentId } = params;
  return useMutation({
    mutationFn: (body: UseReplyArticleCommentMutationBody) =>
      replyArticleComment({ articleId, commentId, ...body }),
  });
};

type UseUpdateArticleCommentMutationBody = Omit<
  UpdateArticleCommentParams,
  'commentId'
>;

export const useUpdateArticleComment = (commentId: number) => {
  return useMutation({
    mutationFn: (body: UseUpdateArticleCommentMutationBody) =>
      updateArticleComment({ commentId, ...body }),
  });
};

export const useRemoveArticleComment = (commentId: number) => {
  return useMutation({
    mutationFn: () => removeArticleComment(commentId),
  });
};
