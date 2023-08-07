import type { CustomNextPage } from 'next/types';
import type { PortfolioFormProps } from 'src/components/Forms/PortfolioForm';
import type { UserPortfolio } from '~/services/member';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import PortfolioForm from 'src/components/Forms/PortfolioForm';
import { DefaultFullPageLoader, loaderText } from '~/components/Common';
import RedirectionGuide from '~/components/RedirectionGuide';
import { useMyInfo, useMyPortfolio } from '~/services/member';
import { globalVars } from '~/styles/utils';
import { customToast, getErrorResponse, routes } from '~/utils';

const PortfolioEditPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const {
    data: myPortfolio,
    isLoading: isLoadingMyPortfolio,
    isError: isErrorMyPortfolio,
    error: myPortfolioError,
  } = useMyPortfolio();

  if (!myInfo) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader text={loaderText.checkUser} />;
  }

  if (isLoadingMyPortfolio) {
    return (
      <DefaultFullPageLoader text="내 포트폴리오 데이터를 가져오는 중입니다." />
    );
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

  const onValidSubmit: PortfolioFormProps['onValidSubmit'] = (value) => {
    console.log(value);
  };

  const skillsContainerStyle = {
    width: 'auto',
    margin: `0 calc(-1 * (${selfPaddingX} + ${globalVars.mainLayoutPaddingX.var}))`,
  };

  return (
    <div css={selfCss}>
      <PortfolioForm
        defaultValues={{
          selfIntroduction: myPortfolio.selfIntroduction,
          links: portfolioLinksToFormLinksField(myPortfolio.memberLinks),
          skills: portfolioSkillsToFormSkillsField(myPortfolio.skills),
        }}
        options={{
          skillsContainerStyle,
          titleBarCloseRoute: routes.profile.detail(myInfo.memberId),
        }}
        onInvalidSubmit={onInvalidSubmit}
        onValidSubmit={onValidSubmit}
      />
    </div>
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
PortfolioEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};

const selfPaddingX = '15px';
const selfCss = css({
  padding: `0 ${selfPaddingX}`,
});
