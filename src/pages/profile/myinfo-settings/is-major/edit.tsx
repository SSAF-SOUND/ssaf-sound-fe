import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';

import { BreadCrumbs } from '~/components/BreadCrumbs';
import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import { useMyInfo, useSetMyInfo, useUpdateIsMajor } from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  customToast,
  handleAxiosError,
  routes,
} from '~/utils';
import { EditableMyInfoFields } from '~/utils/client-routes/profile';

const metaTitle = '전공자 여부 수정';

const MyInfoSettingsIsMajorEditPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const { mutateAsync: updateIsMajor } = useUpdateIsMajor();
  const setMyInfo = useSetMyInfo();

  if (!myInfo) {
    router.replace(routes.unauthorized());
    return <FullPageLoader />;
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
            titleBarFooter: (
              <BreadCrumbs
                entries={[
                  { name: '프로필', link: routes.profile.self() },
                  {
                    name: '내 정보 설정',
                    link: routes.profile.myInfoSettings(),
                  },
                  {
                    name: '전공자 여부',
                    link: routes.profile.edit.myInfo(
                      EditableMyInfoFields.IS_MAJOR
                    ),
                    active: true,
                  },
                ]}
              />
            ),
          }}
        />
      </div>
    </>
  );
};

export default MyInfoSettingsIsMajorEditPage;
MyInfoSettingsIsMajorEditPage.auth = createAuthGuard();
MyInfoSettingsIsMajorEditPage.meta = createNoIndexPageMetaData(metaTitle);

const selfCss = css(
  { padding: `${titleBarHeight}px 0`, height: '100vh' },
  flex()
);

const formCss = css({ flexGrow: 1, padding: '60px 0 30px' });
