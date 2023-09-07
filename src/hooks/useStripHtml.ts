import { useMemo } from 'react';

import { stripHtmlTags } from '~/utils/stripHtmlTags';

export const useStripHtml = (str: string) => {
  return useMemo(() => stripHtmlTags(str), [str]);
};
