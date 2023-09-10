import type { CustomNextPage } from 'next/types';
import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';
import type { SsafyTrack } from '~/services/member';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';

import { DefaultFullPageLoader, PageHeadingText } from '~/components/Common';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import {
  CertificationState,
  useMyInfo,
  useSetMyInfo,
  useUpdateTrack,
} from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import { customToast, handleAxiosError, routes } from '~/utils';

const metaTitle = '트랙 수정';

const MyInfoSettingsTrackEditPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const setMyInfo = useSetMyInfo();
  const { mutateAsync: updateTrack } = useUpdateTrack();

  const isUncertified =
    !myInfo ||
    !myInfo.ssafyInfo ||
    myInfo.ssafyInfo.certificationState !== CertificationState.CERTIFIED;

  if (isUncertified) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  const onValidSubmit: MyInfoEditFormProps['onValidSubmit'] = async (
    reset,
    value
  ) => {
    const newTrack = value.track;
    try {
      await updateTrack({ track: newTrack });

      setMyInfo(
        produce(myInfo, (draft) => {
          draft.ssafyInfo.majorTrack = newTrack as SsafyTrack;
        })
      );

      reset({ track: newTrack });
      customToast.success('트랙이 변경되었습니다.');
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <MyInfoEditForm
          css={formCss}
          field="track"
          defaultValues={{
            track: myInfo.ssafyInfo.majorTrack as string,
          }}
          onValidSubmit={onValidSubmit}
          options={{
            titleBarBackwardRoute: routes.profile.myInfoSettings(),
          }}
        />
      </div>
    </>
  );
};
export default MyInfoSettingsTrackEditPage;
MyInfoSettingsTrackEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};
MyInfoSettingsTrackEditPage.meta = {
  title: metaTitle,
  openGraph: { title: metaTitle },
  robots: { index: false, follow: false },
};

const selfCss = css(
  { padding: `${titleBarHeight}px 0`, height: '100vh' },
  flex()
);

const formCss = css({ flexGrow: 1, padding: '60px 0 30px' });
