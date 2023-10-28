import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentPropsWithoutRef } from 'react';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

import { PageLayout } from '~/stories/Layout';
import { flex, fontCss, palettes } from '~/styles/utils';

import { Clock, SeoulTimeViewer } from './index';

interface TimeViewerStoryComponentProps {
  hours: number;
  minutes: number;
  seconds: number;
  day?: number;

  showDescriptions?: boolean;
}

const SeoulTimeViewerStoryComponent = (
  props: TimeViewerStoryComponentProps
) => {
  const { hours, minutes, seconds, showDescriptions = false, day = 1 } = props;

  return (
    <div>
      <SeoulTimeViewer
        css={{ marginBottom: 24 }}
        dateTime={
          new Date(
            dayjs()
              .tz('Asia/Seoul')
              .set('h', hours)
              .set('m', minutes)
              .set('s', seconds)
              .set('d', day)
              .format()
          )
        }
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

const meta: Meta<typeof SeoulTimeViewerStoryComponent> = {
  title: 'Notification/SeoulTimeViewer',
  component: SeoulTimeViewerStoryComponent,
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
        <SeoulTimeViewerStoryComponent hours={8} minutes={0} seconds={0} />
        <SeoulTimeViewerStoryComponent hours={8} minutes={29} seconds={59} />
      </Wrapper>

      <Wrapper>
        <SeoulTimeViewerStoryComponent hours={8} minutes={30} seconds={0} />
        <SeoulTimeViewerStoryComponent hours={8} minutes={59} seconds={59} />
      </Wrapper>

      <Wrapper>
        <SeoulTimeViewerStoryComponent hours={17} minutes={30} seconds={0} />
        <SeoulTimeViewerStoryComponent hours={17} minutes={59} seconds={59} />
      </Wrapper>

      <Wrapper>
        <SeoulTimeViewerStoryComponent hours={18} minutes={0} seconds={0} />
        <SeoulTimeViewerStoryComponent hours={18} minutes={29} seconds={59} />
      </Wrapper>

      <Wrapper>
        <div>주말에는 입/퇴실 시간 표시 안 됨</div>

        <SeoulTimeViewerStoryComponent
          hours={8}
          minutes={0}
          seconds={0}
          day={0}
        />
        <SeoulTimeViewerStoryComponent
          hours={8}
          minutes={29}
          seconds={59}
          day={6}
        />
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
