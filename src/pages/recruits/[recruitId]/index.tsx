import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';

import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import { getRecruitDetail } from '~/services/recruit';

interface RecruitDetailPageProps
  extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const RecruitDetailPage = (props: RecruitDetailPageProps) => {
  const { recruitId } = props;

  return (
    <div>
      <TitleBar.Default
        css={{ marginBottom: 12 }}
        title="프로젝트 | 스터디"
        withoutClose
      />

      <div>
        <div>D-5</div>
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
