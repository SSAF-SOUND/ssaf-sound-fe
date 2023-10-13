import type { ValidateNicknameApiData } from '~/services/member';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const validateNicknameMethod = 'post';
const validateNicknameEndpoint = composeUrls(
  API_URL,
  endpoints.user.nickname()
);

export const createMockValidateNickname = (valid: boolean) => {
  return restSuccess<ValidateNicknameApiData['data']>(
    validateNicknameMethod,
    validateNicknameEndpoint,
    { data: { possible: valid } }
  );
};

export const mockValidateNickname = createMockValidateNickname(true);

export const mockValidateNicknameError = restError(
  validateNicknameMethod,
  validateNicknameEndpoint,
  {
    message: 'mockValidateNickname Error',
  }
);
