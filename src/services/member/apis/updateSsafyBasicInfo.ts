import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export interface UpdateSsafyBasicInfoParams {
  ssafyMember: boolean;
  year: number | undefined;
  campus: string | undefined;
}

export interface UpdateSsafyBasicInfoBody {
  ssafyMember: boolean;
  semester: number | undefined;
  campus: string | undefined;
}

export const updateSsafyBasicInfo = (params: UpdateSsafyBasicInfoParams) => {
  const endpoint = endpoints.user.ssafyBasicInfo();
  const { year, ...restParams } = params;
  const body: UpdateSsafyBasicInfoBody = {
    semester: year,
    ...restParams,
  };

  return privateAxios.patch(endpoint, body).then((res) => res.data);
};
