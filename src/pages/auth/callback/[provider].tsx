import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { FullPageLoader, loaderText } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import DelayedRedirection from '~/components/DelayedRedirection';
import { useSignIn } from '~/services/auth';
import { oauthProviders } from '~/services/auth/utils';
import { useMyInfo } from '~/services/member';
import {
  createNoIndexPageMetaData,
  handleAxiosError,
  webStorage,
} from '~/utils';
import { routes } from '~/utils/routes';

const metaTitle = '유저정보 확인';

const CallbackPage: CustomNextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { provider } = props;

  const router = useRouter();
  const queryParams = router.query as Params;

  const { code } = queryParams;
  const { mutateAsync: signIn } = useSignIn();

  const [myInfoEnabled, setMyInfoEnabled] = useState(false);
  const { data: myInfo } = useMyInfo({ enabled: myInfoEnabled, retry: 1 });

  const redirectSignInReturnPage = async () => {
    const returnPage = webStorage.getSignInReturnPage();
    await router.replace(returnPage);
    webStorage.clearSignInReturnPage();
  };

  useEffect(() => {
    if (!code || !!myInfo) return;

    const handleSignIn = async () => {
      try {
        await signIn({ code, oauthName: provider });
        setMyInfoEnabled(true);
      } catch (err) {
        handleAxiosError(err);
        router.replace(routes.auth.signIn());
      }
    };

    handleSignIn();
  }, [code, provider, router, signIn, myInfo]);

  if (!!myInfo) {
    redirectSignInReturnPage();
  }

  if (!code) {
    return (
      <DelayedRedirection
        to={routes.auth.signIn()}
        shouldReplace={true}
        seconds={3}
      >
        <FullPageLoader text={loaderText.checkUser} />
      </DelayedRedirection>
    );
  }

  return (
    <>
      <PageHeadingText text={metaTitle} />
      <FullPageLoader text={loaderText.checkUser} />
    </>
  );
};

export default CallbackPage;
CallbackPage.meta = createNoIndexPageMetaData(metaTitle);

export const enum ParamsKey {
  PROVIDER = 'provider',
  CODE = 'code',
}
export type Props = Pick<Params, ParamsKey.PROVIDER>;
export type Params = {
  [ParamsKey.PROVIDER]: string;
  [ParamsKey.CODE]?: string;
};
export const getStaticProps: GetStaticProps<Props, Params> = (context) => {
  const provider = context.params?.provider || '';

  return {
    props: {
      provider,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = oauthProviders.map((provider) => {
    return {
      params: {
        provider,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
