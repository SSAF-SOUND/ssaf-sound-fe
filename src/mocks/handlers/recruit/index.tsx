import type {
  GetRecruitDetailApiData,
  GetRecruitDetailData,
} from '~/services/recruit';

import { rest } from 'msw';

import { mockSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getRecruitDetail = rest.get<never, never, GetRecruitDetailApiData>(
  composeUrls(API_URL, '/recruit/detail'),
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ...mockSuccess<GetRecruitDetailData>(ctx, {
        category: 'study',
        title: 'string',
        recruitStart: new Date('2023-06-01'),
        recruitEnd: new Date('2023-06-30'),
        content: 'string',
        created_at: new Date('2023-06-01'),
        modified_at: new Date('2023-06-05'),
        deleted_recruit: false,
        finished_recruit: false,
        view: 100,
      })
    );
  }
);

export const recruitHandlers = [getRecruitDetail];
