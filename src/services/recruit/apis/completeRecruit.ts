import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export const completeRecruit = (recruitId: number) => {
  const endpoint = endpoints.recruit.complete(recruitId);

  return privateAxios.post(endpoint, null).then((res) => res.data);
};
