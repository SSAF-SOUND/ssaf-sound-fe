import type { SkeletonProps } from 'react-loading-skeleton';

import Skeleton from 'react-loading-skeleton';

import { lunchCardMinHeight } from '~/components/Lunch/LunchCard/utils';
import { palettes } from '~/styles/utils';

interface LunchCardSkeletonProps extends SkeletonProps {}

export const LunchCardSkeleton = (props: LunchCardSkeletonProps) => {
  return (
    <Skeleton
      width="100%"
      height={lunchCardMinHeight}
      borderRadius={20}
      baseColor={palettes.background.grey}
      enableAnimation={false}
      {...props}
    />
  );
};
