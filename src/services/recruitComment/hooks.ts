import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/articleComment/utils';
import type {
  CreateRecruitCommentParams,
  ReplyRecruitCommentParams,
  UpdateRecruitCommentParams,
} from '~/services/recruitComment/apis';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

import { queryKeys } from '~/react-query/common';
import { findArticleCommentById } from '~/services/articleComment/utils';
import {
  createRecruitComment,
  getRecruitComments,
  likeRecruitComment,
  removeRecruitComment,
  replyRecruitComment,
  updateRecruitComment,
} from '~/services/recruitComment/apis';

export const useRecruitComments = (recruitId: number) => {
  return useQuery({
    queryKey: queryKeys.recruitComments.list(recruitId),
    queryFn: () => getRecruitComments(recruitId),
  });
};

export const useInvalidateRecruitComments = (recruitId: number) => {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries(queryKeys.recruitComments.list(recruitId));

  return invalidate;
};

interface UseCreateRecruitCommentParams {
  recruitId: number;
}

type UseCreateArticleCommentMutationBody = Omit<
  CreateRecruitCommentParams,
  keyof UseCreateRecruitCommentParams
>;

export const useCreateRecruitComment = (recruitId: number) => {
  return useMutation({
    mutationFn: (body: UseCreateArticleCommentMutationBody) =>
      createRecruitComment({ recruitId, ...body }),
  });
};

interface UseLikeRecruitCommentParams {
  commentId: number;
  recruitId: number;
}

export const useLikeRecruitComment = (params: UseLikeRecruitCommentParams) => {
  const { recruitId, commentId } = params;
  const queryClient = useQueryClient();
  const queryKey = queryKeys.recruitComments.list(recruitId);
  const setRecruitCommentWithImmer = useSetRecruitCommentWithImmer({
    recruitId,
    commentId,
  });

  return useMutation({
    mutationFn: () => likeRecruitComment(commentId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const comments = queryClient.getQueryData<CommentDetail[]>(queryKey);
      if (!comments) return;

      setRecruitCommentWithImmer((target) => {
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
      setRecruitCommentWithImmer((comment) => {
        if (!comment) return;

        comment.liked = liked;
        comment.likeCount = likeCount;
      });
    },
  });
};

interface SetRecruitCommentParams {
  recruitId: number;
  commentId: number;
}

const useSetRecruitCommentWithImmer = (params: SetRecruitCommentParams) => {
  const { commentId, recruitId } = params;
  const queryClient = useQueryClient();

  const setRecruitCommentWithImmer = (
    recipe: (comment?: CommentDetail | CommentDetailWithoutReplies) => void
  ) => {
    const commentsQueryKey = queryKeys.recruitComments.list(recruitId);

    queryClient.setQueryData<ReturnType<typeof useRecruitComments>['data']>(
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

  return setRecruitCommentWithImmer;
};

interface UseReplyRecruitCommentParams {
  commentId: number;
  recruitId: number;
}

type UseReplyRecruitCommentMutationBody = Omit<
  ReplyRecruitCommentParams,
  keyof UseReplyRecruitCommentParams
>;

export const useReplyRecruitComment = (
  params: UseReplyRecruitCommentParams
) => {
  const { recruitId, commentId } = params;
  return useMutation({
    mutationFn: (body: UseReplyRecruitCommentMutationBody) =>
      replyRecruitComment({ recruitId, commentId, ...body }),
  });
};

type UseUpdateRecruitCommentMutationBody = Omit<
  UpdateRecruitCommentParams,
  'commentId'
>;

export const useUpdateRecruitComment = (commentId: number) => {
  return useMutation({
    mutationFn: (body: UseUpdateRecruitCommentMutationBody) =>
      updateRecruitComment({ commentId, ...body }),
  });
};

export const useRemoveRecruitComment = (commentId: number) => {
  return useMutation({
    mutationFn: () => removeRecruitComment(commentId),
  });
};
