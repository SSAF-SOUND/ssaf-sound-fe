export const removeQueryString = (url: string) => {
  return url.split('?')[0];
};

/**
 * 저희 Id는 모두 number로 들어가야 하는데, params타입과 충돌나는 부분 떄문에
 * 임시로 만들었습니다!
 * 사용하신다면 꼭 Id를 사용하는 곳에서만 사용해주세요!
 * 사용자는 반드시 Id가 '5' 와 같은 형변환 가능한 스트링인걸 알니까 만들었습니다!
 */
export const paramsToNumber = (params: string | string[] | undefined) => {
  if (params === undefined) {
    throw new Error('이 params는 undefined인 것 같아요!');
  }

  if (Array.isArray(params)) {
    throw new Error('이 params는 배열인 것 같아요!');
  }

  const num = Number(params);
  if (Number.isNaN(num)) {
    throw new Error('params를 숫자로 형변환할 수 없어요!');
  }

  return num;
};
