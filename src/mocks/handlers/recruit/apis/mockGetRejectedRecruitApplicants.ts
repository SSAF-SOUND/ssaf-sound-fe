import type {
  GetRejectedRecruitApplicantsApiData,
  RecruitApplicant,
} from '~/services/recruit';

import {
  createMockRecruitDetail,
  createMockRejectedRecruitApplicants,
} from '~/mocks/handlers/recruit/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { RecruitCategoryName } from '~/services/recruit';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

const getRejectedRecruitApplicantsMethod = 'get';
const getRejectedRecruitApplicantsEndpoint = removeQueryParams(
  composeUrls(
    API_URL,
    // eslint-disable-next-line
    // @ts-ignore
    endpoints.recruit.application.rejectedApplicants(1)
  )
);

export const createMockGetRejectedRecruitApplicants = (
  recruitApplicants: RecruitApplicant[]
) => {
  return restSuccess<GetRejectedRecruitApplicantsApiData['data']>(
    getRejectedRecruitApplicantsMethod,
    getRejectedRecruitApplicantsEndpoint,
    {
      data: {
        recruitId: 1,
        category: RecruitCategoryName.PROJECT,
        recruitApplications: recruitApplicants,
      },
    }
  );
};

const rejectedRecruitApplicants = createMockRejectedRecruitApplicants(
  createMockRecruitDetail(1)
);

export const mockGetRejectedRecruitApplicants =
  createMockGetRejectedRecruitApplicants(rejectedRecruitApplicants);

export const mockGetRejectedRecruitApplicantsError = restError(
  getRejectedRecruitApplicantsMethod,
  getRejectedRecruitApplicantsEndpoint,
  {
    message: 'mockGetRejectedRecruitApplicants Error',
  }
);
