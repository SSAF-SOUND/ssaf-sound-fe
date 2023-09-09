import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export const removeRecruit = (recruitId: number) => {
  const endpoint = endpoints.recruit.detail(recruitId);

  return privateAxios.delete(endpoint).then((res) => res.data);
};
