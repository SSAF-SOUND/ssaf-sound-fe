import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const updateNicknameMethod = 'patch';
const updateNicknameEndpoint = composeUrls(API_URL, endpoints.user.nickname());

export const mockUpdateNickname = restSuccess(
  updateNicknameMethod,
  updateNicknameEndpoint,
  { data: null }
);

export const mockUpdateNicknameError = restError(
  updateNicknameMethod,
  updateNicknameEndpoint,
  { message: 'mockUpdateNickname Error' }
);
