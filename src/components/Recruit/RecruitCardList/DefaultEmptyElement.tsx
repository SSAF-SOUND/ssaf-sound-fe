import { css } from '@emotion/react';

import { position } from '~/styles/utils';

export const DefaultEmptyElement = () => {
  return <div css={selfCss}>아직 리쿠르팅이 없습니다.</div>;
};

const selfCss = css(position.xy('center', 'center', 'absolute'));
