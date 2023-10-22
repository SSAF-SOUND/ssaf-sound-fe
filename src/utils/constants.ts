const fallback = 'http://localhost:8081';
const devEnvStrings = ['preview', 'development'];

export const API_URL = process.env.NEXT_PUBLIC_API_URL || fallback;

export const isDevMode =
  devEnvStrings.includes(process.env.NODE_ENV) ||
  devEnvStrings.includes(process.env.NEXT_PUBLIC_VERCEL_ENV as string);

export enum ErrorMessage {
  LOADING_ERROR = '데이터를 불러오는 중 오류가 발생했습니다.',
}

export enum ResponseCode {
  //
  TOKEN_NOT_EXISTS = '401',

  //
  INTERNAL_SERVER_ERROR = '500',

  //
  INVALID_LUNCH_DATE = '601',

  //
  NOT_EXIST_USER = '704',
  INVALID_TOKEN = '705',
  EXPIRED_TOKEN = '706',
  EXCEEDED_ATTEMPTS_OF_STUDENT_CERTIFICATION = '712',

  //
  NOT_EXIST_BOARD = '801',
  NOT_EXIST_ARTICLE = '802',

  // TODO: 값 수정
  APPLICATION_CANCELED = '03030303',
}

export const GlobalSymbol = {
  QUIT_REQUEST_RETRY: Symbol(),
};
export type GlobalSymbol = keyof typeof GlobalSymbol;
