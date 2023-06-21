import type { Meta, StoryObj } from '@storybook/react';

import Track from './Track';

const meta: Meta<typeof Track> = {
  title: 'Icon/SSAFY/Track',
  component: Track,
};

export default meta;

type TrackIconStory = StoryObj<typeof Track>;

export const TrackIcon: TrackIconStory = {
  args: { name: 'mobile', size: 32 },
  argTypes: {
    label: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
  },
};

export const AllTrackIcons: TrackIconStory = {
  render: () => {
    const sizes = [12, 16, 32, 36, 126, 160] as const;
    const tracks = [
      'embedded',
      'python',
      'java',
      'mobile',
      'uncertified',
      'primaryDefault',
      'secondaryDefault',
    ] as const;
    return (
      <div>
        {tracks.map((track) => (
          <div key={track} style={{ display: 'flex', gap: 10 }}>
            {sizes.map((size) => (
              <div key={size}>
                <Track name={track} size={size} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
