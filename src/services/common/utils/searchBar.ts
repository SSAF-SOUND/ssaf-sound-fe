export const minSearchKeywordLength = 2;

/* `router`에서 검증하기 위함 */
export const validateSearchKeyword = (keyword?: string) =>
  !!keyword && keyword.trim().length >= minSearchKeywordLength;

interface ToSafeSearchKeywordParams {
  keyword: string;
  minLength?: number;
}

export const toSafeSearchKeyword = ({
  keyword,
  minLength = minSearchKeywordLength,
}: ToSafeSearchKeywordParams) => {
  const trimmed = keyword.trim();

  if (!!trimmed && trimmed.length >= minLength) {
    return trimmed;
  }

  return '';
};

/* `SearchBarForm`에서 검증하기 위함 */
export interface ValidateSearchBarFormKeywordOptions {
  minSearchBarKeywordLength: number;
  allowEmptyString: boolean;
}

export const validateSearchBarFormKeyword =
  (options: Partial<ValidateSearchBarFormKeywordOptions> = {}) =>
  (keyword: string) => {
    const {
      allowEmptyString,
      minSearchBarKeywordLength = minSearchKeywordLength,
    } = options;
    const trimmedKeyword = keyword.trim();
    const length = trimmedKeyword.length;

    if (allowEmptyString && length === 0) return true;

    return (
      length >= minSearchBarKeywordLength ||
      `검색어는 최소 ${minSearchBarKeywordLength}자 이상이어야 합니다.`
    );
  };
