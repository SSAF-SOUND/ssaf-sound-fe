import type { MyInfoEditFormValues } from './utils';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import type { PartialDeep } from 'type-fest';

import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '~/components/Common';
import { Nickname } from '~/components/Forms/UserRegisterForm/Fields';
import TitleBar from '~/components/TitleBar';
import { flex, pageMinHeight } from '~/styles/utils';

import { SsafyBasicInfo, IsMajor, Track } from './Fields';

type MyInfoEditFormFields = keyof MyInfoEditFormValues;

const titleMap: Record<MyInfoEditFormFields, string> = {
  nickname: '닉네임 수정',
  isMajor: 'SSAFY 전공자',
  ssafyBasicInfo: 'SSAFY 기본정보',
  track: 'SSAFY 트랙',
};

export interface MyInfoEditFormProps {
  field: MyInfoEditFormFields;
  defaultValues: PartialDeep<MyInfoEditFormValues>;
  onValidSubmit: SubmitHandler<MyInfoEditFormValues>;
  onInvalidSubmit?: SubmitErrorHandler<MyInfoEditFormValues>;
  className?: string;
}

const MyInfoEditForm = (props: MyInfoEditFormProps) => {
  const { field, defaultValues, onValidSubmit, onInvalidSubmit, className } =
    props;

  const methods = useForm<MyInfoEditFormValues>({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        css={selfCss}
        className={className}
        onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
      >
        <TitleBar.Default title={titleMap[field]} withoutClose  />
        {field === 'nickname' && (
          <Nickname
            buttonText="수정 완료"
            initialNickname={defaultValues.nickname}
            withLabelText={false}
          />
        )}
        {field === 'ssafyBasicInfo' && <SsafyBasicInfo />}
        {field === 'isMajor' && <IsMajor />}
        {field === 'track' && <Track />}

        {field !== 'nickname' && (
          <Button
            size="lg"
            type="submit"
            disabled={!isDirty}
            loading={isSubmitting}
          >
            수정 완료
          </Button>
        )}
      </form>
    </FormProvider>
  );
};

export default MyInfoEditForm;

const selfCss = css(
  {
    minHeight: pageMinHeight,
  },
  flex('', 'space-between')
);
