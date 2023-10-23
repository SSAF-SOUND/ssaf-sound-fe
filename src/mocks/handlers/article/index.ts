/* eslint-disable @typescript-eslint/ban-ts-comment */

import { mockCreateArticle } from '~/mocks/handlers/article/apis/mockCreateArticle';
import { mockGetArticleCategories } from '~/mocks/handlers/article/apis/mockGetArticleCategories';
import { mockGetArticleDetail } from '~/mocks/handlers/article/apis/mockGetArticleDetail';
import { mockGetArticlesByCursor } from '~/mocks/handlers/article/apis/mockGetArticlesByCursor';
import { mockGetArticlesByKeyword } from '~/mocks/handlers/article/apis/mockGetArticlesByKeyword';
import { mockGetHotArticlesByCursor } from '~/mocks/handlers/article/apis/mockGetHotArticlesByCursor';
import { mockGetHotArticlesByKeyword } from '~/mocks/handlers/article/apis/mockGetHotArticlesByKeyword';
import { mockGetMyArticlesByCursor } from '~/mocks/handlers/article/apis/mockGetMyArticlesByCursor';
import { mockGetMyScrapedArticlesByCursor } from '~/mocks/handlers/article/apis/mockGetMyScrapedArticlesByCursor';
import { mockLikeArticle } from '~/mocks/handlers/article/apis/mockLikeArticle';
import { mockRemoveArticle } from '~/mocks/handlers/article/apis/mockRemoveArticle';
import { mockScrapArticle } from '~/mocks/handlers/article/apis/mockScrapArticle';
import { mockUpdateArticle } from '~/mocks/handlers/article/apis/mockUpdateArticle';

export const articleHandlers = [
  mockGetMyArticlesByCursor, // /posts/my
  mockGetMyScrapedArticlesByCursor, // /posts/my-scrap
  // getMyScrapedArticlesError,
  mockGetHotArticlesByCursor, // /posts/hot?
  mockGetHotArticlesByKeyword, // /posts/hot/search?
  mockGetArticlesByKeyword, // /posts/search?
  mockGetArticlesByCursor, // /posts?
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
