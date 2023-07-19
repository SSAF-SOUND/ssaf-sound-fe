import type { CustomNextPage } from 'next/types';
import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';
import { isBoolean } from 'is-what';

import { DefaultFullPageLoader } from '~/components/Common';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import {
  CertificationState,
  useMyInfo,
  useSetMyInfo,
  useUpdateSsafyBasicInfo,
} from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import { customToast, handleAxiosError, routes } from '~/utils';

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

  const onValidSubmit: MyInfoEditFormProps['onValidSubmit'] = async (value) => {
    const { year: semester, ...restSsafyBasicInfo } = value.ssafyBasicInfo;
    const newSsafyBasicInfo = {
      semester,
      ...restSsafyBasicInfo,
    };

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
              semester: newSsafyBasicInfo.semester,
            };
          } else {
            delete draft.ssafyInfo;
          }
        })
      );
      await router.push(routes.profile.myInfoSettings());
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
        }}
      />
    </div>
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
