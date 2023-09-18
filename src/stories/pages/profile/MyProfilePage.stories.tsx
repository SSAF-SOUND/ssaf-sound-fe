import type { Meta, StoryObj } from '@storybook/react';
import type { InfiniteData } from '@tanstack/query-core';
import type { UserPortfolio } from '~/services/member';
import type { GetJoinedRecruitsApiData } from '~/services/recruit';

import { useQueryClient } from '@tanstack/react-query';

import { userInfo } from '~/mocks/handlers/member/data';
import MyProfilePage from '~/pages/profile/';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { RecruitCategoryName } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MyProfilePage> = {
  title: 'Page/Profile/MyProfile',
  component: MyProfilePage,
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      setMyInfo(mockUser);

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
};

export default meta;

type MyProfilePageStory = StoryObj<typeof MyProfilePage>;

export const Default: MyProfilePageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      queryClient.removeQueries(myPortfolioQueryKey);
      queryClient.removeQueries(myJoinedProjectsQueryKey);
      queryClient.removeQueries(myJoinedStudiesQueryKey);
      return <Story />;
    },
  ],
};

const mockUser = userInfo.certifiedSsafyUserInfo;
const myPortfolioQueryKey = queryKeys.user.myPortfolio();
const myJoinedProjectsQueryKey = queryKeys.recruit.joinedList({
  category: RecruitCategoryName.PROJECT,
  memberId: mockUser.memberId,
});
const myJoinedStudiesQueryKey = queryKeys.recruit.joinedList({
  category: RecruitCategoryName.STUDY,
  memberId: mockUser.memberId,
});

const emptyPortfolio: UserPortfolio = {
  memberLinks: [],
  selfIntroduction: '',
  skills: [],
};
const emptyJoinedRecruits: InfiniteData<GetJoinedRecruitsApiData['data']> = {
  pages: [
    {
      nextCursor: null,
      isLast: true,
      recruits: [],
    },
  ],
  pageParams: [null],
};

export const Empty: MyProfilePageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      queryClient.setQueryData<UserPortfolio>(
        myPortfolioQueryKey,
        emptyPortfolio
      );
      queryClient.setQueryData(myJoinedProjectsQueryKey, emptyJoinedRecruits);
      queryClient.setQueryData(myJoinedStudiesQueryKey, emptyJoinedRecruits);
      return <Story />;
    },
  ],
};
