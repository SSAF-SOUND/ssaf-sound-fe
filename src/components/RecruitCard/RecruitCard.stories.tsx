import type { RecruitCardProps } from './Wide/index';
import type { Meta } from '@storybook/react';

import SmallRecruitCard from './Small';
import RecruitCard from './Wide';

const meta: Meta<typeof RecruitCard> = {
  title: 'RecruitCard',
  component: RecruitCard,
  argTypes: {},
};

export default meta;

const D = {
  recruitId: 1,
  title: '커뮤니티 웹 서비스 프로젝트',
  finishedRecruit: true,
  recruitEnd: '2023-07-30',
  content: '나른이른린릔르니ㅏ른라ㅣㄴㄴ',
  skills: [
    {
      skillId: 1,
      name: 'Spring',
    },
    {
      skillId: 2,
      name: 'React',
    },
  ],
  participants: [
    {
      recruitType: '기획/디자인',
      limit: 3,
      members: [
        {
          nickName: 'khs',
          major: true,
        },
        {
          nickName: 'kds',
          major: true,
        },
      ],
    },
    {
      recruitType: '프론트엔드',
      limit: 6,
      members: [
        {
          nickName: 'khs',
          major: true,
        },
        {
          nickName: 'kds',
          major: false,
        },
      ],
    },
    {
      recruitType: '백엔드',
      limit: 5,
      members: [
        {
          nickName: 'khs',
          major: false,
        },
        {
          nickName: 'kds',
          major: true,
        },
      ],
    },
  ],
} as RecruitCardProps;

export const Default = (props: {
  category: 'study' | 'project';
  withBadge: boolean;
}) => {
  return (
    <RecruitCard {...D} category={props.category} withBadge={props.withBadge} />
  );
};

export const WithMessage = (props: any) => {
  return (
    <RecruitCard {...D} withMessage={true}>
      <p>메세지 부분은 진행중입니다!</p>
    </RecruitCard>
  );
};

export const Small = (props: { category: 'study' | 'project' }) => {
  return <SmallRecruitCard {...D} category={props.category} />;
};
