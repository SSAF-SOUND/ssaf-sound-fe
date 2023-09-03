import { useMemo } from 'react';
import stripTags from 'striptags';

import { replaceMultipleSpacesWithSingle } from '~/utils/replaceMultipleSpacesWithSingle';

export const useStripHtml = (str: string) => {
  return useMemo(() => replaceMultipleSpacesWithSingle(stripTags(str)), [str]);
};
