import type { Meta, StoryObj } from '@storybook/react';
import type { InfiniteData } from '@tanstack/query-core';
import type { GetRecruitsApiData } from '~/services/recruit';

import { useQueryClient } from '@tanstack/react-query';

import { userInfo } from '~/mocks/handlers/member/data';
import RecruitsPage from '~/pages/recruits';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { RecruitCategoryName } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitsPage> = {
  title: 'Page/Recruit/Retrieve',
  component: RecruitsPage,
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      queryClient.removeQueries(queryKey);
      const setMyInfo = useSetMyInfo();
      setMyInfo(userInfo.certifiedSsafyUserInfo);

      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: {
        member: [],
      },
    },
  },
};

export default meta;

type RecruitsPageStory = StoryObj<typeof RecruitsPage>;

const queryKey = queryKeys.recruit.list({
  category: RecruitCategoryName.PROJECT,
  keyword: '',
  recruitParts: [],
  skills: [],
  includeCompleted: false,
});
export const SignedIn: RecruitsPageStory = {
  decorators: [
    (Story) => {


      return <Story />;
    },
  ],
};
export const NotSignedIn: RecruitsPageStory = {
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setMyInfo(null);

      return <Story />;
    },
  ],
};

const emptyRecruits = {
  pages: [{ recruits: [], nextCursor: null, isLast: true }],
  pageParams: [null],
};

export const NotExist: RecruitsPageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      queryClient.setQueryData<InfiniteData<GetRecruitsApiData['data']>>(
        queryKey,
        emptyRecruits
      );
      return <Story />;
    },
  ],
};
