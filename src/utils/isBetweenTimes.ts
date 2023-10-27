import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const isBetweenTimes = (
  target: dayjs.ConfigType,
  [start, end]: [dayjs.ConfigType, dayjs.ConfigType],
  rangeString: '()' | '[]' | '(]' | '[)',
  opUnitType: dayjs.OpUnitType = 's'
) => {
  return dayjs(target).isBetween(start, end, opUnitType, rangeString);
};
