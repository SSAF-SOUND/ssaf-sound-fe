import type { CustomNextPage } from 'next/types';
import type { RecruitFormProps } from '~/components/Forms/RecruitForm';

import { useRouter } from 'next/router';

import {
  DefaultFullPageLoader,
  loaderText,
  PageHeadingText,
} from '~/components/Common';
import RecruitForm, {
  defaultRecruitFormValues,
} from '~/components/Forms/RecruitForm';
import {
  convertSkillsObjectToArray,
  invalidSubmitMessage,
} from '~/components/Forms/RecruitForm/utils';
import { useUnloadReconfirmEffect } from '~/hooks/useUnloadReconfirmEffect';
import {
  reconfirmRecruitFormUnload,
  RecruitCategoryName,
  RecruitCategoryNameSet,
  useCreateRecruit,
} from '~/services/recruit';
import { globalVars } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  customToast,
  handleAxiosError,
  routes,
} from '~/utils';

const metaTitle = '리쿠르팅 등록';

type Params = { category: RecruitCategoryName };

// /recruits/new?category=project|study
const RecruitCreatePage: CustomNextPage = () => {
  const router = useRouter();
  const query = router.query as Partial<Params>;
  const unsafeCategory = query?.category;
  const safeCategory =
    unsafeCategory &&
    RecruitCategoryNameSet.has(unsafeCategory as RecruitCategoryName)
      ? unsafeCategory
      : RecruitCategoryName.PROJECT;

  const { mutateAsync: createRecruit } = useCreateRecruit();

  useUnloadReconfirmEffect();

  const onClickTitleBarClose = () => {
    if (reconfirmRecruitFormUnload()) {
      router.push(routes.recruit.self());
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
      const recruitId = await createRecruit({
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
    <>
      <PageHeadingText text={metaTitle} />

      <div>
        <RecruitForm
          onValidSubmit={onValidSubmit}
          onInvalidSubmit={onInvalidSubmit}
          defaultValues={{
            ...defaultRecruitFormValues,
            category: safeCategory,
          }}
          options={{
            onClickTitleBarClose: onClickTitleBarClose,
            barTitle: '리쿠르팅 등록하기',
            submitButtonText: '완료',
            marginForExpand,
          }}
        />
      </div>
    </>
  );
};

export default RecruitCreatePage;
RecruitCreatePage.auth = createAuthGuard();
RecruitCreatePage.meta = createNoIndexPageMetaData(metaTitle);

const marginForExpand = globalVars.mainLayoutPaddingX.var;
