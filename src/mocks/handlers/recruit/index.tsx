import type {
  GetRecruitDetailApiData,
  GetRecruitMembersApiData,
  GetRecruitsApiData,
  RecruitDetail,
  RecruitMembers,
  Recruits,
} from '~/services/recruit';

import { rest } from 'msw';

import { mockSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

import { RecruitData } from './data';

const getRecruitDetail = rest.get<never, never, GetRecruitDetailApiData>(
  composeUrls(API_URL, endpoints.recruit.detail('1')),
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ...mockSuccess<RecruitDetail>(ctx, RecruitData.recruitDetail.project)
    );
  }
);

const getRecruits = rest.get<never, never, GetRecruitsApiData>(
  composeUrls(API_URL, endpoints.recruit.data()),
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ...mockSuccess<Recruits>(ctx, RecruitData.recruits)
    );
  }
);

const getRecruitMembers = rest.get<never, never, GetRecruitMembersApiData>(
  composeUrls(API_URL, endpoints.recruit.members('1')),
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ...mockSuccess<RecruitMembers>(ctx, RecruitData.recruitMembers)
    );
  }
);

export const recruitHandlers = [
  getRecruitDetail,
  getRecruits,
  getRecruitMembers,
];
