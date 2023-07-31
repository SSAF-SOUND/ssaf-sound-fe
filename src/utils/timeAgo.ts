import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale(ko.name, {
  relativeTime: {
    future: '%s 후', // 사용 X
    past: '%s 전',
    s: '방금',
    m: '1분',
    mm: '%d분',
    h: '1시간',
    hh: '%d시간',
    d: '1일',
    dd: '%d일',
    M: '1달',
    MM: '%d달',
    y: '1년',
    yy: '%d년',
  },
});

// const target = '2023-07-31T20:26:38.197Z';
// const s = '2023-07-31T20:26:40.199Z';
// const m = '2023-07-31T20:27:38.197Z';
// const mm = '2023-07-31T20:28:38.197Z';
// const h = '2023-07-31T21:26:38.197Z';
// const hh = '2023-07-31T23:26:38.197Z';
// const d = '2023-08-01T20:26:38.197Z';
// const dd = '2023-08-02T20:26:38.197Z';
// const M = '2023-09-01T20:26:38.197Z';
// const MM = '2023-10-01T20:26:38.197Z';
// const Y = '2024-10-01T20:26:38.197Z';
// const YY = '2090-10-01T20:26:38.197Z';
// console.log(dayjs(target).locale(ko).from(dayjs(s)));
// console.log(dayjs(s).locale(ko).from(dayjs(target)));
// console.log(dayjs(target).locale(ko).from(dayjs(m)));
// console.log(dayjs(target).locale(ko).from(dayjs(mm)));
// console.log(dayjs(target).locale(ko).from(dayjs(h)));
// console.log(dayjs(target).locale(ko).from(dayjs(hh)));
// console.log(dayjs(target).locale(ko).from(dayjs(d)));
// console.log(dayjs(target).locale(ko).from(dayjs(dd)));
// console.log(dayjs(target).locale(ko).from(dayjs(M)));
// console.log(dayjs(target).locale(ko).from(dayjs(MM)));
// console.log(dayjs(target).locale(ko).from(dayjs(Y)));
// console.log(dayjs(target).locale(ko).from(dayjs(YY)));

export const timeAgo = (date?: string | number | dayjs.Dayjs | Date | null) => {
  return dayjs(date).locale(ko).from(dayjs());
};
