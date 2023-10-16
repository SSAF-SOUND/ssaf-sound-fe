import { css } from '@emotion/react';
import * as Sentry from '@sentry/nextjs';
import { isAxiosError } from 'axios';

import { TrackSize } from '~/components/Common/SsafyIcon';
import { ErrorMessageWithSsafyIcon } from '~/components/ErrorMessageWithSsafyIcon';
import { flex } from '~/styles/utils';
import { getErrorResponse, isDevMode } from '~/utils';

interface PortfolioErrorProps {
  error: unknown;
}

const PortfolioError = (props: PortfolioErrorProps) => {
  const { error } = props;

  if (!isAxiosError(error) && !isDevMode) {
    Sentry.captureException(error);
  }

  const errorResponse = getErrorResponse(error);
  const errorMessage =
    errorResponse?.message ?? '포트폴리오 로딩 중 오류가 발생했습니다.';

  return (
    <div css={selfCss}>
      <ErrorMessageWithSsafyIcon
        message={errorMessage}
        iconSize={TrackSize.LG2}
      />
    </div>
  );
};

const selfCss = css({ minHeight: 400 }, flex('center', 'center', 'column', 32));

export default PortfolioError;
