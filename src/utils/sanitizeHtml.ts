import DOMPurify from 'dompurify';

import { isClient } from '~/utils/misc';

const addHook = () => {
  if (isClient) {
    DOMPurify.addHook('afterSanitizeAttributes', function (node) {
      if ('target' in node) {
        node.setAttribute('target', '_blank');
      }
    });
  }
};

addHook();

export const sanitizeHtml = (dirty: string) => {
  return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
};
