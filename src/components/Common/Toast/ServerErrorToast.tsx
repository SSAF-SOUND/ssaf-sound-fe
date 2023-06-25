import type { Toast } from 'react-hot-toast';

import { css } from '@emotion/react';
import toast from 'react-hot-toast';

import { Icon } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

interface ServerErrorToastProps {
  t: Toast;
  clientMessage?: string;
  serverMessage?: string;
  showServerMessage?: boolean;
}

const ServerErrorToast = (props: ServerErrorToastProps) => {
  const {
    t,
    clientMessage = '',
    serverMessage = '',
    showServerMessage = false,
  } = props;

  const shouldShowServerMessage = showServerMessage && serverMessage;

  return (
    <div css={selfCss} onClick={() => toast.dismiss(t.id)}>
      <div css={flex('center')}>
        <Icon name="close" color={palettes.error.default} size={24} />
      </div>
      <div>
        {clientMessage && <p>{clientMessage}</p>}
        {shouldShowServerMessage && <p>{serverMessage}</p>}
      </div>
    </div>
  );
};

export default ServerErrorToast;

const selfCss = css(
  {
    cursor: 'pointer',
    transition: 'transform 200ms',
    padding: 10,
    paddingLeft: 6,
    margin: '-4px -10px', // 기본 스타일때문에.
    ':hover': {
      transform: 'translate3d(0, -2px, 0)',
    },
    ':active': {
      transform: 'translate3d(0, 2px, 0)',
    },
  },
  fontCss.family.auto,
  fontCss.style.B12,
  flex('center', 'space-between', 'row', 8)
);
