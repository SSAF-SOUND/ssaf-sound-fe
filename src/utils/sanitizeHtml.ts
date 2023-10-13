import DOMPurify from 'isomorphic-dompurify';

import { isClient } from '~/utils/misc';

const addHook = () => {
  if (isClient) {
    DOMPurify.addHook('afterSanitizeAttributes', function (node) {
      if (node.nodeName === 'A') {
        node.setAttribute('target', '_blank');

        const prevRelAttributes = node.getAttribute('rel');
        node.setAttribute('rel', `${prevRelAttributes} ugc nofollow`);
      }
    });
  }
};

addHook();

export const sanitizeHtml = (dirty: string) => {
  return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
};
