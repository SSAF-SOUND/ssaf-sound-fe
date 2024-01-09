import type { AppProps } from 'next/app';
import type { NextPage, NextComponentType, NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import type { PageHeadProps } from '~/components/Common/PageHead';
import type { MainLayoutProps } from '~/components/Layout/MainLayout';
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

  /**
   * - 메타 태그가 서버 사이드에서 pre-render 되지 않는 경우에만 이 프로퍼티를 사용합니다.
   * - 페이지 컴포넌트 내부에서 메타 태그를 사용한다면 이 프로퍼티를 사용하면 안됩니다. (여러개의 메타 태그가 렌더링 되기 때문)
   */
  meta: PageHeadProps;

  mainLayoutStyle: MainLayoutProps['style'];
};

declare module 'next/types' {
  export type NextPageAuthConfig = NextPageConfig['auth'];

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
