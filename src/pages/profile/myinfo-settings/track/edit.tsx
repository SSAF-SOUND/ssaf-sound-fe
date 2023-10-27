import type { CustomNextPage } from 'next/types';
import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';
import type { SsafyTrack } from '~/services/member';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';

import { BreadCrumbs } from '~/components/BreadCrumbs';
import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import {
  CertificationState,
  useMyInfo,
  useSetMyInfo,
  useUpdateTrack,
} from '~/services/member';
import { flex, pageCss, titleBarHeight } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  customToast,
  handleAxiosError,
  routes,
} from '~/utils';
import { EditableMyInfoFields } from '~/utils/client-routes/profile';

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
    return <FullPageLoader />;
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

      <main css={selfCss}>
        <MyInfoEditForm
          css={formCss}
          field="track"
          defaultValues={{
            track: myInfo.ssafyInfo.majorTrack as string,
          }}
          onValidSubmit={onValidSubmit}
          options={{
            titleBarFooter: (
              <BreadCrumbs
                entries={[
                  { name: '프로필', link: routes.profile.self() },
                  {
                    name: '내 정보 설정',
                    link: routes.profile.myInfoSettings(),
                  },
                  {
                    name: 'SSAFY 트랙',
                    link: routes.profile.edit.myInfo(
                      EditableMyInfoFields.TRACK
                    ),
                    active: true,
                  },
                ]}
              />
            ),
          }}
        />
      </main>

      <Footer />
    </>
  );
};
export default MyInfoSettingsTrackEditPage;
MyInfoSettingsTrackEditPage.auth = createAuthGuard();
MyInfoSettingsTrackEditPage.meta = createNoIndexPageMetaData(metaTitle);

const selfCss = css(
  { padding: `${titleBarHeight}px 0` },
  pageCss.minHeight,
  flex()
);

const formCss = css({ flexGrow: 1, padding: '60px 0 30px' });
