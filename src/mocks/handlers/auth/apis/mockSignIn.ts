import type { SignInApiData } from '~/services/auth';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const signInMethod = 'post';
const signInEndpoint = composeUrls(API_URL, endpoints.auth.signIn());

export const mockSignIn = restSuccess<SignInApiData['data']>(
  signInMethod,
  signInEndpoint,
  {
    data: { accessToken: '792', refreshToken: '969' },
  }
);

export const mockSignInError = restError(signInMethod, signInEndpoint, {
  message: 'SignIn Error',
});
