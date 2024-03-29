import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import type { UserRegisterFormValues } from '~/components/Forms/UserRegisterForm/utils';
import type { Term } from '~/services/meta/utils';

import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';

import { ProgressBar } from '~/components/Common/ProgressBar';
import { UserRegisterFormFields } from '~/components/Forms/UserRegisterForm/Fields';
import TitleBar from '~/components/TitleBar';
import { useStack } from '~/hooks';
import { flex, palettes, titleBarHeight } from '~/styles/utils';

export type UserRegisterFormOptions = Partial<{
  titleBarTitle: string;
  onClickClose?: () => void;
}>;

export interface UserRegisterFormProps {
  terms: Term[];
  onValidSubmit: SubmitHandler<UserRegisterFormValues>;
  onInvalidSubmit?: SubmitErrorHandler<UserRegisterFormValues>;
  defaultValues?: UserRegisterFormValues;
  className?: string;
  options?: UserRegisterFormOptions;
}

const UserRegisterForm = (props: UserRegisterFormProps) => {
  const {
    terms,
    onValidSubmit,
    onInvalidSubmit,
    defaultValues,
    className,
    options = {},
  } = props;
  const { titleBarTitle, onClickClose } = options;
  const methods = useForm({
    defaultValues,
  });

  const {
    push: pushPhase,
    pop: popPhase,
    top: currentPhase,
  } = useStack([0], { defaultTop: 0 });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(onValidSubmit, onInvalidSubmit);
  const majorPhase = 4;
  const pushNextPhase = () => pushPhase(currentPhase + 1);
  const fieldsLength = Object.keys(UserRegisterFormFields).length;

  return (
    <div css={selfCss} className={className}>
      <TitleBar.Default
        title={titleBarTitle}
        withoutBackward={currentPhase === 0}
        onClickBackward={popPhase}
        onClickClose={onClickClose}
      />

      <ProgressBar
        min={0}
        now={currentPhase + 1}
        max={fieldsLength}
        backgroundColor={palettes.white}
        foregroundColor={palettes.primary.dark}
      />

      <FormProvider {...methods}>
        <form css={formCss} onSubmit={handleSubmit(onValidSubmit)}>
          {currentPhase === 0 && (
            <UserRegisterFormFields.Terms
              terms={terms}
              onComplete={pushNextPhase}
            />
          )}
          {currentPhase === 1 && (
            <UserRegisterFormFields.IsMember
              onTrue={pushNextPhase}
              onFalse={() => pushPhase(majorPhase)}
            />
          )}
          {currentPhase === 2 && (
            <UserRegisterFormFields.Year onSelect={pushNextPhase} />
          )}
          {currentPhase === 3 && (
            <UserRegisterFormFields.Campus onSelect={pushNextPhase} />
          )}
          {currentPhase === 4 && (
            <UserRegisterFormFields.IsMajor
              onFalse={pushNextPhase}
              onTrue={pushNextPhase}
            />
          )}
          {currentPhase === 5 && (
            <UserRegisterFormFields.Nickname onSubmit={onSubmit} />
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default UserRegisterForm;

const selfPaddingTop = titleBarHeight + 10;
const selfCss = css({ paddingTop: selfPaddingTop }, flex('', '', 'column'));

const formCss = css(
  { flexGrow: 1, padding: '30px 0' },
  flex('', 'space-between', 'column')
);
