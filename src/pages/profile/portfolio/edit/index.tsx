import type { CustomNextPage } from 'next/types';
import type { PortfolioFormProps } from 'src/components/Forms/PortfolioForm';
import type { UserPortfolio } from '~/services/member';

import { useRouter } from 'next/router';

import PortfolioForm from 'src/components/Forms/PortfolioForm';
import { FullPageLoader, loaderText } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import RedirectionGuide from '~/components/RedirectionGuide';
import { useUnloadReconfirmEffect } from '~/hooks/useUnloadReconfirmEffect';
import {
  useMyInfo,
  useMyPortfolio,
  useUpdateMyPortfolio,
} from '~/services/member';
import { globalVars } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  customToast,
  getErrorResponse,
  handleAxiosError,
  routes,
} from '~/utils';

const metaTitle = '포트폴리오 작성';

const PortfolioEditPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const {
    data: myPortfolio,
    isLoading: isLoadingMyPortfolio,
    isError: isErrorMyPortfolio,
    error: myPortfolioError,
  } = useMyPortfolio();
  const { mutateAsync: updateMyPortfolio } = useUpdateMyPortfolio();

  if (!myInfo) {
    router.replace(routes.unauthorized());
    return <FullPageLoader text={loaderText.checkUser} />;
  }

  if (isLoadingMyPortfolio) {
    return <FullPageLoader text="내 포트폴리오 데이터를 가져오는 중입니다." />;
  }

  if (isErrorMyPortfolio) {
    const errorMessage =
      getErrorResponse(myPortfolioError)?.message ??
      '포트폴리오 데이터를 불러오는 중 오류가 발생했습니다.';

    return (
      <RedirectionGuide
        title="Error"
        description={errorMessage}
        redirectionText="내 프로필 페이지로"
        redirectionTo={routes.profile.detail(myInfo.memberId)}
      />
    );
  }

  const onInvalidSubmit: PortfolioFormProps['onInvalidSubmit'] = (
    errorMessage
  ) => {
    if (errorMessage) customToast.clientError(errorMessage);
  };

  const onValidSubmit: PortfolioFormProps['onValidSubmit'] = async (
    fieldValues
  ) => {
    const {
      selfIntroduction,
      links: fieldLinks,
      skills: fieldSkills,
    } = fieldValues;

    const memberLinks = fieldLinks.map(({ link, linkText }) => ({
      linkName: linkText,
      path: link,
    }));

    const skills = Object.entries(fieldSkills)
      .filter(([, order]) => !!order)
      .map(([skillName]) => skillName);

    try {
      await updateMyPortfolio({
        selfIntroduction,
        memberLinks,
        skills,
      });

      await router.push(routes.profile.detail(myInfo.memberId));
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div>
        <PortfolioForm
          defaultValues={{
            selfIntroduction: myPortfolio.selfIntroduction,
            links: portfolioLinksToFormLinksField(myPortfolio.memberLinks),
            skills: portfolioSkillsToFormSkillsField(myPortfolio.skills),
          }}
          options={{
            marginForExpand: globalVars.mainLayoutPaddingX.var,
            titleBarCloseRoute: routes.profile.detail(myInfo.memberId),
          }}
          onInvalidSubmit={onInvalidSubmit}
          onValidSubmit={onValidSubmit}
        />
      </div>
    </>
  );
};

const portfolioLinksToFormLinksField = (
  portfolioLinks: UserPortfolio['memberLinks']
) => {
  return portfolioLinks.map(({ linkName, path }) => {
    return {
      link: path,
      linkText: linkName,
    };
  });
};

const portfolioSkillsToFormSkillsField = (
  portfolioSkills: UserPortfolio['skills']
) => {
  return Object.fromEntries(
    portfolioSkills.map((skillName, index) => {
      const selectedOrder = index + 1;
      return [skillName, selectedOrder];
    })
  );
};

export default PortfolioEditPage;
PortfolioEditPage.auth = createAuthGuard();
PortfolioEditPage.meta = createNoIndexPageMetaData(metaTitle);
PortfolioEditPage.mainLayoutStyle = { overflow: 'unset' };
