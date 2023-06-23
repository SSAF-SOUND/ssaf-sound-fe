const FALLBACK = 'http://localhost';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || FALLBACK;

export enum RESPONSE_CODE {
  //
  TOKEN_NOT_EXISTS = '401',

  //
  INTERNAL_SERVER_ERROR = '500',

  //
  INVALID_TOKEN = '705',
  EXPIRED_TOKEN = '706',
}
