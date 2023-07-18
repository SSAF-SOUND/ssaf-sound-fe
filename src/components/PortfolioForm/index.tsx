import type { CSSProperties } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import type { PortfolioFormValues } from '~/components/PortfolioForm/utils';

import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';

import TitleBar from '~/components/TitleBar';
import { fontCss, palettes } from '~/styles/utils';
import { noop } from '~/utils';

import { Links, SelfIntroduction, Skills } from './Fields';

interface PortfolioFormOptions {}

export interface PortfolioFormProps {
  className?: string;
  skillsContainerStyle?: CSSProperties;
  onValidSubmit?: SubmitHandler<PortfolioFormValues>;
  onInvalidSubmit?: SubmitErrorHandler<PortfolioFormValues>;
  defaultValues?: Partial<PortfolioFormValues>;
  options?: Partial<PortfolioFormOptions>;
}

const PortfolioForm = (props: PortfolioFormProps) => {
  const {
    className,
    skillsContainerStyle,
    options = {},
    onValidSubmit = noop,
    onInvalidSubmit = noop,
    defaultValues,
  } = props;

  const {} = options;

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        css={selfCss}
        className={className}
        onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
      >
        <TitleBar.Form title="포트폴리오 입력" submitButtonText="완료" />

        <section css={{ marginTop: 74, marginBottom: 40 }}>
          <h2 css={headingCss}>My Portfolio</h2>
          <p>나만의 포트폴리오를 꾸며보세요!</p>
        </section>

        <SelfIntroduction css={{ marginBottom: 72 }} />
        <Skills
          css={{ marginBottom: 86 }}
          skillsContainerStyle={skillsContainerStyle}
        />
        <Links css={{ paddingBottom: 400 }} />
      </form>
    </FormProvider>
  );
};

export default PortfolioForm;

const selfCss = css({ position: 'relative' }, fontCss.family.auto);

const headingCss = css({ color: palettes.primary.default }, fontCss.style.B32);
