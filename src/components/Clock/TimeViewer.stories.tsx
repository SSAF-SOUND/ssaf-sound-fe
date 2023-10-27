import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentPropsWithoutRef } from 'react';

import { PageLayout } from '~/stories/Layout';
import { flex, fontCss, palettes } from '~/styles/utils';

import { Clock, TimeViewer } from './index';

interface TimeViewerStoryComponentProps {
  hours: number;
  minutes: number;
  seconds: number;

  showDescriptions?: boolean;
}

const TimeViewerStoryComponent = (props: TimeViewerStoryComponentProps) => {
  const { hours, minutes, seconds, showDescriptions = false } = props;

  return (
    <div>
      <TimeViewer
        css={{ marginBottom: 24 }}
        dateTime={new Date(2000, 0, 1, hours, minutes, seconds)}
      />

      {showDescriptions && (
        <div
          css={[
            fontCss.style.B16,
            fontCss.family.pretendard,
            flex('flex-start', 'center', 'column', 18),
          ]}
        >
          <div css={{ color: palettes.primary.default }}>
            <p>입실 남은 시간 안내</p>
            <p>8:00:00 ~ 8:29:59</p>
          </div>
          <div css={{ color: palettes.primary.dark }}>
            <p>입실종료 남은 시간 안내</p> <p>8:30:00 ~ 8:59:59</p>
          </div>
          <div css={{ color: palettes.secondary.default }}>
            <p>퇴실 남은 시간 안내</p> <p>17:30:00 ~ 17:59:59</p>
          </div>
          <div css={{ color: palettes.secondary.dark }}>
            <p>퇴실종료 남은 시간 안내</p> <p>18:00:00 ~ 18:29:59</p>
          </div>
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof TimeViewerStoryComponent> = {
  title: 'Notification/TimeViewer',
  component: TimeViewerStoryComponent,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

type TimeViewerStory = StoryObj<TimeViewerStoryComponentProps>;

export const Default: TimeViewerStory = {
  args: {
    hours: 0,
    minutes: 0,
    seconds: 0,
    showDescriptions: true,
  },
};

export const Variations = () => {
  return (
    <div css={flex('stretch', 'center', 'column', 20)}>
      <Wrapper>
        <TimeViewerStoryComponent hours={8} minutes={0} seconds={0} />
        <TimeViewerStoryComponent hours={8} minutes={29} seconds={59} />
      </Wrapper>

      <Wrapper>
        <TimeViewerStoryComponent hours={8} minutes={30} seconds={0} />
        <TimeViewerStoryComponent hours={8} minutes={59} seconds={59} />
      </Wrapper>

      <Wrapper>
        <TimeViewerStoryComponent hours={17} minutes={30} seconds={0} />
        <TimeViewerStoryComponent hours={17} minutes={59} seconds={59} />
      </Wrapper>

      <Wrapper>
        <TimeViewerStoryComponent hours={18} minutes={0} seconds={0} />
        <TimeViewerStoryComponent hours={18} minutes={29} seconds={59} />
      </Wrapper>
    </div>
  );
};
const Wrapper = (props: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      css={[flex('stretch', 'center', 'column', 10), { width: '100%' }]}
      {...props}
    />
  );
};

export const RealClock = () => {
  return <Clock />;
};
