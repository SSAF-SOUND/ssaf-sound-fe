import type { CustomNextPage } from 'next/types';
import type { PortfolioFormProps } from '~/components/PortfolioForm';

import { css } from '@emotion/react';

import { DefaultFullPageLoader } from '~/components/Common';
import PortfolioForm from '~/components/PortfolioForm';
import { customToast, routes } from '~/utils';

// TODO
//   ValidSubmitHandler
//   defaultValues 반영 (값을 수정할 때)

const PortfolioEditPage: CustomNextPage = () => {
  const onInvalidSubmit: PortfolioFormProps['onInvalidSubmit'] = (errors) => {
    const errorMessage =
      errors?.links?.[0]?.link?.message ||
      errors?.links?.[0]?.linkText?.message ||
      errors?.selfIntroduction?.message;

    if (errorMessage) customToast.clientError(errorMessage);
  };

  const onValidSubmit: PortfolioFormProps['onValidSubmit'] = (value) => {
    console.log(value);
  };

  return (
    <div css={selfCss}>
      <PortfolioForm
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

const selfCss = css({
  padding: '0 15px',
});
