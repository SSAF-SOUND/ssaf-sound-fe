import type { SetStateAction } from 'react';
import type { UpdateArticleParams } from '~/services/article/apis';
import type { ArticleDetail } from '~/services/article/utils';

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import {
  createArticle,
  getArticleCategories,
  getArticleDetail,
  removeArticle,
  updateArticle,
  likeArticle,
  scrapArticle,
  getArticles,
  getHotArticles,
  getMyArticles,
  getMyScrapedArticles,
} from '~/services/article/apis';

export const useArticleCategories = () => {
  return useQuery({
    queryKey: queryKeys.articles.categories(),
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

export const useUpdateArticle = (articleId: number) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.articles.detail(articleId);
  const onSuccess = () => queryClient.invalidateQueries(queryKey);

  return useMutation({
    mutationFn: (payload: Omit<UpdateArticleParams, 'articleId'>) =>
      updateArticle({ articleId, ...payload }),
    onSuccess,
  });
};

export const useArticleDetail = (articleId: number) => {
  return useQuery({
    queryKey: queryKeys.articles.detail(articleId),
    queryFn: () => getArticleDetail(articleId),
  });
};

export const useLikeArticle = (articleId: number) => {
  const setArticleDetail = useSetArticleDetail(articleId);
  const queryClient = useQueryClient();
  const queryKey = queryKeys.articles.detail(articleId);

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
    onSuccess: ({ liked, likeCount }) => {
      setArticleDetail((prevArticle) => {
        if (!prevArticle) return;
        return {
          ...prevArticle,
          liked,
          likeCount,
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
  const queryKey = queryKeys.articles.detail(articleId);

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
    onSuccess: ({ scraped, scrapCount }) => {
      setArticleDetail((prevArticle) => {
        if (!prevArticle) return;
        return {
          ...prevArticle,
          scraped,
          scrapCount,
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
  const queryKey = queryKeys.articles.detail(articleId);
  const setArticleDetail = (
    updater: SetStateAction<ArticleDetail | undefined>
  ) => {
    queryClient.setQueryData<ArticleDetail>(queryKey, updater);
  };

  return setArticleDetail;
};

interface UseArticlesOptions {
  keyword: string;
}

export const useArticles = (
  categoryId: number,
  options: Partial<UseArticlesOptions> = {}
) => {
  const { keyword } = options;
  const queryKey = queryKeys.articles.list(categoryId, keyword);

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getArticles({
        cursor: pageParam,
        categoryId,
        keyword,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
  });
};

interface UseHotArticlesOptions {
  keyword: string;
}

export const useHotArticles = (
  options: Partial<UseHotArticlesOptions> = {}
) => {
  const { keyword } = options;
  const queryKey = queryKeys.articles.hot(keyword);

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getHotArticles({
        cursor: pageParam,
        keyword,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
  });
};

export const useMyArticles = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.articles.mine(),
    queryFn: ({ pageParam }) => getMyArticles({ cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
  });
};

export const useMyScrapedArticles = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.articles.myScraped(),
    queryFn: ({ pageParam }) => getMyScrapedArticles({ cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor ?? undefined;
    },
  });
};
