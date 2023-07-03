import type {
  GetRecruitDetailApiData,
  GetRecruitDetailData,
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
      ...mockSuccess<GetRecruitDetailData>(ctx, {
        category: 'study',
        title: '커뮤니티 웹 프로젝트',
        recruitStart: '2023-06-01',
        recruitEnd: '2023-06-30',
        content: 'string',
        created_at: '2023-06-01',
        modified_at: '2023-06-05',
        deleted_recruit: false,
        finished_recruit: false,
        view: 100,
        skills: [
          {
            skillId: 1,
            name: 'Spring Boot',
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

export const recruitHandlers = [getRecruitDetail];
