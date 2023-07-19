import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { DefaultFullPageLoader } from '~/components/Common';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import { CertificationState, useMyInfo } from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import { routes } from '~/utils';

const MyInfoSettingsTrackEditPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();

  if (
    !myInfo ||
    myInfo.ssafyInfo?.certificationState !== CertificationState.CERTIFIED
  ) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  return (
    <div css={selfCss}>
      <MyInfoEditForm
        css={formCss}
        field="track"
        defaultValues={{
          track: myInfo.ssafyInfo.majorTrack,
        }}
        onValidSubmit={(v) => {
          console.log(v);
        }}
      />
    </div>
  );
};

MyInfoSettingsTrackEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};
export default MyInfoSettingsTrackEditPage;

const selfCss = css(
  { padding: `${titleBarHeight}px 15px`, height: '100vh' },
  flex()
);

const formCss = css({ flexGrow: 1, padding: '60px 0 30px' });
