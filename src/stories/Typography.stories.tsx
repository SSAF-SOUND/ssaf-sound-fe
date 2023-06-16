import type { Meta, StoryObj } from '@storybook/react';

import { fontCss } from '~/styles/utils';

interface TypographyProps {
  language?: 'ko' | 'en';
  color?: string;
}

const Typography = (props: TypographyProps) => {
  const { language = 'ko', color = '#ffffff' } = props;
  const text = language === 'ko' ? '쌉사운드' : 'SSAFSOUND';
  return (
    <div
      css={
        language === 'ko' ? fontCss.family.pretendard : fontCss.family.manrope
      }
    >
      {Object.entries(fontCss.style).map(([styleName, css]) => {
        return (
          <p key={styleName} style={{ color }} css={css}>
            {text}/{styleName}
          </p>
        );
      })}
    </div>
  );
};

const meta: Meta<typeof Typography> = {
  title: 'System/Typography',
  component: Typography,
  argTypes: {
    language: {
      options: ['ko', 'en'],
      control: {
        type: 'radio',
        labels: {
          ko: '한국어',
          en: '영어',
        },
      },
    },
  },
};

export default meta;

type TypographyStory = StoryObj<typeof Typography>;

export const Default: TypographyStory = {
  args: {
    language: 'ko',
    color: '#000000',
  },
};
