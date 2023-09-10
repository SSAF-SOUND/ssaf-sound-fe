import dayjs from 'dayjs';

export const toEndDateFormValue = (value: Date | string) => {
  return dayjs(value).format('YYYY-MM-DD');
};
