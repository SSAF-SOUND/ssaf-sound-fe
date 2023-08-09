import type { CSSProperties } from 'react';

import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

interface ErrorCardProps {
  className?: string;
  style?: CSSProperties;
  onClickRetry?: () => void;
}

const ErrorCard = (props: ErrorCardProps) => {
  const { onClickRetry, ...restProps } = props;
  return (
    <div css={selfCss} {...restProps}>
      <p>데이터 로딩중 문제가 발생했습니다</p>
      <p css={{ marginBottom: 20 }}>잠시 후 다시 시도해주세요</p>
      <Button onClick={onClickRetry} theme="error" style={{ color: 'white' }}>
        재시도
      </Button>
    </div>
  );
};

export default ErrorCard;

const selfCss = css(
  {
    width: '100%',
    minHeight: 160,
    backgroundColor: palettes.background.grey,
    borderRadius: 16,
  },
  flex('center', 'center'),
  fontCss.style.R18
);
