import { css } from '@emotion/react';
import * as Sentry from '@sentry/nextjs';
import { isAxiosError } from 'axios';

import { SsafyIcon, TrackSize } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';
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
          <SsafyIcon.Track size={TrackSize.LG2} />
          <p css={errorMessageCss}>포트폴리오 조회 권한이 없습니다</p>
        </div>
      );
    }
  }

  if (!isDevMode) {
    Sentry.captureException(error);
  }

  return (
    <div css={selfCss}>
      <p css={errorMessageCss}>포트폴리오 조회중 오류가 발생했습니다</p>
    </div>
  );
};

const selfCss = css({ minHeight: 400 }, flex('center', 'center', 'column', 32));

const errorMessageCss = css(
  {
    color: palettes.primary.default,
  },
  fontCss.style.B16
);

export default PortfolioError;
