import { useMemo } from 'react';
import { stripHtml } from 'string-strip-html';

export const useStripHtml = (str: string) => {
  return useMemo(() => stripHtml(str).result, [str]);
};
