import type { CustomNextPage } from 'next/types';
import type { RecruitFormProps } from '~/components/Forms/RecruitForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import {
  DefaultFullPageLoader,
  loaderText,
  PageHeadingText,
} from '~/components/Common';
import RecruitForm from '~/components/Forms/RecruitForm';
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
import { customToast, handleAxiosError, routes } from '~/utils';

const metaTitle = '리쿠르팅 등록';

const RecruitCreatePage: CustomNextPage = () => {
  const router = useRouter();
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

      <div css={selfCss}>
        <RecruitForm
          onValidSubmit={onValidSubmit}
          onInvalidSubmit={onInvalidSubmit}
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
RecruitCreatePage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText.checkUser} />,
  unauthorized: routes.unauthorized(),
};
RecruitCreatePage.meta = {
  title: metaTitle,
  openGraph: { title: metaTitle },
  robots: { index: false, follow: false },
};

const selfPaddingX = 15;
const marginForExpand = `calc(${selfPaddingX}px + ${globalVars.mainLayoutPaddingX.var})`;
const selfCss = css({
  padding: `0 ${selfPaddingX}px`,
});
