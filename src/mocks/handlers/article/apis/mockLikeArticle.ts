import type { LikeArticleApiData } from '~/services/article/apis';
import type { ArticleDetail } from '~/services/article/utils';

import { rest } from 'msw';

import { createMockArticle } from '~/mocks/handlers/article/data';
import { mockSuccess, restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const likeArticleMethod = 'post';
const likeArticleEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line
  // @ts-ignore
  endpoints.articles.like(':articleId')
);

export const createMockLikeArticle = (articleDetail: ArticleDetail) => {
  return rest[likeArticleMethod](likeArticleEndpoint, (req, res, ctx) => {
    const delta = articleDetail.liked ? -1 : 1;
    const latestLiked = !articleDetail.liked;
    const latestLikeCount = articleDetail.likeCount + delta;
    return res(
      ...mockSuccess<LikeArticleApiData['data']>(ctx, {
        liked: latestLiked,
        likeCount: latestLikeCount,
      })
    );
  });
};

export const mockLikeArticle = createMockLikeArticle(createMockArticle(1));

export const mockLikeArticleError = restError(
  likeArticleMethod,
  likeArticleEndpoint,
  {
    message: 'mockLikeArticle Error',
  }
);
