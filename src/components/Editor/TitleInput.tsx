import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';
import { forwardRef } from 'react';

import { TextInput } from '~/components/Common';
import { fontCss, palettes } from '~/styles/utils';

interface TitleInputProps extends ComponentPropsWithoutRef<'input'> {}

const TitleInput = forwardRef<HTMLInputElement, TitleInputProps>(
  (props: TitleInputProps, ref) => {
    const { className } = props;
    return (
      <TextInput
        css={selfCss}
        className={className}
        ref={ref}
        {...props}
        size="md"
      />
    );
  }
);

TitleInput.displayName = 'EditorTitleInput';
export default TitleInput;

const selfCss = css(
  {
    width: '100%',
    borderRadius: 0,
    outline: 0,
    border: `1px solid ${palettes.grey3}`,
    borderBottom: 0,
  },
  fontCss.style.R18
);
