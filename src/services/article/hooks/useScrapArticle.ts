import type { ArticleDetail } from '~/services/article/utils';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { scrapArticle } from '~/services/article/apis';
import { useSetArticleDetail } from '~/services/article/hooks/useSetArticleDetail';

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
      queryClient.invalidateQueries(queryKeys.articles.myScraped());
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
