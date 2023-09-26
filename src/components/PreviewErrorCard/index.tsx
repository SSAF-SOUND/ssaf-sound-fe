import { css } from '@emotion/react';

import { AlertText, Button } from '~/components/Common';
import { flex, palettes } from '~/styles/utils';

interface PreviewErrorCardProps {
  className?: string;
  withRetryButton?: boolean;
  onClickRetry?: () => void;
  errorMessage?: string;
}

export const PreviewErrorCard = (props: PreviewErrorCardProps) => {
  const {
    className,
    onClickRetry,
    withRetryButton = false,
    errorMessage = '오류가 발생했습니다.',
  } = props;
  return (
    <div css={selfCss} className={className}>
      <AlertText css={{ marginBottom: 12 }} size="sm">
        {errorMessage}
      </AlertText>
      {withRetryButton && (
        <Button
          theme="error"
          css={{ width: 130, color: palettes.white }}
          onClick={onClickRetry}
        >
          재시도
        </Button>
      )}
    </div>
  );
};

const selfCss = css(
  { width: '100%', height: 140, textAlign: 'center', whiteSpace: 'pre-wrap' },
  flex('center', 'center')
);
