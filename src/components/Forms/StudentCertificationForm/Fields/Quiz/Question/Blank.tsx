import { css } from '@emotion/react';

import { palettes } from '~/styles/utils';

interface BlankProps {
  length: number;
  isAlphabet?: boolean;
}

const Blank = (props: BlankProps) => {
  const { length, isAlphabet } = props;
  return (
    <strong css={[selfCss, isAlphabet && isAlphabetCss]}>
      {'O'.repeat(length)}
    </strong>
  );
};

export default Blank;

const selfCss = css({ color: palettes.primary.default });
const isAlphabetCss = css({ color: palettes.secondary.default });
