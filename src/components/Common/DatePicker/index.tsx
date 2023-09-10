import type { CalendarProps } from 'react-calendar';

import dynamic from 'next/dynamic';

import { css } from '@emotion/react';
import Skeleton from 'react-loading-skeleton';

import { Icon, IconButton } from '~/components/Common';
import {
  Theme,
  colorMix,
  flex,
  fontCss,
  inlineFlex,
  palettes,
  themeColorVars,
} from '~/styles/utils';

import cn from './classnames';

const Calendar = dynamic(
  () => import('react-calendar').then((mod) => mod.Calendar),
  {
    loading: () => (
      <Skeleton
        width={348}
        height={342}
        baseColor={palettes.white}
        borderRadius={12}
      />
    ),
    ssr: false,
  }
);

type CustomCalendarProps = Pick<
  CalendarProps,
  | 'value'
  | 'onChange'
  | 'minDate'
  | 'maxDate'
  | 'minDetail'
  | 'maxDetail'
  | 'defaultValue'
>;

interface DatePickerProps extends CustomCalendarProps {
  theme?: Theme.PRIMARY | Theme.SECONDARY;
}

/* constants */
const tileMinSize = 34;
const tileMaxSize = 44;
const navigationHeight = 44;

const formatDay: CalendarProps['formatDay'] = (locale, date) =>
  date.getDate().toString();

export const DatePicker = (props: DatePickerProps) => {
  const { theme = Theme.PRIMARY, ...restProps } = props;

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
      />
    </div>
  );
};

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
    paddingLeft: 8,
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
  display: 'grid !important',
  gridTemplateColumns: `repeat(7, max(${tileMinSize}px, min(10vw, ${tileMaxSize}px)))`,
  gridAutoRows: `max(${tileMinSize}px, min(10vw, ${tileMaxSize}px))`,
  alignItems: 'center',
  rowGap: 6,
  columnGap: 4,
});

const monthViewTileCss = css(
  {
    backgroundColor: palettes.white,
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    padding: 0,
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
