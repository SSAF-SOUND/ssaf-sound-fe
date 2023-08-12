import { palettes } from '~/styles/utils';

export const portfolioLinkColors = [
  palettes.point.orange,
  palettes.point.green,
  palettes.point.purple,
  palettes.primary.light,
  palettes.primary.default,
  palettes.secondary.light,
  palettes.secondary.default,
  palettes.recruit.light,
  palettes.recruit.default,
  '#EEFF89',
];

export const getPortfolioLinkColor = (index: number) => {
  return portfolioLinkColors[index % portfolioLinkColors.length];
};
