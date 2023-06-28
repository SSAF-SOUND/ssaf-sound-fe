import type { GetServerSideProps } from 'next/types';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { BounceLoader } from 'react-spinners';

import TopBar from 'src/components/TopBar';
import { DefaultFullPageLoader } from '~/components/Common';
import Counter from '~/components/Counter';
import TitleBar from '~/components/TitleBar';
import { prefetch } from '~/react-query/server/prefetch';
import { useMyAccountStatus, useMyInfo } from '~/services/member';
import { flex, palettes } from '~/styles/utils';
import { webStorage } from '~/utils/webStorage';

const HomePage = () => {
  const router = useRouter();
  const { isFetching, data } = useMyInfo({ retry: 1 });
  const { isRegisterRequired, isChecking } = useMyAccountStatus();
  const returnPage = webStorage.getReturnPage();

  if (isFetching) {
    return <DefaultFullPageLoader text="유저 정보를 가져오는 중입니다." />;
  }

  // User Register가 필요한 경우에는 <Background />에서 Register 페이지로 리다이렉션을 트리거합니다.
  if (!isRegisterRequired) {
    router.replace(returnPage);
  }

  return <DefaultFullPageLoader text="유저 정보를 가져오는 중입니다." />;
};

export default HomePage;
