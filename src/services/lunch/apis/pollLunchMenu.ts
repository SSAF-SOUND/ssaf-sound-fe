import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export const pollLunchMenu = (lunchId: number) => {
  const endpoint = endpoints.lunch.vote(lunchId);

  return privateAxios.post(endpoint).then((res) => res.data);
};
