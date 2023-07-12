import type { Meta, StoryObj } from '@storybook/react';

import { SsafyTrack } from '~/services/member';

import Track, { TrackSize } from './Track';

const meta: Meta<typeof Track> = {
  title: 'Icon/SSAFY/Track',
  component: Track,
};

export default meta;

type TrackIconStory = StoryObj<typeof Track>;

export const TrackIcon: TrackIconStory = {
  args: { name: SsafyTrack.MOBILE, size: TrackSize.SM1 },
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
    const sizes = Object.values(TrackSize);
    const tracks = [
      ...Object.values(SsafyTrack),
      'fallback',
      'uncertified',
    ] as const;
    return (
      <div>
        {tracks.map((track) => (
          <div key={track} style={{ display: 'flex', gap: 10 }}>
            {sizes.map((size) => (
              <div key={size}>
                <Track name={track} size={size} theme={'primary'}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
