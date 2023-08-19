import type { Meta } from '@storybook/react';

import mdx from './CommentForm.mdx';
import { CommentForm } from './index';

const meta: Meta<typeof CommentForm> = {
  title: 'Comment/CommentForm',
  component: CommentForm,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export default meta;

export const Default = () => {
  return <CommentForm />;
};
