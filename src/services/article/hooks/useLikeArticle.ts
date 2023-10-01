import type { ArticleDetail } from '~/services/article/utils';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { likeArticle } from '~/services/article/apis';
import { useSetArticleDetail } from '~/services/article/hooks/useSetArticleDetail';

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
