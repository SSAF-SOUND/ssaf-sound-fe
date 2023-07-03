import type { CalendarProps } from 'react-calendar';

import { css } from '@emotion/react';
import { Calendar } from 'react-calendar';

import { Icon, IconButton } from '~/components/Common';
import {
  colorMix,
  flex,
  fontCss,
  inlineFlex,
  palettes,
  themeColorVars,
} from '~/styles/utils';

import cn from './classnames';

interface DatePickerProps {
  theme?: 'primary' | 'secondary';
  value?: CalendarProps['value'];
  onChange?: CalendarProps['onChange'];
}

/* constants */
const tileSize = 44;
const navigationHeight = 44;
const formatDay: CalendarProps['formatDay'] = (locale, date) =>
  date.getDate().toString();

const DatePicker = (props: DatePickerProps) => {
  const { theme = 'primary', ...restProps } = props;

  return (
    <div data-theme={theme} css={selfCss}>
      <Calendar
        css={datePickerCss}
        {...restProps}
        calendarType="US"
        nextLabel={
          <IconButton size={34} theme={theme} asChild>
            <div>
              <Icon size={24} name="chevron.right" />
            </div>
          </IconButton>
        }
        prevLabel={
          <IconButton size={34} theme={theme} asChild>
            <div>
              <Icon size={24} name="chevron.left" />
            </div>
          </IconButton>
        }
        next2Label={null}
        prev2Label={null}
        formatDay={formatDay}
        minDate={new Date()}
      />
    </div>
  );
};

export default DatePicker;

const selfCss = css(inlineFlex('center', 'center'));

const navigationLabelCss = css(
  {
    flexGrow: `0 !important`,
    marginRight: 'auto',
    cursor: 'pointer',
    color: themeColorVars.mainDarkColor.var,
    order: 1,
    textAlign: 'left',
  },
  fontCss.style.B18
);

const navigationCss = css(
  {
    padding: '0 8px',
    height: navigationHeight,
    marginBottom: 4,
    gap: 10,
    [`& .${cn.navigationLabel}`]: navigationLabelCss,
    [`& .${cn.navigationArrow}`]: [
      { borderRadius: '50%' },
      inlineFlex('center', 'center'),
    ],
    [`& .${cn.navigationPrevArrow}`]: { order: 2 },
    [`& .${cn.navigationNextArrow}`]: { order: 3 },
  },
  flex('center', '', 'row')
);

const monthViewWeekdayContainerCss = css(
  {
    color: palettes.grey3,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 10,
    '& abbr': {
      textDecoration: 'none',
    },
  },
  fontCss.style.B14
);

const monthViewTileContainerCss = css({
  gap: 4,
  justifyContent: 'center',
});

const monthViewTileCss = css(
  {
    backgroundColor: palettes.white,
    cursor: 'pointer',
    padding: 0,
    width: tileSize,
    height: tileSize,
    borderRadius: '50%',
    flex: 'unset !important',
    color: palettes.font.grey,
    transition: 'background-color 200ms',
    ':hover, :focus-visible': {
      backgroundColor: colorMix('20%', themeColorVars.mainColor.var),
    },
    [`:active, &.${cn.tileSelected}`]: {
      backgroundColor: colorMix('20%', themeColorVars.mainDarkColor.var),
    },
    [`&.${cn.tileSelected}`]: {
      color: themeColorVars.mainDarkColor.var,
    },
    ':disabled': {
      pointerEvents: 'none',
      userSelect: 'none',
      color: palettes.font.lightGrey,
    },
  },
  fontCss.style.R18
);

const monthViewNeighboringTileCss = css({
  color: palettes.grey3,
});

const datePickerCss = css({
  background: palettes.white,
  width: 350,
  // minHeight: 382,
  padding: 8,
  borderRadius: 12,
  '& button': {
    padding: 0,
    cursor: 'pointer',
    backgroundColor: palettes.white,
  },
  [`& .${cn.navigation}`]: navigationCss,
  [`& .${cn.monthViewWeekdayContainer}`]: monthViewWeekdayContainerCss,
  [`& .${cn.monthViewTileContainer}`]: monthViewTileContainerCss,
  [`& .${cn.monthViewTile}`]: monthViewTileCss,
  [`& .${cn.monthViewNeighboringTile}`]: monthViewNeighboringTileCss,
});
