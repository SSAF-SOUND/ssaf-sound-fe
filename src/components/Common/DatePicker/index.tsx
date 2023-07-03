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
}

const activeStartDate = Date.now();

/* constants */
const tileSize = 44;
const navigationHeight = 44;

const DatePicker = (props: DatePickerProps) => {
  const { theme = 'primary' } = props;

  return (
    <div data-theme={theme}>
      <Calendar
        css={selfCss}
        calendarType="US"
        nextLabel={
          <IconButton size={28} theme={theme} asChild>
            <div>
              <Icon size={24} name="chevron.right" />
            </div>
          </IconButton>
        }
        prevLabel={
          <IconButton size={28} theme={theme} asChild>
            <div>
              <Icon size={24} name="chevron.left" />
            </div>
          </IconButton>
        }
        next2Label={null}
        prev2Label={null}
        activeStartDate={new Date(activeStartDate)}
        formatDay={(locale, date) => date.getDate().toString()}
        onChange={(value) => console.log(value)}
      />
    </div>
  );
};

export default DatePicker;

const navigationCss = css(
  {
    padding: '0 6px',
    height: navigationHeight,
    marginBottom: 4,
    gap: 10,
    [`& .${cn.navigationLabel}`]: [
      fontCss.style.R18,
      {
        flexGrow: `0 !important`,
        marginRight: 'auto',
        cursor: 'pointer',
        color: themeColorVars.mainDarkColor.var,
        order: 1,
        textAlign: 'left',
      },
    ],
    [`& .${cn.navigationPrevArrow}`]: {
      order: 2,
    },
    [`& .${cn.navigationNextArrow}`]: {
      order: 3,
    },
  },
  flex('center', '', 'row')
);

const monthViewWeekdayContainerCss = css(
  {
    color: palettes.grey3,
    textAlign: 'center',
    marginBottom: 10,
    '& abbr': {
      textDecoration: 'none',
    },
  },
  fontCss.style.R14
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
  },
  fontCss.style.R18
);

const neighboringMonthTileCss = css({
  color: palettes.font.lightGrey,
});

const selfCss = css({
  background: palettes.white,
  width: 350,
  padding: 8,
  borderRadius: 12,
  '& button': {
    padding: 0,
    backgroundColor: palettes.white,
  },

  '& .react-calendar__navigation__label': {},

  [`& .${cn.navigationArrow}`]: inlineFlex('center', 'center'),
  [`& .${cn.navigation}`]: navigationCss,
  [`& .${cn.monthViewWeekdayContainer}`]: monthViewWeekdayContainerCss,
  [`& .${cn.monthViewTileContainer}`]: monthViewTileContainerCss,
  [`& .${cn.monthViewTile}`]: monthViewTileCss,
  [`& .${cn.monthViewNeighboringTile}`]: neighboringMonthTileCss,
});
