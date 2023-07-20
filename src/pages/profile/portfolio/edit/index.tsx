import type { CustomNextPage } from 'next/types';
import type { PortfolioFormProps } from 'src/components/Forms/PortfolioForm';

import { css } from '@emotion/react';
import { useMemo } from 'react';

import PortfolioForm from 'src/components/Forms/PortfolioForm';
import { DefaultFullPageLoader } from '~/components/Common';
import { globalVars } from '~/styles/utils';
import { customToast, routes } from '~/utils';

// TODO
//   ValidSubmitHandler
//   defaultValues 반영 (값을 수정할 때)

const PortfolioEditPage: CustomNextPage = () => {
  const onInvalidSubmit: PortfolioFormProps['onInvalidSubmit'] = (errors) => {
    const linkError = errors?.links?.find?.(Boolean);
    const errorMessage =
      linkError?.link?.message ||
      linkError?.linkText?.message ||
      errors?.selfIntroduction?.message;

    if (errorMessage) customToast.clientError(errorMessage);
  };

  const onValidSubmit: PortfolioFormProps['onValidSubmit'] = (value) => {
    console.log(value);
  };

  const skillsContainerStyle = useMemo(() => {
    return {
      width: 'auto',
      margin: `0 calc(-1 * (${selfPaddingX} + ${globalVars.mainLayoutPaddingX.var}))`,
    };
  }, []);

  return (
    <div css={selfCss}>
      <PortfolioForm
        skillsContainerStyle={skillsContainerStyle}
        onInvalidSubmit={onInvalidSubmit}
        onValidSubmit={onValidSubmit}
      />
    </div>
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
