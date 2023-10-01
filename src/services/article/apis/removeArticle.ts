import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export interface RemoveArticleParams {
  articleId: number;
}

export const removeArticle = (params: RemoveArticleParams) => {
  const { articleId } = params;
  const endpoint = endpoints.articles.detail(articleId);
  return privateAxios.delete(endpoint).then((res) => res.data);
};
