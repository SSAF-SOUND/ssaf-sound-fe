import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type GetHasNewNotificationApiData = ApiSuccessResponse<{
  isNew: boolean;
}>;

export const getHasNewNotifications = () => {
  const endpoint = endpoints.notification.hasNew();
  return privateAxios<GetHasNewNotificationApiData>({
    method: 'get',
    url: endpoint,
  }).then((res) => res.data.data.isNew);
};
