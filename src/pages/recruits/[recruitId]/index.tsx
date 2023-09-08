import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';

import { DefaultFullPageLoader, loaderText } from '~/components/Common';
import { Dday } from '~/components/Dday';
import { Recruit } from '~/components/Recruit/Recruit';
import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import {
  getDisplayCategoryName,
  getRecruitDetail,
  useRecruitDetail,
} from '~/services/recruit';
import { ErrorMessage, getErrorResponse, routes } from '~/utils';

interface RecruitDetailPageProps
  extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const RecruitDetailPage = (props: RecruitDetailPageProps) => {
  const { recruitId } = props;
  const {
    data: recruitDetail,
    isLoading: isRecruitDetailLoading,
    isError: isRecruitDetailError,
    error: recruitDetailError,
    isSuccess: isRecruitDetailSuccess,
  } = useRecruitDetail(recruitId);

  if (isRecruitDetailLoading) {
    return <DefaultFullPageLoader text={loaderText.loadingData} />;
  }

  if (isRecruitDetailError) {
    const errorResponse = getErrorResponse(recruitDetailError);

    const errorMessage = errorResponse?.message ?? ErrorMessage.LOADING_ERROR;

    return (
      <RedirectionGuide
        title="Error"
        description={errorMessage}
        redirectionText={'리쿠르팅 목록으로 이동'}
        redirectionTo={routes.recruit.self()}
      />
    );
  }

  const { recruitEnd, category, view } = recruitDetail;
  const titleBarTitle = getDisplayCategoryName(category);

  return (
    <div>
      <TitleBar.Default
        css={{ marginBottom: 12 }}
        title={titleBarTitle}
        withoutClose
      />

      <div>
        <div>
          <Dday endDate={recruitEnd} category={category} />
          <Recruit.ViewCount>{view}</Recruit.ViewCount>
        </div>
        <div>조회수 1234</div>
        <div>
          <div>Title</div>
          <div>More Button</div>
        </div>
        <div>UserInfo</div>
        <div>Recruit Outline</div>
        <div>
          <div>Bookmark</div>
          <div>Share</div>
        </div>
      </div>

      <div>
        <div>Contact</div>
        <div>Action Button</div> {/* 유저에 따라 달라짐 */}
      </div>

      <div>
        <div>tab</div>
        <div>tab-content</div>
      </div>

      <div>comment</div>
    </div>
  );
};

export default RecruitDetailPage;

/* ssr */

interface Props {
  recruitId: number;
}

type Params = {
  recruitId: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const recruitId = Number(context.params?.recruitId);

  if (Number.isNaN(recruitId)) {
    return {
      notFound: true,
    };
  }

  const dehydrate = prefetch({
    queryKey: queryKeys.recruit.detail(recruitId),
    queryFn: () => getRecruitDetail(recruitId),
  });

  const { dehydratedState } = await dehydrate();

  return {
    props: {
      recruitId,
      dehydratedState,
    },
  };
};
