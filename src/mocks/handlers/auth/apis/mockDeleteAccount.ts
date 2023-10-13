import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const deleteAccountMethod = 'delete';
const deleteAccountEndpoint = composeUrls(API_URL, endpoints.user.myInfo());

export const mockDeleteAccount = restSuccess(
  deleteAccountMethod,
  deleteAccountEndpoint,
  { data: null }
);

export const mockDeleteAccountError = restError(
  deleteAccountMethod,
  deleteAccountEndpoint,
  {
    message: 'mockDeleteAccount Error',
  }
);
