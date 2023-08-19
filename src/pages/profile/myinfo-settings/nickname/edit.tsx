import type { CustomNextPage } from 'next/types';
import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';

import {
  DefaultFullPageLoader,
  PageHead,
  PageHeadingText,
} from '~/components/Common';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import { useMyInfo, useSetMyInfo, useUpdateNickname } from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import { customToast, handleAxiosError, routes } from '~/utils';

const metaTitle = '닉네임 수정';

const MyInfoSettingsNicknameEditPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const { mutateAsync: updateNickname } = useUpdateNickname();
  const setMyInfo = useSetMyInfo();

  if (!myInfo || !myInfo.nickname) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  const setNickname = (newNickname: string) => {
    setMyInfo(
      produce(myInfo, (draft) => {
        draft.nickname = newNickname;
      })
    );
  };

  const onValidSubmit: MyInfoEditFormProps['onValidSubmit'] = async (
    reset,
    value
  ) => {
    const newNickname = value.nickname;
    try {
      await updateNickname({
        nickname: newNickname,
      });

      setNickname(newNickname);
      reset({ nickname: newNickname });
      customToast.success('닉네임이 변경되었습니다.');
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <>
      <PageHead title={metaTitle} robots={{ index: false, follow: false }} />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <MyInfoEditForm
          css={formCss}
          field="nickname"
          defaultValues={{
            nickname: myInfo.nickname,
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

MyInfoSettingsNicknameEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};
export default MyInfoSettingsNicknameEditPage;

const selfCss = css(
  { padding: `${titleBarHeight}px 15px`, height: '100vh' },
  flex()
);

const formCss = css({ flexGrow: 1, padding: '60px 0 30px' });
