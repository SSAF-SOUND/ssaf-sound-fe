import type { Meta, StoryObj } from '@storybook/react';

import { PageLayout } from '~/stories/Layout';
import { flex, palettes } from '~/styles/utils';

import TitleBar from './index';

const meta: Meta<typeof TitleBar.Default> = {
  title: 'TitleBar',
  component: TitleBar.Default,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

type DefaultTitleBarStory = StoryObj<typeof TitleBar.Default>;

export const Default: DefaultTitleBarStory = {
  name: 'Default TitleBar',
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    onClickBackward: {
      table: {
        disable: true,
      },
    },
    onClickClose: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    title: '제목',
    withoutBackward: false,
    withoutTitle: false,
    withoutClose: false,
  },
};

export const DefaultExamples: DefaultTitleBarStory = {
  name: 'Default TitleBar Examples',
  render: () => {
    return (
      <div
        css={[
          flex(),
          { '> *': { borderBottom: `1px solid ${palettes.background.grey}` } },
        ]}
      >
        <TitleBar.Default title="제목" />
        <TitleBar.Default title="제목" withoutClose />
        <TitleBar.Default title="제목" withoutBackward withoutTitle />
        <TitleBar.Default title="제목" withoutBackward />
        <TitleBar.Default withoutTitle withoutClose />
      </div>
    );
  },
};
