import { dehydrate as reactQueryDehydrate } from '@tanstack/react-query';

/**
 * `_app.tsx`에서 정의한 React Query의 `Hydration`을 위해서는
 * 프로퍼티 이름이 무조건 `dehydratedState`여야 해서, 프로퍼티 이름을 강제하기 위해 만든 유틸리티 함수입니다.
 */
export const dehydrate = (...args: Parameters<typeof reactQueryDehydrate>) => {
  return {
    dehydratedState: reactQueryDehydrate(...args),
  };
};
