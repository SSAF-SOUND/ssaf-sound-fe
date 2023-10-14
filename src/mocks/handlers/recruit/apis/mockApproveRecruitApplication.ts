import type { RejectRecruitApplicationApiData } from '~/services/recruit';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { MatchStatus } from '~/services/recruit';
import { API_URL, composeUrls } from '~/utils';

const approveRecruitApplicationEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line
  // @ts-ignore
  endpoints.recruit.application.approve(':recruitApplicationId')
);
const approveRecruitApplicationMethod = 'patch';

export const mockApproveRecruitApplication = restSuccess<
  RejectRecruitApplicationApiData['data']
>(approveRecruitApplicationMethod, approveRecruitApplicationEndpoint, {
  data: {
    recruitApplicationId: 1,
    matchStatus: MatchStatus.SUCCESS,
  },
});

export const mockApproveRecruitApplicationError = restError(
  approveRecruitApplicationMethod,
  approveRecruitApplicationEndpoint,
  {
    message: '리쿠르팅 신청 수락 실패',
  }
);
