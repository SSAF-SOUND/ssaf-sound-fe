import type { AvatarSize } from './SingleAvatar';
import type { SkeletonProps } from 'react-loading-skeleton';

import Skeleton from 'react-loading-skeleton';

import { palettes } from '~/styles/utils';

import { sizeCss } from './SingleAvatar';

interface AvatarSkeletonProps extends SkeletonProps {
  size: AvatarSize;
}

const AvatarSkeleton = (props: AvatarSkeletonProps) => {
  const { size, ...restProps } = props;
  return (
    <Skeleton
      circle
      css={sizeCss[size]}
      baseColor={palettes.grey.default}
      enableAnimation={false}
      {...restProps}
    />
  );
};

export default AvatarSkeleton;
