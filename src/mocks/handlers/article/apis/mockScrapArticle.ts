import type { ScrapArticleApiData } from '~/services/article/apis';
import type { ArticleDetail } from '~/services/article/utils';

import { rest } from 'msw';

import { createMockArticle } from '~/mocks/handlers/article/data';
import { mockSuccess, restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const scrapArticleMethod = 'post';
const scrapArticleEndpoint = composeUrls(
  API_URL,
  endpoints.articles.scrap(
    // eslint-disable-next-line
    // @ts-ignore
    ':articleId'
  )
);

export const createMockScrapArticle = (articleDetail: ArticleDetail) => {
  return rest[scrapArticleMethod](scrapArticleEndpoint, (req, res, ctx) => {
    const delta = articleDetail.scraped ? -1 : 1;
    const latestScraped = !articleDetail.scraped;
    const latestScrapCount = articleDetail.scrapCount + delta;

    return res(
      ...mockSuccess<ScrapArticleApiData['data']>(ctx, {
        scraped: latestScraped,
        scrapCount: latestScrapCount,
      })
    );
  });
};

export const mockScrapArticle = createMockScrapArticle(createMockArticle(1));

export const mockScrapArticleError = restError(
  scrapArticleMethod,
  scrapArticleEndpoint,
  {
    message: 'mockScrapArticle Error',
  }
);
