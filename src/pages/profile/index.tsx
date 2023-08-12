import { useRouter } from 'next/router';

import { DefaultFullPageLoader, loaderText } from '~/components/Common';
import { useMyInfo } from '~/services/member';
import { customToast, routes } from '~/utils';

const ProfileRootPage = () => {
  const router = useRouter();
  const { data: myInfo, isLoading } = useMyInfo();

  if (isLoading) {
    return <DefaultFullPageLoader text={loaderText.checkUser} />;
  }

  if (!myInfo) {
    customToast.clientError(
      '유저 정보를 찾을 수 없습니다. 로그인 여부를 확인해주세요.'
    );
    router.replace(routes.main());
  }

  if (myInfo) {
    router.replace(routes.profile.detail(myInfo.memberId));
  }

  return <DefaultFullPageLoader text={loaderText.checkUser} />;
};

export default ProfileRootPage;
