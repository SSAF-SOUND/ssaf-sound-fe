import type { CustomNextPage } from 'next/types';
import type { RecruitFormProps } from '~/components/Forms/RecruitForm';
import type { RecruitDetail } from '~/services/recruit';

import { useRouter } from 'next/router';

import {
  DefaultFullPageLoader,
  loaderText,
  PageHeadingText,
} from '~/components/Common';
import RecruitForm from '~/components/Forms/RecruitForm';
import {
  convertRecruitDetailToRecruitFormValues,
  convertSkillsObjectToArray,
  invalidSubmitMessage,
} from '~/components/Forms/RecruitForm/utils';
import RedirectionGuide from '~/components/RedirectionGuide';
import { useUnloadReconfirmEffect } from '~/hooks/useUnloadReconfirmEffect';
import {
  reconfirmRecruitFormUnload,
  RecruitCategoryName,
  useRecruitDetail,
  useUpdateRecruit,
} from '~/services/recruit';
import { globalVars } from '~/styles/utils';
import {
  customToast,
  ErrorMessage,
  getErrorResponse,
  handleAxiosError,
  routes,
} from '~/utils';

const metaTitle = '리쿠르팅 수정';

type QueryString = {
  recruitId: string;
};

const RecruitEditPage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as QueryString;

  const recruitId = Number(query.recruitId);
  const {
    data: recruitDetail,
    isLoading: isRecruitDetailLoading,
    isError: isRecruitDetailError,
    error: recruitDetailError,
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

  const { mine } = recruitDetail;

  // 내 리쿠르팅이 아니라면 리다이렉션
  if (!mine) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div>
        <RecruitFormLayer recruitDetail={recruitDetail} />
      </div>
    </>
  );
};

export default RecruitEditPage;
RecruitEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText.checkUser} />,
  unauthorized: routes.unauthorized(),
};
RecruitEditPage.meta = {
  title: metaTitle,
  openGraph: { title: metaTitle },
  robots: { index: false, follow: false },
};

const marginForExpand = globalVars.mainLayoutPaddingX.var;

interface RecruitFormLayerProps {
  recruitDetail: RecruitDetail;
}

const RecruitFormLayer = (props: RecruitFormLayerProps) => {
  const router = useRouter();
  const { recruitDetail } = props;

  useUnloadReconfirmEffect();

  const defaultValues = convertRecruitDetailToRecruitFormValues(recruitDetail);

  const { recruitId } = recruitDetail;
  const { mutateAsync: updateRecruit } = useUpdateRecruit(recruitId);

  const onClickTitleBarClose = () => {
    if (reconfirmRecruitFormUnload()) {
      router.push(routes.recruit.detail(recruitId));
    }
  };

  const onValidSubmit: RecruitFormProps['onValidSubmit'] = async (
    formValues
  ) => {
    const { participants, category, skills, ...restFormValues } = formValues;
    const isCategoryProject = category === RecruitCategoryName.PROJECT;
    const targetParticipants = isCategoryProject
      ? participants.project
      : participants.study;

    try {
      await updateRecruit({
        category,
        participants: targetParticipants,
        skills: convertSkillsObjectToArray(skills),
        ...restFormValues,
      });

      router.replace(routes.recruit.detail(recruitId));
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const onInvalidSubmit = () => customToast.clientError(invalidSubmitMessage);

  return (
    <RecruitForm
      onValidSubmit={onValidSubmit}
      onInvalidSubmit={onInvalidSubmit}
      defaultValues={defaultValues}
      options={{
        onClickTitleBarClose,
        editMode: true,
        barTitle: '리쿠르팅 수정하기',
        submitButtonText: '완료',
        marginForExpand,
      }}
    />
  );
};
