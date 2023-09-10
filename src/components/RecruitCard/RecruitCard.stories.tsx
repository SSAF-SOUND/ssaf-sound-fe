import type { Meta } from '@storybook/react';

import { RecruitData } from '~/mocks/handlers/recruit/data';

import SmallRecruitCard from './Small';
import RecruitCard from './Wide';

const meta: Meta<typeof RecruitCard> = {
  title: 'Recruit/RecruitCard',
  component: RecruitCard,
  argTypes: {},
};

export default meta;

export const Default = (props: {
  category: 'study' | 'project';
  withBadge: boolean;
}) => {
  return <>임시</>;
};

export const WithMessage = () => {
  return <>임시</>;
};

export const Small = (props: { category: 'study' | 'project' }) => {
  return <>임시</>;
};
