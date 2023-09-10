import type {
  CreateRecruitBody,
  CreateRecruitParams,
} from '~/services/recruit';

import { endpoints } from '~/react-query/common';
import { convertCreateRecruitParamsToBody } from '~/services/recruit';
import { privateAxios } from '~/utils';

export type UpdateRecruitParams = CreateRecruitParams;
export type UpdateRecruitBody = CreateRecruitBody;

export const updateRecruit = (
  recruitId: number,
  params: UpdateRecruitParams
) => {
  const endpoint = endpoints.recruit.detail(recruitId);
  const body: UpdateRecruitBody = convertCreateRecruitParamsToBody(params);

  return privateAxios.patch(endpoint, body).then((res) => res.data);
};
