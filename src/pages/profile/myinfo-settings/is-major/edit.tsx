import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';

import { DefaultFullPageLoader } from '~/components/Common';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import { useMyInfo, useSetMyInfo, useUpdateIsMajor } from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import { handleAxiosError, routes } from '~/utils';

const MyInfoSettingsIsMajorEditPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const { mutateAsync: updateIsMajor } = useUpdateIsMajor();
  const setMyInfo = useSetMyInfo();

  if (!myInfo) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  const setIsMajor = (isMajor: boolean) => {
    setMyInfo(
      produce(myInfo, (draft) => {
        draft.isMajor = isMajor;
      })
    );
  };

  const onValidSubmit: MyInfoEditFormProps['onValidSubmit'] = async (value) => {
    const newIsMajor = value.isMajor;
    try {
      await updateIsMajor({ isMajor: newIsMajor });
      setIsMajor(newIsMajor);
      await router.push(routes.profile.myInfoSettings());
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <div css={selfCss}>
      <MyInfoEditForm
        css={formCss}
        field="isMajor"
        defaultValues={{
          isMajor: myInfo.isMajor,
        }}
        onValidSubmit={onValidSubmit}
      />
    </div>
  );
};

export default MyInfoSettingsIsMajorEditPage;
MyInfoSettingsIsMajorEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};

const selfCss = css(
  { padding: `${titleBarHeight}px 15px`, height: '100vh' },
  flex()
);

const formCss = css({ flexGrow: 1, padding: '60px 0 30px' });
