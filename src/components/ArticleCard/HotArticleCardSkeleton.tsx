import Skeleton from 'react-loading-skeleton';

import { palettes } from '~/styles/utils';

export const HotArticleCardSkeleton = () => {
  return (
    <Skeleton
      height={156}
      borderRadius={8}
      baseColor={palettes.font.grey}
      highlightColor={palettes.background.grey}
      style={{ border: `1px solid ${palettes.font.blueGrey}` }}
    />
  );
};
