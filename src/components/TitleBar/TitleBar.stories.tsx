import type { Meta, StoryObj } from '@storybook/react';

import { css } from '@emotion/react';

import { PageLayout } from '~/stories/Layout';
import { flex, palettes } from '~/styles/utils';

import TitleBar from './index';

const meta: Meta<typeof TitleBar.Default> = {
  title: 'Navigation/TitleBar',
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
type FormTitleBarStory = StoryObj<typeof TitleBar.Form>;

export const Default: DefaultTitleBarStory = {
  args: {
    title: '제목',
    withoutBackward: false,
    withoutTitle: false,
    withoutClose: false,
  },
  render: (args) => {
    return <TitleBar.Default {...args} />;
  },
};

export const DefaultExamples: DefaultTitleBarStory = {
  render: () => {
    return (
      <div css={exampleCss}>
        <TitleBar.Default title="제목" />
        <TitleBar.Default title="제목" withoutClose />
        <TitleBar.Default title="제목" withoutBackward withoutTitle />
        <TitleBar.Default title="제목" withoutBackward />
        <TitleBar.Default withoutTitle withoutClose />
      </div>
    );
  },
};

export const Form: FormTitleBarStory = {
  args: {
    title: '리쿠르팅 등록하기',
    isSubmitDisabled: false,
    isSubmitting: false,
    submitButtonText: '완료',
  },
  render: (args) => {
    return <TitleBar.Form {...args} />;
  },
};

export const FormExamples: FormTitleBarStory = {
  render: () => {
    const title = '리쿠르팅 등록하기';
    const submitButtonText = '완료';
    return (
      <div css={exampleCss}>
        <TitleBar.Form
          title={title}
          isSubmitDisabled={false}
          submitButtonText={submitButtonText}
        />
        <TitleBar.Form
          title={title}
          isSubmitDisabled={true}
          submitButtonText={submitButtonText}
        />
        <TitleBar.Form
          title={title}
          isSubmitting={true}
          submitButtonText={submitButtonText}
        />
      </div>
    );
  },
};

const exampleCss = css(flex(), {
  '> *': { borderBottom: `1px solid ${palettes.background.grey}` },
});
