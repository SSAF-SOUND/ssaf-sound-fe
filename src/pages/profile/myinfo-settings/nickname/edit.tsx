import type { CustomNextPage } from 'next/types';
import type { MyInfoEditFormProps } from '~/components/Forms/MyInfoEditForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { produce } from 'immer';

import { BreadCrumbs } from '~/components/BreadCrumbs';
import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import { useMyInfo, useSetMyInfo, useUpdateNickname } from '~/services/member';
import { flex, pageCss, titleBarHeight } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  customToast,
  handleAxiosError,
  routes,
} from '~/utils';
import { EditableMyInfoFields } from '~/utils/client-routes/profile';

const metaTitle = '닉네임 수정';

const MyInfoSettingsNicknameEditPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const { mutateAsync: updateNickname } = useUpdateNickname();
  const setMyInfo = useSetMyInfo();

  if (!myInfo || !myInfo.nickname) {
    router.replace(routes.unauthorized());
    return <FullPageLoader />;
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
      <PageHeadingText text={metaTitle} />

      <main css={selfCss}>
        <MyInfoEditForm
          css={formCss}
          field="nickname"
          defaultValues={{
            nickname: myInfo.nickname,
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
                    name: '닉네임',
                    link: routes.profile.edit.myInfo(
                      EditableMyInfoFields.NICKNAME
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

export default MyInfoSettingsNicknameEditPage;
MyInfoSettingsNicknameEditPage.auth = createAuthGuard();
MyInfoSettingsNicknameEditPage.meta = createNoIndexPageMetaData(metaTitle);

const selfCss = css(
  { padding: `${titleBarHeight}px 0` },
  pageCss.minHeight,
  flex()
);

const formCss = css({ flexGrow: 1, padding: '60px 0 30px' });
