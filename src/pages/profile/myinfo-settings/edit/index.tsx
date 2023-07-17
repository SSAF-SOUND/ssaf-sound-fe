import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Button, DefaultFullPageLoader } from '~/components/Common';
import TitleBar from '~/components/TitleBar';
import { useMyInfo } from '~/services/member';
import { EditableMyInfoFields, routes } from '~/utils';

const MyInfoEditPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();

  const { field } = router.query as { field?: EditableMyInfoFields };

  const possibleFields = Object.values(EditableMyInfoFields);

  if (!myInfo || !field || !possibleFields.includes(field)) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  return (
    <form css={selfCss}>
      <TitleBar.Default withoutClose title={title[field]} />

      <div>
        필드
      </div>

      <Button css={buttonCss} size="lg">
        수정 완료
      </Button>
    </form>
  );
};

const title: Record<EditableMyInfoFields, string> = {
  [EditableMyInfoFields.NICKNAME]: '닉네임 수',
  [EditableMyInfoFields.YEAR]: 'SSAFY 기수',
  [EditableMyInfoFields.CAMPUS]: 'SSAFY 캠퍼스',
  [EditableMyInfoFields.IS_MAJOR]: 'SSAFY 전공자',
  [EditableMyInfoFields.TRACK]: 'SSAFY 트랙',
  [EditableMyInfoFields.SSAFY_MEMBER]: 'SSAFY 멤버여부',
};

MyInfoEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};
export default MyInfoEditPage;

const selfCss = css({ paddingTop: 80 });
const buttonCss = css({ width: '100%' });
