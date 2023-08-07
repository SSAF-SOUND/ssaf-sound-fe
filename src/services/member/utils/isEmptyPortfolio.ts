import type { UserPortfolio } from '~/services/member';

export const isEmptyPortfolio = (portfolio: UserPortfolio) => {
  const { selfIntroduction, memberLinks, skills } = portfolio;
  return !selfIntroduction && !memberLinks.length && !skills.length;
};
