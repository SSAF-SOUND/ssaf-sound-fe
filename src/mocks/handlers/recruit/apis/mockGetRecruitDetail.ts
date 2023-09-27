import type { GetRecruitDetailApiData } from '~/services/recruit';

import { rest } from 'msw';

import { createMockRecruitDetail } from '~/mocks/handlers/recruit/data';
import { mockSuccess, restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getRecruitDetailMethod = 'get';
const getRecruitDetailEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  endpoints.recruit.detail(':recruitId')
);

export const createMockGetRecruitDetail = (
  recruitDetail: GetRecruitDetailApiData['data'],
  fallbackRecruitId = 1
) => {
  return rest[getRecruitDetailMethod](
    getRecruitDetailEndpoint,
    (req, res, ctx) => {
      const params = req.params as { recruitId: string };
      const recruitId =
        params.recruitId && !Number.isNaN(Number(params.recruitId))
          ? Number(params.recruitId)
          : fallbackRecruitId;

      return res(
        ...mockSuccess<GetRecruitDetailApiData['data']>(ctx, {
          ...recruitDetail,
          recruitId,
        })
      );
    }
  );
};

export const mockGetRecruitDetail = createMockGetRecruitDetail(
  createMockRecruitDetail(1, false),
  1
);

export const mockGetRecruitDetailError = restError(
  getRecruitDetailMethod,
  getRecruitDetailEndpoint,
  {
    message: 'mockGetRecruitDetail Error',
  }
);
