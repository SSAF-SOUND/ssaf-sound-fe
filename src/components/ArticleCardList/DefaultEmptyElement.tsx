import { css } from '@emotion/react';

import { position } from '~/styles/utils';

const DefaultEmptyElement = () => {
  return <div css={selfCss}>아직 게시글이 없습니다.</div>;
};

export default DefaultEmptyElement;
const selfCss = css(position.xy('center', 'center', 'absolute'));
