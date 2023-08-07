import * as Sentry from '@sentry/nextjs';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';

import RedirectionGuide from '~/components/RedirectionGuide';
import {
  getErrorResponse,
  isClientError,
  isDevMode,
  ResponseCode,
  routes,
} from '~/utils';

interface UserErrorProps {
  error: unknown;
}

const UserError = (props: UserErrorProps) => {
  const { error } = props;

  const code =
    error &&
    isAxiosError(error) &&
    isClientError(error) &&
    getErrorResponse(error)?.code;

  return code === ResponseCode.NOT_EXIST_USER ? (
    <NotExistUserError />
  ) : (
    <UnknownUserError error={error} />
  );
};

export default UserError;

const NotExistUserError = () => {
  return (
    <RedirectionGuide
      title="Error"
      description="유저 정보를 찾을 수 없습니다."
      redirectionText="메인 페이지로"
      redirectionTo={routes.main()}
    />
  );
};

interface UnknownUserErrorProps {
  error?: unknown;
}
const UnknownUserError = (props: UnknownUserErrorProps) => {
  const { error } = props;

  useEffect(() => {
    if (!isDevMode) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <RedirectionGuide
      title="Error"
      description="유저 정보를 불러오는 중, 오류가 발생했습니다."
      redirectionText="메인 페이지로"
      redirectionTo={routes.main()}
    />
  );
};
