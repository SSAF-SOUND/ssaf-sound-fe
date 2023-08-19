import type { SquareAvatarProps } from './index';
import type { Meta } from '@storybook/react';

import { userInfo } from '~/mocks/handlers/member/data';

import SquareAvatar from './index';

const meta: Meta<typeof SquareAvatar> = {
  title: 'Recruit/SquareAvatar',
  component: SquareAvatar,
  argTypes: {},
};

export default meta;

export const SquareAvatarStory = (props: SquareAvatarProps) => {
  const d = userInfo.certifiedSsafyUserInfo;
  return <SquareAvatar userInfo={d} />;
};

export const MaxString = (props: { nickname: string }) => {
  const { nickname = '쌒' } = props;
  const d = userInfo.certifiedSsafyUserInfo;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span>최대 글자를 확인해주세요.</span>
      <div style={{ display: 'flex', gap: 6 }}>
        <SquareAvatar
          userInfo={{
            ...d,
            nickname: nickname.repeat(11),
          }}
        />
      </div>
    </div>
  );
};

export const Certified = () => {
  const d = userInfo.certifiedSsafyUserInfo;
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
      <div>
        <SquareAvatar userInfo={d} />
      </div>
    </div>
  );
};

export const UnCertified = () => {
  const d = userInfo.nonSsafyUserInfo;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span>Saffy 인증 X</span>
      <SquareAvatar userInfo={d} />
    </div>
  );
};

export const Vacant = () => {
  const d = userInfo.uncertifiedSsafyUserInfo;

  return <SquareAvatar />;
};
