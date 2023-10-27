import DOMPurify from 'isomorphic-dompurify';

import { isClient } from '~/utils/misc';

const addHook = () => {
  if (isClient) {
    DOMPurify.addHook('afterSanitizeAttributes', function (node) {
      if (node.nodeName === 'A') {
        node.setAttribute('target', '_blank');

        const prevRelAttributes = node.getAttribute('rel');
        const nextRelAttributes = [prevRelAttributes, 'ugc', 'nofollow']
          .filter(Boolean)
          .join(' ');
        node.setAttribute('rel', nextRelAttributes);
      }
    });
  }
};

addHook();

export const sanitizeHtml = (dirty: string, allowedTags?: string[]) => {
  const config = allowedTags
    ? { ALLOWED_TAGS: allowedTags }
    : { USE_PROFILES: { html: true } };
  return DOMPurify.sanitize(dirty, config);
};
