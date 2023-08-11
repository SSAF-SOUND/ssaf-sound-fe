import { useMemo } from 'react';
import { stripHtml } from 'string-strip-html';

import { replaceMultipleSpacesWithSingle } from '~/utils/replaceMultipleSpacesWithSingle';

export const useStripHtml = (str: string) => {
  return useMemo(
    () => replaceMultipleSpacesWithSingle(stripHtml(str).result),
    [str]
  );
};
