import type { IParseOptions } from 'qs';

import qs from 'qs';

const tokenMapper = {
  true: true,
  false: false,
};

const hasOwnProperty = (obj: object, str: string): str is keyof typeof obj => {
  return tokenMapper.hasOwnProperty(str);
};

export const qsDecoder = (token: string) => {
  if (hasOwnProperty(tokenMapper, token)) {
    return tokenMapper[token];
  }

  return token;
};

/**
 * @example
 * const result = qsStringify({
 *   a: undefined,
 *   b: null,
 *   c: 1,
 *   d: false,
 *   e: [1],
 *   f: [],
 *   g: [1, 2]
 * })
 * result // c=1 & d=false & e=1 & g=1 & g=2
 */
export const qsStringify: typeof qs.stringify = (params, options) => {
  return qs.stringify(params, {
    skipNulls: true,
    arrayFormat: 'repeat',
    ...options,
  });
};

/**
 * @example
 * const result = qsParse(`a=1&b=1&b=2&c=null&d=&e=false`)
 * result // { a: '1', b: ['1', '2'], c: 'null', d: '', e: false }
 *
 * - boolean 문자열들은 전부 boolean형으로 변환됨
 */
export const qsParse = <
  T = Record<string, string | boolean | Array<string | boolean>>
>(
  token: string,
  options?: IParseOptions
) => {
  return qs.parse(token, {
    decoder: qsDecoder,
    ...options,
  }) as T;
};
