import { css } from '@emotion/react';
import * as Sentry from '@sentry/nextjs';
import { isAxiosError } from 'axios';

import { AlertText } from '~/components/Common/AlertText';
import { TrackSize } from '~/components/Common/SsafyIcon';
import { ErrorMessageWithSsafyIcon } from '~/components/ErrorMessageWithSsafyIcon';
import { flex } from '~/styles/utils';
import { getErrorResponse, isDevMode, ResponseCode } from '~/utils';

interface PortfolioErrorProps {
  error: unknown;
}

const PortfolioError = (props: PortfolioErrorProps) => {
  const { error } = props;

  if (isAxiosError(error)) {
    const errorResponse = getErrorResponse(error);
    const code = errorResponse?.code;

    // 비공개인 경우
    if (code === ResponseCode.NO_PERMISSIONS) {
      return (
        <div css={selfCss}>
          <ErrorMessageWithSsafyIcon
            message="포트폴리오 조회 권한이 없습니다"
            iconSize={TrackSize.LG2}
          />
        </div>
      );
    }
  }

  if (!isDevMode) {
    Sentry.captureException(error);
  }

  return (
    <div css={selfCss}>
      <AlertText size="md">포트폴리오 조회중 오류가 발생했습니다</AlertText>
    </div>
  );
};

const selfCss = css({ minHeight: 400 }, flex('center', 'center', 'column', 32));

export default PortfolioError;
