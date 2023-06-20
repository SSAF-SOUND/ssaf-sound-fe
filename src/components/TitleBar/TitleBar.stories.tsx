import type { Meta, StoryObj } from '@storybook/react';

import { PageLayout } from '~/stories/Layout';
import { flex, palettes } from '~/styles/utils';

import DefaultTitleBar from './DefaultTitleBar';

const meta: Meta<typeof DefaultTitleBar> = {
  title: 'TitleBar',
  component: DefaultTitleBar,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

type DefaultTitleBarStory = StoryObj<typeof DefaultTitleBar>;

export const Default: DefaultTitleBarStory = {
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

export const Variations: DefaultTitleBarStory = {
  render: () => {
    return (
      <div
        css={[
          flex(),
          { '> *': { borderBottom: `1px solid ${palettes.background.grey}` } },
        ]}
      >
        <DefaultTitleBar title="제목" />
        <DefaultTitleBar title="제목" withoutClose />
        <DefaultTitleBar title="제목" withoutBackward withoutTitle />
        <DefaultTitleBar title="제목" withoutBackward />
        <DefaultTitleBar withoutTitle withoutClose />
      </div>
    );
  },
};
