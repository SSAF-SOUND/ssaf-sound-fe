import type { SerializedStyles } from '@emotion/react';

import { css } from '@emotion/react';

import { fontCss, inlineFlex } from '~/styles/utils';

import { Avatar, SsafyIcon } from '../Common';

interface NameProps {
  nickname: string;
  ssafyMember: boolean;
  size?: NameSize;

  // 타입 임시
  certificationState?: null | 'UNCERTIFIED' | 'WAITING' | 'CERTIFIED';
  isMajor?: boolean;
  majorType?: 'uncertified' | 'embedded' | 'python' | 'java' | 'mobile' | null;
}

type NameSize = 'sm' | 'md' | 'lg';
type TrackSize = 10 | 15 | 32;

const Name = (props: NameProps) => {
  const {
    size = 'lg',
    nickname = 'Kimmie',
    ssafyMember = true,
    isMajor = true,
    majorType = 'mobile',
  } = props;

  const defaultImage = 'primaryDefault';
  const hasMajorType = !!majorType;

  return (
    <span css={[selfCss, gapCss[size]]}>
      <Avatar size={size} nickName={nickname} major={isMajor} />
      <span css={[[textCss[size]], fontCss.family.pretendard]}>{nickname}</span>
      {ssafyMember && (
        <SsafyIcon.Track
          name={hasMajorType ? majorType : defaultImage}
          size={trackSize[size]}
          containerStyle={{ padding: 0 }}
        />
      )}
    </span>
  );
};

const selfCss = css(inlineFlex('center', '', 'row'));

const gapCss: Record<NameSize, SerializedStyles> = {
  sm: css({
    gap: 2,
  }),
  md: css({
    gap: 4,
  }),
  lg: css({
    gap: 5,
  }),
};

const textCss: Record<NameSize, SerializedStyles> = {
  sm: css(fontCss.style.B12),
  md: css(fontCss.style.B18),
  lg: css(fontCss.style.B40),
};

const trackSize: Record<NameSize, TrackSize> = {
  sm: 10,
  md: 15,
  lg: 32,
};

export default Name;
