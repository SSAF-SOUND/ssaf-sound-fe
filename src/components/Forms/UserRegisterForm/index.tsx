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
import { flex, pageMinHeight } from '~/styles/utils';
import { noop } from '~/utils';

interface UserRegisterFormProps {
  onSubmit?: SubmitHandler<UserRegisterFormValues>;
  defaultValues?: Partial<UserRegisterFormValues>;
  className?: string;
}

const UserRegisterForm = (props: UserRegisterFormProps) => {
  const { onSubmit = noop, defaultValues, className } = props;
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
      <FormProvider {...methods}>
        <TitleBar.Default
          withoutTitle
          withoutClose
          withoutBackward={currentPhase === 0}
          onClickBackward={popPhase}
        />
        <ProgressBar
          min={0}
          now={currentPhase + 1}
          max={FieldComponents.length}
        />
        <form css={formCss} onSubmit={handleSubmit(onSubmit)}>
          <FieldComponent />
        </form>
      </FormProvider>
    </div>
  );
};

export default UserRegisterForm;

const selfCss = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: pageMinHeight,
});

const formCss = css(
  {
    flexGrow: 1,
    padding: '60px 0 30px',
  },
  flex('', 'space-between', 'column')
);
