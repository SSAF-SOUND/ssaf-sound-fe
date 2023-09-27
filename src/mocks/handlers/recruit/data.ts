import type { UserInfo } from '~/services/member';
import type {
  GetMyRecruitApplicationApiData,
  GetRecruitApplicantsApiData,
  GetRecruitApplicationApiData,
  RecruitApplicant,
  RecruitDetail,
  RecruitParticipantsDetail,
  RecruitParticipantsProgress,
  RecruitSummary,
  RecruitParticipantUserInfo,
  AppliedRecruitSummary,
} from '~/services/recruit';

import { faker } from '@faker-js/faker';

import {
  MatchStatus,
  RecruitCategoryName,
  RecruitParts,
  SkillName,
} from '~/services/recruit';

import { mockHtmlString } from '../common';
import { createMockUser, mockUserInfo, userInfo } from '../member/data';

export const scrapStatus = {
  scraped: true,
  scrapCount: 777,
};

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

export const createMockParticipant = ({
  recruitApplicationId,
  userId,
}: {
  recruitApplicationId: number;
  userId: number;
}): RecruitParticipantUserInfo => {
  return {
    ...createMockUser(userId, true),
    recruitApplicationId,
    // 참여 날짜
    joinedAt: faker.date.past().toISOString(),
  };
};

export const createMockRecruitDetail = (
  recruitId: number,
  isStudy = false,
  options: {
    completed?: boolean;
    matchStatus?: MatchStatus;
    mine?: boolean;
    author?: UserInfo;
  } = {}
): RecruitDetail => {
  const {
    completed = false,
    matchStatus: matchStatusOption,
    mine: mineOption,
    author: authorOption,
  } = options;

  const finishedRecruit = completed;
  const mine = mineOption === undefined ? Boolean(recruitId % 2) : mineOption; // 1, 3
  const matchStatusArray = Object.values(MatchStatus);
  const matchStatusIndex = faker.number.int({
    min: 0,
    max: matchStatusArray.length - 1,
  });

  const matchStatus =
    matchStatusOption === undefined
      ? matchStatusArray[matchStatusIndex]
      : matchStatusOption;

  const author =
    authorOption === undefined
      ? mockUserInfo.certifiedSsafyUserInfo
      : authorOption;

  const limits = createMockRecruitParticipantsProgress(isStudy);

  const skills = Object.values(SkillName).map((skillName, index) => ({
    skillId: index + 1,
    name: skillName,
  }));

  return {
    recruitId,
    contactURI: 'https://www.naver.com',
    questions: ['Question'],
    author,
    category: isStudy ? RecruitCategoryName.STUDY : RecruitCategoryName.PROJECT,
    title: faker.word.words({ count: 2 }),
    content: mockHtmlString,
    recruitStart: faker.date.past().toISOString(),
    recruitEnd: faker.date.future().toISOString(),
    finishedRecruit,
    scrapCount: scrapStatus.scrapCount,
    scraped: scrapStatus.scraped,
    limits,
    skills,
    view: faker.number.int({ min: 1, max: 1000000 }),

    mine,
    matchStatus,
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
              createMockParticipant({
                userId: memberId,
                recruitApplicationId: 1,
              })
            ),
          } as RecruitParticipantsDetail,
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

export const createMockRecruitApplicants = (
  recruitId: number,
  options: Partial<{ recruitDetail: RecruitDetail }> = {}
): GetRecruitApplicantsApiData['data'] => {
  const { recruitDetail: optionRecruitDetail } = options;
  const recruitDetail = optionRecruitDetail ?? recruitDetails[recruitId];
  if (!recruitDetail) {
    throw new Error(
      `recruitId: ${recruitId}에 해당하는 리쿠르팅 디테일 데이터가 없습니다.`
    );
  }

  const recruitParts = Object.values(RecruitParts);
  const activeRecruitParts =
    recruitDetail.category === RecruitCategoryName.PROJECT
      ? recruitParts.filter((part) => part !== RecruitParts.STUDY)
      : recruitParts.filter((part) => part === RecruitParts.STUDY);

  return {
    recruitId,
    recruitApplications: {
      ...(Object.fromEntries(
        activeRecruitParts.map((part, partIndex) => {
          const userIds = Array(16)
            .fill(1_000_000)
            .map((v, index) => v + index)
            .map((v) => v * (partIndex + 1));

          return [
            part,
            userIds.map((userId) => createMockRecruitApplicant(userId)),
          ];
        })
      ) as Partial<Record<RecruitParts, RecruitApplicant[]>>),
    },
  };
};

export const createMockRecruitSummary = (
  recruitId: number,
  options: Partial<{
    finishedRecruit: boolean;
    skillCount: number;
    mine: boolean;
    category: RecruitCategoryName;
  }> = {}
): RecruitSummary => {
  const {
    finishedRecruit = false,
    skillCount = 10,
    mine = false,
    category = RecruitCategoryName.PROJECT,
  } = options;

  const maxParticipantsCount = 10;
  const userIdOffset = 50000;
  const userIds = Array(4)
    .fill(undefined)
    .map((_, index) => index + userIdOffset);

  const participants = Object.values(RecruitParts)
    .filter((part) => {
      if (category === RecruitCategoryName.PROJECT)
        return part !== RecruitParts.STUDY;

      if (category === RecruitCategoryName.STUDY)
        return part === RecruitParts.STUDY;
    })
    .map((part) => {
      return {
        recruitType: part,
        limit: maxParticipantsCount,
        members: userIds.map((userId) => createMockUser(userId)),
      };
    });

  return {
    category,
    mine,

    recruitId,
    finishedRecruit,
    content: mockHtmlString,
    recruitEnd: faker.date.future().toISOString(),
    skills: Object.values(SkillName)
      .slice(0, skillCount)
      .map((skillName, index) => ({ skillId: index, name: skillName })),
    title: `${
      (recruitId % 10) + 1
    }주동안 열심히 프로젝트 하실 분 모집합니다. `.repeat(2),
    participants: participants,
  };
};

export const projectRecruitSummaries = Array(30)
  .fill(undefined)
  .map((_, index) => {
    const recruitId = index + 1;
    const finishedRecruit = !(recruitId % 10);

    return createMockRecruitSummary(recruitId, {
      finishedRecruit,
      skillCount: 10,
    });
  });

export const studyRecruitSummaries = Array(30)
  .fill(undefined)
  .map((_, index) => {
    const recruitId = index + 10000;
    const finishedRecruit = !(recruitId % 10);

    return createMockRecruitSummary(recruitId, {
      category: RecruitCategoryName.STUDY,
      finishedRecruit,
      skillCount: 10,
    });
  });

const matchStatuses = Object.values(MatchStatus);
export const appliedProjectRecruitSummaries: AppliedRecruitSummary[] =
  projectRecruitSummaries.map((recruit, index) => {
    const matchStatus = matchStatuses[index % matchStatuses.length];
    return {
      ...recruit,
      appliedAt: faker.date.past().toISOString(),
      matchStatus,
    };
  });

export const appliedStudyRecruitSummaries: AppliedRecruitSummary[] =
  projectRecruitSummaries.map((recruit, index) => {
    const matchStatus = matchStatuses[index % matchStatuses.length];
    return {
      ...recruit,
      appliedAt: faker.date.past().toISOString(),
      matchStatus,
    };
  });

export const createMockMyRecruitApplication = (
  recruitId: number,
  options: Partial<{
    category: RecruitCategoryName;
    matchStatus: MatchStatus;
    recruitApplicationId: number;
  }> = {}
): GetMyRecruitApplicationApiData['data'] => {
  const {
    category = RecruitCategoryName.PROJECT,
    matchStatus = MatchStatus.PENDING,
    recruitApplicationId = 1,
  } = options;

  const recruitType =
    category === RecruitCategoryName.STUDY
      ? RecruitParts.STUDY
      : RecruitParts.FRONTEND;

  return {
    recruitApplicationId,
    category,
    recruitId,
    matchStatus,
    question: 'Question',
    reply: 'Answer',
    recruitType,
    appliedAt: faker.date.past().toISOString(),
  };
};

export const createMockRecruitApplication = (
  recruitId: number,
  options: Partial<{
    category: RecruitCategoryName;
    matchStatus: MatchStatus;
    recruitApplicationId: number;
    liked: boolean;
  }> = {}
): GetRecruitApplicationApiData['data'] => {
  const { liked = false } = options;
  return {
    ...createMockMyRecruitApplication(recruitId, options),
    author: userInfo.certifiedSsafyUserInfo,
    liked,
  };
};
