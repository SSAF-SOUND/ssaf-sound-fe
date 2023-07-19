import type { CustomNextPage } from 'next/types';
import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';

import { DefaultFullPageLoader } from '~/components/Common';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import { useMyInfo, useSetMyInfo, useUpdateNickname } from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import { handleAxiosError, routes } from '~/utils';

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

  const onValidSubmit: MyInfoEditFormProps['onValidSubmit'] = async (value) => {
    const newNickname = value.nickname;
    try {
      await updateNickname({
        nickname: newNickname,
      });

      setNickname(newNickname);
      await router.push(routes.profile.myInfoSettings());
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <div css={selfCss}>
      <MyInfoEditForm
        css={formCss}
        field="nickname"
        defaultValues={{
          nickname: myInfo.nickname,
        }}
        onValidSubmit={onValidSubmit}
      />
    </div>
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
