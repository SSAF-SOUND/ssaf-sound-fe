import { css } from '@emotion/react';
import { BounceLoader } from 'react-spinners';

import { flex, fontCss, pageCss, palettes } from '~/styles/utils';

interface FullPageLoaderProps {
  text?: string;
}

export const FullPageLoader = (props: FullPageLoaderProps) => {
  const { text = '' } = props;
  return (
    <div css={selfCss}>
      <BounceLoader color={palettes.white} />
      <p css={textCss}>{text}</p>
    </div>
  );
};

const selfCss = css(
  {
    width: '100%',
    height: '100vh',
  },
  pageCss.minHeight,
  flex('center', 'center', 'column', 20)
);

const textCss = css(fontCss.family.auto);

export const loaderText = {
  checkUser: '유저 정보를 확인중입니다.',
  loadingData: '데이터를 로딩중입니다.',
} as const;
