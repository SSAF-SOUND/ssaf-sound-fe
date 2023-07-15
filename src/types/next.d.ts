import type { AppProps } from 'next/app';
import type { NextPage, NextComponentType, NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import type { UserRole } from '~/services/member';

type NextPageConfig = {
  auth: {
    /**
     * - 페이지에 접근하기 위한 유저의 최소 권한입니다.
     * - 명시한 `role`보다 낮은 권한을 가진 유저는 페이지를 볼 수 없습니다.
     */
    role: UserRole;
    /**
     * - 유저 정보를 fetch하는 중에 보여줄 UI입니다.
     */
    loading?: ReactElement;
    /**
     * - 권한이 없는 유저에게 보여줄 UI이거나, 리다이렉트 시킬 url입니다.
     */
    unauthorized: ReactElement | string;
  };

  navigation: boolean;
};

declare module 'next/types' {
  export type NextPageAuthConfig = NextPageConfig['auth'];
  export type NextPageNavigationConfig = NextPageConfig['navigation'];

  // eslint-disable-next-line
  export type CustomNextPage<Props = {}, InitialProps = Props> = NextPage<
    Props,
    InitialProps
  > &
    Partial<NextPageConfig>;
}

declare module 'next/app' {
  // eslint-disable-next-line
  export type CustomAppProps<P = any> = AppProps<P> & {
    // eslint-disable-next-line
    Component: NextComponentType<NextPageContext, any, any> &
      Partial<NextPageConfig>;
  };
}
