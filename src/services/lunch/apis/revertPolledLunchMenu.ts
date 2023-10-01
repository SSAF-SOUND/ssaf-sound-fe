import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export const revertPolledLunchMenu = (lunchId: number) => {
  const endpoint = endpoints.lunch.revertVote(lunchId);

  return privateAxios.post(endpoint).then((res) => res.data);
};
