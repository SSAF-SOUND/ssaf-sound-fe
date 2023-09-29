import type { ApplyRecruitApiData} from '~/services/recruit';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { MatchStatus } from '~/services/recruit';
import { API_URL, composeUrls } from '~/utils';

const applyRecruitEndpoint =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruit.apply(':recruitId'));
const applyRecruitMethod = 'post';

export const mockApplyRecruit = restSuccess<ApplyRecruitApiData['data']>(
  applyRecruitMethod,
  applyRecruitEndpoint,
  {
    data: {
      matchStatus: MatchStatus.PENDING,
      recruitApplicationId: 301,
    },
  }
);

export const mockApplyRecruitError = restError(
  applyRecruitMethod,
  applyRecruitEndpoint,
  {
    message: '리쿠르팅 지원 실패',
  }
);
