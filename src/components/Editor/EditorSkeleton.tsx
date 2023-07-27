import Skeleton from 'react-loading-skeleton';

import { palettes } from '~/styles/utils';

const EditorSkeleton = () => {
  return (
    <Skeleton
      style={{ border: `1px solid ${palettes.grey3}` }}
      width="100%"
      height={330}
      borderRadius={0}
      highlightColor={palettes.white}
      baseColor={palettes.grey4}
    />
  );
};

export default EditorSkeleton;
