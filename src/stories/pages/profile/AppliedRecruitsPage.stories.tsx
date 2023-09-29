import type { Meta, StoryObj } from '@storybook/react';
import type { InfiniteData } from '@tanstack/query-core';
import type { GetAppliedRecruitsApiData } from '~/services/recruit';


import { useQueryClient } from '@tanstack/react-query';

import { userInfo } from '~/mocks/handlers/member/data';
import AppliedRecruitsPage from '~/pages/profile/applied-recruits/[recruitCategoryName]';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { RecruitCategoryName } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof AppliedRecruitsPage> = {
  title: 'Page/Profile/AppliedRecruits',
  component: AppliedRecruitsPage,
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      queryClient.removeQueries(allAppliedRecruitsQueryKey);

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
  },
  args: { recruitCategoryName: RecruitCategoryName.PROJECT },
};

export default meta;

type AppliedRecruitsPageStory = StoryObj<typeof AppliedRecruitsPage>;

const appliedRecruitsQueryKey = queryKeys.recruit.appliedList.filter({
  category: RecruitCategoryName.PROJECT,
});
const allAppliedRecruitsQueryKey = appliedRecruitsQueryKey.slice(0, -1);

export const Default: AppliedRecruitsPageStory = {};

const emptyRecruits: InfiniteData<GetAppliedRecruitsApiData['data']> = {
  pages: [{ appliedRecruits: [], nextCursor: null, isLast: true }],
  pageParams: [null],
};

export const NotExist: AppliedRecruitsPageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      queryClient.setQueryData<InfiniteData<GetAppliedRecruitsApiData['data']>>(
        appliedRecruitsQueryKey,
        emptyRecruits
      );
      return <Story />;
    },
  ],
};
