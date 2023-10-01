import type { ScrapRecruitApiData } from '~/services/recruit';

import { rest } from 'msw';

import { scrapStatus } from '~/mocks/handlers/recruit/data';
import { mockSuccess, restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';



const scrapRecruitEndpoint =
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruit.scrap(':recruitId'));

export const mockScrapRecruit = rest.post(
  scrapRecruitEndpoint,
  (req, res, ctx) => {
    const { scraped, scrapCount } = scrapStatus;
    const nextScraped = !scraped;
    const nextScrapCount = nextScraped ? scrapCount + 1 : scrapCount - 1;

    scrapStatus.scraped = nextScraped;
    scrapStatus.scrapCount = nextScrapCount;

    return res(
      ctx.delay(500),
      ...mockSuccess<ScrapRecruitApiData['data']>(ctx, {
        scraped: nextScraped,
        scrapCount: nextScrapCount,
      })
    );
  }
);

export const mockScrapRecruitError = restError('post', scrapRecruitEndpoint, {
  message: 'mockScrapRecruit Error',
});
