import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import {
  ApplySelectBox,
  ApplyTextArea,
  ProfileVisibilityCheckbox,
} from '~/components/Forms/RecruitApplyForm/Fields';
import { RecruitLayout } from '~/components/Layout';
import { RecruitMeta as RecruitMetaComponent } from '~/components/RecruitMeta';
import TitleBar from '~/components/TitleBar';
import { userInfo } from '~/mocks/handlers/member/data';
import { RecruitData } from '~/mocks/handlers/recruit/data';
import { flex, fontCss } from '~/styles/utils';
import { routes } from '~/utils';

const Data = {
  recrutApplicationId: 1,
  matchStatus: 'WAITING_REGISTER_APPROVE',
  like: false,
  nickname: 'Foo',
  isMajor: false,
  majorTypeId: -1,
  recruitTypeId: 1,
  content: '자유 질의응답 전문',
};

const RecruitApplyPage = (props: any) => {
  return (
    <RecruitLayout>
      <TitleBar.Default
        title="리쿠르팅 신청 내역"
        onClickBackward={routes.profile.self()}
        withoutClose
      />
      <div
        css={[
          { paddingTop: '20px', marginBottom: '30px' },
          flex('', '', 'column', 8),
        ]}
      >
        <h2 css={titleCss}>스터디</h2>
        <RecruitMetaComponent
          recruitMeta={RecruitData.recruitDetail.project}
          userInfo={userInfo.certifiedSsafyUserInfo}
          expanded
          title={'test'}
        />
      </div>
      <div css={[flex('', '', 'column', 30), { marginBottom: 80 }]}>
        <ApplySelectBox items={['프론트']} readOnly defaultValue="프론트" />
        <ProfileVisibilityCheckbox
          disabled
          defaultChecked
          order={2}
          question="리쿠르팅 등록자에게 프로필이 공개됩니다. 이에 동의하십니까?"
        />
        <ApplyTextArea
          disabled
          withMax={false}
          order={3}
          question="[등록자 질문] Custom Question"
          defaultValue={123}
        />
      </div>
      <Button>리쿠르팅 신청 취소</Button>
    </RecruitLayout>
  );
};
export default RecruitApplyPage;

const titleCss = css(fontCss.family.auto, fontCss.style.R14);
