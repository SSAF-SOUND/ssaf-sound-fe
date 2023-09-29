import type {
  CancelRecruitApplicationApiData} from '~/services/recruit';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import {
  MatchStatus,
} from '~/services/recruit';
import { API_URL, composeUrls } from '~/utils';

const cancelRecruitApplicationEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line
  // @ts-ignore
  endpoints.recruit.application.cancel(':recruitApplicationId')
);
const cancelRecruitApplicationMethod = 'patch';

export const mockCancelRecruitApplication = restSuccess<
  CancelRecruitApplicationApiData['data']
>(cancelRecruitApplicationMethod, cancelRecruitApplicationEndpoint, {
  data: {
    recruitApplicationId: 1,
    matchStatus: MatchStatus.INITIAL,
  },
});

export const mockCancelRecruitApplicationError = restError(
  cancelRecruitApplicationMethod,
  cancelRecruitApplicationEndpoint,
  {
    message: '리쿠르팅 신청 취소 실패',
  }
);
