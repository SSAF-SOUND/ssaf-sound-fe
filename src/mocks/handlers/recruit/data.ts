import type {
  RecruitCategory,
  Recruits,
  RecruitDetail,
  SkillsType,
  RecruitParticipant,
  RecruitSummary,
  recruitMembersType,
} from '~/services/recruit';

import { userInfo } from '../member/data';

const recruitDetail: Record<RecruitCategory, RecruitDetail> = {
  study: {
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
  },
  project: {
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
        name: 'Spring',
      },
      {
        skillId: 2,
        name: 'React',
      },
    ],
    limits: [
      {
        recruitType: '기획/디자인',
        limit: 2,
        currentNumber: 1,
      },
      {
        recruitType: '프론트엔드',
        limit: 3,
        currentNumber: 0,
      },
    ],
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

const recruitMembers: recruitMembersType = {
  recruitTypes: {
    '기획/디자인': {
      limit: 3,
      members: [
        { ...userInfo.certifiedSsafyUserInfo },
        { ...userInfo.nonSsafyUserInfo },
      ],
    },
    백엔드: {
      limit: 3,
      members: [
        { ...userInfo.certifiedSsafyUserInfo },
        { ...userInfo.nonSsafyUserInfo },
      ],
    },
  },
};

export const RecruitData = {
  recruitDetail,
  recruits,
  recruitSummary,
  recruitMembers,
};
