import type { CustomNextPage } from 'next/types';
import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';
import { isBoolean } from 'is-what';

import {
  DefaultFullPageLoader,
  PageHead,
  PageHeadingText,
} from '~/components/Common';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import {
  CertificationState,
  useMyInfo,
  useSetMyInfo,
  useUpdateSsafyBasicInfo,
} from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import { customToast, handleAxiosError, routes } from '~/utils';

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
    return <DefaultFullPageLoader />;
  }

  const onValidSubmit: MyInfoEditFormProps['onValidSubmit'] = async (
    reset,
    value
  ) => {
    const newSsafyBasicInfo = value.ssafyBasicInfo;
    // eslint-disable-next-line
    const { year: _, ...restNewSsafyBasicInfo } = value.ssafyBasicInfo;

    try {
      await updateSsafyBasicInfo({
        ...restNewSsafyBasicInfo,
        semester: newSsafyBasicInfo.year,
      });

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
      <PageHead title={metaTitle} robots={{ index: false, follow: false }} />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
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
            titleBarBackwardRoute: routes.profile.myInfoSettings(),
          }}
        />
      </div>
    </>
  );
};

MyInfoSettingsSsafyBasicInfoEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};
export default MyInfoSettingsSsafyBasicInfoEditPage;

const selfCss = css(
  { padding: `${titleBarHeight}px 15px`, height: '100vh' },
  flex()
);

const formCss = css({ flexGrow: 1, padding: '60px 0 30px' });
