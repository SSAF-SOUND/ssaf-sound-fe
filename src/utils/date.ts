import dayjs from 'dayjs';

export function getDateDiff(end: Date) {
  const today = dayjs();
  const endDay = dayjs(end);
  const diff = endDay.diff(today, 'day');

  return diff;
}

export const formatDateTime = (dateString: string) => {
  const dayjsInstance = dayjs(dateString);
  const formattedDate = dayjsInstance.format('MM-DD');
  const formattedTime = dayjsInstance.format('hh:mm');

  return {
    date: formattedDate,
    time: formattedTime,
  };
};
