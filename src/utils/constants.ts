const FALLBACK = 'http://localhost';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || FALLBACK;
export const isDevMode = process.env.NODE_ENV === 'development';

export enum ResponseCode {
  //
  TOKEN_NOT_EXISTS = '401',

  //
  INTERNAL_SERVER_ERROR = '500',

  //
  INVALID_LUNCH_DATE = '601',
  NOT_EXIST_LUNCH_MENUS = '603',

  //
  NOT_EXIST_USER = '704',
  INVALID_TOKEN = '705',
  EXPIRED_TOKEN = '706',
  EXCEEDED_ATTEMPTS_OF_STUDENT_CERTIFICATION = '712',

  NO_PERMISSIONS = '12313312',

  //
}
