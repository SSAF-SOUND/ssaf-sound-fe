import type { GetRecruitApplicantsApiData } from '~/services/recruit';

import { rest } from 'msw';

import {
  createMockRecruitApplicants,
  createMockRecruitDetail,
} from '~/mocks/handlers/recruit/data';
import { mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

const getRecruitApplicantsMethod = 'get';
const getRecruitApplicantsEndpoint = removeQueryParams(
  composeUrls(API_URL, endpoints.recruit.application.applicants(1))
);

export const createMockGetRecruitApplicants = (
  recruitApplicants: GetRecruitApplicantsApiData['data']
) => {
  return restSuccess<GetRecruitApplicantsApiData['data']>(
    getRecruitApplicantsMethod,
    getRecruitApplicantsEndpoint,
    {
      data: recruitApplicants,
    }
  );
};

export const mockGetRecruitApplicants = rest.get(
  getRecruitApplicantsEndpoint,
  (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const recruitId = Number(searchParams.get('recruitId'));

    return res(
      ctx.delay(500),
      ...mockSuccess<GetRecruitApplicantsApiData['data']>(
        ctx,
        createMockRecruitApplicants(createMockRecruitDetail(recruitId))
      )
    );
  }
);

export const mockGetRecruitApplicantsError = restError(
  getRecruitApplicantsMethod,
  getRecruitApplicantsEndpoint,
  {
    message: 'mockGetRecruitApplicants Error',
  }
);
