import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

interface ViewNumberProps {
  view: number;
}

export const ViewNumber = (props: ViewNumberProps) => {
  return <span css={selfCss}>조회수 {props.view}</span>;
};

const selfCss = css(fontCss.family.auto, fontCss.style.R12, {
  color: palettes.font.blueGrey,
});
