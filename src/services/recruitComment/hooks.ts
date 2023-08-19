import type {
  CommentDetail,
  CommentDetailWithoutReplies,
} from '~/services/articleComment/utils';
import type {
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

export const useCreateRecruitComment = () => {
  return useMutation({
    mutationFn: createRecruitComment,
  });
};

interface UseLikeRecruitCommentParams {
  recruitCommentId: number;
  recruitId: number;
}

export const useLikeRecruitComment = (params: UseLikeRecruitCommentParams) => {
  const { recruitId, recruitCommentId } = params;
  const queryClient = useQueryClient();
  const queryKey = queryKeys.recruitComments.list(recruitId);
  const setRecruitCommentWithImmer = useSetRecruitCommentWithImmer({
    recruitId,
    recruitCommentId,
  });

  return useMutation({
    mutationFn: () => likeRecruitComment(recruitCommentId),
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
  recruitCommentId: number;
}

const useSetRecruitCommentWithImmer = (params: SetRecruitCommentParams) => {
  const { recruitCommentId, recruitId } = params;
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
          const result = findArticleCommentById(draft, recruitCommentId);

          recipe(result);
        });

        return nextComments;
      }
    );
  };

  return setRecruitCommentWithImmer;
};

interface UseReplyRecruitCommentParams {
  recruitCommentId: number;
  recruitId: number;
}

type UseReplyRecruitCommentMutationBody = Omit<
  ReplyRecruitCommentParams,
  keyof UseReplyRecruitCommentParams
>;

export const useReplyRecruitComment = (
  params: UseReplyRecruitCommentParams
) => {
  const { recruitId, recruitCommentId } = params;
  return useMutation({
    mutationFn: (body: UseReplyRecruitCommentMutationBody) =>
      replyRecruitComment({ recruitId, recruitCommentId, ...body }),
  });
};

type UseUpdateRecruitCommentMutationBody = Omit<
  UpdateRecruitCommentParams,
  'recruitCommentId'
>;

export const useUpdateRecruitComment = (recruitCommentId: number) => {
  return useMutation({
    mutationFn: (body: UseUpdateRecruitCommentMutationBody) =>
      updateRecruitComment({ recruitCommentId, ...body }),
  });
};

export const useRemoveRecruitComment = (recruitCommentId: number) => {
  return useMutation({
    mutationFn: () => removeRecruitComment(recruitCommentId),
  });
};
