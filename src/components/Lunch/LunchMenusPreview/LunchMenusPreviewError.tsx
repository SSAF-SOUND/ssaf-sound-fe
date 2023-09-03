import { css } from '@emotion/react';

import { PreviewErrorCard } from '~/components/PreviewErrorCard';
import { flex, fontCss } from '~/styles/utils';
import { getErrorResponse, ResponseCode } from '~/utils';

interface LunchMenusPreviewErrorProps {
  error: unknown;
  onClickRetry: () => void;
}

export const LunchMenusPreviewError = (props: LunchMenusPreviewErrorProps) => {
  const { error, onClickRetry } = props;
  const errorResponse = getErrorResponse(error);
  const errorCode = errorResponse?.code;
  const invalidLunchDate = errorCode === ResponseCode.INVALID_LUNCH_DATE;

  if (invalidLunchDate) {
    return <div css={invalidLunchDateCss}>{errorResponse?.message}</div>;
  }

  return <PreviewErrorCard onClickRetry={onClickRetry} />;
};

const invalidLunchDateCss = css(
  { width: '100%', height: 140 },
  flex('center', 'center'),
  fontCss.style.B14
);
