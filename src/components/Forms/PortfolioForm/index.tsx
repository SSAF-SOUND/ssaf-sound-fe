import type { LinkProps } from 'next/link';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import type { PortfolioFormValues } from '~/components/Forms/PortfolioForm/utils';
import type { SubmitErrorHandlerWithErrorMessage } from '~/components/Forms/utils';

import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';

import TitleBar from '~/components/TitleBar';
import { fontCss, palettes, titleBarHeight } from '~/styles/utils';

import { Links, SelfIntroduction, Skills } from './Fields';

interface PortfolioFormOptions {
  marginForExpand: string;
  titleBarCloseRoute: LinkProps['href'];
}

export interface PortfolioFormProps {
  className?: string;
  onValidSubmit: SubmitHandler<PortfolioFormValues>;
  onInvalidSubmit?: SubmitErrorHandlerWithErrorMessage<PortfolioFormValues>;
  defaultValues?: PortfolioFormValues;
  options?: Partial<PortfolioFormOptions>;
}

const PortfolioForm = (props: PortfolioFormProps) => {
  const {
    className,
    onValidSubmit,
    onInvalidSubmit,
    defaultValues,
    options: { marginForExpand, titleBarCloseRoute } = {},
  } = props;

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;
  const handleOnInvalidSubmit: SubmitErrorHandler<PortfolioFormValues> = async (
    errors
  ) => {
    const linkError = errors.links?.find?.(Boolean);
    const errorMessage =
      linkError?.link?.message ||
      linkError?.linkText?.message ||
      errors?.selfIntroduction?.message;

    onInvalidSubmit?.(errorMessage, errors);
  };

  return (
    <FormProvider {...methods}>
      <form
        css={selfCss}
        className={className}
        onSubmit={handleSubmit(onValidSubmit, handleOnInvalidSubmit)}
      >
        <TitleBar.Form
          title="포트폴리오 입력"
          submitButtonText="완료"
          onClickClose={titleBarCloseRoute}
          isSubmitting={isSubmitting}
          isSubmitDisabled={!isDirty}
        />

        <section css={{ marginBottom: 40 }}>
          <h2 css={headingCss}>My Portfolio</h2>
          <p>나만의 포트폴리오를 꾸며보세요!</p>
        </section>

        <SelfIntroduction css={{ marginBottom: 72 }} />
        <Skills marginForExpand={marginForExpand} css={{ marginBottom: 86 }} />
        <Links css={{ paddingBottom: 400 }} />
      </form>
    </FormProvider>
  );
};

export default PortfolioForm;

const selfCss = css(
  {
    position: 'relative',
    paddingTop: titleBarHeight + 24,
  },
  fontCss.family.auto
);

const headingCss = css({ color: palettes.primary.default }, fontCss.style.B32);
