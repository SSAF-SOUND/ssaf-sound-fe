import { useEffect } from 'react';

/**
 * - 유저가 페이지를 벗어나려고 할 때, 브라우저에서 지원하는 재확인 UI를 띄웁니다.
 * - 새로고침, 창 닫기, 뒤로가기 등의 상황에서 발생합니다.
 * - `next/router`를 사용하여, `navigation`으로 페이지를 이동하는 경우에는 발생하지 않으므로, 이 경우는 별도로 핸들링해야 합니다.
 */
export const useUnloadReconfirmEffect = () => {
  useEffect(() => {
    window.onbeforeunload = () => false;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return;
};
