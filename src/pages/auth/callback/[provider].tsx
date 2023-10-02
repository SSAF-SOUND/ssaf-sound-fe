import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { FullPageLoader , loaderText } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import DelayedRedirection from '~/components/DelayedRedirection';
import { useSignIn } from '~/services/auth';
import { oauthProviders } from '~/services/auth/utils';
import { createNoIndexPageMetaData, handleAxiosError } from '~/utils';
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

  useEffect(() => {
    if (!code) return;

    const handleSignIn = async () => {
      try {
        await signIn({ code, oauthName: provider });
        router.replace(routes.root());
      } catch (err) {
        handleAxiosError(err);
        router.replace(routes.signIn());
      }
    };

    handleSignIn();
  }, [code, provider, router, signIn]);

  if (!code) {
    return (
      <DelayedRedirection to={routes.signIn()} shouldReplace={true} seconds={3}>
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
