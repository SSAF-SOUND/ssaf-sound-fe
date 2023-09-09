import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';

import { DefaultFullPageLoader, PageHeadingText } from '~/components/Common';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import { useMyInfo, useSetMyInfo, useUpdateIsMajor } from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import { customToast, handleAxiosError, routes } from '~/utils';

const metaTitle = '전공자 여부 수정';

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

  const onValidSubmit: MyInfoEditFormProps['onValidSubmit'] = async (
    reset,
    value
  ) => {
    const newIsMajor = value.isMajor;
    try {
      await updateIsMajor({ isMajor: newIsMajor });
      setIsMajor(newIsMajor);
      reset({ isMajor: newIsMajor });
      customToast.success('전공자 여부가 변경되었습니다.');
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
          field="isMajor"
          defaultValues={{
            isMajor: myInfo.isMajor,
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

export default MyInfoSettingsIsMajorEditPage;
MyInfoSettingsIsMajorEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};
MyInfoSettingsIsMajorEditPage.meta = {
  title: metaTitle,
  openGraph: { title: metaTitle },
  robots: { index: false, follow: false },
};

const selfCss = css(
  { padding: `${titleBarHeight}px 0`, height: '100vh' },
  flex()
);

const formCss = css({ flexGrow: 1, padding: '60px 0 30px' });
