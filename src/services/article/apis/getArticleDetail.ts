import type { AxiosRequestConfig } from 'axios';
import type { ArticleDetail } from '~/services/article/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils/axios';
import { isClient } from '~/utils/misc';

interface GetArticleDetailOptions {
  publicRequest?: boolean;
  config?: AxiosRequestConfig;
}

export type GetArticleDetailApiData = ApiSuccessResponse<{
  post: ArticleDetail;
}>;

export const getArticleDetail = (
  articleId: number,
  options: GetArticleDetailOptions = {}
) => {
  const { publicRequest = !isClient, config } = options;
  const endpoint = endpoints.articles.detail(articleId);

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance
    .get<GetArticleDetailApiData>(endpoint, config)
    .then((res) => res.data.data.post);
};
