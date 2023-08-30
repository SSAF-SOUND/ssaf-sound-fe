import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import { fontCss, palettes } from '~/styles/utils';

const getTodayDateStringInKorean = () => {
  return new Intl.DateTimeFormat('ko', { dateStyle: 'full' }).format(
    new Date()
  );
};

interface ClockProps {
  className?: string;
}

export const Clock = (props: ClockProps) => {
  const { className } = props;
  const [todayDateString, setTodayDateString] = useState(
    getTodayDateStringInKorean
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTodayDateString(getTodayDateStringInKorean());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div css={selfCss} className={className}>
      {todayDateString}
    </div>
  );
};

const selfCss = css(
  {
    padding: '12px 32px',
    border: `1px solid ${palettes.primary.default}`,
    borderRadius: 50,
  },
  fontCss.style.B24
);
