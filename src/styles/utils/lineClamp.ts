import { css } from '@emotion/react';

export const lineClamp = (line: number) => {
  return css({
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': `${line.toString()}`,
    overflow: 'hidden',
  });
};
