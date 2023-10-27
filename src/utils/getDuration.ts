import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getDuration = (basis: dayjs.Dayjs, compared: dayjs.Dayjs) => {
  return dayjs.duration(dayjs(basis).diff(compared));
};
