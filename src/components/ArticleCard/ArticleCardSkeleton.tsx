import Skeleton from 'react-loading-skeleton';

import { palettes } from '~/styles/utils';

export const ArticleCardSkeleton = () => {
  return (
    <Skeleton
      height={130}
      borderRadius={8}
      baseColor={palettes.font.grey}
      highlightColor={palettes.background.grey}
      style={{ border: `1px solid ${palettes.font.blueGrey}` }}
    />
  );
};
