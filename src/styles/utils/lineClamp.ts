import { css } from '@emotion/react';

export const lineClamp = (line: number) => {
  return css({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: `${line.toString()}`,
    overflow: 'hidden',
  });
};
