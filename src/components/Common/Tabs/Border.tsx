import { css } from '@emotion/react';

import { palettes } from '~/styles/utils';

import { tabsZIndex } from './zIndex';

interface BorderProps {
  className?: string;
}

const Border = (props: BorderProps) => {
  return <div css={selfCss} {...props} />;
};

const selfCss = css({
  position: 'absolute',
  bottom: 0,
  height: 2,
  width: '100%',
  backgroundColor: palettes.font.blueGrey,
  zIndex: tabsZIndex.border,
});

export default Border;
