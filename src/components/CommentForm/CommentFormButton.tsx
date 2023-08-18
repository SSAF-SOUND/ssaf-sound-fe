import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

import { Icon } from '~/components/Common';
import { flex, palettes, resetStyle } from '~/styles/utils';

type CommentFormButtonProps = {
  loading?: boolean;
};

export const CommentFormButton = (props: CommentFormButtonProps) => {
  const { loading = false } = props;
  return (
    <button type="submit" disabled={loading} css={buttonCss}>
      {loading ? (
        <ClipLoader size={16} />
      ) : (
        <Icon name="send" color={palettes.black} size={16} />
      )}
    </button>
  );
};

const buttonCss = css(resetStyle.button(), flex('center', '', 'row'));
