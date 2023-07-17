import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import type { NextPage } from 'next/types';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { DefaultFullPageLoader } from '~/components/Common';
import { useSignIn } from '~/services/auth';
import { customToast, handleAxiosError } from '~/utils';
import { routes } from '~/utils/routes';

interface QueryParams {
  code: string;
  provider: string;
}

const CallbackPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { provider } = props;

  const router = useRouter();
  const queryParams = router.query as unknown as QueryParams;

  const { code } = queryParams;
  const { mutate: signIn } = useSignIn();

  useEffect(() => {
    if (!code) return;

    signIn(
      { code, oauthName: provider },
      {
        onSuccess: () => {
          router.replace(routes.root());
        },
        onError: (error) => {
          handleAxiosError(error, {
            onClientError: (response) => {
              customToast.clientError(response.message);
            },
          });
          router.replace(routes.signIn());
        },
      }
    );
  }, [code, provider, router, signIn]);

  return <DefaultFullPageLoader text="로그인 중입니다." />;
};

export default CallbackPage;

type Props = { provider: string };
type Params = Props;
export const getStaticProps: GetStaticProps<Props, Params> = (context) => {
  const provider = context.params?.provider || '';

  return {
    props: {
      provider,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const providers = ['google', 'github', 'kakao', 'apple'];
  const paths = providers.map((provider) => {
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
