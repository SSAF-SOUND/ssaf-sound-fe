import type { CustomNextPage } from 'next/types';
import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';
import type { SsafyTrack } from '~/services/member';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';

import { DefaultFullPageLoader } from '~/components/Common';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import {
  CertificationState,
  useMyInfo,
  useSetMyInfo,
  useUpdateTrack,
} from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import { handleAxiosError, routes } from '~/utils';

const MyInfoSettingsTrackEditPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const setMyInfo = useSetMyInfo();
  const { mutateAsync: updateTrack } = useUpdateTrack();

  if (
    !myInfo ||
    !myInfo.ssafyInfo ||
    myInfo.ssafyInfo.certificationState !== CertificationState.CERTIFIED
  ) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  const onValidSubmit: MyInfoEditFormProps['onValidSubmit'] = async (value) => {
    const newTrack = value.track;
    try {
      await updateTrack({ track: newTrack });

      setMyInfo(
        produce(myInfo, (draft) => {
          draft.ssafyInfo.majorTrack = newTrack as SsafyTrack;
        })
      );

      await router.push(routes.profile.myInfoSettings());
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <div css={selfCss}>
      <MyInfoEditForm
        css={formCss}
        field="track"
        defaultValues={{
          track: myInfo.ssafyInfo.majorTrack,
        }}
        onValidSubmit={onValidSubmit}
        options={{
          titleBarBackwardRoute: routes.profile.myInfoSettings(),
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
