import { restError, restSuccess } from '~/mocks/utils';

const updateNicknameMethod = 'patch';
const updateNicknameEndpoint = 'patch';

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
