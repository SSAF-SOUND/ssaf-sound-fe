import type { Meta, StoryObj } from '@storybook/react';

import { PageLayout } from '~/stories/Layout';
import { flex, palettes } from '~/styles/utils';

import TitleBar from './index';

const meta: Meta<typeof TitleBar.Recruit> = {
  title: 'TitleBar',
  component: TitleBar.Recruit,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

type RecruitTitleBarStory = StoryObj<typeof TitleBar.Recruit>;

export const Recruit: RecruitTitleBarStory = {
  name: 'Recruit TitleBar',
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    title: '리쿠르팅 등록하기',
    isSubmitDisabled: false,
  },
};

export const RecruitExamples: RecruitTitleBarStory = {
  name: 'Recruit TitleBar Examples',
  render: () => {
    const title = '리쿠르팅 등록하기';
    return (
      <div
        css={[
          flex(),
          { '> *': { borderBottom: `1px solid ${palettes.background.grey}` } },
        ]}
      >
        <TitleBar.Recruit title={title} isSubmitDisabled={true} />
        <TitleBar.Recruit title={title} isSubmitDisabled={false} />
      </div>
    );
  },
};
