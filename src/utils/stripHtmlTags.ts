import stripTags from 'striptags';

import { replaceMultipleSpacesWithSingle } from '~/utils/replaceMultipleSpacesWithSingle';

export const stripHtmlTags = (str: string) => {
  return replaceMultipleSpacesWithSingle(stripTags(str, [], ' '));
};
