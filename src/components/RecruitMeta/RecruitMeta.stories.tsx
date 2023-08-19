import type { Meta } from '@storybook/react';

import { RecruitData } from '~/mocks/handlers/recruit/data';

import RecruitMeta from './index';

const meta: Meta<typeof RecruitMeta> = {
  title: 'Recruit/RecruitMeta',
  component: RecruitMeta,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

export const Default = () => {
  const {
    title,
    recruitStart,
    recruitEnd,

    limits,
    skills,
  } = RecruitData.recruitDetail.project;

  const recruitMetaData = {
    title,
    recruitStart,
    recruitEnd,
    limits,
    skills,
  };
  return <RecruitMeta recruitMeta={recruitMetaData} />;
};

export const Expanded = () => {
  const {
    title,
    recruitStart,
    recruitEnd,
    limits,
    skills,
    // ---

    userInfo,
  } = RecruitData.recruitDetail.project;

  const recruitMetaData = {
    title,
    recruitStart,
    recruitEnd,
    limits,
    skills,
  };
  return (
    <RecruitMeta
      recruitMeta={recruitMetaData}
      userInfo={userInfo}
      title={title}
    />
  );
};
