import Skeleton from 'react-loading-skeleton';

import { palettes } from '~/styles/utils';

const ArticleCategoryCardSkeleton = () => {
  return (
    <Skeleton
      borderRadius={20}
      height={108}
      baseColor={palettes.grey3}
      highlightColor={palettes.grey5}
    />
  );
};

export default ArticleCategoryCardSkeleton;
