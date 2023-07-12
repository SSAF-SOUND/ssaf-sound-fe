import { css } from '@emotion/react';

import { palettes } from '~/styles/utils';

interface BlankProps {
  length: number;
}

const Blank = (props: BlankProps) => {
  const { length } = props;
  return <strong css={selfCss}>{'O'.repeat(length)}</strong>;
};

export default Blank;

const selfCss = css({ color: palettes.primary.default });
