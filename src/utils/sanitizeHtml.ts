import DOMPurify from 'isomorphic-dompurify';

import { deduplicate } from '~/utils/array';

const addHook = () => {
  DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if (node.nodeName === 'A') {
      node.setAttribute('target', '_blank');

      const prevRelAttributes = node.getAttribute('rel');
      const nextRelAttributes = deduplicate([
        prevRelAttributes,
        'ugc',
        'nofollow',
      ])
        .filter(Boolean)
        .join(' ');
      node.setAttribute('rel', nextRelAttributes);
    }
  });
};

addHook();

export const sanitizeHtml = (dirty: string, allowedTags?: string[]) => {
  const config = allowedTags
    ? { ALLOWED_TAGS: allowedTags }
    : { USE_PROFILES: { html: true } };
  return DOMPurify.sanitize(dirty, config);
};
