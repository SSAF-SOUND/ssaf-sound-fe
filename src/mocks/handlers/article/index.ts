/* eslint-disable @typescript-eslint/ban-ts-comment */

import { mockCreateArticle } from '~/mocks/handlers/article/apis/mockCreateArticle';
import { mockGetArticleCategories } from '~/mocks/handlers/article/apis/mockGetArticleCategories';
import { mockGetArticleDetail } from '~/mocks/handlers/article/apis/mockGetArticleDetail';
import { mockGetArticles } from '~/mocks/handlers/article/apis/mockGetArticles';
import { mockGetArticlesByKeyword } from '~/mocks/handlers/article/apis/mockGetArticlesByKeyword';
import { mockGetHotArticles } from '~/mocks/handlers/article/apis/mockGetHotArticles';
import { mockGetHotArticlesByKeyword } from '~/mocks/handlers/article/apis/mockGetHotArticlesByKeyword';
import { mockGetMyArticles } from '~/mocks/handlers/article/apis/mockGetMyArticles';
import { mockGetMyScrapedArticles } from '~/mocks/handlers/article/apis/mockGetMyScrapedArticles';
import { mockLikeArticle } from '~/mocks/handlers/article/apis/mockLikeArticle';
import { mockRemoveArticle } from '~/mocks/handlers/article/apis/mockRemoveArticle';
import { mockScrapArticle } from '~/mocks/handlers/article/apis/mockScrapArticle';
import { mockUpdateArticle } from '~/mocks/handlers/article/apis/mockUpdateArticle';

export const articleHandlers = [
  mockGetMyArticles, // /posts/my
  mockGetMyScrapedArticles, // /posts/my-scrap
  // getMyScrapedArticlesError,
  mockGetHotArticles, // /posts/hot?
  mockGetHotArticlesByKeyword, // /posts/hot/search?
  mockGetArticlesByKeyword, // /posts/search?
  mockGetArticles, // /posts?
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
