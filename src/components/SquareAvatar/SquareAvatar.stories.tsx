import type { SquareAvatarProps } from './index';
import type { Meta } from '@storybook/react';

import { CertificationState, SsafyTrack } from '~/services/member';

import SquareAvatar from './index';

const meta: Meta<typeof SquareAvatar> = {
  title: 'SquareAvatar',
  component: SquareAvatar,
  argTypes: {
    memberId: {
      table: {
        disable: true,
      },
    },
    memberRole: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

export const SquareAvatarStory = (props: SquareAvatarProps) => {
  const { nickname = 'James', isMajor = true, ...restProps } = props;
  return <SquareAvatar nickname={nickname} isMajor={isMajor} {...restProps} />;
};

export const MaxString = (props: { nickname: string }) => {
  const { nickname = '쌒' } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span>최대 글자를 확인해주세요.</span>
      <div style={{ display: 'flex', gap: 6 }}>
        <SquareAvatar
          nickname={nickname.repeat(11)}
          memberId={1}
          memberRole="user"
          isMajor={true}
          ssafyMember={false}
        />

        <SquareAvatar
          nickname={nickname.repeat(11)}
          memberId={1}
          memberRole="user"
          isMajor={false}
          ssafyMember={true}
          ssafyInfo={{
            campus: '서울',
            semester: 2,
            certificationState: CertificationState.CERTIFIED,
            majorTrack: SsafyTrack.MOBILE,
          }}
        />
      </div>
    </div>
  );
};

export const Certified = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
      <div>
        <span>Ssfay 인증 + 트랙 인증 </span>
        <SquareAvatar
          nickname={'쌒'.repeat(11)}
          memberId={1}
          memberRole="user"
          isMajor={false}
          ssafyMember={true}
          ssafyInfo={{
            campus: '서울',
            semester: 2,
            certificationState: CertificationState.CERTIFIED,
            majorTrack: SsafyTrack.MOBILE,
          }}
        />
      </div>
      <div>
        <span>Ssfay 인증 + 트랙 미인증 </span>
        <SquareAvatar
          nickname={'쌒'.repeat(11)}
          memberId={1}
          memberRole="user"
          isMajor={false}
          ssafyMember={true}
          ssafyInfo={{
            campus: '서울',
            semester: 2,
            certificationState: CertificationState.CERTIFIED,
            majorTrack: undefined,
          }}
        />
      </div>
    </div>
  );
};

export const UnCertified = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span>Saffy 인증 X</span>
      <SquareAvatar
        nickname={'쌒'.repeat(11)}
        memberId={1}
        memberRole="user"
        isMajor={false}
        ssafyMember={false}
      />
    </div>
  );
};

export const Vacant = () => {
  return <SquareAvatar isVacant />;
};
