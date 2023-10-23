/* eslint-disable @typescript-eslint/ban-ts-comment */

import { mockCreateArticle } from '~/mocks/handlers/article/apis/mockCreateArticle';
import { mockGetArticleCategories } from '~/mocks/handlers/article/apis/mockGetArticleCategories';
import { mockGetArticleDetail } from '~/mocks/handlers/article/apis/mockGetArticleDetail';
import { mockGetArticlesByCursor } from '~/mocks/handlers/article/apis/mockGetArticlesByCursor';
import { mockGetArticlesByKeywordByCursor } from '~/mocks/handlers/article/apis/mockGetArticlesByKeywordByCursor';
import { mockGetArticlesByKeywordByOffset } from '~/mocks/handlers/article/apis/mockGetArticlesByKeywordByOffset';
import { mockGetArticlesByOffset } from '~/mocks/handlers/article/apis/mockGetArticlesByOffset';
import { mockGetHotArticlesByCursor } from '~/mocks/handlers/article/apis/mockGetHotArticlesByCursor';
import { mockGetHotArticlesByKeywordByCursor } from '~/mocks/handlers/article/apis/mockGetHotArticlesByKeywordByCursor';
import { mockGetHotArticlesByKeywordByOffset } from '~/mocks/handlers/article/apis/mockGetHotArticlesByKeywordByOffset';
import { mockGetHotArticlesByOffset } from '~/mocks/handlers/article/apis/mockGetHotArticlesByOffset';
import { mockGetMyArticlesByCursor } from '~/mocks/handlers/article/apis/mockGetMyArticlesByCursor';
import { mockGetMyArticlesByOffset } from '~/mocks/handlers/article/apis/mockGetMyArticlesByOffset';
import { mockGetMyScrapedArticlesByCursor } from '~/mocks/handlers/article/apis/mockGetMyScrapedArticlesByCursor';
import { mockGetMyScrapedArticlesByOffset } from '~/mocks/handlers/article/apis/mockGetMyScrapedArticlesByOffset';
import { mockLikeArticle } from '~/mocks/handlers/article/apis/mockLikeArticle';
import { mockRemoveArticle } from '~/mocks/handlers/article/apis/mockRemoveArticle';
import { mockScrapArticle } from '~/mocks/handlers/article/apis/mockScrapArticle';
import { mockUpdateArticle } from '~/mocks/handlers/article/apis/mockUpdateArticle';

export const articleHandlers = [
  // mockGetMyArticlesByCursor,
  mockGetMyArticlesByOffset,

  // mockGetMyScrapedArticlesByCursor,
  mockGetMyScrapedArticlesByOffset,
  // getMyScrapedArticlesError,

  // mockGetHotArticlesByCursor,
  mockGetHotArticlesByOffset,

  // mockGetHotArticlesByKeywordByCursor,
  mockGetHotArticlesByKeywordByOffset,

  //mockGetArticlesByKeywordByCursor,
  mockGetArticlesByKeywordByOffset,

  // mockGetArticlesByCursor,
  mockGetArticlesByOffset,

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
