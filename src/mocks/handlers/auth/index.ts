import { mockDeleteAccount } from '~/mocks/handlers/auth/apis/mockDeleteAccount';
import { mockReissueToken } from '~/mocks/handlers/auth/apis/mockReissueToken';
import { mockSignIn } from '~/mocks/handlers/auth/apis/mockSignIn';
import { mockSignOut } from '~/mocks/handlers/auth/apis/mockSignOut';

export const authHandlers = [
  mockSignIn,
  mockSignOut,
  mockReissueToken,
  mockDeleteAccount,
];
