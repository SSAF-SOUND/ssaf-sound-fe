import DOMPurify from 'dompurify';

export const sanitizeHtml = (dirty: string) => {
  return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
};
