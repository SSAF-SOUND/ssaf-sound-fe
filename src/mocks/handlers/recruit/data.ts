import type { UserInfo } from '~/services/member';
import type {
  GetRecruitApplicantsApiData,
  RecruitApplicant,
  recruitMembersType,
} from '~/services/recruit';
import type { RecruitDetail, Recruit } from '~/services/recruit/apis';

import { faker } from '@faker-js/faker';

import { MatchStatus, RecruitParts, SkillName } from '~/services/recruit';

import { mockHtmlString } from '../common';
import { createMockUser, userInfo } from '../member/data';

export const createMockRecruits = (id: number): Recruit => {
  const booleanValue = Boolean(id % 2);

  return {
    recruitId: id,
    title: `${id} 리쿠르트`,
    finishedRecruit: booleanValue,
    recruitEnd: faker.date.recent().toISOString(),
    content: mockHtmlString,

    skills: [
      {
        id: 1,
        name: SkillName.ANDROID,
      },
      {
        id: 2,
        name: SkillName.REACT,
      },
    ],

    participants: [
      {
        recruitType: RecruitParts.APP,
        limit: 4,
        members: [
          {
            nickname: 'KIM',
            major: true,
          },
        ],
      },
      {
        recruitType: RecruitParts.BACKEND,
        limit: 3,
        members: [
          {
            nickname: 'KIM',
            major: false,
          },
        ],
      },
    ],
  };
};

export const recruitMocks = Array(100)
  .fill(undefined)
  .map((_, index) => {
    return createMockRecruits(index);
  });

const recruitDetail: Record<string, RecruitDetail> = {
  project: {
    recruitId: 1,
    contactURI: 'https://open.kakao.com/o/sA8Kb83b',
    question: ['Test Question'],
    author: userInfo.certifiedSsafyUserInfo,
    category: 'study',
    title: 'string',
    recruitStart: '2023-06-01',
    recruitEnd: '2023-06-30',
    content: 'string',
    finishedRecruit: false,
    view: 100,
    skills: [],
    limits: [
      {
        recruitType: RecruitParts.APP,
        limit: 6,
        currentNumber: 2,
      },
    ],
    scrapCount: 2,
    scraped: false,
  },
};

const recruitSummary: any = {
  recruitId: 1,
  title: '제목1',
  finishedRecruit: true,
  recruitEnd: '2023-07-02',
  skills: [
    {
      skillId: 1,
      name: 'Spring',
    },
    {
      skillId: 2,
      name: 'React',
    },
  ] as any,
  participants: [
    {
      recruitType: '기획/디자인',
      limit: 3,
      members: [
        {
          nickName: 'khs',
          major: true,
        },
        {
          nickName: 'kds',
          major: true,
        },
      ],
    },
  ] as any,
};

const recruitTypesOfRecruitMembers = Object.fromEntries(
  Object.values(RecruitParts).map((part, partIndex) => {
    const partInfo = recruitDetail.project.limits.find(
      ({ recruitType }) => part === recruitType
    );

    const currentNumber = partInfo?.currentNumber as number;
    const limit = partInfo?.limit as number;

    const memberIds = Array(20)
      .fill(5000)
      .map((v, index) => v + index)
      .map((v) => v * (partIndex + 1))
      .slice(0, currentNumber);

    return [
      part,
      {
        limit: limit,
        members: memberIds.map((memberId) => createMockUser(memberId)),
      },
    ];
  })
);

const recruitMembers: recruitMembersType = {
  recruitTypes: recruitTypesOfRecruitMembers,
};

const RecruitScrap = {
  scrapCount: 87,
};

export const createMockRecruitApplicant = (
  userId: number
): RecruitApplicant => {
  const liked = Boolean(userId % 2);
  const author: UserInfo = {
    ...userInfo.certifiedSsafyUserInfo,
    memberId: userId,
  };

  const matchStatusValues = Object.values(MatchStatus);
  const matchStatus =
    matchStatusValues[
      faker.number.int({ min: 0, max: matchStatusValues.length - 1 })
    ];

  return {
    liked,
    question: 'QuestionQuestionQuestionQuestion',
    reply: 'ReplyReplyReplyReplyReplyReply',
    matchStatus,
    author,
    recruitApplicationId: userId,
    appliedAt: faker.date.past().toISOString(),
  };
};

const recruitApplicants: GetRecruitApplicantsApiData['data'] = {
  recruitId: 1,
  recruitApplications: {
    ...Object.fromEntries(
      Object.values(RecruitParts).map((part, partIndex) => {
        const userIds = Array(16)
          .fill(1_000_000)
          .map((v, index) => v + index)
          .map((v) => v * (partIndex + 1));

        return [
          [part],
          userIds.map((userId) => createMockRecruitApplicant(userId)),
        ];
      })
    ),
  },
};

const RecruitApplicationDetail = {
  recruitId: 1,
  recruitApplicationId: 1,
  recruitType: '프론트엔드',
  matchStatus: 'WAITING_REGISTER_APPROVE',
  author: {
    memberId: 100,
    nickname: 'TIM',
    memberRole: 'user',
    ssafyMember: true,
    isMajor: true,
    ssafyInfo: {
      semester: 9,
      campus: '서울',
      certificationState: 'CERTIFIED',
      majorTrack: 'Java',
    },
  },
  reply: '취업 준비를 위해서 신청하게되었습니다.',
  question: '프로젝트에 참여하고자 하는 동기가 무엇인가요?',
  liked: false,
};

export const RecruitData = {
  recruitDetail,
  recruitMocks,
  recruitSummary,
  recruitMembers,
  RecruitScrap,
  recruitApplicants,
  RecruitApplicationDetail,
};
