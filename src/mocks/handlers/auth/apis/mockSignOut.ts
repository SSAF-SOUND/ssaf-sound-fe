import { rest } from 'msw';

import { removeTokens } from '~/mocks/handlers/auth/data';
import { mockSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const signOutMethod = 'delete';
const signOutEndpoint = composeUrls(API_URL, endpoints.auth.signOut());

export const mockSignOut = rest[signOutMethod](
  signOutEndpoint,
  (req, res, ctx) => {
    removeTokens();

    return res(...mockSuccess(ctx, {}));
  }
);
