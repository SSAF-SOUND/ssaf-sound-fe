import { useMemo } from 'react';

import { SsafyTrack } from '~/services/member/utils';

export const useTracks = () => {
  const tracks = useMemo(() => Object.values(SsafyTrack), []);
  return { data: tracks };
};
