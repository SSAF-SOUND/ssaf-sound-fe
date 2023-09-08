import type { UserInfo } from '~/services/member';
import type {
  GetRecruitApplicantsApiData,
  Recruit,
  RecruitApplicant,
  RecruitDetail,
  recruitMembersType,
  RecruitParticipantsProgress,
} from '~/services/recruit';

import { faker } from '@faker-js/faker';

import {
  MatchStatus,
  RecruitCategoryName,
  RecruitParts,
  SkillName,
} from '~/services/recruit';

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

export const createMockRecruitParticipantsProgress =
  (): RecruitParticipantsProgress[] => {
    return Object.values(RecruitParts).map((recruitPart) => {
      const maxParticipantsCount = faker.number.int({ min: 5, max: 10 });
      const currentParticipantsCount = faker.number.int({ min: 1, max: maxParticipantsCount });
      return {
        recruitType: recruitPart,
        limit: maxParticipantsCount,
        currentNumber: currentParticipantsCount,
      };
    });
  };

export const createMockRecruitDetail = (
  recruitId: number,
  isStudy = false
): RecruitDetail => {
  const finishedRecruit = Boolean(recruitId % 2);
  const scraped = finishedRecruit;

  const progress = createMockRecruitParticipantsProgress();

  const limits = isStudy
    ? progress.filter(({ recruitType }) => recruitType === RecruitParts.STUDY)
    : progress.filter(({ recruitType }) => recruitType !== RecruitParts.STUDY);

  const skills = Object.values(SkillName).map((skillName, index) => ({
    skillId: index + 1,
    name: skillName,
  }));

  return {
    recruitId,
    contactURI: 'https://www.naver.com',
    questions: ['Question'],
    author: userInfo.certifiedSsafyUserInfo,
    category: isStudy ? RecruitCategoryName.STUDY : RecruitCategoryName.PROJECT,
    title: faker.word.words({ count: 2 }),
    content: mockHtmlString,
    recruitStart: faker.date.past().toISOString(),
    recruitEnd: faker.date.future().toISOString(),
    finishedRecruit,
    scrapCount: faker.number.int(),
    scraped,
    limits,
    skills,
    view: faker.number.int({ min: 1, max: 1000000 }),
  };
};

export const recruitMocks = Array(100)
  .fill(undefined)
  .map((_, index) => {
    return createMockRecruits(index);
  });

const recruitDetail: Record<RecruitCategoryName, RecruitDetail> = {
  [RecruitCategoryName.PROJECT]: createMockRecruitDetail(1),
  [RecruitCategoryName.STUDY]: createMockRecruitDetail(2, true),
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

  //
  recruitMocks,
  recruitSummary,
  recruitMembers,
  RecruitScrap,
  recruitApplicants,
  RecruitApplicationDetail,
};
