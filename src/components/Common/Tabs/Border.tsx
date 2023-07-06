import { css } from '@emotion/react';

import { palettes } from '~/styles/utils';

const Border = () => {
  return <div css={selfCss} />;
};

const selfCss = css({
  position: 'absolute',
  bottom: 0,
  height: 2,
  width: '100%',
  backgroundColor: palettes.font.blueGrey,
  zIndex: 1,
});

export default Border;
