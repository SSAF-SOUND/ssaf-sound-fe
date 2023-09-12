import Skeleton from 'react-loading-skeleton';

import { palettes } from '~/styles/utils';

interface RecruitCardSkeletonProps {
  size?: 'sm' | 'md';
}
export const RecruitCardSkeleton = (props: RecruitCardSkeletonProps) => {
  const { size = 'sm' } = props;

  return (
    <Skeleton
      baseColor={palettes.grey3}
      highlightColor={palettes.white}
      // enableAnimation={false}
      css={sizeCss[size]}
    />
  );
};

const sizeCss = {
  sm: {
    width: 140,
    height: 140,
    borderRadius: 20,
  },
  md: {
    width: '100%',
    height: 114,
    borderRadius: 30,
  },
};
