import type { UserRole } from './types';

import { userRoles } from './types';

export const role = (target: UserRole) => {
  const targetScore = userRoles[target];
  return {
    hasHigherAuthorityThan: (compare: UserRole) => {
      return targetScore < userRoles[compare];
    },
    hasLowerAuthorityThan: (compare: UserRole) => {
      return targetScore > userRoles[compare];
    },
  };
};
