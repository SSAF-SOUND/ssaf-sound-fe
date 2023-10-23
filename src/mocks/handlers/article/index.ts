/* eslint-disable @typescript-eslint/ban-ts-comment */

import { mockCreateArticle } from '~/mocks/handlers/article/apis/mockCreateArticle';
import { mockGetArticleCategories } from '~/mocks/handlers/article/apis/mockGetArticleCategories';
import { mockGetArticleDetail } from '~/mocks/handlers/article/apis/mockGetArticleDetail';
import { mockGetArticlesByKeywordByOffset } from '~/mocks/handlers/article/apis/mockGetArticlesByKeywordByOffset';
import { mockGetArticlesByOffset } from '~/mocks/handlers/article/apis/mockGetArticlesByOffset';
import { mockGetHotArticlesByKeywordByOffset } from '~/mocks/handlers/article/apis/mockGetHotArticlesByKeywordByOffset';
import { mockGetHotArticlesByOffset } from '~/mocks/handlers/article/apis/mockGetHotArticlesByOffset';
import { mockGetMyArticlesByOffset } from '~/mocks/handlers/article/apis/mockGetMyArticlesByOffset';
import { mockGetMyScrapedArticlesByOffset } from '~/mocks/handlers/article/apis/mockGetMyScrapedArticlesByOffset';
import { mockLikeArticle } from '~/mocks/handlers/article/apis/mockLikeArticle';
import { mockRemoveArticle } from '~/mocks/handlers/article/apis/mockRemoveArticle';
import { mockScrapArticle } from '~/mocks/handlers/article/apis/mockScrapArticle';
import { mockUpdateArticle } from '~/mocks/handlers/article/apis/mockUpdateArticle';

export const articleHandlers = [
  // mockGetMyArticlesByCursor,
  mockGetMyArticlesByOffset, // /posts/my/offset

  // mockGetMyScrapedArticlesByCursor,
  mockGetMyScrapedArticlesByOffset, // /posts/my-scrap/offset
  // getMyScrapedArticlesError,

  // mockGetHotArticlesByCursor,
  mockGetHotArticlesByOffset, // /posts/hot/offset

  // mockGetHotArticlesByKeywordByCursor,
  mockGetHotArticlesByKeywordByOffset, // posts/hot/search/offset

  //mockGetArticlesByKeywordByCursor,
  mockGetArticlesByKeywordByOffset, // /posts/search/offset

  // mockGetArticlesByCursor,
  mockGetArticlesByOffset, // /posts/offset

  // getArticlesError,
  mockGetArticleCategories,
  mockGetArticleDetail, // /posts/:id
  mockCreateArticle,
  mockRemoveArticle,
  mockUpdateArticle,
  mockLikeArticle,
  // likeArticleError,
  mockScrapArticle,
  // scrapArticleError,
];
