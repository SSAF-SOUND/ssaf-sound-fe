const isValidLength = (value: string) => {
  const { length } = value;
  return 1 <= length && length <= 11;
};

const isValidWhiteSpace = (value: string) => {
  return !/(^\s|\s$|\s{2,})/.test(value);
};

const isValidFormat = (value: string) => {
  return !/[^\w 가-힣]/.test(value);
};

export const nicknameValidator = (value: string) => {
  if (!isValidLength(value)) {
    return '길이는 1 ~ 11 사이여야 합니다.';
  }

  if (!isValidWhiteSpace(value)) {
    return '공백문자를 연달아 사용하거나, 처음과 마지막에 사용할 수 없습니다.';
  }

  return (
    isValidFormat(value) || '한글, 영문, 숫자, _, 공백만 사용할 수 있습니다.'
  );
};
