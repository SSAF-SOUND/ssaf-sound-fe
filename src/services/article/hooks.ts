import type {
  UpdateArticleParams} from '~/services/article/apis';
import type {
  ArticleDetail,
  ArticleDetailError,
} from '~/services/article/utils';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  createArticle,
  getArticleCategories,
  getArticleDetail,
  removeArticle,
  reportArticle,
  updateArticle
} from '~/services/article/apis';

export const useArticleCategories = () => {
  return useQuery({
    queryKey: queryKeys.article.categories(),
    queryFn: getArticleCategories,
    select: (categories) => categories.sort((a, b) => a.boardId - b.boardId),
  });
};

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: createArticle,
  });
};

export const useRemoveArticle = () => {
  return useMutation({
    mutationFn: removeArticle,
  });
};

export const useReportArticle = () => {
  return useMutation({
    mutationFn: reportArticle,
  });
};

export const useUpdateArticle = (articleId: number) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.article.detail(articleId);
  const onSuccess = () => queryClient.invalidateQueries(queryKey);

  return useMutation({
    mutationFn: (payload: Omit<UpdateArticleParams, 'articleId'>) =>
      updateArticle({ articleId, ...payload }),
    onSuccess,
  });
};

interface UseArticleDetailOptions {
  initialData: ArticleDetail | ArticleDetailError;
}

export const useArticleDetail = (
  articleId: number,
  options: Partial<UseArticleDetailOptions> = {}
) => {
  const { initialData } = options;
  return useQuery({
    queryKey: queryKeys.article.detail(articleId),
    queryFn: () => getArticleDetail(articleId),
    initialData,
  });
};
