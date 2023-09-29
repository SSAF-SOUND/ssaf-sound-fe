import type { RejectRecruitApplicationApiData } from '~/services/recruit';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { MatchStatus } from '~/services/recruit';
import { API_URL, composeUrls } from '~/utils';

const rejectRecruitApplicationEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line
  // @ts-ignore
  endpoints.recruit.application.reject(':recruitApplicationId')
);
const rejectRecruitApplicationMethod = 'post';

export const mockRejectRecruitApplication = restSuccess<
  RejectRecruitApplicationApiData['data']
>(rejectRecruitApplicationMethod, rejectRecruitApplicationEndpoint, {
  data: {
    recruitApplicationId: 1,
    matchStatus: MatchStatus.REJECTED,
  },
});

export const mockRejectRecruitApplicationError = restError(
  rejectRecruitApplicationMethod,
  rejectRecruitApplicationEndpoint,
  {
    message: '리쿠르팅 신청 거절 실패',
  }
);
