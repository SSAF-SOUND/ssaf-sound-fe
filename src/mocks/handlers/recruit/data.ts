import type { UserInfo } from '~/services/member';
import type {
  GetRecruitApplicantsApiData,
  RecruitApplicant,
  RecruitCategory,
  RecruitDetail,
  recruitMembersType,
  RecruitParticipant,
  Recruits,
  RecruitSummary,
  SkillsType,
} from '~/services/recruit';

import { faker } from '@faker-js/faker';

import { MatchStatus, RecruitParts, SkillName } from '~/services/recruit';

import { createMockUser, userInfo } from '../member/data';

const recruitDetail: Record<RecruitCategory, RecruitDetail> = {
  study: {
    recruitId: 1,
    userInfo: { ...userInfo.certifiedSsafyUserInfo },
    category: 'study',
    title: 'string',
    recruitStart: '2023-06-01',
    recruitEnd: '2023-06-30',
    content: 'string',
    createdAt: '2023-06-01',
    modifiedAt: '2023-06-05',
    deletedRecruit: false,
    finishedRecruit: false,
    view: 100,
    skills: [],
    limits: [],
    scrapCount: 2,
  },
  project: {
    recruitId: 2,
    userInfo: { ...userInfo.certifiedSsafyUserInfo },
    category: 'project',
    title: 'prject test',
    recruitStart: '2023-06-12',
    recruitEnd: '2023-06-15',
    content: 'tttttt',
    createdAt: '2023-06-07',
    modifiedAt: '2023-06-05',
    deletedRecruit: false,
    finishedRecruit: true,
    view: 100,
    skills: [
      {
        skillId: 1,
        name: SkillName.REACT,
      },
      {
        skillId: 2,
        name: SkillName.SPRING,
      },
    ],
    limits: Object.values(RecruitParts).map((part) => ({
      recruitType: part,
      limit: faker.number.int({ min: 10, max: 20 }),
      currentNumber: faker.number.int({ min: 1, max: 10 }),
    })),
    scrapCount: 100,
  },
};

const recruitSummary: RecruitSummary = {
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
  ] as unknown as SkillsType[],
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
  ] as unknown as RecruitParticipant[],
};

const recruits: Recruits = {
  recruits: [recruitSummary],
  currentPage: 0,
  totalPages: 1,
  lastPage: true,
};

const recruitTypesOfRecruitMembers = Object.fromEntries(
  Object.values(RecruitParts).map((part, partIndex) => [
    part,
    {
      limit: faker.number.int({ min: 10, max: 20 }),
      members: [5001, 5002, 5003, 5004, 5005].map((memberId) => {
        return createMockUser(memberId * (partIndex + 1));
      }),
    },
  ])
);

const recruitMembers: recruitMembersType = {
  recruitTypes: recruitTypesOfRecruitMembers,
};

const RecruitScrap = {
  scrapCount: 87,
};

const createMockRecruitApplicant = (userId: number): RecruitApplicant => {
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
      Object.values(RecruitParts).map((recruitPart, recruitPartIndex) => {
        const userIds = [10000, 10001, 10002, 10003].map(
          (userId) => userId * (recruitPartIndex + 1)
        );

        return [
          [recruitPart],
          userIds.map((userId) => createMockRecruitApplicant(userId)),
        ];
      })
    ),
  },
};

export const RecruitData = {
  recruitDetail,
  recruits,
  recruitSummary,
  recruitMembers,
  RecruitScrap,
  recruitApplicants,
};
