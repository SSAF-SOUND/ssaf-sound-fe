import type { SetStateAction } from 'react';
import type { RecruitCategory, RecruitDetail } from '~/services/recruit';

import { useQueryClient, useMutation } from '@tanstack/react-query';

import { endpoints, queryKeys } from '~/react-query/common';
import { useMyInfo } from '~/services/member';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { flex } from '~/styles/utils';
import { handleAxiosError, privateAxios } from '~/utils';

import { ScrapButton } from '../Article/ArticleStats';
import { useModal } from '../GlobalModal';

export const RecruitBookMark = (props: {
  recruitDetail: RecruitDetail;
  recruitId: number;
  category?: RecruitCategory;
}) => {
  const { recruitDetail, recruitId, category = 'project' } = props;
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;

  const { openModal, closeModal } = useModal();
  const { scraped, scrapCount } = recruitDetail;
  const { mutateAsync: scrapRecruit, isLoading: isTogglingScrap } =
    useScrapRecruit(recruitId);

  const handleNotSignedInUser = () => {
    openModal('alert', {
      title: '알림',
      description: '로그인이 필요한 기능입니다.',
      actionText: '확인',
      onClickAction: closeModal,
    });
  };

  const handleClickScrap = async () => {
    if (!isSignedIn) {
      handleNotSignedInUser();
      return;
    }

    try {
      await scrapRecruit();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const theme = getRecruitThemeByCategory(category);
  return (
    <div css={flex('center', '', 'row')}>
      <ScrapButton
        pressed={scraped}
        onClick={handleClickScrap}
        disabled={isTogglingScrap}
        theme={theme}
      />
      <strong>{scrapCount}</strong>
    </div>
  );
};

// 머지 전에 API로 이관
export const scrapRecruit = (recruitId: number) => {
  const endpoint = endpoints.recruit.scrap(recruitId);

  return privateAxios.post(endpoint, null).then((res) => res.data.data);
};

export const useScrapRecruit = (recruitId: number) => {
  const setRecruitDetail = useSetRecruitDetail(recruitId);
  const queryClient = useQueryClient();
  const queryKey = queryKeys.recruit.detail(recruitId);

  return useMutation({
    mutationFn: () => scrapRecruit(recruitId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const recruit = queryClient.getQueryData<RecruitDetail>(queryKey);
      if (!recruit) return;

      const { scraped: prevScraped, scrapCount: prevScrapCount } = recruit;
      const nextScraped = !prevScraped;
      const nextScrapCount = nextScraped
        ? prevScrapCount + 1
        : prevScrapCount - 1;

      setRecruitDetail((prevArticle) => {
        if (!prevArticle) return;
        return {
          ...prevArticle,
          scraped: nextScraped,
          scrapCount: nextScrapCount,
        };
      });
      return { prevArticle: recruit };
    },

    onSuccess: ({ scraped, scrapCount }) => {
      setRecruitDetail((prevArticle) => {
        if (!prevArticle) return;
        return {
          ...prevArticle,
          scraped,
          scrapCount,
        };
      });
    },

    onError: (err, _, context) => {
      const prevArticle = context?.prevArticle;
      setRecruitDetail(prevArticle);
    },
  });
};

export const useSetRecruitDetail = (recruitId: number) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.recruit.detail(recruitId);
  const setRecruitDetail = (
    updater: SetStateAction<RecruitDetail | undefined>
  ) => {
    queryClient.setQueryData<RecruitDetail>(queryKey, updater);
  };

  return setRecruitDetail;
};
