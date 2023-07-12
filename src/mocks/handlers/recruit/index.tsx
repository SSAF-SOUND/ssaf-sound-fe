import type {
  GetRecruitDetailApiData,
  GetRecruitsApiData,
  RecruitDetailParams,
  RecruitParticipantParams,
  RecruitsParams,
  SkillsType,
} from '~/services/recruit';

import { rest } from 'msw';

import { mockSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getRecruitDetail = rest.get<never, never, GetRecruitDetailApiData>(
  composeUrls(API_URL, endpoints.recruit.detail()),
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ...mockSuccess<RecruitDetailParams>(ctx, {
        category: 'study',
        title: '커뮤니티 웹 프로젝트',
        recruitStart: '2023-06-01',
        recruitEnd: '2023-06-30',
        content: 'string',
        createdAt: '2023-06-01',
        modifiedAt: '2023-06-05',
        deletedRecruit: false,
        finishedRecruit: false,
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
          },
          {
            recruitType: '프론트엔드',
            limit: 3,
          },
        ],
      })
    );
  }
);

const data = {
  recruits: [
    {
      recruitId: 1,
      title: '제목1',
      finishedRecruit: true,
      recruitEnd: '2023-07-02',
      content: '나른이른린릔르니ㅏ른라ㅣㄴㄴ',
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
      ] as unknown as RecruitParticipantParams[],
    },
  ],
  currentPage: 0,
  totalPages: 1,
  lastPage: true,
};

const getRecruits = rest.get<never, never, GetRecruitsApiData>(
  composeUrls(API_URL, endpoints.recruit.data()),
  (req, res, ctx) => {
    return res(ctx.delay(500), ...mockSuccess<RecruitsParams>(ctx, data));
  }
);

export const recruitHandlers = [getRecruitDetail, getRecruits];
