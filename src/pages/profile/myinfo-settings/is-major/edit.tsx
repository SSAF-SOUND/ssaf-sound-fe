import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { DefaultFullPageLoader } from '~/components/Common';
import MyInfoEditForm from '~/components/Forms/MyInfoEditForm';
import { useMyInfo } from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import { routes } from '~/utils';

const MyInfoSettingsIsMajorEditPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();

  if (!myInfo) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  return (
    <div css={selfCss}>
      <MyInfoEditForm
        css={formCss}
        field="isMajor"
        defaultValues={{
          isMajor: myInfo.isMajor,
        }}
        onValidSubmit={(v) => {
          console.log(v);
        }}
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
