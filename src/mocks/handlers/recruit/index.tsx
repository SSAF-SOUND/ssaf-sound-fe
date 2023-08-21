import type {
  RecruitDetail,
  recruitMembersType,
  Recruits,
  RecruitScrap,
  RecruitScrapApiData,
} from '~/services/recruit';

import { rest } from 'msw';

import { mockSuccess, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

import { RecruitData } from './data';

export const getRecruits = restSuccess<Recruits>(
  'get',
  composeUrls(API_URL, endpoints.recruit.list()),
  {
    data: RecruitData.recruits,
  }
);

export const getRecruitMembers = restSuccess<recruitMembersType>(
  'get',
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruit.members(':recruitId')),
  {
    data: RecruitData.recruitMembers,
  }
);

export const getRecruitDetail = restSuccess<RecruitDetail>(
  'get',
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruit.detail(':recruitId')),
  {
    data: RecruitData.recruitDetail.project,
  }
);

export const getRecruitScrap = restSuccess<RecruitScrap>(
  'get',
  composeUrls(API_URL, endpoints.recruit.scrap(1)),
  {
    data: RecruitData.RecruitScrap,
  }
);

export const postRecruitScrap = rest.post(
  composeUrls(API_URL, endpoints.recruit.scrap(1)),
  (req, res, ctx) => {
    const article = RecruitData.RecruitScrap;
    const delta = article.scrapCount ? 1 : -1;
    article.scrapCount += delta;
    const latestScrapCount = article.scrapCount;

    return res(
      ctx.delay(500),
      ...mockSuccess<RecruitScrapApiData['data']>(ctx, {
        scrapCount: latestScrapCount,
      })
    );
  }
);

export const postRecruitApply = restSuccess(
  'post',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruit.apply(':recruitId')),
  {
    data: null,
  }
);
export const recruitHandlers = [
  getRecruitDetail,
  getRecruits,
  getRecruitMembers,
  getRecruitScrap,
  postRecruitScrap,
  postRecruitApply,
];
