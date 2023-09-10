import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';

/**
 * - `endDate`에서부터 `오늘`의 차이를 `일`단위로 계산합니다.
 * - 0: `endDate`가 당일입니다.
 * - 음수: `endDate`는 이미 지난 날입니다.
 * - 양수: `endDate`까지 1일 이상 남았습니다.
 */
export const getDateDiff = (endDate: Dayjs) => {
  const today = dayjs();
  return dayjs(endDate).diff(today, 'day');
};

export const formatDateTime = (dateString: string) => {
  const dayjsInstance = dayjs(dateString);
  const formattedDate = dayjsInstance.format('MM-DD');
  const formattedTime = dayjsInstance.format('hh:mm');

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

/**
 * YYYY-MM-DD
 */
export const formatFullDate = (dateString: string) => {
  const dayjsInstance = dayjs(dateString);
  const formattedDate = dayjsInstance.format('YYYY-MM-DD');

  return formattedDate;
};
