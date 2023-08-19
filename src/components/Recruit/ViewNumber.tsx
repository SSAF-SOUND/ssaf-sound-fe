import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

interface ViewNumberProps {
  view: number;
  className?: string;
}

export const ViewNumber = (props: ViewNumberProps) => {
  const { view, ...restProps } = props;
  return (
    <span css={selfCss} {...restProps}>
      조회수 {view}
    </span>
  );
};

const selfCss = css(fontCss.family.auto, fontCss.style.R12, {
  color: palettes.font.blueGrey,
});
