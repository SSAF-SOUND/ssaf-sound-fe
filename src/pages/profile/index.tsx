import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { DefaultFullPageLoader } from '~/components/Common';
import { useMyInfo } from '~/services/member';
import { routes } from '~/utils';

const loaderText = '유저 정보를 확인하는 중입니다.';

const ProfileRootPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();

  useEffect(() => {
    if (!myInfo) {
      router.replace(routes.main());
      return;
    }

    router.replace(routes.profile.detail(myInfo.memberId));
  }, [myInfo, router]);

  return <DefaultFullPageLoader text={loaderText} />;
};

export default ProfileRootPage;
ProfileRootPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText} />,
  unauthorized: routes.unauthorized(),
};
