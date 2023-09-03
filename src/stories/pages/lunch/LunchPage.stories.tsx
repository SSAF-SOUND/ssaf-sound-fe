import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { LunchLayout } from '~/components/Layout';
import {
  LunchCampusSelectBox,
  LunchIntroduction,
  LunchTabs,
} from '~/components/Lunch';
import LunchMenus from '~/components/Lunch/LunchMenus';
import NavigationGroup from '~/components/NavigationGroup';
import {
  getEmptyLunchMenusWithPollStatus,
  getLunchMenusWithPollStatus,
  getLunchMenusWithPollStatusError,
  pollLunchMenuError,
  revertPolledLunchMenuError,
} from '~/mocks/handlers';
import { userInfo } from '~/mocks/handlers/member/data';
import { queryKeys } from '~/react-query/common';
import { LunchDateSpecifier } from '~/services/lunch';
import { useSetMyInfo } from '~/services/member';
import { useCampuses } from '~/services/meta';
import { PageLayout } from '~/stories/Layout';

const LunchPageStoryComponent = () => {
  const { data: campuses } = useCampuses();
  const [campus, setCampus] = useState(campuses[0]);
  const queryClient = useQueryClient();
  const setMyInfo = useSetMyInfo();

  setMyInfo(userInfo.certifiedSsafyUserInfo);

  useEffect(() => {
    queryClient.resetQueries(queryKeys.lunch.self());
  }, [queryClient]);

  return (
    <PageLayout>
      <LunchLayout>
        <NavigationGroup />
        <LunchIntroduction />
        <LunchCampusSelectBox
          selectedCampus={campus}
          campuses={campuses}
          onCampusChange={(value) => setCampus(value)}
        />
        <LunchTabs />
        <LunchMenus campus={campus} dateSpecifier={LunchDateSpecifier.TODAY} />
      </LunchLayout>
    </PageLayout>
  );
};

const meta: Meta<typeof LunchPageStoryComponent> = {
  title: 'Page/Lunch',
  component: LunchPageStoryComponent,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type LunchPageStory = StoryObj<typeof LunchPageStoryComponent>;

export const Normal: LunchPageStory = {};

export const PollError: LunchPageStory = {
  parameters: {
    msw: {
      handlers: {
        lunch: [
          getLunchMenusWithPollStatus,
          pollLunchMenuError,
          revertPolledLunchMenuError,
        ],
      },
    },
  },
};

export const FailToLoadLunchMenu: LunchPageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();

      useEffect(() => {
        queryClient.resetQueries(queryKeys.lunch.self());
      }, [queryClient]);

      return <Story />;
    },
  ],
  parameters: {
    msw: {
      handlers: {
        lunch: [getLunchMenusWithPollStatusError],
      },
    },
  },
};

export const NotSignedIn: LunchPageStory = {
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setMyInfo(null);
      }, [setMyInfo]);
      return <Story />;
    },
  ],
};

export const NotExistData: LunchPageStory = {
  parameters: {
    msw: {
      handlers: {
        lunch: [getEmptyLunchMenusWithPollStatus],
      },
    },
  },
};
