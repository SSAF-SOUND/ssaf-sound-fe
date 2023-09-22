import type { UpdateMyInfoApiData } from '~/services/member';

import { mockUserInfo } from '~/mocks/handlers/member/data';
import { restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const updateMyInfoMethod = 'put';
const updateMyInfoEndpoint = composeUrls(API_URL, endpoints.user.myInfo());

export const createMockUserInfo = (data: UpdateMyInfoApiData['data']) => {
  return restSuccess<UpdateMyInfoApiData['data']>(
    updateMyInfoMethod,
    updateMyInfoEndpoint,
    {
      data,
    }
  );
};

export const mockUpdateMyInfo = createMockUserInfo(
  mockUserInfo.certifiedSsafyUserInfo
);
