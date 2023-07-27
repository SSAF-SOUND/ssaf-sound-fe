import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { DefaultFullPageLoader } from '~/components/Common';
import { useMyInfo } from '~/services/member';
import { customToast, routes } from '~/utils';

const ProfileRootPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();


  useEffect(() => {
    if (!myInfo) {
      customToast.clientError(
        '유저 정보를 찾을 수 없습니다. 로그인 여부를 확인해주세요.'
      );
      router.replace(routes.main());
      return;
    }

    router.replace(routes.profile.detail(myInfo.memberId));
  }, [myInfo, router]);

  return <DefaultFullPageLoader text="유저 정보를 확인하는 중입니다." />;
};

export default ProfileRootPage;
