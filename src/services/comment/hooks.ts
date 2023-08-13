import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/comment/utils';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

import { queryKeys } from '~/react-query/common';
import {
  createComment,
  getComments,
  likeComment,
} from '~/services/comment/apis';
import { findCommentById } from '~/services/comment/utils';

export const useComments = (articleId: number) => {
  return useQuery({
    queryKey: queryKeys.comments.list(articleId),
    queryFn: () => getComments(articleId),
  });
};

export const useInvalidateComments = (articleId: number) => {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries(queryKeys.comments.list(articleId));

  return invalidate;
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: createComment,
  });
};

interface UseLikeParams {
  commentId: number;
  articleId: number;
}

export const useLikeComment = (params: UseLikeParams) => {
  const { articleId, commentId } = params;
  const queryClient = useQueryClient();
  const queryKey = queryKeys.comments.list(articleId);
  const setCommentWithImmer = useSetCommentWithImmer({ articleId, commentId });

  return useMutation({
    mutationFn: () => likeComment(commentId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const comments = queryClient.getQueryData<CommentDetail[]>(queryKey);
      if (!comments) return;

      setCommentWithImmer((target) => {
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
      setCommentWithImmer((comment) => {
        if (!comment) return;

        comment.liked = liked;
        comment.likeCount = likeCount;
      });
    },
  });
};

interface SetCommentsParams {
  articleId: number;
  commentId: number;
}

const useSetCommentWithImmer = (params: SetCommentsParams) => {
  const { commentId, articleId } = params;
  const queryClient = useQueryClient();

  const setCommentWithImmer = (
    recipe: (comment?: CommentDetail | CommentDetailWithoutReplies) => void
  ) => {
    const commentsQueryKey = queryKeys.comments.list(articleId);

    queryClient.setQueryData<ReturnType<typeof useComments>['data']>(
      commentsQueryKey,
      (prevComments) => {
        if (!prevComments) return;

        const nextComments = produce(prevComments, (draft) => {
          const result = findCommentById(draft, commentId);

          recipe(result);
        });

        return nextComments;
      }
    );
  };

  return setCommentWithImmer;
};
