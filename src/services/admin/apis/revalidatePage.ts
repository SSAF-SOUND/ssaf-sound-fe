import { adminEndpoints } from '~/utils/admin/adminEndpoints';
import { publicAxios } from '~/utils/axios';
import { APP_URL } from '~/utils/constants';

export type RevalidatePageBody = {
  path: string;
  token: string;
};

export interface RevalidatePageParams {
  path: string;
  token: string;
}

export type RevalidatePageParamsApiData = {
  revalidated: boolean;
  message: string;
};

export const revalidatePage = (params: RevalidatePageParams) => {
  const { path, token } = params;
  const endpoint = adminEndpoints.revalidatePage();
  const body: RevalidatePageBody = {
    path,
    token,
  };

  return publicAxios<RevalidatePageParamsApiData>({
    baseURL: APP_URL,
    url: endpoint,
    method: 'post',
    data: body,
  }).then((res) => res.data);
};
