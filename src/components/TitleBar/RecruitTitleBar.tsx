import type { MouseEventHandler } from 'react';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Bar, Icon } from '~/components/Common';
import { colorMix, fontCss, palettes } from '~/styles/utils';

import IconButton from '../Common/IconButton';

interface RecruitTitleBarProps {
  title: string;
  isSubmitDisabled?: boolean;
  className?: string;
  onClickClose?: MouseEventHandler<HTMLButtonElement>;
}

const RecruitTitleBar = (props: RecruitTitleBarProps) => {
  const { title, isSubmitDisabled = false, onClickClose, ...restProps } = props;

  const router = useRouter();

  const defaultHandleClickClose = () => {
    router.back();
  };

  return (
    <Bar
      {...restProps}
      left={
        <IconButton
          size={iconButtonSize}
          onClick={onClickClose || defaultHandleClickClose}
        >
          <Icon name="close" size={iconSize} />
        </IconButton>
      }
      center={<h2 css={titleCss}>{title}</h2>}
      right={
        <button type="submit" css={submitButtonCss} disabled={isSubmitDisabled}>
          완료
        </button>
      }
    />
  );
};

export default RecruitTitleBar;

const iconSize = 28;
const iconButtonSize = iconSize + 8;

const titleCss = css(
  {
    flexGrow: 1,
    textAlign: 'left',
  },
  fontCss.style.R16
);

const submitButtonCss = css(
  {
    cursor: 'pointer',
    padding: 6,
    background: 'inherit',
    transition: 'color 200ms',
    borderRadius: 8,
    color: palettes.white,
    ':focus-visible': {
      backgroundColor: colorMix('20%', palettes.white),
    },
    ':hover': {
      color: palettes.primary.light,
    },
    ':active': {
      color: palettes.primary.dark,
    },
    ':disabled': {
      pointerEvents: 'none',
      color: palettes.font.blueGrey,
    },
  },
  fontCss.style.R16
);
