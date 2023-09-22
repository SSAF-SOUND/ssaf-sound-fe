import type { ValidateNicknameApiData } from '~/services/member';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const validateNicknameMethod = 'post';
const validateNicknameEndpoint = composeUrls(
  API_URL,
  endpoints.user.nickname()
);

/**
 * - 닉네임 중복 검사
 * - possible: true -> 생성 가능
 * - possible: false -> 중복된 닉네임이라 생성이 불가능
 */
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
  { message: 'validateNicknameError' }
);
