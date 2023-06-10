const FALLBACK = 'http://localhost';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || FALLBACK;

export const ERRORS = {
  MESSAGE: {
    EXPIRED_TOKEN: 'Expired',
    INVALID_TOKEN: 'Invalid',
  },
  CODE: {
    BAD_REQUEST: 400,
  },
} as const;
