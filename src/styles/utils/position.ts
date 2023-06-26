import { css } from '@emotion/react';

type Align = 'center' | 'start' | 'end';
type Position = 'absolute' | 'fixed';

/**
 * - `position`과 `top`, `bottom`, `left`, `right`을 사용하여 위치를 결정하는 유틸리티입니다.
 *
 * @example
 *   position.x('center');
 *   position.y('center', 'fixed');
 *   position.xy('center', 'center');
 *   position.xy('center', 'start');
 *   position.xy('end', 'start');
 *   position.xy('end', 'end', 'fixed');
 */
export const position = {
  x: (align: Align, position: Position = 'absolute') => {
    return css(
      {
        position,
        transform: translate(translateValue[align]),
      },
      x[align]
    );
  },
  y: (align: Align, position: Position = 'absolute') => {
    return css(
      {
        position,
        transform: translate('0', translateValue[align]),
      },
      y[align]
    );
  },
  xy: (alignX: Align, alignY: Align, position: Position = 'absolute') => {
    return css(
      {
        position,
        transform: translate(translateValue[alignX], translateValue[alignY]),
      },
      x[alignX],
      y[alignY]
    );
  },
};

const x = {
  start: { left: 0 },
  center: { left: '50%' },
  end: { right: 0 },
};

const y = {
  start: { top: 0 },
  center: { top: '50%' },
  end: { bottom: 0 },
};

const translate = (x = '0', y = '0') => `translate3d(${x}, ${y}, 0)`;

const translateValue = {
  start: '0',
  end: '0',
  center: '-50%',
};
