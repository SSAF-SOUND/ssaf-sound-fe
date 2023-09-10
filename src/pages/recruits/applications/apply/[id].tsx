import type { GetServerSideProps } from 'next';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Button, DefaultFullPageLoader } from '~/components/Common';
import {
  ApplySelectBox,
  ApplyTextArea,
  ProfileVisibilityCheckbox,
} from '~/components/Forms/RecruitApplyForm/Fields';
import { RecruitLayout } from '~/components/Layout';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import {
  recruitAPI,
  useRecruitApplicationCancel,
  useRecruitApplicationDetail,
  useRecruitDetail,
} from '~/services/recruit';
import { flex, fontCss } from '~/styles/utils';
import { handleAxiosError, paramsToNumber, routes } from '~/utils';

// import { RecruitMeta as RecruitMetaComponent } from '~/components/RecruitMeta';

const RecruitApplyPage = (props: { recruitApplicationId: number }) => {
  const router = useRouter();
  const { recruitApplicationId } = props;
  const {
    data: recruitApplicationDetailData,
    isLoading: isApplicationLoading,
    isError: isApplicationError,
  } = useRecruitApplicationDetail(recruitApplicationId);

  // const {
  //   data: recruitDetailData,
  //   isLoading: isRecruitDetailLoading,
  //   isError: isRecruitDetailError,
  // } = useRecruitDetail(
  //   recruitApplicationDetailData!.recruitId,
  //   !!recruitApplicationDetailData
  // );

  const { mutateAsync: cancelApplication, isLoading: isCancelLoading } =
    useRecruitApplicationCancel();

  // if (isApplicationLoading || isRecruitDetailLoading)
  //   return <DefaultFullPageLoader />;
  // if (isApplicationError || isRecruitDetailError) return router.push('/500');
  //
  // const { category, recruitStart, recruitEnd, limits, skills, author, title } =
  //   recruitDetailData;

  // const { recruitType, matchStatus, reply, question } =
  //   recruitApplicationDetailData;

  const postCancel = async () => {
    try {
      await cancelApplication(recruitApplicationId);

      router.replace({
        pathname: routes.recruit.applyRedirect(),
        query: {
          type: 'CANCEL',
        },
      });
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <RecruitLayout>
      <TitleBar.Default
        title="리쿠르팅 신청 내역"
        onClickBackward={routes.profile.self()}
        withoutClose
      />
      <div
        css={[
          { paddingTop: '20px', marginBottom: '30px' },
          flex('', '', 'column', 8),
        ]}
      >
        {/*<h2 css={titleCss}>{category === 'project' ? '프로젝트' : '스터디'}</h2>*/}
        {/*<RecruitMetaComponent*/}
        {/*  recruitMeta={{ recruitStart, recruitEnd, limits, skills }}*/}
        {/*  userInfo={author}*/}
        {/*  expanded*/}
        {/*  title={title}*/}
        {/*/>*/}
      </div>
      <div css={[flex('', '', 'column', 30), { marginBottom: 80 }]}>
        {/*<ApplySelectBox items={[recruitType]} readOnly value={recruitType} />*/}
        <ProfileVisibilityCheckbox
          disabled
          defaultChecked
          order={2}
          question="리쿠르팅 등록자에게 프로필이 공개됩니다. 이에 동의하십니까?"
        />
        {/*<ApplyTextArea*/}
        {/*  disabled*/}
        {/*  withMax={false}*/}
        {/*  order={3}*/}
        {/*  question={`[등록자 질문] ${question}`}*/}
        {/*  defaultValue={reply}*/}
        {/*/>*/}
      </div>
      <Button onClick={postCancel} loading={isCancelLoading}>
        리쿠르팅 신청 취소
      </Button>
    </RecruitLayout>
  );
};
export default RecruitApplyPage;

const titleCss = css(fontCss.family.auto, fontCss.style.R14);

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = paramsToNumber(params?.id);

  const dehydrate = prefetch([
    {
      queryKey: queryKeys.recruit.applicationDetail(id),
      queryFn: () => recruitAPI.getRecruitApplicationDetail(id),
    },
  ]);

  const { dehydratedState } = await dehydrate();

  return {
    props: {
      recruitApplicationId: id,
      dehydratedState,
    },
  };
};
