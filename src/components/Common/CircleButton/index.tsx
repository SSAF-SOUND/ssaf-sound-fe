import type { ComponentPropsWithoutRef } from 'react';
import type { IconNames } from '~/components/Common';
import type { ButtonProps } from '~/components/Common/Button';

import { css } from '@emotion/react';

import { Button, Icon } from '~/components/Common';

export interface CircleButtonProps extends ComponentPropsWithoutRef<'button'> {
  /* `Button`의 `variant`와 동일  */
  variant?: ButtonProps['variant'];
  /* `Button`의 `theme`과 동일  */
  theme?: ButtonProps['theme'];
  /* `Button`의 `loading`과 동일  */
  loading?: ButtonProps['loading'];
  /* `Icon`의 `name`과 동일 */
  name: IconNames;
  /* `Icon`의 `label`과 동일 */
  label?: string;
}

export const CircleButton = (props: CircleButtonProps) => {
  const { label, name, ...restProps } = props;
  return (
    <Button css={selfCss} {...restProps}>
      <Icon name={name} label={label} size={28} />
    </Button>
  );
};

const selfCss = css({
  width: 52,
  height: 52,
  borderRadius: '50%',
});
