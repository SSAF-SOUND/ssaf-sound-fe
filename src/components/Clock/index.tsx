import type dayjs from 'dayjs';

import { css } from '@emotion/react';
import { isServer } from '@tanstack/query-core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { VisuallyHidden } from '~/components/Common/VisuallyHidden';
import { flex, fontCss, palettes } from '~/styles/utils';
import { getDuration } from '~/utils/getDuration';
import { isBetweenTimes } from '~/utils/isBetweenTimes';
import { toMs } from '~/utils/toMs';
import { toSeoulDate } from '~/utils/toSeoulDate';

const getDayjsTime = (
  instance: dayjs.Dayjs,
  h: number,
  m: number,
  s: number
) => {
  return instance.set('h', h).set('m', m).set('s', s);
};

const get30MinutesBeforeCheckIn = (today: dayjs.Dayjs) => {
  return getDayjsTime(today, 8, 0, 0);
};
const getCheckInStart = (today: dayjs.Dayjs) => {
  return getDayjsTime(today, 8, 30, 0);
};
const getCheckInEnd = (today: dayjs.Dayjs) => {
  return getDayjsTime(today, 9, 0, 0);
};
const get30MinutesBeforeCheckOut = (today: dayjs.Dayjs) => {
  return getDayjsTime(today, 17, 30, 0);
};
const getCheckOutStart = (today: dayjs.Dayjs) => {
  return getDayjsTime(today, 18, 0, 0);
};
const getCheckOutEnd = (today: dayjs.Dayjs) => {
  return getDayjsTime(today, 18, 30, 0);
};

const CheckInOutStatus = {
  READY_TO_CHECK_IN: Symbol(),
  CHECK_IN: Symbol(),

  READY_TO_CHECK_OUT: Symbol(),
  CHECK_OUT: Symbol(),

  NORMAL: Symbol(),
} as const;

type CheckInOutInfo = {
  status: (typeof CheckInOutStatus)[keyof typeof CheckInOutStatus];
  diffDateString?: string;
};

const useCheckInOutInfo = (current: dayjs.Dayjs) => {
  const currentDateString = current.format('YY월 MM일 (ddd)');
  const memoKey = currentDateString;

  const before30MinutesCheckIn = useMemo(
    () => get30MinutesBeforeCheckIn(current),
    // eslint-disable-next-line
    [memoKey]
  );

  const checkInStart = useMemo(
    () => getCheckInStart(current),
    // eslint-disable-next-line
    [memoKey]
  );
  const checkInEnd = useMemo(
    () => getCheckInEnd(current),
    // eslint-disable-next-line
    [memoKey]
  );
  const before30MinutesCheckOut = useMemo(
    () => get30MinutesBeforeCheckOut(current),
    // eslint-disable-next-line
    [memoKey]
  );
  const checkOutStart = useMemo(
    () => getCheckOutStart(current),
    // eslint-disable-next-line
    [memoKey]
  );
  const checkOutEnd = useMemo(
    () => getCheckOutEnd(current),
    // eslint-disable-next-line
    [memoKey]
  );

  const getDiffDateString = (basis: dayjs.Dayjs, compared: dayjs.Dayjs) => {
    return getDuration(basis, compared).format('m분 ss초');
  };

  const getCheckInOutStatus = useCallback(
    (basis: dayjs.Dayjs): CheckInOutInfo => {
      if (isBetweenTimes(basis, [before30MinutesCheckIn, checkInStart], '[)')) {
        return {
          status: CheckInOutStatus.READY_TO_CHECK_IN,
          diffDateString: getDiffDateString(checkInStart, basis),
        };
      }

      if (isBetweenTimes(basis, [checkInStart, checkInEnd], '[)')) {
        return {
          status: CheckInOutStatus.CHECK_IN,
          diffDateString: getDiffDateString(checkInEnd, basis),
        };
      }

      if (
        isBetweenTimes(basis, [before30MinutesCheckOut, checkOutStart], '[)')
      ) {
        return {
          status: CheckInOutStatus.READY_TO_CHECK_OUT,
          diffDateString: getDiffDateString(checkOutStart, basis),
        };
      }

      if (isBetweenTimes(basis, [checkOutStart, checkOutEnd], '[)')) {
        return {
          status: CheckInOutStatus.CHECK_OUT,
          diffDateString: getDiffDateString(checkOutEnd, basis),
        };
      }

      return {
        status: CheckInOutStatus.NORMAL,
        diffDateString: undefined,
      };
    },

    [
      before30MinutesCheckIn,
      before30MinutesCheckOut,
      checkInEnd,
      checkInStart,
      checkOutEnd,
      checkOutStart,
    ]
  );

  return getCheckInOutStatus(current);
};

export interface TimeViewerProps {
  dateTime: Date;
  className?: string;
}

export const TimeViewer = (props: TimeViewerProps) => {
  const { dateTime, ...restProps } = props;
  const seoulDate = toSeoulDate(dateTime);
  const todayString = seoulDate.locale('ko').format('MM월 DD일 (ddd)');
  const formattedDateTimeString = seoulDate.format('hh:mm:ss');
  const checkInOutStatus = useCheckInOutInfo(seoulDate);

  return (
    <section css={selfCss} {...restProps}>
      <VisuallyHidden asChild>
        <h2>SSAFY 입실 및 퇴실 알림 시계</h2>
      </VisuallyHidden>

      <div css={dateTimeContainerCss}>
        <div css={todayCss}>{todayString} </div>
        <div css={timeCss}>{formattedDateTimeString}</div>
        <CheckInOutMessage info={checkInOutStatus} />
      </div>
    </section>
  );
};

export interface ClockProps {
  className?: string;
}

export const Clock = (props: ClockProps) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isClient, setIsClient] = useState(!isServer);

  useEffect(() => {
    if (isServer) {
      return;
    }

    setIsClient(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, toMs(1));

    return () => clearInterval(timer);
  }, [setCurrentDateTime]);

  return isClient ? (
    <TimeViewer {...props} dateTime={currentDateTime} />
  ) : (
    <Skeleton
      css={{
        height: 134,
        width: '100%',
        marginBottom: 32,
        borderRadius: 32,
        border: `1px solid ${palettes.primary.default}`,
      }}
      baseColor={palettes.background.grey}
      highlightColor={palettes.background.default}
    />
  );
};

interface CheckInOutMessageProps {
  info: CheckInOutInfo;
}
const CheckInOutMessage = (props: CheckInOutMessageProps) => {
  const { info } = props;
  const { diffDateString, status } = info;

  if (status === CheckInOutStatus.NORMAL) return null;

  return (
    <div css={messageCss}>
      {status === CheckInOutStatus.READY_TO_CHECK_IN ? (
        <span css={{ color: palettes.primary.default }}>
          입실 시작까지 {diffDateString}
        </span>
      ) : status === CheckInOutStatus.CHECK_IN ? (
        <span css={{ color: palettes.primary.dark }}>
          입실 종료까지 {diffDateString}
        </span>
      ) : status === CheckInOutStatus.READY_TO_CHECK_OUT ? (
        <span css={{ color: palettes.secondary.default }}>
          퇴실 시작까지 {diffDateString}
        </span>
      ) : status === CheckInOutStatus.CHECK_OUT ? (
        <span css={{ color: palettes.secondary.dark }}>
          퇴실 종료까지 {diffDateString}
        </span>
      ) : (
        <span>오류</span>
      )}
    </div>
  );
};

const selfCss = css(
  {
    padding: '16px 32px',
    border: `1px solid ${palettes.primary.default}`,
    borderRadius: 32,
  },
  fontCss.family.pretendard
);
const dateTimeContainerCss = css(
  { minHeight: 100 },
  flex('flex-start', 'center', 'column')
);
const todayCss = css(
  {
    color: palettes.grey4,
  },
  fontCss.style.R14
);
const timeCss = css(fontCss.style.B32);
const messageCss = css(fontCss.style.B16);
