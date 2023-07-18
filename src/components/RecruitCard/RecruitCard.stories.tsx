import type { Meta } from '@storybook/react';

import { RecruitData } from '~/mocks/handlers/recruit/data';

import SmallRecruitCard from './Small';
import RecruitCard from './Wide';

const meta: Meta<typeof RecruitCard> = {
  title: 'RecruitCard',
  component: RecruitCard,
  argTypes: {},
};

export default meta;

export const Default = (props: {
  category: 'study' | 'project';
  withBadge: boolean;
}) => {
  return (
    <RecruitCard
      recruitSummary={RecruitData.recruitSummary}
      category={props.category}
      withBadge={props.withBadge}
    />
  );
};

export const WithMessage = (props: any) => {
  return (
    <RecruitCard recruitSummary={RecruitData.recruitSummary} withMessage={true}>
      <p>메세지 부분은 진행중입니다!</p>
    </RecruitCard>
  );
};

export const Small = (props: { category: 'study' | 'project' }) => {
  return (
    <SmallRecruitCard
      recruitSummary={RecruitData.recruitSummary}
      category={props.category}
    />
  );
};
