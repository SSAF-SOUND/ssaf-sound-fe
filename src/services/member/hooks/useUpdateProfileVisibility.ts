import type { ProfileVisibility} from '~/services/member';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '~/react-query/common';
import { updateProfileVisibility } from '~/services/member/apis';

export const useUpdateProfileVisibility = () => {
  const queryClient = useQueryClient();
  const profileVisibilityQueryKey = queryKeys.user.profileVisibility();
  const setProfileVisibility = (updater?: ProfileVisibility) =>
    queryClient.setQueryData<ProfileVisibility>(
      profileVisibilityQueryKey,
      updater
    );

  return useMutation({
    mutationFn: updateProfileVisibility,
    onMutate: async ({ isPublic }) => {
      await queryClient.cancelQueries(profileVisibilityQueryKey);
      const prevProfileVisibility = queryClient.getQueryData<ProfileVisibility>(
        profileVisibilityQueryKey
      );
      setProfileVisibility({ isPublic });
      return { prevProfileVisibility };
    },
    onError: (err, variables, context) => {
      setProfileVisibility(context?.prevProfileVisibility);
    },
  });
};
