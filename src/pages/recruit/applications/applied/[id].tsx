import type { GetServerSideProps } from 'next';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, DefaultFullPageLoader, Icon } from '~/components/Common';
import { ApplySelectBox } from '~/components/Forms/RecruitApplyForm/Fields/ApplySelectBox';
import { ApplyTextArea } from '~/components/Forms/RecruitApplyForm/Fields/ApplyTextArea';
import { RecruitLayout } from '~/components/Layout';
import NameCard from '~/components/NameCard';
import TitleBar from '~/components/TitleBar';
import { userInfo } from '~/mocks/handlers/member/data';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import {
  recruitAPI,
  useRecruitApplicationApprove,
  useRecruitApplicationDetail,
  useRecruitApplicationReject,
} from '~/services/recruit';
import { flex, fontCss, palettes } from '~/styles/utils';
import { handleAxiosError, paramsToNumber, routes } from '~/utils';

const Applied = (props: any) => {
  const router = useRouter();
  const { recruitApplicationId } = props;
  const {
    data: recruitApplicationDetailData,
    isLoading: isApplicationLoading,
    isError: isApplicationError,
  } = useRecruitApplicationDetail(recruitApplicationId);
  const { mutateAsync: approveApplication, isLoading: isApproveLoading } =
    useRecruitApplicationApprove();
  const { mutateAsync: rejectApplication, isLoading: isRejectLoading } =
    useRecruitApplicationReject();

  const disabledState = isApproveLoading || isRejectLoading;

  if (isApplicationError) return router.push('/500');
  if (isApplicationLoading) return <DefaultFullPageLoader />;
  const { author, matchStatus, reply, question, recruitType } =
    recruitApplicationDetailData;

  const postApprove = async () => {
    try {
      await approveApplication(recruitApplicationId);

      router.replace({
        pathname: routes.recruit.applyRedirect(),
        query: {
          type: 'APPROVE',
        },
      });
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const postReject = async () => {
    try {
      await rejectApplication(recruitApplicationId);
      router.replace({
        pathname: routes.recruit.applyRedirect(),
        query: {
          type: 'REJECT',
        },
      });
    } catch (err) {
      handleAxiosError(err);
    }
  };
  return (
    <RecruitLayout>
      {/* route 어디? */}
      <TitleBar.Default title="리쿠르팅 신청내역" />
      <span
        css={[
          {
            display: 'block',
            color: palettes.grey3,
            marginTop: '20px',
          },
          fontCss.family.auto,
          fontCss.style.R12,
        ]}
      >
        2023년 07월 20일
        {/* 날짜 필요함 */}
      </span>

      <div css={flex('center', 'space-between', 'row')}>
        <NameCard
          // 수정 필요
          userInfo={userInfo.certifiedSsafyUserInfo}
          css={{
            padding: 0,
          }}
        />
        <Icon name="heart" size={22} color={palettes.recruit.default} />
      </div>
      <div css={{ height: 20 }} />
      <div css={flex('', '', 'row', 10)}>
        <Button
          theme="grey"
          css={{ width: '45%', color: palettes.white, borderRadius: 8 }}
          size="sm"
        >
          쪽지 보내기
        </Button>
        <Button
          theme="grey"
          css={{ width: '55%', color: palettes.white }}
          size="sm"
        >
          <Link href={routes.profile.detail(author.memberId)}>
            포트폴리오 보러가기
          </Link>
        </Button>
      </div>

      <div css={{ height: 20 }} />
      <div css={flex('', '', 'column', 12)}>
        <ApplySelectBox
          readOnly
          items={[recruitType]}
          value={recruitType}
          order={1}
          question="지원 파트"
        />

        <ApplyTextArea
          order={2}
          question={question}
          withMax={false}
          disabled
          value={reply}
        />
      </div>
      <div css={{ height: 40 }} />
      <div css={[flex('', '', 'row', 10)]}>
        <Button
          size="lg"
          theme="recruit"
          variant="inverse"
          css={{ width: '50%' }}
          onClick={postReject}
          loading={isRejectLoading}
          disabled={disabledState}
        >
          거절
        </Button>
        <Button
          size="lg"
          theme="recruit"
          css={{ width: '50%' }}
          onClick={postApprove}
          loading={isApproveLoading}
          disabled={disabledState}
        >
          수락
        </Button>
      </div>
    </RecruitLayout>
  );
};

export default Applied;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = paramsToNumber(params?.id);

  const dehydrate = prefetch({
    queryKey: queryKeys.recruit.applicationDetail(id),
    queryFn: () => recruitAPI.getRecruitApplicationDetail(id),
  });

  const dehydratedState = await dehydrate();

  return {
    props: {
      recruitApplicationId: id,
      dehydratedState,
    },
  };
};
