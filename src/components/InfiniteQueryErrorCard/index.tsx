import type { CSSProperties } from 'react';

import { css } from '@emotion/react';

import { Button, SsafyIcon, TrackSize } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

interface ErrorCardProps {
  className?: string;
  style?: CSSProperties;
  onClickRetry?: () => void;
  isLoading?: boolean;
  buttonText?: string;
}

export const InfiniteQueryErrorCard = (props: ErrorCardProps) => {
  const {
    onClickRetry,
    isLoading = false,
    buttonText = '재시도',
    ...restProps
  } = props;
  return (
    <div css={selfCss} {...restProps}>
      <div css={flex('center', 'center', 'column')}>
        <p>데이터 로딩중 문제가 발생했습니다</p>
        <p>잠시 후 다시 시도해주세요</p>
      </div>
      <SsafyIcon.Track size={TrackSize.LG1} />
      <Button
        onClick={onClickRetry}
        variant="filled"
        theme="error"
        style={{ color: 'white', width: 180 }}
        loading={isLoading}
        size="sm"
      >
        {buttonText}
      </Button>
    </div>
  );
};

const selfCss = css(
  {
    width: '100%',
    padding: '60px 0',
    minHeight: 130,
    backgroundColor: palettes.background.grey,
    borderRadius: 16,
  },
  flex('center', 'center', 'column', 48),
  fontCss.style.R14
);
