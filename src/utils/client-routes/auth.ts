import type { OAuthProviders } from '~/services/auth';

import { createRoute } from '~/utils/client-routes/utils';

// ---------- auth self ----------
const authSelfRoute = () => createRoute('/auth')();

// ---------- sign-in ----------
const signInRoute = () => {
  const pathname = `${authSelfRoute().pathname}/sign-in`;

  return createRoute(pathname)();
};

// ---------- sign-in callback ----------
const signInCallbackRoute = (oauthProvider: OAuthProviders) => {
  const pathname = `${authSelfRoute().pathname}/callback/${oauthProvider}`;

  return createRoute(pathname)();
};

// ---------- user register ----------
const userRegisterRoute = () => {
  const pathname = `${authSelfRoute().pathname}/register`;

  return createRoute(pathname)();
};

export const auth = {
  self: authSelfRoute,
  signIn: signInRoute,
  callback: signInCallbackRoute,
  userRegister: userRegisterRoute,
};
