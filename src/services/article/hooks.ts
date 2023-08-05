import type {
  ArticleDetail,
  ArticleDetailError,
} from '~/services/article/utils';

import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  createArticle,
  getArticleCategories,
  getArticleDetail,
  removeArticle,
  reportArticle,
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
