import { Button, Icon } from '~/components/Common';
import { ApplySelectBox } from '~/components/Forms/RecruitApplyForm/Fields/ApplySelectBox';
import { ApplyTextArea } from '~/components/Forms/RecruitApplyForm/Fields/ApplyTextArea';
import { ProfileVisibilityCheckbox } from '~/components/Forms/RecruitApplyForm/Fields/ProfileVisibilityCheckbox';
import { RecruitLayout } from '~/components/Layout';
import Name from '~/components/Name';
import NameCard from '~/components/NameCard';
import TitleBar from '~/components/TitleBar';
import { userInfo } from '~/mocks/handlers/member/data';
import { useRecruitTypes } from '~/services/meta';
import { flex, fontCss, palettes } from '~/styles/utils';
import { routes } from '~/utils';

const Applied = () => {
  return (
    <RecruitLayout>
      {/* route 어디? */}
      <TitleBar.Default title="리쿠르팅 신청내역" />
      <span
        css={[
          {
            display: 'block',
            color: palettes.grey3,
            marginTop: '20px',
          },
          fontCss.family.auto,
          fontCss.style.R12,
        ]}
      >
        2023년 07월 20일
      </span>

      <div css={flex('center', 'space-between', 'row')}>
        <NameCard
          userInfo={userInfo.certifiedSsafyUserInfo}
          css={{
            padding: 0,
          }}
        />
        <Icon name="heart" size={22} color={palettes.recruit.default} />
      </div>
      <div css={{ height: 20 }} />
      <div css={flex('', '', 'row', 10)}>
        <Button
          theme="grey"
          css={{ width: '45%', color: palettes.white, borderRadius: 8 }}
          size="sm"
        >
          쪽지 보내기
        </Button>
        <Button
          theme="grey"
          css={{ width: '55%', color: palettes.white }}
          size="sm"
        >
          포트폴리오 보러가기
        </Button>
      </div>

      <div css={{ height: 20 }} />
      <div css={flex('', '', 'column', 12)}>
        <ApplySelectBox
          readOnly
          items={['프론트']}
          defaultValue="프론트"
          order={1}
          question="지원 파트"
        />

        <ApplyTextArea
          order={2}
          question="test"
          withMax={false}
          disabled
          defaultValue={'123123213123123'}
        />
      </div>
      <div css={{ height: 40 }} />
      <div css={[flex('', '', 'row', 10)]}>
        <Button
          size="lg"
          theme="recruit"
          variant="inverse"
          css={{ width: '50%' }}
        >
          거절
        </Button>
        <Button size="lg" theme="recruit" css={{ width: '50%' }}>
          수락
        </Button>
      </div>
    </RecruitLayout>
  );
};

export default Applied;
