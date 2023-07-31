import type { SetStateAction } from 'react';
import type { UpdateArticleParams } from '~/services/article/apis';
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
  updateArticle,
  likeArticle,
  scrapArticle,
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

export const useLikeArticle = (articleId: number) => {
  const setArticleDetail = useSetArticleDetail(articleId);
  const queryClient = useQueryClient();
  const queryKey = queryKeys.article.detail(articleId);

  return useMutation({
    mutationFn: () => likeArticle(articleId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const article = queryClient.getQueryData<ArticleDetail>(queryKey);
      if (!article) return;

      const { liked: prevLiked, likeCount: prevLikeCount } = article;
      const nextLiked = !prevLiked;
      const nextLikeCount = nextLiked ? prevLikeCount + 1 : prevLikeCount - 1;

      setArticleDetail((prevArticle) => {
        if (!prevArticle) return;
        return {
          ...prevArticle,
          liked: nextLiked,
          likeCount: nextLikeCount,
        };
      });
      return { prevArticle: article };
    },
    onSuccess: (liked) => {
      setArticleDetail((prevArticle) => {
        if (!prevArticle) return;
        return {
          ...prevArticle,
          liked,
        };
      });
    },
    onError: (err, _, context) => {
      const prevArticle = context?.prevArticle;
      setArticleDetail(prevArticle);
    },
  });
};

export const useScrapArticle = (articleId: number) => {
  const setArticleDetail = useSetArticleDetail(articleId);
  const queryClient = useQueryClient();
  const queryKey = queryKeys.article.detail(articleId);

  return useMutation({
    mutationFn: () => scrapArticle(articleId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const article = queryClient.getQueryData<ArticleDetail>(queryKey);
      if (!article) return;

      const { scraped: prevScraped, scrapCount: prevScrapCount } = article;
      const nextScraped = !prevScraped;
      const nextScrapCount = nextScraped
        ? prevScrapCount + 1
        : prevScrapCount - 1;

      setArticleDetail((prevArticle) => {
        if (!prevArticle) return;
        return {
          ...prevArticle,
          scraped: nextScraped,
          scrapCount: nextScrapCount,
        };
      });
      return { prevArticle: article };
    },
    onSuccess: (scraped) => {
      setArticleDetail((prevArticle) => {
        if (!prevArticle) return;
        return {
          ...prevArticle,
          scraped,
        };
      });
    },
    onError: (err, _, context) => {
      const prevArticle = context?.prevArticle;
      setArticleDetail(prevArticle);
    },
  });
};

export const useSetArticleDetail = (articleId: number) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.article.detail(articleId);
  const setArticleDetail = (
    updater: SetStateAction<ArticleDetail | undefined>
  ) => {
    queryClient.setQueryData<ArticleDetail>(queryKey, updater);
  };

  return setArticleDetail;
};
