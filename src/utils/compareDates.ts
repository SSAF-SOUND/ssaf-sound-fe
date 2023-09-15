import dayjs from 'dayjs';

export const compareDates = (a: Date | string, b: Date | string) => {
  const aDate = dayjs(a);
  const bDate = dayjs(b);
  return aDate.diff(bDate);
};
