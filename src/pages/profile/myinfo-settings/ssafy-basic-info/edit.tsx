import type { CustomNextPage } from 'next/types';
import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';
import { isBoolean } from 'is-what';

import { BreadCrumbs } from '~/components/BreadCrumbs';
import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import {
  CertificationState,
  useMyInfo,
  useSetMyInfo,
  useUpdateSsafyBasicInfo,
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

const metaTitle = 'SSAFY 기본 정보 수정';

const MyInfoSettingsSsafyBasicInfoEditPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const { mutateAsync: updateSsafyBasicInfo } = useUpdateSsafyBasicInfo();
  const setMyInfo = useSetMyInfo();
  const isCertified =
    myInfo?.ssafyInfo?.certificationState === CertificationState.CERTIFIED;

  if (!myInfo || !isBoolean(myInfo.ssafyMember)) {
    router.replace(routes.unauthorized());
    return <FullPageLoader />;
  }

  const onValidSubmit: MyInfoEditFormProps['onValidSubmit'] = async (
    reset,
    formValues
  ) => {
    const newSsafyBasicInfo = formValues.ssafyBasicInfo;

    try {
      await updateSsafyBasicInfo(newSsafyBasicInfo);

      setMyInfo(
        produce(myInfo, (draft) => {
          draft.ssafyMember = newSsafyBasicInfo.ssafyMember;

          if (draft.ssafyMember) {
            draft.ssafyInfo = {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              certificationState: CertificationState.UNCERTIFIED,
              majorTrack: null,
              ...draft.ssafyInfo,
              campus: newSsafyBasicInfo.campus,
              semester: newSsafyBasicInfo.year,
            };
          } else {
            delete draft.ssafyInfo;
          }
        })
      );

      reset({
        ssafyBasicInfo: newSsafyBasicInfo,
      });
      customToast.success('SSAFY 기본정보가 변경되었습니다.');
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const onInvalidSubmit: MyInfoEditFormProps['onInvalidSubmit'] = (errors) => {
    const { ssafyBasicInfo: { campus, ssafyMember, year } = {} } = errors;

    const message = ssafyMember?.message || campus?.message || year?.message;
    customToast.clientError(message || '유효하지 않은 입력입니다.');
  };

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <main css={selfCss}>
        <MyInfoEditForm
          css={formCss}
          field="ssafyBasicInfo"
          defaultValues={{
            ssafyBasicInfo: {
              campus: myInfo.ssafyInfo?.campus,
              year: myInfo.ssafyInfo?.semester,
              ssafyMember: myInfo.ssafyMember,
            },
          }}
          onValidSubmit={onValidSubmit}
          onInvalidSubmit={onInvalidSubmit}
          options={{
            forceSsafyMemberToTrue: isCertified,
            titleBarFooter: (
              <BreadCrumbs
                entries={[
                  { name: '프로필', link: routes.profile.self() },
                  {
                    name: '내 정보 설정',
                    link: routes.profile.myInfoSettings(),
                  },
                  {
                    name: 'SSAFY 기본정보',
                    link: routes.profile.edit.myInfo(
                      EditableMyInfoFields.SSAFY_BASIC_INFO
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
export default MyInfoSettingsSsafyBasicInfoEditPage;
MyInfoSettingsSsafyBasicInfoEditPage.auth = createAuthGuard();
MyInfoSettingsSsafyBasicInfoEditPage.meta =
  createNoIndexPageMetaData(metaTitle);

const selfCss = css(
  { padding: `${titleBarHeight}px 0` },
  pageCss.minHeight,
  flex()
);

const formCss = css({ flexGrow: 1, padding: '60px 0 30px' });
