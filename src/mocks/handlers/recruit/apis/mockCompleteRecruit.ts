import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const completeRecruitEndpoint =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruit.complete(':recruitId'));
const completeRecruitMethod = 'post';

export const mockCompleteRecruit = restSuccess(
  completeRecruitMethod,
  completeRecruitEndpoint,
  {
    data: null,
  }
);

export const mockCompleteRecruitError = restError(
  completeRecruitMethod,
  completeRecruitEndpoint,
  {
    message: 'mockCompleteRecruit Error',
  }
);
