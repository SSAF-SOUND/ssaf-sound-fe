import type { SubmitHandler } from 'react-hook-form';
import type { UserRegisterFormValues } from '~/components/Forms/UserRegisterForm/utils';

import { css } from '@emotion/react';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ProgressBar } from '~/components/Common';
import {
  Campus,
  IsMajor,
  IsMember,
  Nickname,
  Year,
} from '~/components/Forms/UserRegisterForm/Fields';
import TitleBar from '~/components/TitleBar';
import { useStack } from '~/hooks';
import { flex, pageCss, palettes, titleBarHeight } from '~/styles/utils';

export type UserRegisterFormOptions = Partial<{
  titleBarTitle: string;
}>;

export interface UserRegisterFormProps {
  onValidSubmit: SubmitHandler<UserRegisterFormValues>;
  defaultValues?: UserRegisterFormValues;
  className?: string;
  options?: UserRegisterFormOptions;
}

const UserRegisterForm = (props: UserRegisterFormProps) => {
  const { onValidSubmit, defaultValues, className, options = {} } = props;
  const { titleBarTitle } = options;
  const methods = useForm({
    defaultValues,
  });

  const {
    push: pushPhase,
    pop: popPhase,
    top: currentPhase,
  } = useStack([0], { defaultTop: 0 });

  const { handleSubmit } = methods;
  const FieldComponents = useMemo(() => {
    const majorPhase = 3;
    const pushNextPhase = () => pushPhase(currentPhase + 1);
    return [
      () => (
        <IsMember
          onTrue={pushNextPhase}
          onFalse={() => pushPhase(majorPhase)}
        />
      ),
      () => <Year onSelect={pushNextPhase} />,
      () => <Campus onSelect={pushNextPhase} />,
      () => <IsMajor onFalse={pushNextPhase} onTrue={pushNextPhase} />,
      () => <Nickname />,
    ];
  }, [pushPhase, currentPhase]);

  const FieldComponent = FieldComponents[currentPhase];

  return (
    <div css={selfCss} className={className}>
      <TitleBar.Default
        title={titleBarTitle}
        withoutClose
        withoutBackward={currentPhase === 0}
        onClickBackward={popPhase}
      />

      <ProgressBar
        min={0}
        now={currentPhase + 1}
        max={FieldComponents.length}
        backgroundColor={palettes.white}
        foregroundColor={palettes.primary.dark}
      />

      <FormProvider {...methods}>
        <form css={formCss} onSubmit={handleSubmit(onValidSubmit)}>
          <FieldComponent />
        </form>
      </FormProvider>
    </div>
  );
};

export default UserRegisterForm;

const selfPaddingTop = titleBarHeight + 12;
const selfCss = css(
  {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: selfPaddingTop,
  },
  pageCss.minHeight
);

const formCss = css(
  {
    flexGrow: 1,
    padding: '60px 0 30px',
  },
  flex('', 'space-between', 'column')
);
