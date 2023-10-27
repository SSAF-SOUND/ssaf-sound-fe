import type { CustomNextPage } from 'next/types';
import type { RecruitFormProps } from '~/components/Forms/RecruitForm';
import type { RecruitCreatePageRouteQuery } from '~/utils/client-routes/recruit';

import { useRouter } from 'next/router';

import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
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

type Params = RecruitCreatePageRouteQuery;

const RecruitCreatePage: CustomNextPage = () => {
  const router = useRouter();
  const routerQuery = router.query as Params;
  const { query } = routes.recruit.create(routerQuery);
  const { category } = query;
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

      <main>
        <RecruitForm
          onValidSubmit={onValidSubmit}
          onInvalidSubmit={onInvalidSubmit}
          defaultValues={{
            ...defaultRecruitFormValues,
            category,
          }}
          options={{
            onClickTitleBarClose: onClickTitleBarClose,
            barTitle: '리쿠르팅 등록하기',
            submitButtonText: '완료',
            marginForExpand,
          }}
        />
      </main>

      <Footer />
    </>
  );
};

export default RecruitCreatePage;
RecruitCreatePage.auth = createAuthGuard();
RecruitCreatePage.meta = createNoIndexPageMetaData(metaTitle);
RecruitCreatePage.mainLayoutStyle = { overflow: 'unset' };

const marginForExpand = globalVars.mainLayoutPaddingX.var;
