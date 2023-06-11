const FALLBACK = 'http://localhost';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || FALLBACK;

export const RESPONSE = {
  MESSAGE: {},
  CODE: {
    EXPIRED_TOKEN: '10000',
    INVALID_TOKEN: '10001',
    TOKEN_NOT_EXISTS: '10002',
  },
} as const;
