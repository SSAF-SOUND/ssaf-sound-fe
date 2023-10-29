import type { CustomNextPage } from 'next/types';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';

import { Button } from '~/components/Common/Button';
import { Icon } from '~/components/Common/Icon';
import Label from '~/components/Common/Label';
import { TextInput } from '~/components/Common/TextInput';
import TitleBar from '~/components/TitleBar';
import { useRevalidatePage } from '~/services/admin/hooks';
import { flex, fontCss, palettes } from '~/styles/utils';
import { customToast, getErrorResponse } from '~/utils';
import { createAuthGuard } from '~/utils/createAuthGuard';
import { createNoIndexPageMetaData } from '~/utils/createNoIndexPageMetaData';

type PageRevalidationFormValues = {
  path: string;
  token: string;
};

const PageRevalidationPage: CustomNextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useForm<PageRevalidationFormValues>();
  const { mutateAsync: revalidatePage } = useRevalidatePage();
  const [revalidateSuccess, setRevalidateSuccess] = useState(false);
  const [revalidateResultMessage, setRevalidateResultMessage] = useState('');

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      const { revalidated, message } = await revalidatePage(formValues);
      setRevalidateSuccess(revalidated);
      setRevalidateResultMessage(message);
    } catch (err) {
      const errorResponse = getErrorResponse(err);
      customToast.clientError(errorResponse?.message ?? '에러');
    }
  });

  return (
    <div css={{ padding: '20px 0' }}>
      <TitleBar.Default title="Page Revalidation" withoutClose />

      <form
        css={[flex('', '', 'column', 16), { padding: '80px 0' }]}
        onSubmit={onSubmit}
      >
        <Label name="Path">
          <TextInput
            size="md"
            css={{ width: '100%' }}
            {...register('path', { required: true })}
          />
        </Label>

        <Label name="Token">
          <TextInput
            size="md"
            css={{ width: '100%' }}
            {...register('token', { required: true })}
          />
        </Label>

        <Button type="submit" css={{ marginTop: 30 }}>
          Revalidate
        </Button>
      </form>
      <div>
        {isSubmitting ? (
          <div css={flex('center', '', 'row', 4)}>
            <ClipLoader size={18} color={palettes.white} />
            <span>Revalidating...</span>
          </div>
        ) : (
          isSubmitSuccessful && (
            <p
              css={[
                flex('center', '', 'row'),
                fontCss.style.R14,
                {
                  color: revalidateSuccess
                    ? palettes.success.default
                    : palettes.error.default,
                },
              ]}
            >
              <Icon name="chevron.right.double" size={24} />
              {revalidateResultMessage}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default PageRevalidationPage;
PageRevalidationPage.auth = createAuthGuard({
  role: 'admin',
});
PageRevalidationPage.meta = createNoIndexPageMetaData('Page Revalidation');
