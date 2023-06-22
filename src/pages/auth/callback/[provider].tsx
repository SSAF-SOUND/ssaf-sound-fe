import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import type { NextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { useEffect } from 'react';
import { BounceLoader } from 'react-spinners';

import { useSignIn } from '~/services/auth';
import { flex, palettes } from '~/styles/utils';

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
    signIn(
      { code, oauthName: provider },
      {
        onSuccess: () => {
          router.replace('/');
        },
        onError: () => {
          // TODO: ERROR MESSAGE 추가
          router.replace('/auth/sign-in');
        },
      }
    );
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div css={selfCss}>
        <BounceLoader color={palettes.white} />
        <p>로그인 중입니다</p>
      </div>
    </>
  );
};

export default CallbackPage;

const selfCss = css(
  { width: '100%', height: '100vh' },
  flex('center', 'center', 'column', 10)
);

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
