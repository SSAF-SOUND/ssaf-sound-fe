import { useRouter } from 'next/router';

import { DefaultFullPageLoader } from '~/components/Common';
import { useMyAccountStatus, useMyInfo } from '~/services/member';
import { webStorage } from '~/utils/webStorage';

const HomePage = () => {
  const router = useRouter();
  const { isFetching } = useMyInfo({ retry: 1 });
  const { isRegisterRequired } = useMyAccountStatus();
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
