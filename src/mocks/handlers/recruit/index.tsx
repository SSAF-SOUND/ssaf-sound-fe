/* eslint-disable @typescript-eslint/ban-ts-comment */

import type {
  GetRejectedRecruitApplicantsApiData,
  ScrapRecruitApiData,
} from '~/services/recruit';

import { rest } from 'msw';

import { mockApplyRecruit } from '~/mocks/handlers/recruit/apis/mockApplyRecruit';
import { mockApproveRecruitApplication } from '~/mocks/handlers/recruit/apis/mockApproveRecruitApplication';
import { mockCancelRecruitApplication } from '~/mocks/handlers/recruit/apis/mockCancelRecruitApplication';
import { mockCompleteRecruit } from '~/mocks/handlers/recruit/apis/mockCompleteRecruit';
import { mockCreateRecruit } from '~/mocks/handlers/recruit/apis/mockCreateRecruit';
import { mockGetMyRecruitApplication } from '~/mocks/handlers/recruit/apis/mockGetMyRecruitApplication';
import { mockGetRecruitApplicants } from '~/mocks/handlers/recruit/apis/mockGetRecruitApplicants';
import { mockGetRecruitApplication } from '~/mocks/handlers/recruit/apis/mockGetRecruitApplication';
import { mockGetRecruitDetail } from '~/mocks/handlers/recruit/apis/mockGetRecruitDetail';
import { mockGetRecruitParticipants } from '~/mocks/handlers/recruit/apis/mockGetRecruitParticipants';
import { mockGetRecruits } from '~/mocks/handlers/recruit/apis/mockGetRecruits';
import { mockLikeRecruitApplication } from '~/mocks/handlers/recruit/apis/mockLikeRecruitApplication';
import { mockRejectRecruitApplication } from '~/mocks/handlers/recruit/apis/mockRejectRecruitApplication';
import { mockUpdateRecruit } from '~/mocks/handlers/recruit/apis/mockUpdateRecruit';
import { mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { MatchStatus, RecruitCategoryName } from '~/services/recruit';
import { API_URL, composeUrls, concat, removeQueryParams } from '~/utils';

import { createMockRecruitApplicants, scrapStatus } from './data';
import {
  restInfiniteAppliedRecruitsSuccess,
  restInfiniteRecruitsSuccess,
} from './utils';

// 리쿠르팅 스크랩

const scrapRecruitEndpoint =
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruit.scrap(':recruitId'));

export const scrapRecruit = rest.post(scrapRecruitEndpoint, (req, res, ctx) => {
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
});

export const scrapRecruitError = restError('post', scrapRecruitEndpoint, {
  message: '스크랩 업데이트에 실패했습니다.',
});

const removeRecruitEndpoint =
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruit.detail(':recruitId'));
const removeRecruitMethod = 'delete';

export const removeRecruit = restSuccess(
  removeRecruitMethod,
  removeRecruitEndpoint,
  { data: null }
);

export const removeRecruitError = restError(
  removeRecruitMethod,
  removeRecruitEndpoint,
  { message: '리쿠르팅 삭제 실패' }
);

const excludeRecruitParticipantMethod = 'delete';
const excludeRecruitParticipantEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.participant(
    // @ts-ignore
    { recruitId: ':recruitId', recruitApplicationId: ':recruitApplicationId' }
  )
);

export const excludeRecruitParticipant = restSuccess(
  excludeRecruitParticipantMethod,
  excludeRecruitParticipantEndpoint,
  {
    data: null,
  }
);

const getRejectedApplicantsEndpoint = removeQueryParams(
  composeUrls(
    API_URL,
    //@ts-ignore
    endpoints.recruit.application.rejectedApplicants(1)
  )
);

export const getRejectedApplicants = rest.get(
  getRejectedApplicantsEndpoint,
  (req, res, ctx) => {
    const recruitId = Number(req.url.searchParams.get('recruitId'));

    const safeRecruitId = Number.isNaN(recruitId) ? 1 : recruitId;

    const mockRejectedApplicants = Object.entries(
      createMockRecruitApplicants(safeRecruitId).recruitApplications
    )
      .map(([, applications]) => applications)
      .reduce(concat, []);

    return res(
      ctx.delay(500),
      ...mockSuccess<GetRejectedRecruitApplicantsApiData['data']>(
        ctx,
        mockRejectedApplicants
      )
    );
  }
);

const getJoinedRecruitsEndpoint = removeQueryParams(
  composeUrls(API_URL, endpoints.recruit.joinedList({ memberId: 1 }))
);

export const getJoinedRecruits = rest.get(
  getJoinedRecruitsEndpoint,
  restInfiniteRecruitsSuccess
);

const getAppliedRecruitsEndpoint = removeQueryParams(
  composeUrls(
    API_URL,
    endpoints.recruit.appliedList({
      category: RecruitCategoryName.PROJECT,
      matchStatus: MatchStatus.SUCCESS,
    })
  )
);

export const getAppliedRecruits = rest.get(
  getAppliedRecruitsEndpoint,
  restInfiniteAppliedRecruitsSuccess
);

const getMyScrapedRecruitsEndpoint = removeQueryParams(
  composeUrls(API_URL, endpoints.recruit.myScraped())
);

export const getMyScrapedRecruits = rest.get(
  getMyScrapedRecruitsEndpoint,
  restInfiniteRecruitsSuccess
);

export const getMyScrapedRecruitsError = restError(
  'get',
  getMyScrapedRecruitsEndpoint,
  {
    message: 'gg',
  }
);

export const recruitHandlers = [
  //
  getRejectedApplicants,
  getJoinedRecruits,
  getAppliedRecruits,
  getMyScrapedRecruits,
  // getMyScrapedRecruitsError,

  mockGetRecruitApplicants,
  mockCreateRecruit,
  mockGetRecruitDetail,
  // mockGetRecruitDetailError,
  mockGetRecruitParticipants,
  scrapRecruit,
  removeRecruit,
  mockUpdateRecruit,
  mockCompleteRecruit,

  mockGetRecruits,

  mockApplyRecruit,
  mockGetMyRecruitApplication, // /recruit-applications/mine

  mockGetRecruitApplication, // /recruit-applications/:recruitApplicationId
  mockCancelRecruitApplication,
  mockRejectRecruitApplication,
  mockApproveRecruitApplication,
  mockLikeRecruitApplication,
  excludeRecruitParticipant,
];
