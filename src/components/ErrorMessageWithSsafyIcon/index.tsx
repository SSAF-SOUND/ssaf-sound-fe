import { css } from '@emotion/react';

import { AlertText, SsafyIcon, TrackSize } from '~/components/Common';
import { flex } from '~/styles/utils';
import { getErrorResponse } from '~/utils';

export interface ErrorMessageWithSsafyIconProps {
  error?: unknown;
  className?: string;
  message?: string;
  iconSize?: TrackSize;
  textSize?: 'sm' | 'md' | 'lg';
}

export const ErrorMessageWithSsafyIcon = (
  props: ErrorMessageWithSsafyIconProps
) => {
  const {
    error,
    message,
    className,
    iconSize = TrackSize.LG2,
    textSize,
  } = props;

  const errorResponse = getErrorResponse(error);
  const errorMessage = errorResponse?.message;
  const displayMessage = error ? errorMessage : message;

  return (
    <div css={selfCss} className={className}>
      <SsafyIcon.Track size={iconSize} />
      {displayMessage ? (
        <AlertText css={alertTextCss} size={textSize} bold>
          {displayMessage}
        </AlertText>
      ) : (
        <DefaultErrorMessage />
      )}
    </div>
  );
};

const selfCss = css(flex('center', 'center', 'column', 24));

const DefaultErrorMessage = () => (
  <div css={{ textAlign: 'center' }}>
    <AlertText>데이터 로딩중, 오류가 발생했습니다.</AlertText>
    <AlertText>잠시 후 다시 시도해주세요.</AlertText>
  </div>
);

const alertTextCss = css({ wordBreak: 'break-all' });
