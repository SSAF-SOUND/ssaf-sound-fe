import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { userInfo } from '~/mocks/handlers/member/data';
import {
  createMockRecruitDetail,
  createMockRecruitParticipants,
} from '~/mocks/handlers/recruit/data';
import RecruitDetailPage from '~/pages/recruits/[recruitId]';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import {
  MatchStatus,
  RecruitCategoryName,
  useSetRecruitDetail,
} from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';
import { disableArgs } from '~/stories/utils';

// 리쿠르팅 상태: 모집 미완료 | 모집 완료
// 리쿠르팅 종류: 프로젝트 | 스터디
// 리쿠르팅 유저: 지원자 | 참여자 | 작성자(mine) | 로그아웃 유저

const recruitId = 10000;

const projectDetail = createMockRecruitDetail(recruitId, false, {
  completed: false,
  mine: false,
  matchStatus: MatchStatus.INITIAL,
});
const studyDetail = createMockRecruitDetail(recruitId, true, {
  completed: false,
  mine: false,
  matchStatus: MatchStatus.INITIAL,
});

const signedInProjectDetail = { ...projectDetail };
const signedInStudyDetail = { ...studyDetail };

const notSignedInProjectDetail = { ...projectDetail, mine: false };
const notSignedInStudyDetail = { ...studyDetail, mine: false };

const projectParticipantsDetail = createMockRecruitParticipants(projectDetail);
const studyParticipantsDetail = createMockRecruitParticipants(studyDetail);

const meta: Meta<typeof RecruitDetailPage> = {
  title: 'Page/Recruit/Detail',
  component: RecruitDetailPage,
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      const setMyInfo = useSetMyInfo();
      const setRecruitDetail = useSetRecruitDetail(recruitId);

      setMyInfo(userInfo.certifiedSsafyUserInfo);
      setRecruitDetail(projectDetail);
      queryClient.setQueryData(
        queryKeys.recruit.participants(recruitId),
        projectParticipantsDetail
      );

      useEffect(() => {
        queryClient.cancelQueries(queryKeys.recruit.detail(recruitId));
      }, [queryClient]);

      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
  args: { recruitId },
  argTypes: { ...disableArgs(['recruitId']) },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

interface RecruitDetailPageStoryArgs {
  category: RecruitCategoryName;
}
type RecruitDetailPageStory = StoryObj<RecruitDetailPageStoryArgs>;

export const NotSignedIn: RecruitDetailPageStory = {
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
  args: {
    category: RecruitCategoryName.PROJECT,
  },
  argTypes: {
    category: {
      name: '카테고리',
      options: [RecruitCategoryName.PROJECT, RecruitCategoryName.STUDY],
      control: {
        type: 'radio',
        labels: {
          [RecruitCategoryName.PROJECT]: '프로젝트',
          [RecruitCategoryName.STUDY]: '스터디',
        },
      },
    },
  },
  render: function Render(args) {
    const { category } = args;
    const queryClient = useQueryClient();
    const participantsQueryKey = queryKeys.recruit.participants(recruitId);
    const setRecruitDetail = useSetRecruitDetail(recruitId);

    if (category === RecruitCategoryName.STUDY) {
      setRecruitDetail(notSignedInStudyDetail);
      queryClient.setQueryData(participantsQueryKey, studyParticipantsDetail);
    } else {
      setRecruitDetail(notSignedInProjectDetail);
      queryClient.setQueryData(participantsQueryKey, projectParticipantsDetail);
    }

    return <RecruitDetailPage recruitId={recruitId} />;
  },
};

interface RecruitDetailPageSignedInStoryArgs
  extends RecruitDetailPageStoryArgs {
  mine: boolean;
  completed: boolean;
  matchStatus: MatchStatus;
  existsContact?: boolean;
}

type RecruitDetailPageSignedInStory =
  StoryObj<RecruitDetailPageSignedInStoryArgs>;
export const SignedIn: RecruitDetailPageSignedInStory = {
  ...NotSignedIn,
  decorators: [],
  args: {
    ...NotSignedIn.args,
    mine: false,
    completed: false,
    existsContact: true,
  },
  argTypes: {
    ...NotSignedIn.argTypes,
    completed: {
      name: '모집 완료',
    },
    mine: {
      name: '내 리쿠르팅',
    },
    matchStatus: {
      name: '매칭 상태',
      options: Object.values(MatchStatus),
      control: {
        type: 'radio',
        labels: {
          [MatchStatus.INITIAL]: '신청 전',
          [MatchStatus.PENDING]: '수락 대기',
          [MatchStatus.SUCCESS]: '참가 확정',
          [MatchStatus.REJECTED]: '거절됨',
        },
      },
    },
    existsContact: {
      name: '연락처 유무',
    },
  },
  render: function Render(args) {
    const {
      category,
      mine,
      completed,
      matchStatus,
      existsContact = true,
    } = args;
    const queryClient = useQueryClient();
    const participantsQueryKey = queryKeys.recruit.participants(recruitId);
    const setRecruitDetail = useSetRecruitDetail(recruitId);

    if (category === RecruitCategoryName.STUDY) {
      signedInStudyDetail.contactURI = existsContact ? 'www.example.com' : '';
      signedInStudyDetail.mine = mine;
      signedInStudyDetail.finishedRecruit = completed;
      signedInStudyDetail.matchStatus = matchStatus;
      setRecruitDetail(signedInStudyDetail);

      queryClient.setQueryData(participantsQueryKey, studyParticipantsDetail);
    } else {
      signedInProjectDetail.contactURI = existsContact ? 'www.example.com' : '';
      signedInProjectDetail.mine = mine;
      signedInProjectDetail.finishedRecruit = completed;
      signedInProjectDetail.matchStatus = matchStatus;
      setRecruitDetail(signedInProjectDetail);

      queryClient.setQueryData(participantsQueryKey, projectParticipantsDetail);
    }

    return <RecruitDetailPage recruitId={recruitId} />;
  },
};
