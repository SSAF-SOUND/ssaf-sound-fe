import dayjs from 'dayjs';

export function getDateDiff(end: Date) {
  const today = dayjs();
  const endDay = dayjs(end);
  const diff = endDay.diff(today, 'day');

  return diff;
}
