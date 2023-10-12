import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export const deleteAccount = () => {
  const endpoint = endpoints.user.myInfo();

  return privateAxios.delete(endpoint).then((res) => res.data);
};
