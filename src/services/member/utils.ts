/**
 * 숫자가 낮을수록 높은 권한을 가집니다.
 */
const userRoles = {
  admin: 1,
  user: 2,
};

export type UserRole = keyof typeof userRoles;

export const role = (target: UserRole) => {
  const targetScore = userRoles[target];
  return {
    hasHigherAuthority: (compare: UserRole) => {
      return targetScore < userRoles[compare];
    },
    hasHigherOrEqualAuthority: (compare: UserRole) => {
      return targetScore <= userRoles[compare];
    },
    hasLowerAuthority: (compare: UserRole) => {
      return targetScore > userRoles[compare];
    },
    hasLowerOrEqualAuthority: (compare: UserRole) => {
      return targetScore >= userRoles[compare];
    },
  };
};
