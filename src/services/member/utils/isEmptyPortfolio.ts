import type { Portfolio } from '~/services/member';

export const isEmptyPortfolio = (portfolio: Portfolio) => {
  const { selfIntroduction, memberLinks, skills } = portfolio;
  return !selfIntroduction && !memberLinks.length && !skills.length;
};
