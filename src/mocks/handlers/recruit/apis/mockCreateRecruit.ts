import type { CreateRecruitApiData } from '~/services/recruit';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';

const createRecruitMethod = 'post';
const createRecruitEndpoint = endpoints.recruit.self();

export const createMockCreateRecruit = (recruitId = 1) => {
  return restSuccess<CreateRecruitApiData['data']>(
    createRecruitMethod,
    createRecruitEndpoint,
    {
      data: {
        recruitId,
      },
    }
  );
};

export const mockCreateRecruit = createMockCreateRecruit(1);

export const mockCreateRecruitError = restError(
  createRecruitMethod,
  createRecruitEndpoint,
  {
    message: 'mockCreateRecruit Error',
  }
);
