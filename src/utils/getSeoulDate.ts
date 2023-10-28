import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(tz);

export const getSeoulDate = () => {
  return dayjs().tz('Asia/Seoul').toDate();
};
