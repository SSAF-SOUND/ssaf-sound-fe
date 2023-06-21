import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '~/components/Common';
import { palettes } from '~/styles/utils';

import IconButton from './index';

const meta: Meta<typeof IconButton> = {
  title: 'IconButton',
  component: IconButton,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type IconButtonStory = StoryObj<typeof IconButton>;

export const Examples: IconButtonStory = {
  render: () => {
    const themes = ['white', 'black', 'primary', 'secondary'] as const;
    const backgroundColors = [
      palettes.black,
      palettes.background.default,
      palettes.background.grey,
      palettes.grey0,
      palettes.grey1,
      palettes.grey2,
      palettes.grey3,
      palettes.grey4,
      palettes.grey5,
      palettes.white,
    ];

    return (
      <div css={{ display: 'flex', flexDirection: 'column' }}>
        {backgroundColors.map((backgroundColor) => {
          return (
            <div
              css={{
                height: 50,
                display: 'flex',
                gap: 20,
                backgroundColor,
                alignItems: 'center',
                padding: '0 20px',
              }}
            >
              {themes.map((theme) => (
                <IconButton theme={theme} size={30}>
                  <Icon name="close" size={30} />
                </IconButton>
              ))}
            </div>
          );
        })}
      </div>
    );
  },
};
