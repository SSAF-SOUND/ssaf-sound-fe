import type { UserInfo } from '~/services/member';
import type {
  GetRecruitApplicantsApiData,
  RecruitApplicant,
  RecruitDetail,
  RecruitParticipantsDetail,
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

// 리쿠르팅 모집 현황 간략정보 (파트당 모집인원, 모집된 인원)
export const createMockRecruitParticipantsProgress = (
  isStudy: boolean
): RecruitParticipantsProgress[] => {
  const recruitParts = Object.values(RecruitParts);
  const filteredRecruitParts = isStudy
    ? recruitParts.filter((name) => name === RecruitParts.STUDY)
    : recruitParts.filter((name) => name !== RecruitParts.STUDY);

  return filteredRecruitParts.map((recruitPart) => {
    const maxParticipantsCount = faker.number.int({ min: 5, max: 10 });
    const currentParticipantsCount = faker.number.int({
      min: 1,
      max: maxParticipantsCount,
    });
    return {
      recruitType: recruitPart,
      limit: maxParticipantsCount,
      currentNumber: currentParticipantsCount,
    };
  });
};

export const createMockRecruitDetail = (
  recruitId: number,
  isStudy = false,
  options: {
    completed?: boolean;
    matchStatus?: string;
  } = {}
): RecruitDetail => {
  const { completed = false, matchStatus } = options;

  const finishedRecruit = completed;
  const mine = Boolean(recruitId % 2); // 1, 3
  const scraped = finishedRecruit;

  const limits = createMockRecruitParticipantsProgress(isStudy);

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
    scrapCount: faker.number.int({ min: 1, max: 1000 }),
    scraped,
    limits,
    skills,
    view: faker.number.int({ min: 1, max: 1000000 }),
    mine,
  };
};

export const recruitDetails = Array(5)
  .fill(undefined)
  .map((_, index) => createMockRecruitDetail(index, Boolean(index % 2)));

// 리쿠르팅 모집 현황중, 참가자의 상세정보 (파트마다 유저의 상세정보)
export const createMockRecruitParticipants = (recruitDetail: RecruitDetail) => {
  const { limits } = recruitDetail;

  return Object.fromEntries(
    limits.map(
      (
        {
          recruitType: part,
          currentNumber: currentParticipantsCount,
          limit: maxParticipantsCount,
        },
        partIndex
      ) => {
        const memberIds = Array(currentParticipantsCount)
          .fill(5000)
          .map((v, index) => v + index)
          .map((v) => v * (partIndex + 1));

        return [
          part,
          {
            limit: maxParticipantsCount,
            members: memberIds.map((memberId) =>
              createMockUser(memberId, true)
            ),
          },
        ];
      }
    )
  ) as Record<RecruitParts, RecruitParticipantsDetail>;
};
export const recruitParticipantsList = recruitDetails.map((recruitDetail) =>
  createMockRecruitParticipants(recruitDetail)
);

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
  //
  recruitApplicants,
  RecruitApplicationDetail,
};
