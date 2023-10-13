import { css } from '@emotion/react';

import { PreviewErrorCard } from '~/components/PreviewErrorCard';
import { flex, fontCss } from '~/styles/utils';
import { getErrorResponse, ResponseCode } from '~/utils';

interface LunchMenusPreviewErrorProps {
  error: unknown;
  className?: string;
}

export const LunchMenusPreviewError = (props: LunchMenusPreviewErrorProps) => {
  const { error, className } = props;
  const errorResponse = getErrorResponse(error);
  const errorCode = errorResponse?.code;
  const invalidLunchDate = errorCode === ResponseCode.INVALID_LUNCH_DATE;

  if (invalidLunchDate) {
    return (
      <div css={invalidLunchDateCss} className={className}>
        {errorResponse?.message}
      </div>
    );
  }

  return <PreviewErrorCard className={className} />;
};

const invalidLunchDateCss = css(
  { width: '100%' },
  flex('center', 'center'),
  fontCss.style.B14
);
