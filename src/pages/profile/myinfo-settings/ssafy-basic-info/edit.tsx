import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { DefaultFullPageLoader } from '~/components/Common';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import { useMyInfo } from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import { routes } from '~/utils';

const MyInfoSettingsSsafyBasicInfoEditPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();

  if (!myInfo) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  return (
    <div css={selfCss}>
      <div css={{ marginBottom: 40 }} />
      <MyInfoEditForm
        css={formCss}
        field="ssafyBasicInfo"
        defaultValues={{
          ssafyBasicInfo: {
            campus: myInfo.ssafyInfo?.campus,
            year: myInfo.ssafyInfo?.semester,
            ssafyMember: myInfo.ssafyMember ?? undefined,
          },
        }}
        onValidSubmit={(v) => {
          console.log(v);
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

const formCss = css({ flexGrow: 1 });
