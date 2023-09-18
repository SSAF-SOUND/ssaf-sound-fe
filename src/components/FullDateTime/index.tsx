import { css } from '@emotion/react';

import { Separator } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';
import { formatFullDateTime } from '~/utils';

export interface FullDateTimeProps {
  dateTimeString: string;
  separatorHeight?: number;
  separatorBackground?: string;
  suffix?: string;
  className?: string;
}

export const FullDateTime = (props: FullDateTimeProps) => {
  const {
    className,
    dateTimeString,
    separatorHeight = 12,
    separatorBackground = palettes.font.blueGrey,
    suffix,
  } = props;
  const { date, time } = formatFullDateTime(dateTimeString);
  return (
    <time dateTime={dateTimeString} css={selfCss} className={className}>
      <span>{date}</span>
      <Separator
        orientation="vertical"
        height={separatorHeight}
        backgroundColor={separatorBackground}
      />
      <span>{time}</span>
      {suffix && <span>{suffix}</span>}
    </time>
  );
};

const selfCss = css(
  fontCss.family.auto,
  fontCss.style.R12,
  { color: palettes.font.blueGrey },
  flex('center', 'flex-start', 'row', 6)
);
